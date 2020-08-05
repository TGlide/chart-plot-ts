import { Serie, Datum } from "@nivo/line";
import DataEvent from "../entities/DataEvent";
import { timestampToString } from "./time";

const exampleData: Serie[] = [
  {
    id: "japan",
    color: "hsl(178, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 207,
      },
      {
        x: "helicopter",
        y: 168,
      },
      {
        x: "boat",
        y: 37,
      },
      {
        x: "train",
        y: 36,
      },
      {
        x: "subway",
        y: 93,
      },
      {
        x: "bus",
        y: 93,
      },
      {
        x: "car",
        y: 234,
      },
      {
        x: "moto",
        y: 135,
      },
      {
        x: "bicycle",
        y: 207,
      },
      {
        x: "horse",
        y: 51,
      },
      {
        x: "skateboard",
        y: 291,
      },
      {
        x: "others",
        y: 261,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(330, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 146,
      },
      {
        x: "helicopter",
        y: 214,
      },
      {
        x: "boat",
        y: 210,
      },
      {
        x: "train",
        y: 102,
      },
      {
        x: "subway",
        y: 139,
      },
      {
        x: "bus",
        y: 87,
      },
      {
        x: "car",
        y: 121,
      },
      {
        x: "moto",
        y: 19,
      },
      {
        x: "bicycle",
        y: 205,
      },
      {
        x: "horse",
        y: 32,
      },
      {
        x: "skateboard",
        y: 15,
      },
      {
        x: "others",
        y: 99,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(117, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 198,
      },
      {
        x: "helicopter",
        y: 150,
      },
      {
        x: "boat",
        y: 98,
      },
      {
        x: "train",
        y: 31,
      },
      {
        x: "subway",
        y: 1,
      },
      {
        x: "bus",
        y: 267,
      },
      {
        x: "car",
        y: 122,
      },
      {
        x: "moto",
        y: 140,
      },
      {
        x: "bicycle",
        y: 108,
      },
      {
        x: "horse",
        y: 278,
      },
      {
        x: "skateboard",
        y: 146,
      },
      {
        x: "others",
        y: 147,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(97, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 21,
      },
      {
        x: "helicopter",
        y: 252,
      },
      {
        x: "boat",
        y: 135,
      },
      {
        x: "train",
        y: 273,
      },
      {
        x: "subway",
        y: 126,
      },
      {
        x: "bus",
        y: 263,
      },
      {
        x: "car",
        y: 85,
      },
      {
        x: "moto",
        y: 97,
      },
      {
        x: "bicycle",
        y: 74,
      },
      {
        x: "horse",
        y: 195,
      },
      {
        x: "skateboard",
        y: 188,
      },
      {
        x: "others",
        y: 140,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(141, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 211,
      },
      {
        x: "helicopter",
        y: 257,
      },
      {
        x: "boat",
        y: 290,
      },
      {
        x: "train",
        y: 245,
      },
      {
        x: "subway",
        y: 239,
      },
      {
        x: "bus",
        y: 4,
      },
      {
        x: "car",
        y: 111,
      },
      {
        x: "moto",
        y: 186,
      },
      {
        x: "bicycle",
        y: 37,
      },
      {
        x: "horse",
        y: 241,
      },
      {
        x: "skateboard",
        y: 155,
      },
      {
        x: "others",
        y: 212,
      },
    ],
  },
];

interface SerieObj {
  [id: string]: {
    data: Datum[];
  };
}

function serieObjToArr(serieObj: SerieObj): Serie[] {
  const serieArr: Serie[] = [];

  for (let key of Object.keys(serieObj)) {
    const serie = {
      id: key,
      data: serieObj[key].data,
    };
    serieArr.push(serie);
  }

  return serieArr;
}

export function generateChartData(events: DataEvent[]): Serie[] {
  const data: SerieObj = {};

  let hasStarted = false;
  let selections: string[] = [];
  let groups: string[] = [];

  for (let event of events) {
    const { type, timestamp } = event;

    if (type === "start" && !hasStarted) {
      selections = event.select ?? [];
      groups = event.group ?? [];
      hasStarted = true;
    }

    if (type === "data" && hasStarted) {
      let baseEventId = "";
      groups.forEach((group) => (baseEventId += `${event[group] ?? ""} `));
      baseEventId = baseEventId.trimEnd();

      selections.forEach((select) => {
        if (!Object.keys(event).includes(select)) return;

        const eventId = `${baseEventId} ${select}`;

        if (!Object.keys(data).includes(eventId)) data[eventId] = { data: [] };

        data[eventId].data.push({
          x: timestampToString(timestamp),
          y: event[select],
        });
      });
    }

    if (type === "stop" && hasStarted) {
      hasStarted = false;
      selections = [];
      groups = [];
    }
  }

  console.log(data, serieObjToArr(data));

  return serieObjToArr(data);
}
