import {} from "../constants/ActionTypes";
import {CHANGE_PAYMENT_FORM} from "../constants/ActionTypes";
import {SET_PAYMENT_FORM_ERRORS} from "../constants/ActionTypes";
import {SET_PAYMENT_LOADING} from "../constants/ActionTypes";
import {SET_SECURITY_ERROR} from "../constants/ActionTypes";
import {PAYMENT_SUCCESS} from "../constants/ActionTypes";
import {RESET_PAYMENT_FORM_ERRORS} from "../constants/ActionTypes";

const INIT_STATE = {
    form: {
        name_on_card: "",
        card_number: "",
        csv: "",
        expire_date: "",
    },
    formErrors: {
        name_on_card: {
            error: false,
            message: ""
        },
        card_number: {
            error: false,
            message: ""
        },
        csv: {
            error: false,
            message: ""
        },
        expire_date: {
            error: false,
            message: ""
        },
    },
    isLoading: false,
    securityError: {
        error: false,
        message: ""
    },
    successMessage: {
        success: false,
        message: ""
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_PAYMENT_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload,
                }
            }
        }
        case SET_PAYMENT_FORM_ERRORS: {
            return {
                ...state,
                formErrors: {
                    ...state.formErrors,
                    ...action.payload,
                }
            }
        }
        case SET_PAYMENT_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            }
        }
        case SET_SECURITY_ERROR: {
            return {
                ...state,
                securityError: action.payload,
                successMessage: {
                    success: false,
                    message: ""
                }
            }
        }
        case PAYMENT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                successMessage: {
                    success: true,
                    message: action.payload,
                },
                securityError: {
                    error: false,
                    message: ""
                },
                form: {
                    name_on_card: "",
                    card_number: "",
                    csv: "",
                    expire_date: "",
                },
            }
        }
        case RESET_PAYMENT_FORM_ERRORS: {
            return {
                ...state,
                form: {
                    name_on_card: "",
                    card_number: "",
                    csv: "",
                    expire_date: "",
                },
                formErrors: {
                    name_on_card: {
                        error: false,
                        message: ""
                    },
                    card_number: {
                        error: false,
                        message: ""
                    },
                    csv: {
                        error: false,
                        message: ""
                    },
                    expire_date: {
                        error: false,
                        message: ""
                    },
                },
            }
        }
        default:
            return state;
    }
}