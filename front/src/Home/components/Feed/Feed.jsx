import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STARTING_STATUS } from "../../../redux/consts.js";
import CardPost from "../../../CardPost/CardPost.jsx";
import Actions from "../../../redux/actions/index.jsx";

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

const dummy=[];
export default function Feed(props)
{

    const dispatch = useDispatch();
    const feed = useSelector(state=>state.feed);
    const query = useLocation();//.search.split("=")[1]
    const filterAndOrder = useSelector(state=>state.filterAndOrder);
    const selectedCategory = useSelector(state=>state.selectedCategory);
    const search = useSelector(state=>state.search);
    const homePage = useSelector(state=>state.homePage)

    useEffect(()=>
    {
        if(feed.status===STARTING_STATUS)
        {
            dispatch(Actions.setFeedToLoading())
            if(query.search)
            {
                dispatch(Actions.feedDataBaseAction(query.search.split("=")[1]))
                dispatch(Actions.searchingAction(query.search.split("=")[1]))
            }
            else
            {
                dispatch(Actions.feedDataBaseAction())
                dispatch(Actions.searchingAction())
            }
        }
    },[]);

    useEffect(()=>
    {
        
    },[filterAndOrder,selectedCategory,search]);

    useEffect(()=>
    {
        
    },[homePage]);

    let postsArr;

    if(feed.status===STARTING_STATUS || feed.status===LOADING_0){postsArr="Loading OwO..."}
    else if(feed.status===NOT_FOUND_404){postsArr="error! OnO";}
    else if(feed.status===SUCCESS_200)postsArr=feed.posts.map((element,index)=>{<CardPost key={"post_"+element.id} title={element.title} description={element.description} imgs={element.imgs} shares={element.shares} likes={element.likes} saved={element.saved} id={element.id}/>})
    
    
    return(
        <div id="FeedContainer">{postsArr}</div>
    )
}