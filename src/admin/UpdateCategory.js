import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {getCategory, updateCategory} from './helper/adminapicall';

const UpdateCategory = ({match}) => {
    const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);
  const { user, token } = isAuthenticated();

  useEffect(() => {
      preLoadCategory();
  }, [])

  const preLoadCategory = ()=>{
      getCategory(match.params.categoryId).then(data=>{
          if(data.error){
              setError(data.error);
          }else{
              setName(data.name);
          }
      })
  }
  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Back
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const successMsg = ()=>(
      
    <div className="alert alert-success mt-3" style={{display: success?"":"none"}}>
      <h4>Category updated Successfully!</h4>
    </div>
  )

  const errorMsg = ()=>(
    <div className="alert alert-danger mt-3" style={{display: error!=''?"":"none"}}>
      <h4>{error}!</h4>
    </div>
  )
  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setsuccess(false);
    updateCategory(match.params.categoryId,user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
        //alert("Failed to create category");
      } else {
        setError(false);
        setsuccess(true);
        setName(data.name);
        //alert("Category Created Successfully!");
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
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <Base
        title="Update category"
        descrption="Update existing categories"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
              {errorMsg()}
              {successMsg()}
            {categoryForm()} {goBack()}
          </div>
        </div>
      </Base>
    </div>
  );
}

export default UpdateCategory;
