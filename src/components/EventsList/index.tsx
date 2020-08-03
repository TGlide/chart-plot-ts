import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./styles.scss";

type EventsListProps = {
  events: Object[];
};

export default function EventsList({ events }: EventsListProps) {
  const renderEvent = (key: string, event: Object) => {
    const index = parseInt(key) + 1;
    const eventString = JSON.stringify(event);

    return (
      <li key={key}>
        <span className="index">{index}</span>
        <SyntaxHighlighter language="json" style={rainbow}>
          {eventString}
        </SyntaxHighlighter>
      </li>
    );
  };

  return (
    <ul className="events-list">
      {Object.entries(events).map(([key, event]) => renderEvent(key, event))}
    </ul>
  );
}
