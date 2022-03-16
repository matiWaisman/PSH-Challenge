import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./pages/home";
import NotAllowed from "./pages/notAllowed";
import Login from "./pages/Login";
import Logout from "./pages/logout";
import Register from "./pages/register";
import Hackaton from "./pages/hackaton";

function App() {
  var url = "http://localhost:5000/api/v1/hackatons";
  const [hackatonsArray, setHackatonsArray] = useState([]);
  const [sortScores, setSortScores] = useState(false);
  const [hallOfFamePosition, setHallOfFamePosition] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (isLogged) {
      getHackatons(url);
    }
  }, [isLogged]);

  useEffect(() => {
    url = "http://localhost:5000/api/v1/hackatons";
    if (sortScores) {
      url = "http://localhost:5000/api/v1/hackatons?sort=true";
    }
    getHackatons(url);
  }, [sortScores]);

  const getHackatons = async (url) => {
    if (isLogged) {
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson && response.status === 200) {
        let devsWithHackaton = addHackatonToDeveloper(responseJson.hackatons);
        let hackatons = addHallOfFame(devsWithHackaton);
        setHackatonsArray(hackatons);
        setHallOfFamePosition(hackatons.length - 1);
      }
    }
  };

  const addHackatonToDeveloper = (hackatons) => {
    if (hackatons.lenght > 1) {
      hackatons.forEach((hackaton) => {
        hackaton.developers.forEach((developer) => {
          developer["hackaton"] = `${hackaton.place} ${hackaton.date}`;
        });
      });
    }

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
      <Router>
        <Navigation
          hackatonsArray={hackatonsArray}
          hallOfFamePosition={hallOfFamePosition}
          isLogged={isLogged}
        />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                hackatonsArray={hackatonsArray}
                hallOfFamePosition={hallOfFamePosition}
                isLogged={isLogged}
              />
            }
          />
          {isLogged && (
            <Route
              path="/hackaton/:position"
              element={
                <Hackaton
                  sortScores={sortScores}
                  setSortScores={setSortScores}
                  hackatonsArray={hackatonsArray}
                  hallOfFamePosition={hallOfFamePosition}
                />
              }
            />
          )}
          {!isLogged && (
            <Route
              path="/login"
              exact
              element={
                <Login
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              }
            />
          )}
          {!isLogged && <Route path="/register" exact element={<Register />} />}
          {isLogged && (
            <Route
              path="/logout"
              exact
              element={
                <Logout
                  isLogged={isLogged}
                  setIsLogged={setIsLogged}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setHackatonsArray={setHackatonsArray}
                />
              }
            />
          )}
          <Route path="*" element={<NotAllowed />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
