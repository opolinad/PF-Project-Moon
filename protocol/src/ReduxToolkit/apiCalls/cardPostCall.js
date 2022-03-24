import axios from "axios";
import { uploadFeed } from "../reducers/homeSlice";

export const likeAction = async (dispatch, id, user, token, index) => {
    try {
        const res = await axios.put(`http://localhost:3001/api/posts/like/${id}`, user, {
            headers: {
                token
            }
        })
        dispatch(uploadFeed({data: res.data, index: index}))
    } catch (error) {
        console.log("cannot run likeAction", error)
    }
}

export const shareAction = async (dispatch, id, user, token) => {
    try {
        const res = await axios.post(`http://localhost:3001/api/posts/share/${id}`, user, {
            headers: {
                token
            }
        })
    } catch (error) {
        console.log("cannot run shareAction", error)
    }
}