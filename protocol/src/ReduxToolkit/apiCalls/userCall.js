import axios from "axios";
import { updateFollow, updateUnfollow } from "../reducers/loginSlice";
import {
    userStart,
    userSuccess,
    userFailure,
} from '../reducers/userSlice'


export const getUser = async (dispatch, id) => {
    dispatch(userStart())
    try {
        const res = await axios.get(`/api/users/${id}`)
        dispatch(userSuccess(res.data))
    } catch (error) {
        dispatch(userFailure())
    }
}

