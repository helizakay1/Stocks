import { useEffect, useState, useRef } from "react";
import "../App.css";
import TimeframeSelector from "./TimeframeSelector";
import Overview from "./Overview";
import History from "./History";
import moment from "moment";

function TabContent({ content }) {
  const [period, setPeriod] = useState(1);
  const [precision, setPrecision] = useState("Minutes");

  const [startTime, setstartTime] = useState(
    moment().subtract(1, "hour").format("MM/DD/YYYY%20HH:mm")
  );
  const [endTime, setEndTime] = useState(moment().format("MM/DD/YYYY%20HH:mm"));
  const [timeSpan, setTimeSpan] = useState("day");
  const [stockData, setStockData] = useState([]);
  const cache = useRef({});
  useEffect(() => {
    if (
      !cache.current[
        `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${startTime}&EndTime=${endTime}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
      ]
    ) {
      // API CALL
      fetch(
        `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${startTime}&EndTime=${endTime}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
      )
        .then((response) => response.json())
        .then((result) => {
          cache.current[
            `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${startTime}&EndTime=${endTime}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
          ] = result;
          setStockData(result);
        });
    } else {
      // GET FROM CACHE
      setStockData(
        cache.current[
          `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${startTime}&EndTime=${endTime}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
        ]
      );
    }
  }, [period, precision, startTime, endTime]);

  const handleTimeframeChange = (timeFrameString) => {
    let period;
    let precision;
    let timeSpan;
    period = 1;
    switch (timeFrameString) {
      case "1-minute":
        precision = "Minutes";
        timeSpan = "day";
        break;
      case "5-minute":
        precision = "Minutes";
        timeSpan = "day";
        break;
      case "1-hour":
        precision = "Hours";
        timeSpan = "week";
        break;
      default:
    }
    setPeriod(period);
    setPrecision(precision);
    setTimeSpan(timeSpan);
    setstartTime(moment().subtract(1, timeSpan).format("MM/DD/YYYY%20HH:mm"));
    setEndTime(moment().format("MM/DD/YYYY%20HH:mm"));
  };

  return (
    <div className="tab-content">
      <TimeframeSelector handleTimeframeChange={handleTimeframeChange} />
      <div className="tab-component">
        {content === "overview" && (
          <Overview data={stockData} timeSpan={timeSpan} />
        )}
        {content === "history" && <History data={stockData} />}
      </div>
    </div>
  );
}

export default TabContent;
