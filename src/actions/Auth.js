import axios from '../util/Api';
import {
    CHANGE_LOGIN_FORM,
    SET_LOGIN_FORM_ERRORS,
    SET_LOADING,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    INIT_URL,
    FORCE_QUIT,
    SIGN_OUT,
    SET_PAYMENT_ONE_CLICK,
    CHANGE_ONE_CLICK_PAYMENT_COUNT,
    ADD_PRODUCT_TO_CARD,
    DECREMENT_BUCKET_PRODUCT,
    INCREMENT_BUCKET_PRODUCT,
} from "../constants/ActionTypes";


export const signin = ({username, password, history}) => (dispatch) => {
    dispatch({type: SET_LOADING, payload: true});
    axios.get(`users?username=${username}&&password=${password}`)
        .then(res => {
            if (res.status === 200) {
                if (res.data.length > 0) {
                    const authUser = res.data[0];
                    const access_token = JSON.stringify(authUser.access);
                    axios.defaults.headers.common['Authorization'] = "Bearer " + authUser.access;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    dispatch({
                        type: SIGNIN_SUCCESS, payload: {
                            access_token: authUser.access,
                            authUser: authUser,
                        }
                    });
                    history.push('/app/dashboard');
                } else {
                    /*Fake 401 un authorization error*/
                    dispatch({
                        type: SIGNIN_ERROR,
                        payload: {
                            error: true,
                            message: "invalid username or password."
                        }
                    });
                }
            }
        })
        .catch(err => console.log(err));
};

export const changeLoginForm = (fieldObject) => {
    return {type: CHANGE_LOGIN_FORM, payload: fieldObject};
};

export const setLoginFormErrors = (formErrors) => (dispatch) => {
    return dispatch({type: SET_LOGIN_FORM_ERRORS, payload: formErrors});
};

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const forceQuit = () => {
    return {
        type: FORCE_QUIT,
        payload: null,
    }
};

export const signOut = (history) => (dispatch) => {
    localStorage.clear();
    history.push('/signin');
    dispatch({
        type: SIGN_OUT,
        payload: null
    })
};

export const setPaymentOneClick = (productObject) => {
    return {
        type: SET_PAYMENT_ONE_CLICK,
        payload: productObject,
    }
};

export const changeOneClickPaymentCount = (count) => {
    return {
        type: CHANGE_ONE_CLICK_PAYMENT_COUNT,
        payload: count,
    }
};

export const addProductToCard = (product) => {
    return {
        type: ADD_PRODUCT_TO_CARD,
        payload: product,
    }
};

export const incrementBucketProduct = (product) => {
    return {
        type: INCREMENT_BUCKET_PRODUCT,
        payload: product
    }
};

export const decrementBucketProduct = (product) => {
    return {
        type: DECREMENT_BUCKET_PRODUCT,
        payload: product
    }
};