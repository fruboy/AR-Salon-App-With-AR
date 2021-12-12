import axios from 'axios';
import {FETCH_SUCCESS, FETCH_FAIL, FETCH_ACCEPTED_SUCCESS, FETCH_ACCEPTED_FAIL, FETCH_PREVIOUS_FAIL,FETCH_PREVIOUS_SUCCESS,FETCH_REVIEWS, FETCH_REVIEW_FAIL, ATTEMPT} from './types';
import { local_ip } from '../../consts/ip';

export const fetchSalons =()=> async dispatch=>{
    try {
        dispatch({
            type:ATTEMPT,
        }) 
        const res = await axios.get(`http://${local_ip}:5000/api/user/getSalons`);
        if(res){
            dispatch({
                type:FETCH_SUCCESS,
                payload: res.data
            
            })
        }
    } catch (err) {
        console.error(err);
        dispatch({
            type:FETCH_FAIL,
        
        })
    }
}


export const userAppointments = ()=> async dispatch => {
    try {
        dispatch({
            type:ATTEMPT,
        }) 
        const res = await axios.get(`http://${local_ip}:5000/api/user/userAppointments`);
        if(res){
            dispatch({
                type:FETCH_ACCEPTED_SUCCESS,
                payload: res.data
            
            })
        }
    }
    catch (err){
        console.error(err);
        dispatch({
            type:FETCH_ACCEPTED_FAIL,
        
        })
    }
}


export const userPrevAppointments = ()=> async dispatch => {
    try {
        dispatch({
            type:ATTEMPT,
        }) 
        const res = await axios.get(`http://${local_ip}:5000/api/user/userPreviousAppointments`);
        if(res){
            dispatch({
                type:FETCH_PREVIOUS_SUCCESS,
                payload: res.data
            
            })
        }
    }
    catch (err){
        console.error(err);
        dispatch({
            type:FETCH_PREVIOUS_FAIL,
        
        })
    }
}






