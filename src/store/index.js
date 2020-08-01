import {applyMiddleware, compose, createStore} from 'redux';
import reducers from '../reducers/index';
import {createBrowserHistory} from 'history'
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'auth',
        'productCategory',
        'products',
        'payment',
    ]
};

const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, reducers(history));

const middlewares = [thunk,];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const store = createStore(persistedReducer, initialState,
        composeEnhancers(applyMiddleware(...middlewares)));
    const persistor = persistStore(store);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return {store, persistor};
}
export {history};