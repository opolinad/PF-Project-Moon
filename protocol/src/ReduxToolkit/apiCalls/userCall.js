import "regenerator-runtime/runtime";
import axios from "axios";
import {
    userStart, userSuccess, userFailure
} from '../reducers/userSlice'

export const getUser = async (dispatch, id) => {
    console.log("action")
    dispatch(userStart())
    try {
        const res = await axios.get(`http://localhost:3001/api/users/${id}`)
        console.log("data",res.data)
        dispatch(userSuccess(res.data))
    } catch (error) {
        dispatch(userFailure())
    }
}