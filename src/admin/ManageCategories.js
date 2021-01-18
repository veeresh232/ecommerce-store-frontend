import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { deleteCategory, getAllCategories } from './helper/adminapicall';

const ManageCategories =()=> {

    const {user,token} = isAuthenticated();
    const [state, setstate] = useState({categories:[]});
    let {categories} = state;
    const preLoad = ()=>{
        getAllCategories().then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setstate({categories:data})
            }
        })
    }
    useEffect(() => {
        preLoad();
    }, []);

    const deleteACategory = id =>{
        deleteCategory(id,user._id,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                preLoad();
            }
        })
    }


    return (
        <Base title="Welcome admin" description="Manage products here">
        <h2 className="mb-4">All products:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total {categories.length} Categories</h2>
            {categories.map((item,index) =>{
                return (
                    <div key ={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{item.name} </h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${item._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteACategory(item._id)}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
                )
            })}
            
          </div>
        </div>
      </Base>
    );
}
export default ManageCategories;