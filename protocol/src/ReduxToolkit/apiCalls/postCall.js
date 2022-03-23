import "regenerator-runtime/runtime";
import axios from "axios";

import { setDetailedPost } from "../reducers/postSlice";

export const getCategories = async (dispatch) => {
    var json = await axios.get('http://localhost:3001/api/categories')
    dispatch(json.data)
}

export const getDetailedPost = async (id,dispatch) => {
    const res = await axios.get(`http://localhost:3001/api/posts/${id}`);
    let out={};
    res.data.hasOwnProperty("_id") ? out=res.data : out={error:true};
    console.log(out);
    dispatch(setDetailedPost(out));
}

export const postPost = async (dispatch, userId, input, token) => {
    try {
        const res = await axios.post(`http://localhost:3001/api/posts/${userId}`, input, {
            headers: {
                token
            }
        })
        dispatch(postPost(res.data))
        console.log("SE ENVIO EL POST CORRECTAMENTE")
    } catch (error) {
        console.log(error)
    }

}