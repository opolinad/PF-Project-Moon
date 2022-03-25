import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardPost from "../../../CardPost/CardPost.jsx";
import { setFeedToLoading, resetPage } from "../../../ReduxToolkit/reducers/homeSlice.js";
import { searchingAction } from "../../../ReduxToolkit/reducers/navBarSlice.js";
import { getSearchResults } from "../../../ReduxToolkit/apiCalls/searchCall.js";
import FeedCss from "./Feed.module.css";
import { STARTING_STATUS, LOADING_0, NOT_FOUND_404, SUCCESS_200 } from "../../../ReduxToolkit/consts.js";
import { setDetailedLoading } from "../../../ReduxToolkit/reducers/postSlice.js";
/*
    Estoy asumiendo nombres, cambiar cuando lleguen las conexiones del back
    ademas, cuando se entra al detalle del CardPost y pasa a aser Post, se piden los comentarios!

    title: string,
    description: string,
    imgs: array de urls,
    shares:int,
    likes:int,
    saved:int,
    id:string,

    Este es un simple array de CardPosts, Agregar en parte 2:
    - llamada a action que pida los posts
    - funcionalidad de cargar mas posts (limitarnos con 20 a la vez o tal, como paginacion oculta)
*/

let flag_1Carga = true;

export default function Feed(props) {

    const dispatch = useDispatch();

    const query = useLocation();

    const feed = useSelector(state => state.feed);
    const user = useSelector(state=> state.user)
    const filterAndOrder = useSelector(state => state.filterAndOrder);
    const selectedCategory = useSelector(state => state.selectedCategory);
    const search = useSelector(state => state.search);
    const homePage = useSelector(state => state.homePage);

    useEffect(()=>
    {
        if(flag_1Carga)
        {
            if(!query.search && search!=="")dispatch(searchingAction(""));
            else if(query.search && search!==query.search.split("=")[1])dispatch(searchingAction(query.search.split("=")[1]));
            getSearchResults(user.currentUser?._id, dispatch, query.search.split("=")[1], selectedCategory, filterAndOrder.filter, filterAndOrder.ordering, 1);
        }
        else if(!flag_1Carga)
        {
            getSearchResults(user.currentUser?._id, dispatch, search, selectedCategory, filterAndOrder.filter, filterAndOrder.ordering, homePage.page);
        }
        flag_1Carga=false;
    },[filterAndOrder,search,selectedCategory]);
    let postsArr;
    if (feed.status === STARTING_STATUS || feed.status === LOADING_0) { postsArr = <p className={FeedCss.feedStatus}>Loading the Sweet Sweet Posts</p> }
    else if (feed.status === NOT_FOUND_404) { postsArr = <p className={FeedCss.feedStatus}>Error! No Post Found</p>; }
    else if (feed.status === SUCCESS_200) postsArr = feed.posts.map((element, index) =>{
        return <CardPost key={"post_" + element._id} title={element.title} description={element.description} imgs={element.images} shares={element.shares} likes={element.likes} id={element._id} userName={element.user.username} userPhoto={element.user.profilePhoto} userId={element.user._id} categories={element.categories} componentFather={"Feed"} /> })

    return (
     <div id={FeedCss.FeedContainer}>
         {postsArr}
     </div>
 )
}
