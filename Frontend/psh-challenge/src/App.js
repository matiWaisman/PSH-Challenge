import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/navigation";
import Home from "./components/home";
import Hackaton from "./components/hackaton";

function App() {
  var url = "http://localhost:5000/api/v1/hackatons";
  const [eventsArray, setEventsArray] = useState([]);
  const [showHome, setShowHome] = useState(true);
  const [currentHackaton, setCurrentHackaton] = useState();
  const [sortScores, setSortScores] = useState(false);

  const getEvents = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setEventsArray(responseJson.hackatons);
    }
  };

  useEffect(() => {
    getEvents(url);
  }, []);

  useEffect(() => {
    if (sortScores) {
      url = "http://localhost:5000/api/v1/hackatons?sort=true";
    } else {
      url = "http://localhost:5000/api/v1/hackatons";
    }
    getEvents(url);
  }, [sortScores]);

  return (
    <div className="App">
      <Navigation
        eventsArray={eventsArray}
        setShowHome={setShowHome}
        setCurrentHackaton={setCurrentHackaton}
      />
      {!showHome ? (
        <Hackaton
          sortScores={sortScores}
          setSortScores={setSortScores}
          eventsArray={eventsArray}
          currentHackaton={currentHackaton}
        />
      ) : (
        <Home
          eventsArray={eventsArray}
          setShowHome={setShowHome}
          setCurrentHackaton={setCurrentHackaton}
        />
      )}
    </div>
  );
}

export default App;
