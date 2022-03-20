import {
    POST_NEWUSER,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_CLEAR
} from "../consts.js";
import "regenerator-runtime/runtime";
import axios from 'axios';

//Actions register
export const registerStart = () => ({
    type: REGISTER_START
})
export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user
})

export const registerFailure = () => ({
    type: REGISTER_FAILURE
})

export const registerClear = () => ({
    type: REGISTER_CLEAR
})


export function postNewUser(payload) {
    return async function (dispatch) {
        const user = axios.post('http://localhost:3001/api/register', payload)
        return dispatch({
            type: POST_NEWUSER,
            payload: user.data
        })
    }
}

export function getCategories(payload) {
    return async function (dispatch) {
        return dispatch({
            type: "",
            payload: ""
        })
    }
}