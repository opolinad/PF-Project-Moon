import React from "react";
import Cardpost from "./CardPost.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {faHeart,faShareSquare} from "@fortawesome/free-solid-svg-icons";
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

    let cardValues={}
    
    props.description? cardValues.description=props.description : cardValues.description="";
    
    if(props.imgs){cardValues.imgs=props.imgs.map((element,index)=><img key={"img_"+index} className={Cardpost.cardpostImg} src={element} alt={"nu existe :c"}/>)}
    
    props.liked ? cardValues.likeImg=<FontAwesomeIcon className={Cardpost.notLikedImg} icon={faHeart}/> : cardValues.likeImg=<FontAwesomeIcon className={Cardpost.likedImg} icon={faHeart} /> ; 
    props.shared ? cardValues.sharedImg=<FontAwesomeIcon className={Cardpost.notSharedImg} icon={faShareSquare} /> : cardValues.sharedImg=<FontAwesomeIcon className={Cardpost.sharedImg}  icon={faShareSquare} /> ; 
    
    cardValues.likes=props.likes;
    cardValues.shares=props.shares;
    cardValues.favorite=props.favorite;

    return(
        <div className={Cardpost.CardPostCont}>
            <div className={Cardpost.userInfoCont}>
                <img className={Cardpost.userPhoto} src={props.userPhoto} alt=":c" />
                <Link to={"http://localhost:3000/user/"+props.userId} className={Cardpost.userName}>{props.userName}</Link>
            </div>
            <h2 className={Cardpost.cardPostTitle}>{props.title}</h2>
            <div className={Cardpost.descriptionCont}><p className={Cardpost.cardPostDescription}>{cardValues.description}</p></div>
            <div className={Cardpost.imgsCont}>{cardValues.imgs}</div>
            <div className={Cardpost.analiticsCont}>
                <div className={Cardpost.likesShell} onClick={()=>{}}>{cardValues.likeImg}{cardValues.likes}</div>
                <div className={Cardpost.sharesShell} onClick={()=>{}}>{cardValues.sharedImg}{cardValues.shares}</div>
                <div className={Cardpost.favoritesShell}>{cardValues.favorite}</div>
                <div className={Cardpost.commentShell}><Link to={"http://localhost:3000/post/"+props.postId}>Commentaries</Link></div>
            </div>
        </div>
    )
}