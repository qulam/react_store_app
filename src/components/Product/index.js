import React, {useState} from "react";
import ProductView from "../ProductView";
import {addProductToCard} from "../../actions/Auth";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';

const Product = (props) => {
    const dispatch = useDispatch();
    const {id, title, attachment, price, description, count, storeId} = props;
    const [open, setOpen] = useState(false);
    const {selectedProducts} = useSelector(state => state.auth);

    const openProductView = () => {
        setOpen(true);
    };

    const closeFromParent = () => {
        setOpen(false);
    };

    const addToCard = (product) => {
        dispatch(addProductToCard(product));
    };

    const productViewConfig = {
        id,
        storeId,
        title,
        attachment,
        price,
        description,
        closeFromParent,
        availableCount: count,
    };

    const isSelected = selectedProducts.find(item => item.id === id) !== undefined;

    return (
        <div className="col-6 product-item">
            <div className="item-helper">
                <div className="child" style={{
                    backgroundImage: `url(${attachment})`
                }}>
                </div>
                <div className="info">
                    <p>{title}</p>
                    <p>{`${price} AZN`}</p>
                    <div className="product-actions">
                        <button
                            disabled={isSelected}
                            onClick={(e) => addToCard({
                                id, title, attachment, price, description, availableCount: count, count: 1, storeId
                            })}
                            className={`add-to-card ${isSelected ? "disable" : ""}`}>
                            Add to card
                        </button>
                        <span className="see-more" onClick={() => openProductView()}>See more</span>
                    </div>
                </div>
            </div>
            {
                open ? <ProductView {...productViewConfig}/> : null
            }
        </div>
    )

};

Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    attachment: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
    storeId: PropTypes.number,
};

export default Product;