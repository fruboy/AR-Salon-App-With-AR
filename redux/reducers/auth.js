import {REGISTER_SUCCESS , REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_ATTEMPT, REGISTER_ATTEMPT, LOGOUT} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';



// setValue = async (token) => {
//     try {
//         await AsyncStorage.setItem('token', token)
//     }
//     catch (err){
//         console.log(err)
//     }
// }

const initialState = {
    token:null,
    isAuthenticated: null,
    loading:false,
    user:null,
    errors:null
}


export default function (state=initialState , action){
    const {type, payload} = action;
    console.log(action)

    switch(type){
        case LOGIN_SUCCESS:
            return{
                ...state,
                token:payload.token,
                isAuthenticated:true,
                loading: false
                
            }
            
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading: false,
                user:payload
            }
        case REGISTER_SUCCESS: 
            return {
                ...state,
                token:payload.token,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:  
        case AUTH_ERROR:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated:false,
                loading:false,
                token:null,
                errors:payload
            }
        case LOGIN_ATTEMPT:
        case REGISTER_ATTEMPT:
            return {
                ...state,
                loading:true,
                errors:null
            }
        case LOGOUT:
            return{
                state:initialState
            }
            
        default:
            return state
    }
}