import {
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_COUNTS, REFRESH_MULTIPLE_PRODUCT_COUNT,
    REFRESH_PRODUCT_COUNT_STORE,
} from "../constants/ActionTypes";

const INIT_STATE = {
    products: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS_BY_CATEGORY: {
            return {
                ...state,
                products: action.payload,
            }
        }
        case GET_PRODUCTS_COUNTS: {
            return {
                ...state,
                products: state.products.map(item => {
                    const product = action.payload.find(loopItem => loopItem.product_id === item.id);
                    if (product) {
                        item.count = product.count;
                        item.storeId = product.id;
                    } else {
                        item.count = 0;
                    }
                    return item;
                })
            }
        }
        case REFRESH_PRODUCT_COUNT_STORE: {
            return {
                ...state,
                products: state.products.map(item => {
                    if (item.id === action.payload.id) {
                        item.count = item.count - action.payload.count;
                    }
                    return item;
                }),
            }
        }
        case REFRESH_MULTIPLE_PRODUCT_COUNT: {
            return {
                ...state,
                products: state.products.map(item => {
                    const paidProduct = action.payload.find(p => p.id === item.id);
                    if (paidProduct) {
                        item.count = parseInt(item.count) - parseInt(paidProduct.count);
                    }
                    return item;
                })
            }
        }
        default:
            return state;
    }
}