import React, { useState } from "react";
import Base from "../core/Base";

const Signin = () => {
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input type="password" className="form-control" required />
            </div>
            <button className="btn btn-success btn-block">Sign In</button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign In" descrption="Enter your credentials">
      {signInForm()}
    </Base>
  );
};

export default Signin;
