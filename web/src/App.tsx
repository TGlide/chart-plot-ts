import { Serie } from "@nivo/line";
import React, { useState, useEffect } from "react";
import useUndo from "use-undo";
import EventsChart from "./components/EventsChart";
import EventsInput from "./components/EventsInput";
import ChartError from "./entities/ChartError";
import DataEvent from "./entities/DataEvent";
import { getExampleDataEventArr } from "./helpers/input";
import "./styles/app.scss";
import socketIOClient from "socket.io-client";
import { getDataEventArrStartIndex } from "./helpers/chart";
const ENDPOINT = "http://127.0.0.1:5000";

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
  ] = useUndo<DataEvent[]>(getExampleDataEventArr(12, 12));
  const { present: events } = eventsState;
  const [chartData, setChartData] = useState<Serie[] | ChartError | undefined>(
    undefined
  );
  const [socket] = useState<SocketIOClient.Socket>(socketIOClient(ENDPOINT));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected: ", socket.connected);
    });

    socket.on("disconnect", () => {
      console.log("Socket connected: ", socket.connected);
    });

    socket.on("setChartData", (data: Serie[] | ChartError | undefined) => {
      setChartData(data);
      setLoading(false);
    });
  }, [socket]);

  const handleGenerateChart = () => {
    setLoading(true);
    const startingIndex = getDataEventArrStartIndex(events);
    socket.emit("event", events.slice(startingIndex));
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
              <div className="title"> Thomas Gouveia Lopes Challenge</div>
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
          <button
            className={`button is-info ${loading && "is-loading"}`}
            onClick={handleGenerateChart}
            disabled={loading}
          >
            Generate Chart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
