import axios from "../util/Api";
import {GET_PRODUCT_CATEGORIES} from "../constants/ActionTypes";

export const getProductCategories = () => (dispatch) => {
    axios('product-categories')
        .then(res => {
            if(res.status === 200){
                dispatch({type: GET_PRODUCT_CATEGORIES, payload: res.data});
            }
        })
        .catch(err => console.log(err));
};