import DataEvent from "../entities/DataEvent";

const exampleDataEventArr: DataEvent[] = [
  {
    type: "start",
    timestamp: 1519780251293,
    select: ["min_response_time", "max_response_time"],
    group: ["os", "browser"],
  },
  {
    type: "span",
    timestamp: 1519780251293,
    begin: 151986240000,
    end: 1519862460000,
  },
  {
    type: "data",
    timestamp: 1519862400000,
    os: "linux",
    browser: "chrome",
    min_response_time: 0.1,
    max_response_time: 1.3,
  },
  {
    type: "data",
    timestamp: 1519862400000,
    os: "mac",
    browser: "chrome",
    min_response_time: 0.2,
    max_response_time: 1.2,
  },
  {
    type: "data",
    timestamp: 1519862400000,
    os: "mac",
    browser: "firefox",
    min_response_time: 0.3,
    max_response_time: 1.2,
  },
  {
    type: "data",
    timestamp: 1519862400000,
    os: "linux",
    browser: "firefox",
    min_response_time: 0.1,
    max_response_time: 1.0,
  },
  {
    type: "data",
    timestamp: 1519862460000,
    os: "linux",
    browser: "chrome",
    min_response_time: 0.2,
    max_response_time: 0.9,
  },
  {
    type: "data",
    timestamp: 1519862460000,
    os: "mac",
    browser: "chrome",
    min_response_time: 0.1,
    max_response_time: 1.0,
  },
  {
    type: "data",
    timestamp: 1519862460000,
    os: "mac",
    browser: "firefox",
    min_response_time: 0.2,
    max_response_time: 1.1,
  },
  {
    type: "data",
    timestamp: 1519862460000,
    os: "linux",
    browser: "firefox",
    min_response_time: 0.3,
    max_response_time: 1.4,
  },
  {
    type: "data",
    timestamp: 1519862520000,
    os: "mac",
    browser: "firefox",
    min_response_time: 0.2,
    max_response_time: 1.1,
  },
  {
    type: "data",
    timestamp: 1519862520000,
    os: "linux",
    browser: "firefox",
    min_response_time: 0.4,
    max_response_time: 1.4,
  },
  // { type: "stop", timestamp: 1519780251293 },
];

export function getExampleDataEventArr(totalTimestamps: number): DataEvent[] {
  const os = ["linux", "mac"];
  const browser = ["firefox", "chrome"];
  const select = ["min_response_time", "max_response_time"];

  const starting_timestamp = 1519862400000;
  const end_timestamp = starting_timestamp + totalTimestamps * 60000;
  let current_timestamp = starting_timestamp;

  const dataEventArr: DataEvent[] = [
    {
      type: "start",
      timestamp: starting_timestamp,
      select: select,
      group: ["os", "browser"],
    },
    {
      type: "span",
      timestamp: starting_timestamp,
      begin: starting_timestamp,
      end: end_timestamp,
    },
  ];

  while (current_timestamp < end_timestamp) {
    for (let eventOs of os) {
      for (let eventBrowser of browser) {
        dataEventArr.push({
          type: "data",
          timestamp: current_timestamp,
          os: eventOs,
          browser: eventBrowser,
          min_response_time: Math.random(),
          max_response_time: Math.random() + 1,
        });
      }
    }

    current_timestamp += 60000;
  }

  return dataEventArr;
}
