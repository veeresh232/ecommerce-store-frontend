import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

const Home = () => {
  return (
    <Base title="Home Page" descrption="Welcome to the Tech Tshirt Store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success"> Test </button>
        </div>
        <div className="col-4">
          <button className="btn btn-success"> Test </button>
        </div>
        <div className="col-4">
          <button className="btn btn-success"> Test </button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
