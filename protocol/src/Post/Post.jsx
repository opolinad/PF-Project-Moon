import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faHeart, faShareSquare } from '@fortawesome/free-solid-svg-icons';

import PostCss from "./Post.module.css"

const dummy = {
    userName:"Username",
    postId:0,
    userId:0,
    userPhoto:"./logo512.png",
    title: "Title",
    description: "vewy long description dummy or whatevs",
    shared:false,
    liked:false,
    likes: 3,
    shares: 3,
    favorite: false,
    images: ["./logo512.png", "./logo512.png"],
    comments: [{photo:"./logo512.png",id:0,name:"useruser",comment:"owowowowowo  wowow owowowowwow owowowowow owowowow owo owowo owooow owo owowowoow o oowow"},{photo:"./logo512.png",id:0,name:"useruser",comment:"owowowowowo  wowow owowowowwow owowowowow owowowow owo owowo owooow owo owowowoow o oowow"}],
} 

/* let dummy={}; */
/* let dummyComments=[]; */

function Comment(props)
{
    return(
        <div className={PostCss.commentCont}>
            <div className={PostCss.commentUser}>
                <img src={props.photo} alt="no foto :c" />
                <Link className={PostCss.commentName} to={"/user/"+props.id}>{props.name}</Link>
            </div>

            <div className={PostCss.commentaryShell}>{props.comment}</div>
        </div>
    )
}

export default function Post()
{
    const dispatch = useDispatch()
    const {username, postId} = useParams()
    // const dummy = useSelector ((state) => state.postData)
    const dummyA = useSelector ((state) => state.postData)
    //useEffect (() => dispatch(getPostData(username, postId)), [])

    const [newComment,setNewComment] = useState("");
    const [imgNum,setImgNum]= useState(0);

    function sendComment()
    {
        
    }

    function handleImgNum(action)
    {
        if(action==="back")
        {
            if(imgNum===0){setImgNum(cardValues.imgs.length-1)}
            else {setImgNum(imgNum-1);}
        }
        else
        {
            if(imgNum===(cardValues.imgs.length-1)){setImgNum(0)}
            else {setImgNum(imgNum+1);}
        }
    }

    let cardValues={};
    
    //veo si hay descripcion
    dummy.description? cardValues.description=dummy.description : cardValues.description="";
    cardValues.styleInfo=PostCss.longInfoCont;
    //Hagp chequeo de las imagenes
    if(dummy.images){cardValues.imgs=dummy.images.map((element,index)=><img key={"img_"+index} className={PostCss.cardPostImg} src={element} alt={"nu existe :c"}/>)}
    if(cardValues.imgs.length)
    {
        cardValues.showImgs=<div id={PostCss.bigImgsCont}>
                                <div id={PostCss.indexImg}> <p id={PostCss.leftIndex}>{imgNum+1}</p> | <p>{cardValues.imgs.length}</p> </div>
                                <button onClick={()=>{handleImgNum("back")}} id={PostCss.CarouselButLeft}><FontAwesomeIcon icon={ faAngleLeft }/></button>
                                <div id={PostCss.arrImgCont}>{cardValues.imgs[imgNum]}</div>
                                <button onClick={()=>{handleImgNum("next")}} id={PostCss.CarouselButRight}><FontAwesomeIcon icon={ faAngleRight }/></button>
                            </div>
        cardValues.styleInfo=PostCss.infoCont;
    }

    //para sacar el color de like y share
    dummy.liked ? cardValues.likeImg=<FontAwesomeIcon className={PostCss.notLikedImg} icon={faHeart}/> : cardValues.likeImg=<FontAwesomeIcon className={PostCss.likedImg} icon={faHeart} /> ; 
    dummy.shared ? cardValues.sharedImg=<FontAwesomeIcon className={PostCss.notSharedImg} icon={faShareSquare} /> : cardValues.sharedImg=<FontAwesomeIcon className={PostCss.sharedImg}  icon={faShareSquare} /> ; 
    

    //los numeros de likes y shares, ademas del icono de favorito
    cardValues.likes=dummy.likes;
    cardValues.shares=dummy.shares;
    cardValues.saved=dummy.favorite;

    let commentArr=dummy.comments.map((element,index)=> {return <Comment key={"comment_"+element.id} comment={element.comment} photo={element.photo} id={element.id} name={element.name}/>})

    return(
        <div id={PostCss.bigPostCont}>

            
            <div id={cardValues.styleInfo}>
                <div id={PostCss.userInfoCont}> 
                    <img id={PostCss.posterImg} src={dummy.userPhoto} alt="photo :x"/>
                    <Link to={`/user/${dummy.userId}/*`} id={PostCss.posterName}>{dummy.userName}</Link>
                </div>
                <h1 >{dummy.title}</h1>

                <div id={PostCss.bigDescriptionCont}>{cardValues.description}</div>

                <div id={PostCss.bigAnaliticsCont}>
                    <div id={PostCss.likesShell} onClick={()=>{}}>{cardValues.likeImg}{cardValues.likes}</div>
                    <div id={PostCss.sharesShell} onClick={()=>{}}>{cardValues.sharedImg}{cardValues.shares}</div>
                    <div id={PostCss.favoritesShell}>{cardValues.saved}</div>
                </div>

                <div id={PostCss.newCommentaryCont}>
                        <textarea placeholder='Add a comment n.n' name="newComment" id={PostCss.newCommentInput} value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
                        <button id={PostCss.newCommentaryBut} onClick={sendComment}>Send</button>
                </div>

                <div className={PostCss.commentSection}>
                    {console.log(commentArr)}
                    {commentArr}
                </div>
            </div>
            {cardValues.showImgs}
        </div>
    )
}