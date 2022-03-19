import axios from 'axios'
import {
    loginStart,
    loginSuccess,
    loginFailure
} from '../actions/LandingPage'

//Call to API
export const loginUser = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(`http://localhost:3001/api/login/`, user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}