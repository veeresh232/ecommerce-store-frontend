import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setvalues] = useState({
    email: "veeresh232@gmail.com",
    password: "password123",
    error: false,
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const showLoading = () => {
    return loading && <div className="alert alert-info">Loading...</div>;
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setvalues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setvalues({ ...values, didRedirect: true, loading: false });
          });
        }
      })
      .catch(() => {
        console.log("sign in request failed");
        setvalues({
          ...values,
          loading: false,
          error: "Server is not responding",
        });
      });
  };
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-success btn-block"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Base title="Sign In" descrption="Enter your credentials">
      {showLoading()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
