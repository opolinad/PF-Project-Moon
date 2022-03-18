const axios = require("axios");
import { GET_POST_DATA } from "../consts.js";

export function getUserData(username, postId){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/${username}/posts/${postId}`);
        return dispatch({
            type: GET_POST_DATA,
            payload: json.data
        });
    };
};