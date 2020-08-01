import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {useSelector, useDispatch} from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {decrementBucketProduct, incrementBucketProduct} from "../../actions/Auth";
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [badge, setBadge] = useState(0);
    const [state, setState] = React.useState({
        open: false,
    });
    const {selectedProducts} = useSelector(state => state.auth);
    const [sumPrice, setSumPrice] = useState(0);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, open: open});
    };

    const increment = (product) => {
        if(product.count !== product.availableCount){
            dispatch(incrementBucketProduct(product));
        }
    };

    const decrement = (product) => {
        if(product.count > 1){
            dispatch(decrementBucketProduct(product));
        }
    };

    useEffect(() => {
        let badgeValue = 0;
        let price = 0;
        selectedProducts.forEach(item => {
            badgeValue += item.count;
            price += (parseInt(item.count) * parseFloat(item.price));
        });
        setBadge(badgeValue);
        setSumPrice(price.toFixed(2));
    }, [selectedProducts]);

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
        >
            <div className="bucket-product">

                {
                    selectedProducts.length > 0 ? <List>
                        {selectedProducts.map(item => (
                            <div key={item.id} className="bucket-product-item">
                                <div className="left">
                                    <img src={item.attachment} alt=""/>
                                </div>
                                <div className="right">
                                    <div className="info">
                                        <span>{parseFloat(item.price * item.count).toFixed(2)} AZN</span>
                                        <span>count: {item.count}</span>
                                    </div>
                                    <div className="bucket-counter">
                                        <span className="">
                                            <button disabled={item.count === 1} onClick={(e) => decrement(item)}>
                                                <RemoveIcon/>
                                            </button>
                                        </span>
                                        <span className="">
                                            <button disabled={item.count === item.availableCount} onClick={(e) => increment(item)}>
                                                <AddIcon/>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </List> : <h4 className="text-center mt-3">Bucket is empty</h4>
                }
                {
                    sumPrice != 0 ? (
                        <div>
                            <div>Sum: {sumPrice} AZN</div>
                            <NavLink to={"/app/payment"} className="order-products">
                                Order
                            </NavLink>
                        </div>
                    ) : null
                }

            </div>
            <Divider/>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <span className="app-bucket">
                        <ShoppingBasketIcon className="app-bucket" onClick={toggleDrawer(true)}/>
                        <span className="badge">{badge !== 0 ? badge : null}</span>
                </span>
                <Drawer anchor={'right'} open={state.open} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}