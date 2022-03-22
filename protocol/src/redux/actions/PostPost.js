import { POST_POST, GET_CAT } from "../consts.js";
import "regenerator-runtime/runtime";
import axios from 'axios';


export function postPost(userId, payload){
    return async function(dispatch) {
        const res = await axios.post(`http://localhost:3001/api/posts/${userId}`, payload)
        dispatch({ 
            type: POST_POST, 
            payload: res.data 
        })
    }
}

export function getCategories(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/categories')
        return dispatch({
            type: GET_CAT,
            payload: json.data
        })
    }
}

