import "regenerator-runtime/runtime";
import axios from "axios";
import {
    userStart, userSuccess, userFailure
} from '../reducers/userSlice'

export const getCategories = async (dispatch) => {
    var json = await axios.get('http://localhost:3001/api/categories')
    dispatch(json.data)
}

export const postPost = async (userId, dispatch) => {
    const res = await axios.post(`http://localhost:3001/api/posts/${userId}`, payload)
    dispatch(res.data)
}