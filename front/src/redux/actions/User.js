const axios = require("axios");
import { GET_USER_DATA } from "../consts.js";

export function getUserData(payload){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/${payload}`);
        return dispatch({
            type: GET_USER_DATA,
            payload: json.data
        });
    };
};