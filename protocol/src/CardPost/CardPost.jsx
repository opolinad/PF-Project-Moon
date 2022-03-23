import React from "react";
import Cardpost from "./CardPost.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {faHeart,faShareSquare, faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
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

function ImgPreviews({imgs,id})
{
    const navigate = useNavigate()

    let cardValues = {};
    if(imgs.length)
    {
        cardValues.testing=[];
        for(let i=0;i<imgs.length && i<4;i++)
        {
            let raw={}
            if(i==0 && imgs.length<2)raw={width:"99%",height:"99%"};
            else if(i==0 && imgs.length>=2)raw={width:"49%",height:"99%"};
            else if(imgs.length<3)raw={width:"49%",height:"99%"};
            else if(imgs.length<4)raw={width:"49%",height:"49%"};
            else if(imgs.length<5)raw={width:"49%",height:"32%"};

            cardValues.testing.push(<div key={"img_"+i+"_id_"+id} onClick={()=>navigate("/post/"+id)} style={raw} className={Cardpost.imgSingleCont}><img   className={Cardpost.cardpostImg} src={imgs[i]} alt={"nu existe :c"}/></div>)
        }
    }

    return(
        <div id={Cardpost.imgPreviewCont}>
            {cardValues.testing}
        </div>
    )
}

export default function CardPost(props)
{
    const user = useSelector(state=>state.user);
    const navigate = useNavigate()

    let cardValues={}
    
    props.description? cardValues.description=props.description : cardValues.description="";
    
    
    
    props.likes.includes(user.currentUser?._id)?   cardValues.likeImg=Cardpost.likedImg : cardValues.likeImg=Cardpost.notLikedImg; 
    props.shares.includes(user.currentUser?._id) ? cardValues.sharedImg=Cardpost.sharedImg : cardValues.sharedImg=Cardpost.notSharedImg; 
    
    cardValues.categories=<div id={Cardpost.categoriesCont}>{props.categories.map((element,index)=><p key={"cardpost_"+props._id+"_category"+index} className={Cardpost.category}>{element}</p>)}</div>
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
            {/* {cardValues.imgs} */}
            <ImgPreviews imgs={props.imgs} id={props.id}/>
            {cardValues.categories}
            <div className={Cardpost.analiticsCont}>
                <div className={Cardpost.likesShell} onClick={()=>{}}> <FontAwesomeIcon className={Cardpost.notLikedImg} icon={faHeart}/> {cardValues.likes}</div>
                <div className={Cardpost.sharesShell} onClick={()=>{}}> <FontAwesomeIcon className={Cardpost.notSharedImg} icon={faShareSquare} /> {cardValues.shares}</div>
                <div className={Cardpost.favoritesShell}>{cardValues.favorite}</div>
                <div className={Cardpost.commentShell}><div onClick={()=>navigate("/post/"+props.id)} ><FontAwesomeIcon icon={faCommentAlt}/>  Commentaries</div></div>
            </div>
        </div>
    )
}