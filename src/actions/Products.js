import axios from "../util/Api";

import {
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_COUNTS,
} from "../constants/ActionTypes";

export const getProductsByCategory = (categoryId, callback = () => {

}) => (dispatch) => {
    // console.log("####CASE 1");
    axios.get(`/products?category_id=${categoryId}`)
        .then(res => {
            if (res.status === 200) {
                // console.log("####CASE 2");
                callback();
                dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: res.data});
            }
        })
        .catch(err => console.log(err));
};

export const getProductsCounts = () => (dispatch) => {
    // console.log("####CASE 3");
    axios.get('store')
        .then(res => {
            if(res.status === 200){
                dispatch({type: GET_PRODUCTS_COUNTS, payload: res.data});
            }
        })
        .catch(err => console.log(err))
};