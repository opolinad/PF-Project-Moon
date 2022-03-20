import {
    GET_USERS,
    POST_USERS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from "../consts.js";
import "regenerator-runtime/runtime";
import axios from 'axios';


// ACTIONS LOGIN
export const loginStart = () => ({
    type: LOGIN_START
})
export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
})
export const loginFailure = () => ({
    type: LOGIN_FAILURE
})
//ACTIONS LOGOUT
export const logoutStart = () => ({
    type: LOGOUT
})




export function getUsers() {
    return async function (dispatch) {
        const users = await axios.get('http://localhost:3001/api/users')
        return dispatch({
            type: GET_USERS,
            payload: users.data
        })
    }
}


export function postUsers(payload) {
    return async function (dispatch) {
        try {
            const user = await axios.post('http://localhost:3001/api/login', payload)
            alert("te logueaste bien")
            return dispatch({
                type: POST_USERS,
                payload: user.data
            })
        } catch (error) {
            alert(`error al loguearse: ${error}`)
        }

    }
}