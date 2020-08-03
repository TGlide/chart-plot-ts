import { Resizable } from "re-resizable";
import React, { ChangeEvent, useState } from "react";
import EventsList from "./components/EventsList";
import { isJsonString } from "./helpers/json";
import "./styles/app.scss";

function App() {
  const [events, setEvents] = useState([
    {
      type: "start",
      timestamp: 1519780251293,
      select: ["min_response_time", "max_response_time"],
      group: ["os", "browser"],
    },
  ]);
  const [eventInput, setEventInput] = useState("");

  const eventInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEventInput(newValue);
  };

  const eventInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isJsonString(eventInput)) {
      const eventObject = JSON.parse(eventInput);
      setEvents([...events, eventObject]);
    }
  };

  return (
    <div className="App">
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="header">
              <img
                src={require("./assets/logo.png")}
                alt="Intelie - a RigNet company"
              />
              <div className="title"> Thomas Gouveia Lopes Challenge </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section chart-input">
        <div className="container">
          <Resizable
            className="card chart-input-box"
            defaultSize={{ width: "100%", height: 250 }}
            minWidth={"100%"}
            minHeight={100}
            maxHeight={"50vh"}
          >
            <div className="content">
              <EventsList events={events} />
            </div>
            <div className="input-container">
              <label htmlFor="" className="label">
                Input:{" "}
              </label>
              <input
                type="text"
                className="input"
                value={eventInput}
                onChange={eventInputChange}
                onKeyPress={eventInputKeyPress}
              />
            </div>
          </Resizable>
        </div>
      </section>

      <div className="footer">
        <div className="container">
          <button className="button is-info">Generate Chart</button>
        </div>
      </div>
    </div>
  );
}

export default App;
