import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import "./styles.scss";

interface EventsChartProps {
  data: Serie[] | undefined;
}

export default ({ data }: EventsChartProps) => {
  const dataa = [
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

  return (
    <>
      {data ? (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          colors={{ scheme: "nivo" }}
          lineWidth={3}
          pointSize={12}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor", modifiers: [] }}
          pointLabel="y"
          pointLabelYOffset={-12}
          areaOpacity={0.05}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      ) : (
        <div className="empty-data">
          <span className="icon">
            <img
              src={require("../../assets/chart-area-solid.svg")}
              alt="Ícone de gráfico"
            />
          </span>
          <span className="text">No chart generated yet!</span>
        </div>
      )}
    </>
  );
};
