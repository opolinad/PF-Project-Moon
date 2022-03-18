import {POST_NEWUSER} from "../consts.js";
import "regenerator-runtime/runtime";
import axios from 'axios';

export function postNewUser(payload) {
    return async function(dispatch){
        const user = axios.post('http://localhost:3001/api/register', payload)
        return dispatch({
            type: POST_NEWUSER,
            payload: user.data
        })
    }
}

export function getCategories(payload) {
    return async function(dispatch){
        return dispatch({
            type: "",
            payload: ""
        })
    }
}