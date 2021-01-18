import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {

  const [products, setproducts] = useState([]);
  const [error, seterror] = useState(false);

  const loadAllProducts =()=>{
    getAllProducts().then(data=>{
      if(data.error){
        seterror(data.error);
      }else{
        setproducts(data);
      }
    })
  }

  useEffect(() => {
    loadAllProducts();
  }, [])
  return (
    <Base title="Home Page" descrption="Welcome to the Tech Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white text-center">All Products</h1>
        <div className="row">
        {products.map((product,index)=>{
          return (
            <div key={index} className="col-4">
          <Card product={product} />
        </div>
          )
        })}
        </div>
        
        
      </div>
    </Base>
  );
};

export default Home;
