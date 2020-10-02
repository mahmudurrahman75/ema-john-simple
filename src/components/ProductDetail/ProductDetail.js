import React from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';
import { useState } from 'react';

const ProductDetail = () => {

    const {productkey} = useParams();
    const [product, setProduct] = useState({});


    useEffect(() => {
        fetch('http://localhost:5000/products/'+ productkey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productkey])

    // const product = fakeData.find(pd => pd.key === productkey);
    console.log(product);

    return (
        <div>
            <h1>{productkey} product detail is coming soon......</h1>
            <Product showAddToCart={false} product = {product}></Product>
        </div>
    );
};

export default ProductDetail;