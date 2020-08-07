import DataEvent from "../entities/DataEvent";

export function getExampleDataEventArr(
  totalTimestamps: number,
  repeatedData: number
): DataEvent[] {
  const os = ["linux", "mac"];
  const browser = ["firefox", "chrome"];
  const select = ["min_response_time", "max_response_time"];

  const starting_timestamp = 1519862400000;
  const end_timestamp = starting_timestamp + totalTimestamps * 60000;
  let current_timestamp = starting_timestamp;

  let dataEventArr: DataEvent[] = [
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

  dataEventArr.push({ type: "stop", timestamp: end_timestamp });
  const firstDataEvents = dataEventArr.slice();

  for (let i = 0; i < repeatedData; i++) {
    dataEventArr = dataEventArr.concat(firstDataEvents, dataEventArr);
  }

  return dataEventArr;
}
