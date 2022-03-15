import React from "react";
import CardPost from "../../../CardPost/CatdPost.jsx";
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
    let postsArr=dummy.map((element,index)=>
    {
        <CardPost key={"post_"+element.id} title={element.title} description={element.description} imgs={element.imgs} shares={element.shares} likes={element.likes} saved={element.saved} id={element.id}/>
    })
    return(
        <div id="FeedContainer">{postsArr}</div>
    )
}