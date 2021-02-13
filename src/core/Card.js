import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeProductFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';
import './card.css';

const Card = ({product,
  addToCart=true,
  removeFromCart=false,
  setreload = f =>f, //function(f){return f}
  reload =undefined,
  width,
  showDesc=true
}) => {

    const [redirect, setredirect] = useState(false);    
    const cardTitle = product? product.name:'Title';
    const cardDescription = product? product.description:'Description';
    const cardPrice = product? product.price:'Price';

    const addProductToCart = ()=>{
       addItemToCart(product,()=> setredirect(true));
    }

    const getRedirectToCart = (redirect)=>{
      if(redirect){
        return <Redirect to='/user/cart' />
      }
    }
    const showAddToCart = (addToCart)=>{
        return(
            addToCart && (
                <button
                  onClick={addProductToCart}
                  className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                  Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart)=>{
        return (
            removeFromCart && (
                <button
                  onClick={() => {
                    removeProductFromCart(product._id,()=>{setreload(!reload)})}
                  }
                  className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                  Remove from cart
                </button>
            )
        )
    }

    return (
        <div className={`card text-white bg-dark border border-info ${width}`}>
          <div className="card-header lead">{cardTitle}</div>
          <div className="card-body">
            {getRedirectToCart(redirect)}
            <ImageHelper product={product} />
             { showDesc && <p className="lead bg-success font-weight-normal text-wrap">
              {(cardDescription?cardDescription:cardTitle)}
            </p>}
            <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice} </p>
            <div className="row">
              <div className="col-12">
                {showAddToCart(addToCart)}
              </div>
              <div className="col-12">
                {showRemoveFromCart(removeFromCart)}
              </div>
            </div>
          </div>
        </div>
      );
}

export default Card;
