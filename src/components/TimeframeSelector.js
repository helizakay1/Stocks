import { useState } from "react";
import "../App.css";

function TimeframeSelector({ handleTimeframeChange }) {
  const [activeTimeframe, setActiveTimeframe] = useState("1-minute");
  return (
    <div className="timeframe-selector">
      <ul className="timeframe-list">
        <li
          className={`timeframe-item ${
            activeTimeframe === "1-minute" ? "timeframe-item--active" : ""
          }`}
          onClick={() => {
            setActiveTimeframe("1-minute");
            handleTimeframeChange("1-minute");
          }}
        >
          1 Minute
        </li>
        <li
          className={`timeframe-item ${
            activeTimeframe === "5-minute" ? "timeframe-item--active" : ""
          }`}
          onClick={() => {
            setActiveTimeframe("5-minute");
            handleTimeframeChange("5-minute");
          }}
        >
          5 Minutes
        </li>
        <li
          className={`timeframe-item ${
            activeTimeframe === "1-hour" ? "timeframe-item--active" : ""
          }`}
          onClick={() => {
            setActiveTimeframe("1-hour");
            handleTimeframeChange("1-hour");
          }}
        >
          1 Hour
        </li>
      </ul>
    </div>
  );
}

export default TimeframeSelector;
