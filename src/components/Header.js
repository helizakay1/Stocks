import { useEffect, useState, useRef } from "react";
import "../App.css";
import { BsTriangleFill } from "react-icons/bs";
import moment from "moment";

function Header() {
  const PAGE_TITLE = "Apple Inc";
  const [data, setData] = useState({
    last: "",
  });
  const ws = useRef(null); // web socket ref
  useEffect(() => {
    if (!ws.current) {
      let socket = new WebSocket(
        "wss://wstest.fxempire.com?token=btctothemoon"
      );

      socket.onopen = () => {
        socket.send(
          JSON.stringify({ type: "SUBSCRIBE", instruments: ["s-aapl"] })
        );
      };
      socket.onmessage = (e) => {
        setData(JSON.parse(e.data)["s-aapl"]);
      };

      //Unsubscribe and close socket when leaving the page
      window.onbeforeunload = () => {
        socket.send(
          JSON.stringify({ type: "UNSUBSCRIBE", instruments: ["s-aapl"] })
        );
        socket.close();
      };

      ws.current = socket;
    }
  }, []);

  return (
    <div className="header">
      <div className="left-container">
        <h1 className="title">{PAGE_TITLE}</h1>
        <h3 className="last-updated">
          {`As of: ${moment(data.lastUpdate)
            .utc()
            .format("MMM DD, YYYY HH:mm")} UTC`}
        </h3>
      </div>
      <div className="right-container">
        <h1 className="price">{data?.last}</h1>
        <BsTriangleFill
          className={`triangle-icon ${+data?.change < 0 ? "reverse red" : ""}`}
        />
        <h2
          className={`change change-abolute ${+data?.change < 0 ? "red" : ""}`}
        >
          {+data?.change > 0 ? `+${data?.change}` : data?.change}
        </h2>
        <h2
          className={`change change-percent ${+data?.change < 0 ? "red" : ""}`}
        >
          (
          {+data?.percentChange > 0
            ? `+${data?.percentChange}`
            : data?.percentChange}
          %)
        </h2>
      </div>
    </div>
  );
}

export default Header;
