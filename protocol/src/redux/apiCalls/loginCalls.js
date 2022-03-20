import axios from 'axios'
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart
} from '../actions/LandingPage'

//Call to API
export const loginUser = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        let res;
        if(user.hasOwnProperty("platform")){
            res = await axios.get(`http://localhost:3001/api/login/session/`, {withCredentials:true});
        }else{
            res = await axios.post(`http://localhost:3001/api/login/`, user)
        }
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logoutUser = (dispatch) => {
    dispatch(logoutStart())
}