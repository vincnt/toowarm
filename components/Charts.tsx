import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export const co2HistoricLineChart = ({ co2Data, co2SliderValue }: any) => (
  <ResponsiveContainer width="90%" height={200}>
    <LineChart
      data={co2Data}
      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
    >
      <Line type="natural" dataKey="co2" stroke="#157922" dot={false} />
      <XAxis
        dataKey="age"
        reversed={true}
        type="number"
        domain={[1, co2SliderValue]}
        allowDataOverflow={true}
        label={{ value: "Years Ago", dy: 15 }}
        ticks={[
          1, 2, 3, 5, 10, 30, 50, 100, 500, 1000, 2000, 5000, 10000, 50000,
          100000, 500000, 700000,
        ].filter((val) => val <= co2SliderValue)}
        tickFormatter={(tick) => {
          return tick.toLocaleString();
        }}
      />
      <YAxis
        label={{ value: "Carbon Dioxide", angle: -90, dx: -20 }}
        domain={[150, 450]}
      />
    </LineChart>
  </ResponsiveContainer>
);
export const co2AndTempLineChart = ({ co2AndTempData }: any) => (
  <ResponsiveContainer width="90%" height={200}>
    <LineChart
      data={co2AndTempData}
      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
    >
      <Legend verticalAlign="top" height={30} />

      <Line
        name="Carbon Dioxide"
        type="basis"
        yAxisId="left"
        dataKey="co2"
        stroke="#1a156e"
        dot={false}
      />
      <Line
        name="Temperature"
        type="basis"
        yAxisId="right"
        dataKey="temp"
        stroke="#a72727"
        dot={false}
      />

      <XAxis
        dataKey="age"
        reversed={true}
        type="number"
        domain={[1, 400000]}
        allowDataOverflow={true}
        label={{ value: "Years Ago", dy: 15 }}
        ticks={[10, 10000, 100000, 300000]}
        tickFormatter={(tick) => {
          return tick.toLocaleString();
        }}
      />
      <YAxis
        hide={true}
        yAxisId="left"
        // label={{ value: "Carbon Dioxide", angle: -90, dx: -20 }}
        domain={[150, 350]}
      />
      <YAxis
        hide={true}
        yAxisId="right"
        orientation="right"
        // label={{ value: "Temperature", angle: 90, dx: 15 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
export const sspProjectionLineChart = ({ sspProjections }: any) => (
  <ResponsiveContainer width="90%" height={200}>
    <LineChart
      data={sspProjections}
      margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
    >
      <Legend
        align="right"
        verticalAlign="middle"
        layout="vertical"
        formatter={(value: string, entry: any) => {
          return <span style={{ fontSize: "12px" }}>{value}</span>;
        }}
      />
      <Line
        name="SSP51-1.9"
        type="monotone"
        dataKey="SSP1-19-IMAGE"
        stroke="#1d13df"
        dot={false}
      />
      <Line
        name="SSP1-2.6"
        type="monotone"
        dataKey="SSP1-26-IMAGE"
        stroke="#f00a0a"
        dot={false}
      />
      <Line
        name="SSP5-4.0"
        type="monotone"
        dataKey="SSP5-Baseline-REMIND-MAGPIE"
        stroke="#0af030"
        dot={false}
      />

      <XAxis
        dataKey="year"
        type="number"
        scale="time"
        domain={[2010, 2100]}
        label={{ value: "Year", dy: 15 }}
      />
      <YAxis
        label={{ value: "Temperature Increase", angle: -90, dx: -20 }}
        domain={[0, 6]}
      />
    </LineChart>
  </ResponsiveContainer>
);