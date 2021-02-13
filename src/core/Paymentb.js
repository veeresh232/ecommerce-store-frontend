import DropIn from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { emptyCart } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper';
import { getBToken, processPayment } from './helper/paymentbhelper';

const Paymentb = ({products=[],setReload= f=> f,reload = undefined}) => {

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const [info, setinfo] = useState({
        loading: false,
        success:false,
        clientToken :null,
        error :'',
        instance:{}
    });
    const getToken = (userId,token)=>{
        getBToken(userId,token).then(response=>{
           // console.log('PaymentB info',response);
            if(response.error){
                setinfo({...info,error:response.error});
            }else{
                const clientToken = response.clientToken;
                setinfo({clientToken});
            }
        })
    }

    const showBTdropIn = ()=>{
        return (
            <div>
                {info.clientToken!==null && products.length>0 ?(
                    <div>
                        <DropIn 
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                                  <button className='btn btn-block btn-success' onClick={onPurchase}>Buy</button>
                    </div>
                ):(
                    <h3>Let's get started! Add something to your cart <Link to='/'>here</Link></h3>
                )}
            </div>
        )
    }

    const getAmount = ()=>{
        let amount = 0;
        products.map(item=>{
            amount += item.price;
        })
        return amount;
    }

    const onPurchase = ()=>{
        setinfo({loading:true});
        let nonce ;
        let getNonce = info.instance.requestPaymentMethod().then(data=>{
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount : getAmount()
            };
            processPayment(userId,token,paymentData).then(response=>{
                setinfo({...info,success:response.success,loading:false})
                console.log('payment success',response);
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }

                //create order api call
                createOrder(userId,token,orderData).then(response=>{
                    console.log(response);                    
                })
                emptyCart(()=>{
                    console.log('did we crash?');
                    setReload(!reload);
                });
                
                //TODO: force reload
                //TODO: create the order
            }).catch(err => {
                console.log('payment failed',err);
                setinfo({loading:false,error:err})
            })
        })
    }

    useEffect(() => {
        getToken(userId,token);
    }, [])
    return (
        <div>
            <h4>Total Cart Value: ${getAmount()} </h4>
            {showBTdropIn()}
        </div>
    );
}

export default Paymentb;
