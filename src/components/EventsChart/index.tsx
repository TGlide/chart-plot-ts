import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import "./styles.scss";
import ChartError, { isChartError } from "../../entities/ChartError";

interface EventsChartProps {
  data: Serie[] | ChartError | undefined;
}

export default ({ data }: EventsChartProps) => {
  return (
    <>
      {data && !isChartError(data) && (
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 200, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          colors={{ scheme: "category10" }}
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
              anchor: "right",
              direction: "column",
              justify: false,
              translateX: 210,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 200,
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
      )}

      {isChartError(data) && (
        <div className="empty-data">
          <span className="icon">
            <img
              src={require("../../assets/chart-area-solid.svg")}
              alt="Ícone de gráfico"
            />
          </span>
          <span className="text">Error generating chart!</span>
          <div className="message">{data.message}</div>
        </div>
      )}

      {data === undefined && (
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
