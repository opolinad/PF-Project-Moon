import axios from 'axios'
import {
    loginStart, loginSuccess, loginFailure, logoutStart
} from '../reducers/loginSlice'

//Call to API
export const loginUser = async (dispatch, user) => {
    dispatch(loginStart())
    console.log("loginUser");//Borrar
    try {
        let res;
        if (user.hasOwnProperty("platform")) {
            res = await axios.get(`/api/login/session/`);
        } else {
            res = await axios.post(`/api/login/`, user)
        }
        console.log();
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logoutUser = (dispatch) => {
    dispatch(logoutStart())
}
