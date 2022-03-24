import React, { useEffect } from "react";
import Cardpost from "./CardPost.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {faHeart,faShareSquare, faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { likeAction, shareAction } from "../ReduxToolkit/apiCalls/cardPostCall";
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
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.currentUser);

    let feed = useSelector((state) => state.feed.posts);

    let cardValues={}
    
    props.description? cardValues.description=props.description : cardValues.description="";
    
    if(props.imgs){cardValues.imgs=props.imgs.map((element,index)=><img key={"img_"+index} className={Cardpost.cardpostImg} src={element} alt={"nu existe :c"}/>)}
    
    props.liked ? cardValues.likeImg=<FontAwesomeIcon className={Cardpost.notLikedImg} icon={faHeart}/> : cardValues.likeImg=<FontAwesomeIcon className={Cardpost.likedImg} icon={faHeart} /> ; 
    props.shared ? cardValues.sharedImg=<FontAwesomeIcon className={Cardpost.notSharedImg} icon={faShareSquare} /> : cardValues.sharedImg=<FontAwesomeIcon className={Cardpost.sharedImg}  icon={faShareSquare} /> ; 
    
    cardValues.likes=props.likes;
    cardValues.shares=props.shares;
    cardValues.favorite=props.favorite;

    function handleLike() {
        let index
        for (let i = 0; i < feed.length; i++) {
            if(feed[i]._id === props.id) index = i
        }
        likeAction (dispatch, props.id, {userId: userData._id}, userData.accessToken, index)
    }

    function handleShare() {
        shareAction (dispatch, props.id, {userId: userData._id}, userData.accessToken)
    }

    return(
        <div className={Cardpost.CardPostCont}>

            <div className={Cardpost.userInfoCont}>
                <img className={Cardpost.userPhoto} src={props.userPhoto} alt=":c" />
                <Link to={"http://localhost:3000/user/"+props.userId} className={Cardpost.userName}>{props.userName}</Link>
            </div>

            {/* title */}
            <h2 className={Cardpost.cardPostTitle}>{props.title}</h2>

            {/* description */}
            <div className={Cardpost.descriptionCont}>
                <p className={Cardpost.cardPostDescription}>{cardValues.description}</p>
            </div>
            
            {/* images */}
            <div className={Cardpost.imgsCont}>{cardValues.imgs}</div>

            <div className={Cardpost.analiticsCont}>
                {/* likes */}
                <div className={Cardpost.likesShell} onClick={() => handleLike()}>
                    {cardValues.likeImg}
                    {props.likes.length}
                </div>
                {/* shares */}
                <div className={Cardpost.sharesShell} onClick={()=>{}}>
                    {cardValues.sharedImg}{props.shares.length}
                </div>
                {/* favorites */}
                <div className={Cardpost.favoritesShell}>
                    <button>{cardValues.favorite}</button>
                </div>
                <div className={Cardpost.commentShell}>
                    <Link to={"http://localhost:3000/post/"+props.postId}><FontAwesomeIcon icon={faCommentAlt}/>  
                        Commentaries
                    </Link>
                </div>
            </div>
        </div>
    )
}