import {createStore , applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import rootReducer from "./reducers"

// let composeEnhancer = compose;

// if(__DEV__){
//     composeEnhancer=   window.__REDUX_DEVTOOLS_EXTENSION__|| compose
// }


const initialState={};

const middleware=[thunk]

// const store = createStore(rootReducer,  composeEnhancer(applyMiddleware(thunk)));

const store = createStore(rootReducer, initialState , composeWithDevTools(applyMiddleware(...middleware)));

export default store


