import React from 'react';
import Base from '../core/Base';
import PayPalButton from '../core/PayPalButton';

const Donate = () => {
    return (
        <Base title="Donate" descrption='Support me to make more awesome web applications!'>
            <PayPalButton/>
        </Base>
    );
}

export default Donate;
