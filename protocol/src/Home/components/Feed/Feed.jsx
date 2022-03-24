import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardPost from "../../../CardPost/CardPost.jsx";
import { setFeedToLoading, resetPage } from "../../../ReduxToolkit/reducers/homeSlice.js";
import { searchingAction } from "../../../ReduxToolkit/reducers/navBarSlice.js";
import { getSearchResults } from "../../../ReduxToolkit/apiCalls/searchCall.js";
import FeedCss from "./Feed.module.css";
import { findNextPage } from "../../../ReduxToolkit/apiCalls/pageCall.js";
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

export default function Feed(props) {

    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed);
    const query = useLocation();//.search.split("=")[1]
    const filterAndOrder = useSelector(state => state.filterAndOrder);
    const selectedCategory = useSelector(state => state.selectedCategory);
    const search = useSelector(state => state.search);
    const homePage = useSelector(state => state.homePage);
    
    useEffect(() => {
        if (feed.status === STARTING_STATUS) {
            dispatch(setFeedToLoading())
            if (query.search) {
                getSearchResults(dispatch, query.search.split("=")[1]);
                dispatch(searchingAction(query.search.split("=")[1]));
            }
            else {
                getSearchResults(dispatch);
                dispatch(searchingAction(""));
            }
        }
        dispatch(setDetailedLoading())
    }, []);  //Primera vez que cargue feed, vera si hay un search para pedir search al back

    useEffect(() => {
        dispatch(setFeedToLoading());
        dispatch(resetPage());
    }, [filterAndOrder, selectedCategory, search]); //reseteo page cuando detecto cambios en filtro, categoria o search

    useEffect(() => {
        if (homePage.page === 0) getSearchResults(dispatch, search, selectedCategory, filterAndOrder.filter, filterAndOrder.ordering, 0); //cuando es primera pagina (cambios dee filter etc).
        else findNextPage(dispatch, search, selectedCategory, filterAndOrder.filter, filterAndOrder.ordering, homePage.page); //Cada cambio de page
    }, [homePage]);

    let postsArr;
    if (feed.status === STARTING_STATUS || feed.status === LOADING_0) { postsArr = <p className={FeedCss.feedStatus}>Loading the Sweet Sweet Posts</p> }
    else if (feed.status === NOT_FOUND_404) { postsArr = <p className={FeedCss.feedStatus}>Error! No Post Found</p>; }
    else if (feed.status === SUCCESS_200) postsArr = feed.posts.map((element, index) => <CardPost key={"post_" + element._id} categories={element.categories} title={element.title} description={element.description} imgs={element.images} shares={element.shares} likes={element.likes} id={element._id} /> )// se borra el saved


    return (
     <div id={FeedCss.FeedContainer}>
         {postsArr}
     </div>
 )
}
