import {FETCH_SUCCESS, FETCH_FAIL, FETCH_ACCEPTED_FAIL, FETCH_ACCEPTED_SUCCESS, FETCH_PREVIOUS_SUCCESS, FETCH_PREVIOUS_FAIL, ATTEMPT} from "../actions/types";



// setValue = async (token) => {
//     try {
//         await AsyncStorage.setItem('token', token)
//     }
//     catch (err){
//         console.log(err)
//     }
// }

const initialState = {
    loading:false,
    salons:null,
    error:null,
    accepted:null,
    previous:null
}


export default function (state=initialState , action){
    const {type, payload} = action;
    console.log(action)

    switch(type){
        case FETCH_SUCCESS:
            return{
                ...state,
                salons:payload,
                loading: false
                
            }
            case FETCH_ACCEPTED_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    accepted:payload
                    
                }
            case FETCH_PREVIOUS_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    previous:payload
                    
                }
            
        case FETCH_FAIL:
        case FETCH_ACCEPTED_FAIL:   
        case FETCH_PREVIOUS_FAIL:
            return {
                ...state,
                loading:false,
                error:"Loading Fail"
            }
        case ATTEMPT:
            return{
                ...state,
                loading:true,
            }
            
        default:
            return state
    }
}