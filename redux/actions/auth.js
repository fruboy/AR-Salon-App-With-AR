import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_ATTEMPT,  USER_LOADED, AUTH_ERROR , LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_ATTEMPT} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from "../../util/setAuthToken"
import {local_ip} from "../../consts/ip"




// export const loadUser =  () => async dispatch =>{

//     try {
//         AsyncStorage.getItem("token").then((value) => {
//             setAuthToken(value)
//         })
        
//         const res = await axios.get("http://192.168.0.108:5000/api/user");
//         console.log(res)
        
//         dispatch({
//             type:USER_LOADED,
//             payload:res.data
//         }) 
    
    
    
//     }
//     catch(err){
//         console.log(err)
//         dispatch({
//             type:AUTH_ERROR
//         })
//     }

// }


// export const register =  (name, email, password, phone)=> async dispatch=>{

//     const user= {
      
//         name:name,
//         email:email,
//         password:password,
//         number:phone
        
//    }
//    console.log("From", user)



//     axios.request({
//         method: 'POST',
//         url: 'http://192.168.0.108:5000/api/user/register',
//         data:user
      
//       }).then((res)=>{ 
//           console.log(res);
//           await AsyncStorage.setItem('token', res.data.token)
//           dispatch({
//               type: REGISTER_SUCCESS,
//               payload: res.data
//           })
//         console.log("api call sucessfull",res.data.token);
//         dispatch(loadUser())
      
//       }).catch((err)=>{
//           dispatch({
//               type: REGISTER_FAIL
//           })
//         console.log("api call unsucessfull",err);
      
        
//       })
    
// } 




// export const login = (email, password)=> async (dispatch) =>{

//     const user ={email,password}


//     axios.request({
//         method: 'POST',
//         url: 'http://192.168.0.108:5000/api/user/login',
//         data:user
      
//       }).then((res)=>{ 
//         console.log(res);
//         await AsyncStorage.setItem('token', res.data.token)
//         dispatch({
//               type:LOGIN_SUCCESS,
//               payload: res.data
//           }) 
//         dispatch(loadUser())
//         console.log("api call sucessfull",res.data.token);
      
//       }).catch((err)=>{
//           dispatch({
//               type: LOGIN_FAIL
//           })
//         console.log("api call unsucessfull",err);
      
        
//       })
   

    
// } 



export const loadUser = () => async dispatch =>{

    try {
   
        const value = await AsyncStorage.getItem('token')
        setAuthToken(value)
        const res = await axios.get(`http://${local_ip}:5000/api/user`);
        console.log(res)
        
        dispatch({
            type:USER_LOADED,
            payload:res.data
        }) 
    
    
    
    }
    catch(err){
        console.log(err)
        dispatch({
            type:AUTH_ERROR
        })
    }

}


export const register =  (name, email, password, phone, city)=> async dispatch=>{

    const user= {
      
        name:name,
        email:email,
        password:password,
        number:phone,
        city:city
        
   }
   console.log("From", user)
   
   try {
    dispatch({
        type:REGISTER_ATTEMPT,
    }) 
    
    const res = await axios.post(`http://${local_ip}:5000/api/user/register`, user);
    await AsyncStorage.setItem('token', res.data.token)
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
    console.log("api call sucessfull",res.data.token);
    dispatch(loadUser())
   }
   catch(err){
    dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors
    })
    console.log("api call unsucessfull",err.response.data.errors);
   }
} 




export const login = (email, password)=> async (dispatch) =>{

    const user ={email,password}

    console.log("From", user)

    try {
        dispatch({
            type:LOGIN_ATTEMPT,
        }) 
        const res = await axios.post(`http://${local_ip}:5000/api/user/login`, user);
        await AsyncStorage.setItem('token', res.data.token)
       
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        }) 
        console.log("api call sucessfull",res.data.token);
        dispatch(loadUser())
       }
       catch(err){
        console.log("api call unsucessfull",err.response.data.errors);
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.errors
        })
    
       }

   

    
} 