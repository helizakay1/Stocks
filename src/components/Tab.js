import { useState } from "react";
import "../App.css";
import TabContent from "./TabContent";
import TabMenu from "./TabMenu";

function Tab() {
  const TAB_NAMES = [
    { id: "overview", label: "Overview" },
    { id: "history", label: "History" },
  ];
  const [activeTab, setActiveTab] = useState(TAB_NAMES[0].id);
  const onTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="tab">
      <TabMenu
        onTabClick={onTabClick}
        activeTab={activeTab}
        tabNames={TAB_NAMES}
      />
      <TabContent content={activeTab} />
    </div>
  );
}

export default Tab;
