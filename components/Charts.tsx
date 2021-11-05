import {
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  CartesianGrid,
  Pie,
  PieChart,
  Tooltip,
  Cell,
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
        ticks={[
          1, 2, 3, 5, 10, 30, 50, 100, 500, 1000, 2000, 5000, 10000, 50000,
          100000, 500000, 700000,
        ].filter((val) => val <= co2SliderValue)}
        tickFormatter={(tick) => {
          return tick.toLocaleString();
        }}
        style={{ fontSize: "10px" }}
      >
        <Label value="Years Ago" dy={15} fontSize="12px" />
      </XAxis>
      <YAxis style={{ fontSize: "10px" }} domain={[150, 450]}>
        <Label
          value="Carbon Dioxide (ppmv)"
          angle={-90}
          dx={-20}
          fontSize="12px"
        />
      </YAxis>
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
        style={{ fontSize: "10px" }}
      />
      <YAxis
        // hide={true}
        style={{ fontSize: "10px" }}
        yAxisId="left"
        domain={[150, 350]}
      >
        <Label
          value="Carbon Dioxide (ppmv)"
          angle={-90}
          dx={-20}
          fontSize="12px"
        />
      </YAxis>
      <YAxis
        style={{ fontSize: "10px" }}
        // hide={true}
        yAxisId="right"
        orientation="right"
      >
        <Label value="Temperature (°C)" angle={90} dx={15} fontSize="12px" />
      </YAxis>
    </LineChart>
  </ResponsiveContainer>
);
export const sspProjectionLineChart = ({ sspProjections }: any) => (
  <ResponsiveContainer width="90%" height={200}>
    <LineChart
      data={sspProjections}
      margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
    >
      <CartesianGrid></CartesianGrid>
      <Legend
        align="right"
        verticalAlign="middle"
        layout="vertical"
        formatter={(value: string, entry: any) => {
          return <span style={{ fontSize: "10px" }}>{value}</span>;
        }}
      />
      <Line
        name="SSP1-1.9"
        type="monotone"
        dataKey="SSP1-19-IMAGE"
        stroke="#15b92b"
        dot={false}
      />
      <Line
        name="SSP1-2.6"
        type="monotone"
        dataKey="SSP1-26-IMAGE"
        stroke="#076116"
        dot={false}
      />
      <Line
        name="SSP2-4.5"
        type="monotone"
        dataKey="SSP2-45-MESSAGE-GLOBIOM"
        stroke="#974413"
        dot={false}
      />
      <Line
        name="SSP5-4.0"
        type="monotone"
        dataKey="SSP5-Baseline-REMIND-MAGPIE"
        stroke="#f00a0a"
        dot={false}
      />

      <XAxis
        dataKey="year"
        type="number"
        scale="time"
        domain={[2010, 2100]}
        style={{ fontSize: "10px" }}
      >
        <Label value="Year" dy={15} fontSize="12px" />
      </XAxis>
      <YAxis domain={[0, 6]} style={{ fontSize: "10px" }}>
        <Label
          value="Temperature Increase (°C)"
          angle={-90}
          dx={-15}
          fontSize="12px"
        />
      </YAxis>
    </LineChart>
  </ResponsiveContainer>
);

const co2OuterData = [
  {
    name: "Iron and steel",
    value: 7.2,
  },
  {
    name: "Chemicals and petrochemical",
    value: 3.6,
  },
  {
    name: "Food & tobacco",
    value: 1,
  },
  {
    name: "Others",
    value: 12.4,
  },
  {
    name: "Road vehicles",
    value: 11.9,
  },
  {
    name: "Aviation",
    value: 1.9,
  },
  {
    name: "Shipping",
    value: 1.7,
  },
  {
    name: "Others",
    value: 0.7,
  },
  {
    name: "Residential buildings",
    value: 10.9,
  },
  {
    name: "Commercial",
    value: 6.6,
  },
  {
    name: "Unallocated fuel combustion",
    value: 7.8,
  },
  {
    name: "Fugitive emissions from energy production",
    value: 5.8,
  },
  {
    name: "Others (chemicals, cement ... )",
    value: 6.9,
  },
  {
    name: "Waste (Landfills, wastewater)",
    value: 3.2,
  },
  {
    name: "Livestock & manure",
    value: 5.8,
  },
  {
    name: "Agricultural soils",
    value: 4.1,
  },
  {
    name: "Crop burning",
    value: 3.5,
  },
  {
    name: "Deforestation",
    value: 2.2,
  },
  { name: "Others", value: 1.4 + 1.3 },
];
const co2InnerData = [
  {
    name: "Industry",
    value: 24.2,
  },
  {
    name: "Transport",
    value: 16.2,
  },
  {
    name: "Buildings",
    value: 17.5,
  },
  {
    name: "Others",
    value: 23.7,
  },
  {
    name: "Agriculture",
    value: 18.4,
  },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={"middle"}
      dominantBaseline="central"
      fontSize="9px"
    >
      {name}
      {/* {`${(percent * 100).toFixed(0)}%`} */}
    </text>
  );
};

const COLORS = ["#097bdf", "#17a88e", "#c48f1d", "#a1522a", "#8c33af"];

export const co2BreakdownPie = () => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={co2InnerData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        fill="#8884d8"
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {co2InnerData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Pie
        data={co2OuterData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={90}
        outerRadius={100}
        fill="#82ca9d"
      />
      <Tooltip formatter={(value: string) => `${value}%`} />
    </PieChart>
  </ResponsiveContainer>
);
