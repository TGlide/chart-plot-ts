import { Serie } from "@nivo/line";
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useUndo from "use-undo";
import EventsChart from "./components/EventsChart";
import EventsList from "./components/EventsList";
import ChartError from "./entities/ChartError";
import DataEvent from "./entities/DataEvent";
import { generateChartData } from "./helpers/chart";
import { getExampleDataEventArr } from "./helpers/input";
import { isJsonString } from "./helpers/json";
import "./styles/app.scss";

function App() {
  const [
    eventsState,
    {
      set: setEvents,
      undo: undoEvents,
      redo: redoEvents,
      canUndo: canUndoEvents,
      canRedo: canRedoEvents,
    },
  ] = useUndo<DataEvent[]>(getExampleDataEventArr(1000));
  const { present: events } = eventsState;
  const [eventInput, setEventInput] = useState("");
  const [chartData, setChartData] = useState<Serie[] | ChartError | undefined>(
    undefined
  );
  const [eventBoxHeight, setEventBoxHeight] = useState(0);

  const eventInputBoxRef = useRef<HTMLInputElement>(null);

  const eventInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEventInput(newValue);
  };

  const eventInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleEnterEventInput();
  };

  const handleEnterEventInput = () => {
    if (isJsonString(eventInput)) {
      const eventObject = JSON.parse(eventInput);
      setEvents([...events, eventObject]);
      setEventInput("");
    }
  };

  const handleClearAllEvents = () => {
    setEvents([]);
  };

  const handleGenerateChart = () => {
    const data = generateChartData(events);

    // console.log("generateChartData res:", data);

    setChartData(data);
  };

  const handleResizeStart: ResizeStartCallback = (
    event,
    direction,
    refToElement
  ) => {
    setEventBoxHeight(0);
  };

  const handleResizeStop: ResizeCallback = (
    event,
    direction,
    refToElement,
    delta
  ) => {
    if (refToElement.children.length >= 3) {
      const containerHeight = refToElement.clientHeight;
      const inputHeight = refToElement.children[2].clientHeight;
      setEventBoxHeight(containerHeight - inputHeight);
    }
  };

  useEffect(() => {
    const inputContainer = eventInputBoxRef.current;
    if (inputContainer) setEventBoxHeight(250 - inputContainer.clientHeight);
  }, []);

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

      <section className="section" id="event-input">
        <div className="container">
          <Resizable
            className="card chart-input-box"
            defaultSize={{ width: "100%", height: 250 }}
            minWidth={"100%"}
            minHeight={150}
            maxHeight={"50vh"}
            onResizeStart={handleResizeStart}
            onResizeStop={handleResizeStop}
          >
            <div className="content">
              <EventsList events={events} height={eventBoxHeight} />
            </div>
            <div
              className="input-container has-background-secondary"
              ref={eventInputBoxRef}
            >
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
              <button
                className="button is-info is-light"
                disabled={!canUndoEvents}
                onClick={undoEvents}
              >
                Undo
              </button>
              <button
                className="button is-info is-light"
                disabled={!canRedoEvents}
                onClick={redoEvents}
              >
                Redo
              </button>
              <button
                className="button is-danger is-light"
                disabled={!Boolean(events.length)}
                onClick={handleClearAllEvents}
              >
                Clear All
              </button>
              <button
                className="button is-primary is-light"
                onClick={handleEnterEventInput}
              >
                Enter
              </button>
            </div>
          </Resizable>
        </div>
      </section>

      <section className="section" id="events-chart">
        <div className="container">
          <div className="chart-container">
            <EventsChart data={chartData} />
          </div>
        </div>
      </section>

      <div className="footer">
        <div className="container">
          <button className="button is-info" onClick={handleGenerateChart}>
            Generate Chart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
