import "./App.css";
import { BsTriangleFill } from "react-icons/bs";

function Header() {
  return (
    <div className="header">
      <div className="left-container">
        <p className="title">Apple Inc</p>
        <p className="last-updated">As of: Oct 20, 2021 08:21 UTC</p>
      </div>
      <div className="right-container">
        <p className="price">145.35</p>
        <BsTriangleFill className="triangle-icon" />
        <p className="change change-abolute">+1.5.01</p>
        <p className="change change-percent">(+2.53%)</p>
      </div>
    </div>
  );
}

export default Header;
