import {
    GET_PRODUCT_CATEGORIES,
} from "../constants/ActionTypes";

const INIT_STATE = {
    allCategories: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT_CATEGORIES: {
            return {
                ...state,
                allCategories: action.payload,
            }
        }
        default:
            return state;
    }
}