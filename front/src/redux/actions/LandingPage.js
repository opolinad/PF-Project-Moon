import * as consts from "../consts.js";
import "regenerator-runtime/runtime";
import axios from 'axios';


export function getUsers() {
    return async function(dispatch){
        const users = axios.get('http://localhost:3001/api/login')
        return dispatch({
            type: consts.GET_USERS,
            payload: users.data
        })
    }
}

export function postUsers(payload) {
    return async function(dispatch){
        const user = axios.post('http://localhost:3001/api/login', payload)
        return dispatch({
            type: consts.POST_USERS,
            payload: user.data
        })
    }
}

