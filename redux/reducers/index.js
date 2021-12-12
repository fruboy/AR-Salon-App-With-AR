import {combineReducers} from 'redux';
import auth from './auth'
import salon from "./salon"

export default combineReducers ({
    auth,
    salon
})