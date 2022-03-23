import "regenerator-runtime/runtime";
import axios from "axios";

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