import { FEED_DATABASE, GET_CATEGORIES, GET_CATEGORIES_LOADING, SET_FEED_TO_LOADING } from "../consts";


export function setFeedToLoading()
{
    return({type:SET_FEED_TO_LOADING})
}

export function feedDataBaseAction(payload="")
{
    return async function (dispatch)
    {
        let q="";
        if(payload!=""){q="?search="+payload;}
        const resp = await axios.get("http://localhost:3001/feed"+q);
        //despues se procesa
        let status=NOT_FOUND_404;
        if(resp.data.length){status=SUCCESS_200}
        return({type:FEED_DATABASE,payload:{status,posts:resp.data}})
    }
}



export function setCategoriesToLoading()
{
    return({type:GET_CATEGORIES_LOADING})
}

export function categoriesDataBaseAction()
{
    return async function (dispatch)
    {
        const resp = await axios.get("http://localhost:3001/categories");
        //despues se procesa
        let status=NOT_FOUND_404;
        if(resp.data.length){status=SUCCESS_200}
        return({type:GET_CATEGORIES,payload:{status,posts:resp.data}})
    }
}