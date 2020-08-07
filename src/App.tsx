import { Serie } from "@nivo/line";
import React, { useState, useEffect } from "react";
import useUndo from "use-undo";
import EventsChart from "./components/EventsChart";
import EventsInput from "./components/EventsInput";
import ChartError from "./entities/ChartError";
import DataEvent from "./entities/DataEvent";
import { generateChartData } from "./helpers/chart";
import { getExampleDataEventArr } from "./helpers/input";
import "./styles/app.scss";
import socketIOClient from "socket.io-client";
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
  ] = useUndo<DataEvent[]>(getExampleDataEventArr(100));
  const { present: events } = eventsState;
  const [chartData, setChartData] = useState<Serie[] | ChartError | undefined>(
    undefined
  );

  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(
    undefined
  );

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT));
  }, []);

  useEffect(() => {
    if (socket)
      socket.on("setChartData", (data: Serie[] | ChartError | undefined) =>
        setChartData(data)
      );
  }, [socket]);

  const handleGenerateChart = () => {
    if (socket) {
      console.log("a");
      socket.emit("event", events);
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
          <button className="button is-info" onClick={handleGenerateChart}>
            Generate Chart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
