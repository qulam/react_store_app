import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeOneClickPaymentCount, setPaymentOneClick} from "../../actions/Auth";

const ProductView = (props) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const {closeFromParent, id, title, description, price, attachment, availableCount, storeId} = props;
    const [count, setCount] = useState(0);

    useEffect(() => {
        const viewerProduct = {
            id,
            count,
            availableCount,
            price,
            storeId,
        };

        dispatch(setPaymentOneClick(viewerProduct));
    }, []);

    const handleClose = () => {
        setOpen(false);
        closeFromParent();
        dispatch(setPaymentOneClick(null));
    };

    const decrement = () => {
        if (count !== 0) {
            const needleCount = count - 1;
            setCount(needleCount);
            dispatch(changeOneClickPaymentCount(needleCount));
        }
    };

    const increment = () => {
        if (count !== availableCount) {
            const needleCount = count + 1;
            setCount(needleCount);
            dispatch(changeOneClickPaymentCount(needleCount));
        }
    };

    return (
        <div>
            <Dialog scroll="body" fullWidth={true} maxWidth="md" open={open} onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                <DialogContent>
                    <div className="product-view-block row">
                        <div className="attachment col-5">
                            <img src={attachment} alt=""/>
                        </div>
                        <div className="content col-7">
                            <p>{description}</p>
                            <p className="price">{`${price} AZN`}</p>
                            <div className="product-view-counter">
                                <span className="counter-button">
                                    <button disabled={count === 0}>
                                    <RemoveIcon onClick={decrement}/>
                                    </button>
                                </span>
                                <span className="result">{count}</span>
                                <span className="counter-button">
                                    <button disabled={count === availableCount}>
                                    <AddIcon onClick={increment}/>
                                    </button>
                                </span>
                            </div>
                            <div className="product-view-actions">
                                <NavLink to={"/app/payment"}>
                                    <button disabled={count === 0}>Buy</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductView;