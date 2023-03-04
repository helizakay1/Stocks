import "./App.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Overview({ data }) {
  const options = {
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: data.map((item) => item.Close),
      },
    ],
    accessibility: {
      enabled: false,
    },
  };

  return (
    <div className="overview">
      {data.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p className="no-data">No data to show</p>
      )}
    </div>
  );
}

export default Overview;
