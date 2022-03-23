import React from "react";
import Cardpost from "./CardPost.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {faHeart,faShareSquare, faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
/*
    title: string,
    description: string,
    imgs: array de urls,
    shares:int,
    likes:int,
    favorite:int,
    id:string,
*/
//let props={shared:false,liked:false,userName:"Username",title:"Title",postId:0,userId:0,userPhoto:"./img/project_moon_logo.jpeg",favorite:true,likes:3,shares:3,description:"owowowowwowowowowowowo",imgs:["./img/project_moon_logo.jpeg","./img/project_moon_logo.jpeg"]}
//Likes y shares: son arrays de ids, tengo que usar .length para la cantidad y buscar la id de user para saber si le dio like xd.
export default function CardPost(props)
{
    const user = useSelector(state=>state.user);


    let cardValues={}
    
    props.description? cardValues.description=props.description : cardValues.description="";
    
    if(props.imgs.length){cardValues.imgs=<div className={Cardpost.imgsCont}>{props.imgs.map((element,index)=><img key={"img_"+index} className={Cardpost.cardpostImg} src={element} alt={"nu existe :c"}/>)}</div>}
    
    props.likes.includes(user.currentUser?._id)?   cardValues.likeImg=Cardpost.likedImg : cardValues.likeImg=Cardpost.notLikedImg; 
    props.shares.includes(user.currentUser?._id) ? cardValues.sharedImg=Cardpost.sharedImg : cardValues.sharedImg=Cardpost.notSharedImg; 
    
    cardValues.categories=<div id={Cardpost.categoriesCont}>{props.categories.map((element,index)=><p key={"cardpost_"+props.postId+"_category"+index} className={Cardpost.category}>{element}</p>)}</div>
    cardValues.likes=props.likes.length;
    cardValues.shares=props.shares.length;
    cardValues.favorite=props.favorite;

    return(
        <div className={Cardpost.CardPostCont}>
            <div className={Cardpost.userInfoCont}>
                <img className={Cardpost.userPhoto} src={props.userPhoto? props.userPhoto : "./default_profile_photo.svg"} alt="not_found" />
                <Link to={"http://localhost:3000/user/"+props.userId} className={Cardpost.userName}>{props.userName}</Link>
            </div>
            <h2 className={Cardpost.cardPostTitle}>{props.title}</h2>
            <div className={Cardpost.descriptionCont}><p className={Cardpost.cardPostDescription}>{cardValues.description}</p></div>
            {cardValues.imgs}
            {cardValues.categories}
            <div className={Cardpost.analiticsCont}>
                <div className={Cardpost.likesShell} onClick={()=>{}}> <FontAwesomeIcon className={Cardpost.notLikedImg} icon={faHeart}/> {cardValues.likes}</div>
                <div className={Cardpost.sharesShell} onClick={()=>{}}> <FontAwesomeIcon className={Cardpost.notSharedImg} icon={faShareSquare} /> {cardValues.shares}</div>
                <div className={Cardpost.favoritesShell}>{cardValues.favorite}</div>
                <div className={Cardpost.commentShell}><Link to={"http://localhost:3000/post/"+props.postId}><FontAwesomeIcon icon={faCommentAlt}/>  Commentaries</Link></div>
            </div>
        </div>
    )
}