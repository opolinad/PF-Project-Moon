import axios from 'axios'
import {
    loginStart, loginSuccess, loginFailure, logoutStart, loginBanned
} from '../reducers/loginSlice'

//Call to API
export const loginUser = async (dispatch, user) => {
    dispatch(loginStart())
    console.log("loginUser");
    try {
        let res;
        if (user.hasOwnProperty("platform")) {
            res = await axios.get(`/api/login/session/`);
        } else {
            res = await axios.post(`/api/login/`, user)
            
        }

        if(res.data.banned) dispatch(loginBanned())
        else dispatch(loginSuccess(res.data))

    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logoutUser = (dispatch) => {
    dispatch(logoutStart())
}
