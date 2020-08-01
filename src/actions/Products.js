import axios from "../util/Api";

import {
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_COUNTS,
} from "../constants/ActionTypes";

export const getProductsByCategory = (categoryId) => (dispatch) => {
    axios.get(`/products?category_id=${categoryId}`)
        .then(res => {
            if (res.status === 200) {
                dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: res.data});
            }
        })
        .catch(err => console.log(err));
};

export const getProductsCounts = () => (dispatch) => {
    axios.get('store')
        .then(res => {
            if(res.status === 200){
                dispatch({type: GET_PRODUCTS_COUNTS, payload: res.data});
            }
        })
        .catch(err => console.log(err))
};