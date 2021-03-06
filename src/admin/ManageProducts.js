import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getAllProducts } from './helper/adminapicall';

const ManageProducts = () => {

    const [products, setProducts] = useState({productss:[],error:''});

    const {user,token} = isAuthenticated();
    const {productss,error} = products;
    const preLoad = ()=>{
        getAllProducts().then(data =>{
            if(data.error){
                setProducts({...products,error:data.error});
            }else{
                setProducts({...products,productss:data});
            }
        })
    }

    const deleteAProduct = (productId)=>{
        deleteProduct(productId,user._id,token).then(data=>{
            if(data.error){
                setProducts({...products,error:data.error})
            }else{
                preLoad();
            }
        })
    }

    useEffect(()=>{
        preLoad();
    },[]);
    return (
        <Base title="Welcome admin" description="Manage products here">
        <h2 className="mb-4">All products:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total {productss.length} products</h2>
            {productss.map((item,index) =>{
                return (
                    <div key ={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{item.name} </h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${item._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteAProduct(item._id)}} className="btn btn-danger">
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

export default ManageProducts;
