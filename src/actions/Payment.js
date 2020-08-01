import axios from "../util/Api";

import {
    CHANGE_PAYMENT_FORM,
    SET_PAYMENT_FORM_ERRORS,
    SET_PAYMENT_LOADING,
    REFRESH_PRODUCT_COUNT_STORE,
    SET_SECURITY_ERROR,
    PAYMENT_SUCCESS,
    REFRESH_MULTIPLE_PRODUCT_COUNT,
    RESET_PAID_PRODUCTS,
} from "../constants/ActionTypes";

export const changePaymentForm = (fieldObject) => {
    return {
        type: CHANGE_PAYMENT_FORM,
        payload: fieldObject
    }
};

export const setPaymentFormErrors = (errorObject) => {
    return {
        type: SET_PAYMENT_FORM_ERRORS,
        payload: errorObject
    }
};

export const checkPaymentSecurity = (paymentForm, paymentOneClick, _history) => (dispatch) => {
    dispatch({type: SET_PAYMENT_LOADING, payload: true});
    const {name_on_card, card_number, csv, expire_date} = paymentForm;
    axios.get(`payment-security?name_on_card=${name_on_card}&card_number=${card_number}&csv=${csv}&expire_date=${expire_date}`)
        .then(res => {
            if (res.status === 200) {
                if (res.data.length > 0) {
                    axios.put(`store/${paymentOneClick.storeId}`, {
                        count: paymentOneClick.availableCount - paymentOneClick.count,
                        product_id: paymentOneClick.id,
                    }).then(res => {
                        if (res.status === 200) {
                            dispatch({type: SET_PAYMENT_LOADING, payload: false});
                            dispatch({
                                type: REFRESH_PRODUCT_COUNT_STORE,
                                payload: paymentOneClick,
                            });
                            dispatch({type: PAYMENT_SUCCESS, payload: "The operation was successful",});
                            dispatch({type: RESET_PAID_PRODUCTS, payload: null});
                            _history.push('/app/dashboard');
                        }
                    });
                } else {
                    /*Fake 401 un authorization error*/
                    dispatch({
                        type: SET_SECURITY_ERROR, payload: {
                            error: true,
                            message: "Your credential was not provided this operation."
                        }
                    });
                    dispatch({type: SET_PAYMENT_LOADING, payload: false});
                }
            }
        })
        .catch(err => console.log(err));
};

export const orderSelectedProducts = (paymentObject, selectedProducts, _history) => (dispatch) => {
    dispatch({type: SET_PAYMENT_LOADING, payload: true});
    const {name_on_card, card_number, csv, expire_date} = paymentObject;
    axios.get(`payment-security?name_on_card=${name_on_card}&card_number=${card_number}&csv=${csv}&expire_date=${expire_date}`)
        .then(res => {
            if (res.status === 200) {
                dispatch({type: SET_PAYMENT_LOADING, payload: false});
                dispatch({
                    type: REFRESH_MULTIPLE_PRODUCT_COUNT,
                    payload: selectedProducts,
                });
                dispatch({type: PAYMENT_SUCCESS, payload: "The operation was successful",});
                dispatch({type: RESET_PAID_PRODUCTS, payload: null});
                _history.push('/app/dashboard');
            }
        })
        .catch(err => console.log(err))
};