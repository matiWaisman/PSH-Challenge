require("dotenv").config();
const fetch = require("node-fetch");
const HackatonSchema = require("./models/hackaton");
const connect = require("./db/connect");
const moment = require("moment");

const url = "https://randomuser.me/api";
var amountOfDocuments = 100; // The first time it counts the total amount of documents it returns 0, patching it by making it bigger to not add more documents than it should

const fetchApi = async (url) => {
  const response = await fetch(url);
  const responseJson = await response.json();
  if (responseJson) {
    return responseJson;
  }
};

const generateRandomScore = (min, max) => {
  return Math.random() * (max - min) + min;
};

function generateRandomDate(date1, date2) {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  var date1 = date1 || "01-01-1970";
  var date2 = date2 || new Date().toLocaleDateString();
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();
  if (date1 > date2) {
    return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
  } else {
    return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
  }
}

const countAmountOfDocuments = () => {
  HackatonSchema.countDocuments({}, function (err, count) {
    if (err) {
      return handleError(err);
    }
    amountOfDocuments = count;
  });
};

const populateDb = async () => {
  const developers = await createDevsObject();
  const hackatonObject = await createHackatonObject(developers);
  try {
    await connect(process.env.MONGO_URI);
    await HackatonSchema.create(hackatonObject);
    console.log("Hackaton added");
  } catch (err) {
    console.log(err);
  }
};

const createDevsObject = async () => {
  let devsArray = [];
  for (let i = 0; i < 10; i++) {
    const devJson = await fetchApi(url);
    const devObject = passDevJsonToObject(devJson);
    devsArray.push(devObject);
  }
  return devsArray;
};

const createHackatonObject = async (developers) => {
  const hackatonJson = await fetchApi(url);
  const hackatonObject = passHackatonJsonToObject(hackatonJson, developers);
  return hackatonObject;
};

//I had problems adding the result into the json, so then i'm creating a new object deestructuring the properties of the json and adding the result
const passDevJsonToObject = (data) => {
  const {
    results: [
      {
        dob: { age },
      },
    ],
  } = data;
  const {
    results: [{ gender }],
  } = data;
  const {
    results: [
      {
        name: { first, last },
      },
    ],
  } = data;
  const {
    results: [{ email }],
  } = data;
  const {
    results: [
      {
        picture: { large },
      },
    ],
  } = data;
  let developer = {
    age: age,
    gender: gender,
    name: { first: first, last: last },
    email: email,
    score: generateRandomScore(7, 10),
    picture: { large: large },
  };
  return developer;
};

//I had problems adding the date into the json, so then i'm creating a new object deestructuring the properties of the json and adding the date
const passHackatonJsonToObject = (data, developers) => {
  const {
    results: [
      {
        location: { city },
      },
    ],
  } = data;
  let hackaton = {
    place: city,
    date: moment().format(generateRandomDate("02/13/2013", "01/03/2022")),
    developers: developers,
  };
  return hackaton;
};

setInterval(function () {
  countAmountOfDocuments();
  if (amountOfDocuments < 10) {
    //Added a limit to the total amount of documents that can be created, i didn't wanted to oversaturate the db, but everything works perfectly with any amount of documents
    populateDb();
  }
}, 60 * 5000);
