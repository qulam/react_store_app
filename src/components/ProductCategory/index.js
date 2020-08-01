import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

const ProductCategory = (props) => {
    const {id, attachment, title} = props;
    return (
        <div className="col-sm-4 col-xs-1 category-item">
            <h4>{title}</h4>
            <div className="item-helper">
                <NavLink to={`/app/products/${title}/${id}`}>
                    <div className="child" style={{
                        backgroundImage: `url(${attachment})`
                    }}>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

ProductCategory.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    attachment: PropTypes.string.isRequired,
};

export default ProductCategory;
