import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/navigation";
import Home from "./components/home";
import Hackaton from "./components/hackaton";

function App() {
  var url = "http://localhost:5000/api/v1/hackatons";
  const [hackatonsArray, setHackatonsArray] = useState([]);
  const [showHome, setShowHome] = useState(true); //Could have used React-Router-Dom to do the pagination, but seemed like a waste of resources in a two page web app, prefeared to do a bolean to display the home or the list
  const [currentHackatonPosition, setCurrentHackatonPosition] = useState(); //Normally i woudln't make this variable to display an array of objects, but because i have to display one position of the array differently than the other ones i prefeared to make this variable that stores the value of the currentHackaton and depending on which one it is the component is rendered differently
  const [sortScores, setSortScores] = useState(false);
  const [hallOfFamePosition, setHallOfFamePosition] = useState();

  const getHackatons = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      let devsWithHackaton = addHackatonToDeveloper(responseJson.hackatons);
      let hackatons = addHallOfFame(devsWithHackaton);
      setHackatonsArray(hackatons);
      setHallOfFamePosition(hackatons.length - 1);
    }
  };

  useEffect(() => {
    getHackatons(url);
  }, []);

  useEffect(() => {
    setSortScores(false);
  }, [showHome]);

  useEffect(() => {
    url = "http://localhost:5000/api/v1/hackatons";
    if (sortScores) {
      url = "http://localhost:5000/api/v1/hackatons?sort=true";
    }
    getHackatons(url);
  }, [sortScores]);

  const addHackatonToDeveloper = (hackatons) => {
    hackatons.forEach((hackaton) => {
      hackaton.developers.forEach((developer) => {
        developer["hackaton"] = `${hackaton.place} ${hackaton.date}`;
      });
    });
    return hackatons;
  };

  const addHallOfFame = (hackatons) => {
    let everyDeveloper = makeDevelopersArray(hackatons);
    let sortedDevelopers = sortDevelopers(everyDeveloper);
    let hallOfFameDevs = [];
    for (let i = 0; i < 10; i++) {
      hallOfFameDevs.push(sortedDevelopers[i]);
    }
    const hallOfFame = {
      place: "Hall ",
      date: "Of Fame",
      developers: hallOfFameDevs,
    };
    hackatons.push(hallOfFame);
    return hackatons;
  };

  const makeDevelopersArray = (hackatons) => {
    let everyDeveloper = [];
    hackatons.forEach((hackaton) => {
      hackaton.developers.forEach((developer) => {
        everyDeveloper.push(developer);
      });
    });
    return everyDeveloper;
  };

  const sortDevelopers = (developers) => {
    let copyOfDevelopers = developers;
    copyOfDevelopers.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    return copyOfDevelopers;
  };

  return (
    <div className="App">
      <Navigation
        hackatonsArray={hackatonsArray}
        setShowHome={setShowHome}
        setCurrentHackatonPosition={setCurrentHackatonPosition}
        hallOfFamePosition={hallOfFamePosition}
      />
      {!showHome ? ( //Could have used React-Router-Dom to do the pagination, but seemed like a waste of resources in a two page web app, prefeared to do a bolean to display the home or the list
        <Hackaton
          sortScores={sortScores}
          setSortScores={setSortScores}
          hackatonsArray={hackatonsArray}
          currentHackatonPosition={currentHackatonPosition}
          hallOfFamePosition={hallOfFamePosition}
        />
      ) : (
        <Home
          hackatonsArray={hackatonsArray}
          setShowHome={setShowHome}
          setCurrentHackatonPosition={setCurrentHackatonPosition}
          hallOfFamePosition={hallOfFamePosition}
        />
      )}
    </div>
  );
}

export default App;
