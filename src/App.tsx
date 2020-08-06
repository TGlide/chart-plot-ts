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
import EventsInput from "./components/EventsInput";

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
  const [chartData, setChartData] = useState<Serie[] | ChartError | undefined>(
    undefined
  );

  const handleGenerateChart = () => {
    const data = generateChartData(events);

    // console.log("generateChartData res:", data);

    setChartData(data);
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

      <section className="section" id="event-input">
        <div className="container">
          <EventsInput
            events={events}
            setEvents={setEvents}
            undoEvents={undoEvents}
            redoEvents={redoEvents}
            canUndoEvents={canUndoEvents}
            canRedoEvents={canRedoEvents}
          />
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
