import "../App.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Overview({ data, timeSpan }) {
  const options = {
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    xAxis: {
      categories: data.map((item) => `${item.StartDate} ${item.StartTime}`),
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
        <p className="no-data">{`No updates on the last ${timeSpan}`}</p>
      )}
    </div>
  );
}

export default Overview;
