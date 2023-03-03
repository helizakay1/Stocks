import { useEffect, useState } from "react";
import "./App.css";
import { BsTriangleFill } from "react-icons/bs";
import moment from "moment";

function Header() {
  const [data, setData] = useState({
    last: "",
  });
  useEffect(() => {
    let socket = new WebSocket("wss://wstest.fxempire.com?token=btctothemoon");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({ type: "SUBSCRIBE", instruments: ["s-aapl"] })
      );
    };
    socket.onclose = () => {
      socket.send(
        JSON.stringify({ type: "UNSUBSCRIBE", instruments: ["s-aapl"] })
      );
    };
    socket.onmessage = (e) => {
      setData(JSON.parse(e.data)["s-aapl"]);
    };
  }, []);
  return (
    <div className="header">
      <div className="left-container">
        <p className="title">Apple Inc</p>
        <p className="last-updated">
          {`As of: ${moment(data.lastUpdate)
            .utc()
            .format("MMM DD, YYYY HH:mm")} UTC`}
        </p>
      </div>
      <div className="right-container">
        <p className="price">{data?.last}</p>
        <BsTriangleFill className="triangle-icon" />
        <p className="change change-abolute">
          {+data?.change > 0 ? `+${data?.change}` : data?.change}
        </p>
        <p className="change change-percent">
          (
          {+data?.percentChange > 0
            ? `+${data?.percentChange}`
            : data?.percentChange}
          %)
        </p>
      </div>
    </div>
  );
}

export default Header;
