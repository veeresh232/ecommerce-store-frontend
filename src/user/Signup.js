import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";
const Signup = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = user;

  const handleChange = (name) => (event) => {
    setuser({ ...user, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setuser({ ...user, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setuser({ ...user, error: data.error, success: false });
        } else {
          setuser({
            ...user,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => console.log("error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                type="text"
                onChange={handleChange("name")}
                className="form-control"
                value={name}
                required="true"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="email"
                onChange={handleChange("email")}
                className="form-control"
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                onChange={handleChange("password")}
                className="form-control"
                value={password}
                required
              />
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              className="btn btn-success btn-block"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Your account has been registered successfully! You can{" "}
        <Link to="/signin">Login here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  return (
    <Base title="Sign Up" descrption="Enter your details">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
