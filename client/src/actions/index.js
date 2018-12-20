import axios from 'axios';
import {FETCH_USER, FETCH_FINCIALS, FETCH_FINCIALS_DETAILS} from './types';

// Fetch The curent user info 
export const fetchUser = () =>{
    return function(dispatch) {
        axios.get('/api/current_user').then(res => dispatch({
            type : FETCH_USER,
            payload: res.data
        }));
    }
}

// Fetch All the financial list for current logged in user
export const fetchFinalcialsList = () =>{
    console.log('ssss')
    return function (dispatch) {
         axios.get('/api/financials')
        .then(res=> {
            console.log("resss",res)
            dispatch({
                type : FETCH_FINCIALS,
                payload: res.data
            })
        })
    }
}

// Fetch the financial details when user click on the Edit actions
export const fetchFinalcialsDetails = (id) =>{
    console.log('wwww',id)
    return function (dispatch) {
         return axios.get('/api/financial?id='+id)
        .then(res=> {
            console.log("resss",res)
            dispatch({
                type : FETCH_FINCIALS_DETAILS,
                payload: res.data
            })
        })
    }
}

// Update the financial Details when user click on the next button from Update form
export const updateFinalcialsDetails = (id, body) =>{
    return function(dispatch) {
        return axios.post('/api/financial?id='+id,body)
            .then(res=> {
                console.log("submit",res)
                return res
            })
        }
}
