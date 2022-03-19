import { FEED_DATABASE, FEED_NEXT_PAGE_DATABASE, GET_CATEGORIES, GET_CATEGORIES_LOADING, NEXT_PAGE, NOT_FOUND_404, RESET_OPTIONS, RESET_PAGE, RESET_SELECTED_CATEGORY, SEARCH_RESET_OPTIONS_CATEGORY, SET_FEED_TO_LOADING, SET_FILTER, SET_ORDERING, SET_SELECTED_CATEGORY } from "../consts";
import "regenerator-runtime/runtime";
import axios from "axios";
import { SUCCESS_200 } from "../consts.js";

/* actions of feed */

export function resetForSearch()
{
    return({type:SEARCH_RESET_OPTIONS_CATEGORY})
}

export function setFeedToLoading()
{
    return({type:SET_FEED_TO_LOADING})
}

export function feedDataBaseAction(search="",selectedCategory,filter,order)
{
    return async function (dispatch)
    {
        let q="";
        let page = 0;
        
        if(search!=""){q="?search="+search;}
        if(selectedCategory!=""){q=q+"&category="+selectedCategory;}
        if(filter!=""){q=q+"&filter="+filter;}
        if(order!=""){q=q+"&order="+order;}
        q=q+"&page="+page;

        const resp = await axios.get("http://localhost:3001/feed"+q);
        //despues se procesa
        let status=NOT_FOUND_404;
        if(resp.data.length){status=SUCCESS_200}
        return({type:FEED_DATABASE,payload:{status,posts:resp.data}})
    }
}

export function feedNextPageAction(search="",selectedCategory="",filter="",order="",page=0)
{
    return async function (dispatch)
    {
        let q="";

        if(search!=""){q="?search="+search;}
        if(selectedCategory!=""){q=q+"&category="+selectedCategory;}
        if(filter!=""){q=q+"&filter="+filter;}
        if(order!=""){q=q+"&order="+order;}
        q=q+"&page="+page;

        const resp = await axios.get("http://localhost:3001/feed"+q);
        //despues se procesa
        let status=NOT_FOUND_404;
        if(resp.data.length){status=SUCCESS_200}
        return({type:FEED_NEXT_PAGE_DATABASE,payload:{status,posts:resp.data}})
    }
}

/* actions of feed */



/* categories actions */

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

export function selectedCategoryAction(payload)
{
    return ({type:SET_SELECTED_CATEGORY,payload})
}

export function resetSelectedCategory()
{
    return({type:RESET_SELECTED_CATEGORY})
}

/* categories actions */



/* options actions */

export function changeOrdering(payload)
{
    return({type:SET_ORDERING,payload})
}

export function changeFilter(payload)
{
    return({type:SET_FILTER,payload})
}

export function resetOptions()
{
    return({type:RESET_OPTIONS})
}

/* options actions */



/* page actions */

export function nextPageAction()
{
    return({type:NEXT_PAGE})
}

export function resetPageAction()
{
    return({type:RESET_PAGE})
}

/* page actions */