import {
    CHANGE_LOGIN_FORM,
    GET_USER,
    SET_LOADING,
    SET_LOGIN_FORM_ERRORS,
    INIT_URL, SIGNIN_SUCCESS,
    FORCE_QUIT,
    SIGNIN_ERROR,
    SIGN_OUT,
    SET_PAYMENT_ONE_CLICK,
    CHANGE_ONE_CLICK_PAYMENT_COUNT,
    ADD_PRODUCT_TO_CARD, INCREMENT_BUCKET_PRODUCT, DECREMENT_BUCKET_PRODUCT, RESET_PAID_PRODUCTS,
} from "../constants/ActionTypes";

const INIT_STATE = {
    initUrl: "",
    username: "",
    password: "",
    isLoading: false,
    loginError: {
        error: false,
        message: ""
    },
    formErrors: {
        username: {
            error: false,
            message: ""
        },
        password: {
            error: false,
            message: ""
        }
    },
    selectedProducts: [],
    paymentOneClick: null,
    authUser: JSON.parse(localStorage.getItem('authUser')),
    access_token: JSON.parse(localStorage.getItem('access_token')),
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case INIT_URL: {
            return {...state, initURL: action.payload};
        }
        case GET_USER: {
            return {
                ...state,
                authUser: action.payload
            };
        }
        case CHANGE_LOGIN_FORM: {
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        }
        case SET_LOGIN_FORM_ERRORS: {
            return {
                ...state,
                formErrors: {
                    ...state.formErrors,
                    ...action.payload,
                },
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case SIGNIN_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                loginError: {
                    error: false,
                    message: ""
                }
            }
        }
        case FORCE_QUIT: {
            return {
                ...state,
                access_token: null,
                authUser: null,
                isLoading: false,
            }
        }
        case SIGN_OUT: {
            return {
                ...state,
                access_token: null,
                authUser: null,
                isLoading: false,
            }
        }
        case SIGNIN_ERROR: {
            return {
                ...state,
                loginError: {
                    ...state.loginError,
                    ...action.payload,
                },
                isLoading: false,
                authUser: null,
                access_token: null,
            }
        }
        case SET_PAYMENT_ONE_CLICK: {
            return {
                ...state,
                paymentOneClick: action.payload
            }
        }
        case CHANGE_ONE_CLICK_PAYMENT_COUNT: {
            return {
                ...state,
                paymentOneClick: {
                    ...state.paymentOneClick,
                    count: action.payload,
                }
            }
        }
        case ADD_PRODUCT_TO_CARD: {
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, action.payload]
            }
        }
        case INCREMENT_BUCKET_PRODUCT: {
            return {
                ...state,
                selectedProducts: state.selectedProducts.map(item => {
                    if(item.id === action.payload.id){
                        item.count = item.count + 1;
                    }
                    return item;
                })
            }
        }
        case DECREMENT_BUCKET_PRODUCT: {
            return {
                ...state,
                selectedProducts: state.selectedProducts.map(item => {
                    if(item.id === action.payload.id){
                        item.count = item.count - 1;
                    }
                    return item;
                })
            }
        }
        case RESET_PAID_PRODUCTS: {
            return {
                ...state,
                selectedProducts: [],
                paymentOneClick: null,
            }
        }
        default:
            return state;
    }
}
