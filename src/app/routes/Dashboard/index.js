import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import ProductCategory from "../../../components/ProductCategory";
import {getProductCategories} from "../../../actions/ProductCategory";

const Dashboard = () => {
    const dispatch = useDispatch();
    const allCategories = useSelector(state => state.productCategory.allCategories);

    useEffect(() => {
        dispatch(getProductCategories());
    }, []);

    return (
        <div className="container app-dashboard">
            <h2 className="section-title">Product Categories</h2>
            <div className="row">
                {
                    allCategories.map(category => {
                        const config = {
                            id: category.id,
                            title: category.title,
                            attachment: category.attachment,
                        };
                        return (
                          <ProductCategory key={category.id} {...config} />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Dashboard;