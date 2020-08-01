import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import Row from "react-bootstrap/Row";
import CircularProgress from "../../../components/CircularProgress";
import {Button, Container, Form} from "react-bootstrap";
import {
    changePaymentForm,
    checkPaymentSecurity,
    orderSelectedProducts,
    setPaymentFormErrors
} from "../../../actions/Payment";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Slide from "@material-ui/core/Slide/Slide";
import {TOGGLE_BUCKET} from "../../../constants/ActionTypes";

function TransitionUp(props) {
    return <Slide {...props} direction="up"/>;
}

const Payment = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {paymentOneClick, selectedProducts} = useSelector(state => state.auth);
    const {form, formErrors, isLoading, securityError, successMessage} = useSelector(state => state.payment);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        if (!paymentOneClick && selectedProducts.length === 0) {
            history.push('/app/dashboard');
        } else {
            if (paymentOneClick) {
                const total = (parseInt(paymentOneClick.count) * parseFloat(paymentOneClick.price)).toFixed(2);
                setTotalPrice(total);
            } else {
                let total = 0;
                selectedProducts.forEach(item => {
                    total += parseInt(item.count) * parseFloat(item.price)
                });
                setTotalPrice(total.toFixed(2));
            }
        }
    }, []);

    const handleChange = (e) => {
        dispatch(changePaymentForm({
            [e.target.name]: e.target.value
        }));
    };

    const allowSubmit = () => {
        const {name_on_card, card_number, csv, expire_date} = form;
        let formErrors = {
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
        };
        formErrors.name_on_card.error = name_on_card.trim() === "";
        formErrors.name_on_card.message = formErrors.name_on_card.error ? "Card name can not be blank" : "";

        formErrors.card_number.error = card_number.trim() === "";
        formErrors.card_number.message = formErrors.card_number.error ? "Card number can not be blank" : "";

        formErrors.csv.error = csv.trim() === "";
        formErrors.csv.message = formErrors.csv.error ? "CSV number can not be blank" : "";

        formErrors.expire_date.error = expire_date.trim() === "";
        formErrors.expire_date.message = formErrors.expire_date.error ? "Expire date can not be blank" : "";

        dispatch(setPaymentFormErrors(formErrors));
        return Object.values(formErrors).find(item => item.error === true) === undefined;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (allowSubmit()) {
            if (paymentOneClick) {
                dispatch(checkPaymentSecurity(form, paymentOneClick, history));
            } else if (selectedProducts.length > 0) {
                dispatch(orderSelectedProducts(form, selectedProducts, history));
            }
            return false;
        }
    };

    if (!paymentOneClick && selectedProducts.length === 0) {
        return <CircularProgress/>
    }

    return (
        <Container>
            <Row>
                <div className="app-login-component payment">
                    <h2 className="mb-2 app-signin-head">Payment Form
                        {
                            isLoading ? <CircularProgress/> : null
                        }
                    </h2>
                    <Form method="post" onSubmit={(e) => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name on Card</Form.Label>
                            <Form.Control name="name_on_card" onChange={(e) => handleChange(e)}
                                          value={form.name_on_card} type="text"
                                          placeholder="Name on card"/>
                            <Form.Text className="text-muted error">
                                {formErrors.name_on_card.message}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control name="card_number" onChange={(e) => handleChange(e)} value={form.card_number}
                                          type="text"
                                          placeholder="Card number"/>
                            <Form.Text className="text-muted error">
                                {formErrors.card_number.message}
                            </Form.Text>
                        </Form.Group>
                        <div className="form-groups">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>CSV</Form.Label>
                                <Form.Control name="csv" onChange={(e) => handleChange(e)} value={form.csv} type="text"
                                              placeholder="CSV"/>
                                <Form.Text className="text-muted error">
                                    {formErrors.csv.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Expiration</Form.Label>
                                <Form.Control name="expire_date" onChange={(e) => handleChange(e)}
                                              value={form.expire_date} type="text"
                                              placeholder="(YYYY/MM/DD)"/>
                                <Form.Text className="text-muted error">
                                    {formErrors.expire_date.message}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <p className="alert alert-info total-info">Total: {`${totalPrice} AZN`}</p>
                        <Button disabled={isLoading} variant="primary" type="submit">
                            Payment
                        </Button>
                    </Form>
                </div>
                {
                    securityError.error ? <Snackbar
                        open={true}
                        TransitionComponent={TransitionUp}
                        message={securityError.message}
                    /> : null
                }

                {
                    successMessage.success ? <Snackbar
                        open={true}
                        variant="success"
                        TransitionComponent={TransitionUp}
                        message={securityError.message}
                    /> : null
                }
            </Row>
        </Container>)
};

export default Payment;