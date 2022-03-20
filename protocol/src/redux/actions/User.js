import "regenerator-runtime/runtime";
import axios from "axios";
import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../consts.js";

const getUserStart = () => ({
  type: GET_USER_START,
});
const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});
const getUserFailure = () => ({
  type: GET_USER_FAILURE,
});

export function getUser (id) {
    return async (dispatch) => {
        console.log("getUser()")
        dispatch(getUserStart())
        try {
            const res = await axios.get(`http://localhost:3001/api/users/${id}`)
            console.log("res.data", res.data)
            dispatch(getUserSuccess(res.data))
        } catch (error) {
            dispatch(getUserFailure())
        }
    }
}

/* export function getUserData(payload){
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
} */
