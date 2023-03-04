import { useState } from "react";
import "../App.css";
import moment from "moment";
import { BsTriangleFill } from "react-icons/bs";

function History({ data }) {
  const [sortKey, setSortKey] = useState("Date");
  const [sortDirection, setSortDirection] = useState("up");
  const TABLE_COLUMNS = ["Date", "High", "Low", "Open", "Close"];
  return (
    <div className="history">
      <table id="history-table">
        <tbody>
          <tr>
            {TABLE_COLUMNS.map((col, index) => {
              return (
                <th key={index}>
                  <div className="flex-row">
                    <span>{col}</span>
                    <span className="flex-col">
                      <BsTriangleFill
                        onClick={() => {
                          setSortDirection("up");
                          setSortKey(col);
                        }}
                        className={`clickable ${
                          sortKey === col && sortDirection === "up"
                            ? ""
                            : "grey"
                        }`}
                      />
                      <BsTriangleFill
                        onClick={() => {
                          setSortDirection("down");
                          setSortKey(col);
                        }}
                        className={`clickable reverse ${
                          sortKey === col && sortDirection === "down"
                            ? ""
                            : "grey"
                        }`}
                      />
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
          {data
            .sort((a, b) => {
              if (sortDirection === "up") {
                if (a[sortKey] < b[sortKey]) {
                  return -1;
                } else if (a[sortKey] > b[sortKey]) {
                  return 1;
                } else {
                  return 0;
                }
              } else {
                if (a[sortKey] > b[sortKey]) {
                  return -1;
                } else if (a[sortKey] < b[sortKey]) {
                  return 1;
                } else {
                  return 0;
                }
              }
            })
            .map((dataLine, index) => {
              return (
                <tr key={index}>
                  <td>
                    {moment(dataLine.Date, "YYYY/MM/DD HH:mm:ss").format(
                      "MMM D, YYYY"
                    )}
                  </td>
                  <td>{dataLine.High}</td>
                  <td>{dataLine.Low}</td>
                  <td>{dataLine.Open}</td>
                  <td>{dataLine.Close}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default History;
