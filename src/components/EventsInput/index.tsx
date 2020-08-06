import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Resizable, ResizeStartCallback, ResizeCallback } from "re-resizable";
import DataEvent from "../../entities/DataEvent";
import EventsList from "../EventsList";
import { Actions } from "use-undo";
import { isJsonString } from "../../helpers/json";

interface EventsInputProps {
  events: DataEvent[];
  setEvents: (newDataEventArr: DataEvent[]) => void;
  undoEvents: () => void;
  redoEvents: () => void;
  canUndoEvents: boolean;
  canRedoEvents: boolean;
}

export default function EventsInput({
  events,
  setEvents,
  undoEvents,
  redoEvents,
  canUndoEvents,
  canRedoEvents,
}: EventsInputProps) {
  const [eventBoxHeight, setEventBoxHeight] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [eventInput, setEventInput] = useState("");

  const eventInputBoxRef = useRef<HTMLInputElement>(null);

  const eventInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEventInput(newValue);
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

  const eventInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleEnterEventInput();
  };

  const handleResizeStart: ResizeStartCallback = (
    event,
    direction,
    refToElement
  ) => {
    setIsResizing(true);
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
      setIsResizing(false);
    }
  };

  useEffect(() => {
    const inputContainer = eventInputBoxRef.current;
    if (inputContainer) setEventBoxHeight(250 - inputContainer.clientHeight);
  }, []);

  return (
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
        <EventsList
          events={events}
          height={eventBoxHeight}
          style={{ opacity: isResizing ? 0 : 1 }}
        />
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
  );
}
