import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart
    // console.log(cart);
    // const total = cart.reduce((total,prd) => total + prd.price, 0)

        let total = 0;
        for(let i=0; i< cart.length; i++){
            const product = cart[i];
            console.log(product.price, product.quantity);
            total = (total + product.price * product.quantity || 1);
            debugger;
        }
        
        let shipping = 0;
        if (total > 35){
            shipping = 12.99;
        }
        else if (total > 15){
            shipping = 4.99;
        }
        else if (total > 0){
            shipping = 0;
        }

        const tex = (total /10).toFixed(2);
        const totalPrice = (total + shipping + Number(tex)).toFixed(2);

        const formatNumber = num => {
            const precision = num.toFixed(2);
            return Number(precision);
        }

    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items Ordered: {cart.length}</p>
            <p>product Price: {formatNumber(total)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>TEX: {tex}</p>
            <p>Total Price: {totalPrice}</p>
            <br/>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;