import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadProductDataFromStorage } from "./helper/cartHelper";
import Paymentb from "./Paymentb";

const Cart = () => {

    const [products, setproducts] = useState([]);
    const [reload, setreload] = useState(false);
    useEffect(() => {
       setproducts(loadProductDataFromStorage);
    }, [reload]);
    const loadProductsInCart = (products)=>{
        return (
            <div >
                <h2>My Cart ({products.length})</h2>
                {products.map((product,index)=>{
                    return <div className='col-6' key={index}>
                        <Card 
                    key={index}
                    addToCart={false}
                    removeFromCart={true}
                    product={product}
                    setreload={setreload}
                    reload={reload}
                    showDesc={false}               
                    />
                    </div>
                })}
            </div>
        )
    }

    
    return (
        <Base title="My Cart" descrption={`${products.length} items`}>
          <div className="row text-center">
            <div className="col-6">
                <div className='row'>
                {products.length>0? loadProductsInCart(products):(
                <h3>Your Cart is Empty!</h3>
            )}
                    </div> 
            </div>
            <div className="col-6"><Paymentb products={products} setReload ={setreload} /></div>                    
          </div>
        </Base>
      );
}

export default Cart;
