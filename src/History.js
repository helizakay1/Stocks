import "./App.css";
import moment from "moment";

function History({ data }) {
  return (
    <div className="history">
      <table id="history-table">
        <tbody>
          <tr>
            <th>Date</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
          {data.map((dataLine, index) => {
            return (
              <tr key={index}>
                <td>{moment(dataLine.StartDate).format("MMM D, YYYY")}</td>
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
