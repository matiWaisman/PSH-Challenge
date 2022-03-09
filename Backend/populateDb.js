require("dotenv").config();

const { default: axios } = require("axios");
const DeveloperModel = require("./models/developer");
const connect = require("./db/connect");

const url = "https://randomuser.me/api";

function generateUserJson() {
  const promise = axios.get(url);
  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}

const generateRandomScore = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

generateUserJson()
  .then((data) => {
    insertUserIntoDb(data);
  })
  .catch((err) => console.log(err));

//I had problems addind the result into the json object, so then i'm creating a new object deestructuring the properties and then creating a new one
const deEstructureJson = (data) => {
  const {
    results: [
      {
        dob: { date, age },
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
  console.log(age, gender, first, last, email);
  let person = {
    age: age,
    gender: gender,
    name: { first: first, last: last },
    email: email,
    score: generateRandomScore(7, 10),
  };
  return person;
};

const insertUserIntoDb = async (data) => {
  personObject = deEstructureJson(data);
  try {
    await connect(process.env.MONGO_URI);
    await DeveloperModel.deleteMany();
    await DeveloperModel.create(personObject);
    console.log("User added");
  } catch (err) {
    console.log(err);
  }
};
