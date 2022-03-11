import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/navigation";
import Home from "./components/home";
import Hackaton from "./components/hackaton";

function App() {
  var url = "http://localhost:5000/api/v1/hackatons";
  const [hackatonsArray, setHackatonsArray] = useState([]);
  const [showHome, setShowHome] = useState(true);
  const [currentHackaton, setCurrentHackaton] = useState();
  const [sortScores, setSortScores] = useState(false);
  const [hallOfFamePosition, setHallOfFamePosition] = useState();

  const getHackatons = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      let hackatonWithDevs = addHackatonToDeveloper(responseJson.hackatons);
      let hackatons = addHallOfFame(hackatonWithDevs);
      setHackatonsArray(hackatons);
      setHallOfFamePosition(hackatons.length - 1);
    }
  };

  useEffect(() => {
    getHackatons(url);
  }, []);

  useEffect(() => {
    if (sortScores) {
      url = "http://localhost:5000/api/v1/hackatons?sort=true";
    } else {
      url = "http://localhost:5000/api/v1/hackatons";
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
        setCurrentHackaton={setCurrentHackaton}
        hallOfFamePosition={hallOfFamePosition}
      />
      {!showHome ? (
        <Hackaton
          sortScores={sortScores}
          setSortScores={setSortScores}
          hackatonsArray={hackatonsArray}
          currentHackaton={currentHackaton}
          hallOfFamePosition={hallOfFamePosition}
        />
      ) : (
        <Home
          hackatonsArray={hackatonsArray}
          setShowHome={setShowHome}
          setCurrentHackaton={setCurrentHackaton}
          hallOfFamePosition={hallOfFamePosition}
        />
      )}
    </div>
  );
}

export default App;
