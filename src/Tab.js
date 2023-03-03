import { useState } from "react";
import "./App.css";

function Tab() {
  const [activeTab, setActiveTab] = useState("history");
  const onTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="tab">
      <ul className="tabs-list">
        <li
          onClick={() => onTabClick("overview")}
          className={`tab-item ${activeTab === "overview" ? "active-tab" : ""}`}
        >
          Overview
        </li>
        <li
          onClick={() => onTabClick("history")}
          className={`tab-item ${activeTab === "history" ? "active-tab" : ""}`}
        >
          History
        </li>
      </ul>
    </div>
  );
}

export default Tab;