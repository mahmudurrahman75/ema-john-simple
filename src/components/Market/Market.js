import React, { useState } from 'react';
import './Market.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

const Market = () => {
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);



    // load data from database by server ..... 

    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])


    // after return back in market page the value is stay 0 problem solve..... 

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);






        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    }, [])


        // console.log(products, productKeys);
        
        // if(products.length > 0){
        //     const previousCart = productKeys.map(existingKey =>{
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }


    // market cart NuN problem solve....

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !==toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // const count = sameProduct.length;
        
        // const newCart = [...cart, product];
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
        
    }

    return (
        <div className="twin-container">
            <div className="product-container">

                {
                    products.map(pd => <Product
                        key = {pd.key}
                        showAddToCart = {true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}></Product>)
                }
                
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to = "/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Market;