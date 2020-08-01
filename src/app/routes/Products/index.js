import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getProductsByCategory, getProductsCounts} from "../../../actions/Products";
import Product from "../../../components/Product";

const Products = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        const {id} = props.match.params;
        dispatch(getProductsByCategory(id));
        dispatch(getProductsCounts());
    }, []);

    return (
        <div className="container app-products-container">
            <div className="row">
                {
                    products.map(product => {
                        const config = {
                            id: product.id,
                            title: product.title,
                            description: product.description,
                            attachment: product.attachment,
                            price: product.price,
                            count: product.count,
                            storeId: product.storeId,
                        };
                        if(product.count !== 0){
                            return (
                                <Product key={product.id} {...config}/>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
};

export default Products;
