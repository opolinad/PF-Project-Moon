import requestApiProtocol from "../../settings/requestMethod";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
} from "../reducers/loginReducers";

export const loginUser = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        let res;
        if (user.hasOwnProperty("platform")) {
            res = await requestApiProtocol.get("/login/session/", { withCredentials: true });
        } else {
            res = await requestApiProtocol.post(`/login/`, user)
            console.log(res)
        }
        if(res.data.admin){
            dispatch(loginSuccess(res.data))
        }else {
            dispatch(loginFailure())
        }
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logoutUser = (dispatch) => {
    dispatch(logoutStart())
}