import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Back
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setsuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
        alert("Failed to create category");
      } else {
        setError("");
        setsuccess(true);
        setName("");
        alert("Category Created Successfully!");
      }
    });
  };
  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category:</p>
          <input
            type="text"
            onChange={handleChange}
            value={name}
            className="form-control my-3"
            required
            autoFocus
            id=""
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <Base
        title="Create a category"
        descrption="Add a new category of Tshirts"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            {categoryForm()} {goBack()}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default AddCategory;
