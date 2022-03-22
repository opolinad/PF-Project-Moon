import axios from 'axios'
import {
    registerStart, registerSuccess, registerFailure, registerClear
} from '../reducers/registerSlice'

//Call to API
export const registerUser = async (dispatch, user) => {
    dispatch(registerStart())
    try {
        const res = await axios.post(`http://localhost:3001/api/register`, user)
        dispatch(registerSuccess(res.data))
    } catch (error) {
        dispatch(registerFailure())
    }
}

//Call clear
export const clearRegister = (dispatch) => {
    dispatch(registerClear())
}