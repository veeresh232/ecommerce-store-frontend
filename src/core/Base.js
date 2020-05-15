import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  descrption = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{descrption}</p>
        </div>
        <div className={className}>{children} </div>
      </div>
      <footer
        className="footer bg-dark mt-auto py-9"
        style={{ position: "absolute", bottom: "0px" }}
      >
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>In case of any queries,please reach out to us!</h4>
          <button className="btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted text-center">
            Amazing <span className="text-white">Tshirts for the tech</span>{" "}
            savy
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
