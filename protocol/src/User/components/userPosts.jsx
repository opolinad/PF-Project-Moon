import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STARTING_STATUS, LOADING_0 } from "../../redux/consts.js";
import CardPost from "../../CardPost/CardPost.jsx";
import Actions from "../../redux/actions/index.js";


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
    const {postsType}= useParams(); //CHEQUEAR COMO FUNCIONA PARA PROCESADO; DEBO SABER SI ES FAVORITES O POSTS

    const dispatch = useDispatch();
    const userData= useSelector(state=>state.userData);
    const userPage = useSelector(state=>state.userPage);
    const userFavoritePage = useSelector(state=>state.userFavoritePage);
    const userPosts = useSelector(state=>state.userPosts);
    const useFavorites = useSelector(state=>state.userFavorites);

    useEffect(()=>
    {
        if(userPage!==0)
        {
            if(postsType==="favorites"){dispatch(Actions.getNextUserfavorites(userData.id,userFavoritePage))}
            else {dispatch(Actions.getNextUserPosts(userData.id,userPage))}
        }
    },[userPage,userFavoritePage]);

    let postsArr;

    function handleNextPage()
    {
        postsType==="favorites" ? dispatch(Actions.nextPageFavoritesUser()) : dispatch(Actions.nextPageUser());
    }

    if(feed.status===STARTING_STATUS || feed.status===LOADING_0){postsArr="Loading OwO..."}
    else if(feed.status===NOT_FOUND_404){postsArr="error! OnO";}
    else if(feed.status===SUCCESS_200)postsArr=feed.posts.map((element,index)=>{<CardPost key={"post_"+element.id} title={element.title} description={element.description} imgs={element.imgs} shares={element.shares} likes={element.likes} saved={element.saved} id={element.id}/>})
    
    
    return(
        <div id="userPostsContainer">
            {postsArr}
            <button id="nextPageBut" onClick={handleNextPage} >Load More</button>
        </div>
        
    )
}