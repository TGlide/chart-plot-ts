// __tests__/CheckboxWithLabel-test.js
import React from "react";
import { shallow } from "enzyme";
import EventsChart from "../components/EventsChart";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.

const eventData = [
  {
    type: "start",
    timestamp: 1519862400000,
    select: ["min_response_time", "max_response_time"],
    group: ["os", "browser"],
  },
  {
    type: "span",
    timestamp: 1519862400000,
    begin: 1519862400000,
    end: 1519863000000,
  },
  {
    type: "data",
    timestamp: 1519862400000,
    os: "linux",
    browser: "firefox",
    min_response_time: 0.941526486828338,
    max_response_time: 1.3606361755402219,
  },
  {
    type: "stop",
    timestamp: 1519862400000,
    select: ["min_response_time", "max_response_time"],
    group: ["os", "browser"],
  },
];

it("EventChart renders chart when events given", () => {
  const eventsChart = shallow(<EventsChart data={eventData} />);

  expect(eventsChart.find("[data-testid='chart-el']")).toHaveLength(1);
});

it("EventChart renders text when no data given", () => {
  const eventsChart = shallow(<EventsChart data={undefined} />);

  expect(eventsChart.find(".empty-data")).toHaveLength(1);
});

it("EventChart renders error text when error given", () => {
  const error = { message: "Unexpected Error" };
  const eventsChart = shallow(<EventsChart data={error} />);

  const errorText = eventsChart.find(".error-data .message").text();
  expect(errorText).toEqual("Unexpected Error");
});
