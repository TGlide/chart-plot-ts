import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./styles.scss";
import { VariableSizeList as List } from "react-window";

type EventsListProps = {
  events: Object[];
  height: number;
};

export default function EventsList({ events, height }: EventsListProps) {
  const getItemSize = (index: number) => {
    const size =
      24 + Math.floor(JSON.stringify(events[index]).length / 120) * 21;
    console.log(index + 1, JSON.stringify(events[index]).length, size);
    return size;
  };

  interface ItemProps {
    index: number;
    style: object;
  }

  const Item = ({ index, style }: ItemProps) => {
    const event = events[index];
    const eventString = JSON.stringify(event);

    return (
      <li key={index} style={style}>
        <span className="index">{index + 1}</span>
        <SyntaxHighlighter language="json" style={rainbow}>
          {eventString}
        </SyntaxHighlighter>
      </li>
    );
  };

  return (
    <List
      height={height}
      itemCount={events.length}
      itemSize={getItemSize}
      width="100%"
      className="events-list"
    >
      {Item}
    </List>
  );
}
