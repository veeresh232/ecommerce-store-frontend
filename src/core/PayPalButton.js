import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const PayPalButton = () => {
    const client = {
        sandbox:    'YOUR-SANDBOX-APP-ID',
        production: 'YOUR-PRODUCTION-APP-ID',
    }   
    return (
        <PaypalExpressBtn client={client} currency={'INR'} total={1.00} />

    );
}

export default PayPalButton;
