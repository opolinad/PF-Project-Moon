import "regenerator-runtime/runtime";
const axios = require("axios");
import { GET_USER_DATA, NEXT_FAVORITES_PAGE, NEXT_USER_FAVORITES, NEXT_USER_PAGE, NEXT_USER_POSTS, NOT_FOUND_404, RESET_USER_CARDS, RESET_USER_PAGES, SUCCESS_200 } from "../consts.js";

export function getUserData(payload){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/user/${payload}`);
        return dispatch({
            type: GET_USER_DATA,
            payload: json.data
        });
    };
};



export function nextPagePostsUser()
{
    return({type:NEXT_USER_PAGE});
};

export function nextPageFavoritesUser()
{
    return({type:NEXT_FAVORITES_PAGE});
};

export function resetPageUser()
{
    return({type:RESET_USER_PAGES});
}




export function resetUserCards()
{
    return({type:RESET_USER_CARDS});
}

export function getNextUserPosts(id,page)
{
    return async function(dispatch)
    {
        const resp = await axios.get(`http://localhost:3001/user/favorites?id=${id}&page=${page}`);
        let status=NOT_FOUND_404;
        if(resp.data)status=SUCCESS_200;
        return({type:NEXT_USER_POSTS,payload:{status,posts:resp.data}})
    }
}

export function getNextUserfavorites(id,page)
{
    return async function(dispatch)
    {
        const resp = await axios.get(`http://localhost:3001/user/favorites?id=${id}&page=${page}`);
        let status=NOT_FOUND_404;
        if(resp.data)status=SUCCESS_200;
        return({type:NEXT_USER_FAVORITES,payload:{status,posts:resp.data}})
    }
}