import {combineReducers} from 'redux';
import Auth from './Auth';
import ProductCategory from './ProductCategory';
import Products from './Products';
import Payment from "./Payment";
export default () => combineReducers({
    auth: Auth,
    productCategory: ProductCategory,
    products: Products,
    payment: Payment,
});