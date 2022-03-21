import "regenerator-runtime/runtime";
import axios from "axios";
import {
    userStart, userSuccess, userFailure
} from '../reducers/userSlice'

export const getUser = async (dispatch, id) => {
    dispatch(userStart())
    try {
        const res = await axios.get(`http://localhost:3001/api/users/${id}`)
        dispatch(userSuccess(res.data))
    } catch (error) {
        dispatch(userFailure())
    }
}