import { Serie, Datum } from "@nivo/line";
import DataEvent from "../entities/DataEvent";
import { timestampToString } from "./time";
import ChartError from "../entities/ChartError";
import { isArray, isNumber } from "util";

interface SerieObj {
  [id: string]: {
    data: Datum[];
  };
}

interface ChartSpan {
  begin: number;
  end: number;
}

function serieObjToArr(serieObj: SerieObj, chartSpan: ChartSpan): Serie[] {
  const serieArr: Serie[] = [];

  const chartSpanFilter = (datum: Datum) => {
    return (
      isNumber(datum.x) &&
      datum.x <= chartSpan.end &&
      datum.x >= chartSpan.begin
    );
  };

  const chartSpanMap = (datum: Datum) => {
    return {
      ...datum,
      x: isNumber(datum.x) ? timestampToString(datum.x) : datum.x,
    };
  };

  for (let key of Object.keys(serieObj)) {
    let serieData = serieObj[key].data
      .filter(chartSpanFilter)
      .map(chartSpanMap);
    if (serieData.length === 0) continue;

    const serie = {
      id: key,
      data: serieData,
    };
    serieArr.push(serie);
  }

  return serieArr;
}

export function generateChartData(events: DataEvent[]): Serie[] | ChartError {
  const serieObj: SerieObj = {};

  let hasStarted = false;
  let selections: string[] = [];
  let groups: string[] = [];
  let span: ChartSpan = { begin: 0, end: 0 };

  for (let event of events) {
    const { type, timestamp } = event;

    if (type === "start" && !hasStarted) {
      const { select, group } = event;

      if (!isArray(select) || select.length === 0)
        return {
          message: `Select field on event of type 'start' is invalid or empty.`,
        } as ChartError;

      if (!isArray(group) || group.length === 0)
        return {
          message: `Group field on event of type 'start' is invalid or empty.`,
        } as ChartError;

      selections = select;
      groups = group;
      hasStarted = true;
    }

    if (type === "span" && hasStarted) {
      const { begin, end } = event;

      if (!begin || !end)
        return { message: "Invalid span event." } as ChartError;

      span.begin = begin;
      span.end = end;
    }

    if (type === "data" && hasStarted) {
      let baseEventId = "";

      groups.forEach((group) => (baseEventId += `${event[group] ?? "n/a"} `));
      baseEventId = baseEventId.trimEnd();

      selections.forEach((select) => {
        const eventId = `${baseEventId} ${select}`;

        if (!Object.keys(serieObj).includes(eventId))
          serieObj[eventId] = { data: [] };

        serieObj[eventId].data.push({
          x: timestamp,
          y: event[select] ?? null,
        });
      });
    }

    if (type === "stop" && hasStarted) {
      hasStarted = false;
      selections = [];
      groups = [];
    }
  }

  const serieArr = serieObjToArr(serieObj, span);

  if (serieArr.length === 0)
    return { message: "No data generated from events." } as ChartError;

  return serieArr;
}
