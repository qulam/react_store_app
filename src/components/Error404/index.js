import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {TOGGLE_BUCKET} from "../../constants/ActionTypes";

const Error404 = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        /*Disable bucket when component un mount.*/
        dispatch({type: TOGGLE_BUCKET, payload: false});

        return () => {
            /*Enable bucket when component un mount.*/
            dispatch({type: TOGGLE_BUCKET, payload: true});
        }
    }, []);

    return (
        <div className="container">
            <h1 className="text-center p-5 m-5">PAGE NOT FOUND</h1>
        </div>
    )
};

export default Error404;
