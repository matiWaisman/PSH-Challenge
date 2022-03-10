import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./components/navigation";
import Home from "./components/home";
import Hackaton from "./components/hackaton";

function App() {
  const url = "http://localhost:5000/api/v1/hackatons";
  const [eventsArray, setEventsArray] = useState([]);
  const [showHome, setShowHome] = useState(true);
  const [currentEvent, setCurrentEvent] = useState();

  useEffect(() => {
    getEvents(url);
  }, []);

  const getEvents = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson) {
      setEventsArray(responseJson.hackatons);
    }
  };

  return (
    <div className="App">
      <Navigation
        eventsArray={eventsArray}
        setCurrentEvent={setCurrentEvent}
        setShowHome={setShowHome}
      />
      {!showHome ? (
        <Hackaton currentEvent={currentEvent} />
      ) : (
        <Home
          eventsArray={eventsArray}
          setCurrentEvent={setCurrentEvent}
          setShowHome={setShowHome}
        />
      )}
    </div>
  );
}

export default App;
