import { useEffect, useState } from "react";
import "./App.css";
import TimeframeSelector from "./TimeframeSelector";
import Overview from "./Overview";
import History from "./History";
import moment from "moment";

function TabContent({ content }) {
  const [period, setPeriod] = useState(1);
  const [precision, setPrecision] = useState("Minutes");

  const [startTime, setstartTime] = useState(
    moment().subtract(1, "week").format("MM/DD/YYYY%20HH:mm")
  );
  const [endTime, setEndTime] = useState(moment().format("MM/DD/YYYY%20HH:mm"));

  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    fetch(
      `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${startTime}&EndTime=${endTime}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
    )
      .then((response) => response.json())
      .then((result) => {
        setStockData(result);
      });
  }, [period, precision, startTime, endTime, stockData]);

  const handleTimeframeChange = (timeFrameString) => {
    let period;
    let precision;
    let timeSpan;
    switch (timeFrameString) {
      case "1-minute":
        period = 1;
        precision = "Minutes";
        timeSpan = "hour";
        break;
      case "5-minute":
        period = 5;
        precision = "Minutes";
        timeSpan = "hour";
        break;
      case "1-hour":
        period = 1;
        precision = "Hours";
        timeSpan = "day";
        break;
      case "1-week":
        period = 1;
        precision = "Weeks";
        timeSpan = "month";
        break;
      default:
    }
    setPeriod(period);
    setPrecision("Minutes");
    setstartTime(moment().subtract(1, "Weeks").format("MM/DD/YYYY%20HH:mm"));
    setEndTime(moment().format("MM/DD/YYYY%20HH:mm"));
  };

  return (
    <div className="tab-content">
      <TimeframeSelector handleTimeframeChange={handleTimeframeChange} />
      <div className="tab-component">
        {content === "overview" && <Overview data={stockData} />}
        {content === "history" && <History data={stockData} />}
      </div>
    </div>
  );
}

export default TabContent;
