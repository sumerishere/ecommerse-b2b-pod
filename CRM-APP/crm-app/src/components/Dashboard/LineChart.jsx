import { LineChart } from "@mui/x-charts/LineChart";

const LineChartComp = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-full">
        <div className=" w-full bg-gradient-to-r rounded-lg overflow-hidden">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, ] }]}
          series={[
            {
              data: [2, 5, 2, 7, 3, 5],
              area: true,
              border: "black",
              color:"#a46eda"
            },
          ]}
          height={400}
        />
      </div>
    </div>
  );
};

export default LineChartComp;
