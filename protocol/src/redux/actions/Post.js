import { GET_POST_DATA } from "../consts.js";
const axios = require("axios");

export function getPostData(username, postId){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/${username}/posts/${postId}`);
        return dispatch({
            type: GET_POST_DATA,
            payload: json.data
        });
    };
};