import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faHeart, faShareSquare } from '@fortawesome/free-solid-svg-icons'; 
import PostCss from "./Post.module.css"
import { getDetailedPost, sendBackComment } from '../ReduxToolkit/apiCalls/postCall';
import { setDetailedLoading, setDetailedPost } from '../ReduxToolkit/reducers/postSlice';

// const detailedPost = {
//     userName:"Username",
//     postId:0,
//     userId:0,
//     userPhoto:"./logo512.png",
//     title: "Title",
//     description: "vewy long description detailedPost or whatevs",
//     shared:false,
//     liked:false,
//     likes: 3,
//     shares: 3,
//     favorite: false,
//     images: ["./logo512.png", "./logo512.png"],
//     comments: [{photo:"./logo512.png",id:0,name:"useruser",comment:"owowowowowo  wowow owowowowwow owowowowow owowowow owo owowo owooow owo owowowoow o oowow"},{photo:"./logo512.png",id:0,name:"useruser",comment:"owowowowowo  wowow owowowowwow owowowowow owowowow owo owowo owooow owo owowowoow o oowow"}],
// } 

/* let detailedPost={}; */
/* let detailedPostComments=[]; */

function Comment(props)
{
    return(
        <div className={PostCss.commentCont}>
            <div className={PostCss.commentUser}>
                <img src={props.photo ? props.photo : "http://localhost:4000/default_profile_photo.svg"} alt="no foto :c" />
                <Link className={PostCss.commentName} to={"/user/"+props.id}>{props.name}</Link>
            </div>

            <div className={PostCss.commentaryShell}>{props.comment}</div>
        </div>
    )
}

export default function Post()
{
    const dispatch = useDispatch()
    
    const detailedPost = useSelector ((state) => state.detailedPost);
    const user = useSelector(state=>state.userData);

    const {id} = useParams();
    const navigate = useNavigate();

    const [newComment,setNewComment] = useState("");
    const [imgNum,setImgNum] = useState(0);

    useEffect (() => 
    {
        getDetailedPost(id,dispatch);
        return dispatch(setDetailedLoading());
    }, []);

    //Functions
    function sendComment()
    {
        let input={}
        input.user=user.currentUser._id;
        input.comment=newComment;
        input.score=-1;

        console.log(input)
        sendBackComment(id, input, dispatch);

        setNewComment("");
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

    //Status!
    if(detailedPost.loading){ return <div id={PostCss.statusText}>Loading...</div>}
    else if(!detailedPost.detailed.hasOwnProperty("_id")){ return <div id={PostCss.statusText}>Error!_404</div> }
    

    let cardValues={};
    
    //veo si hay descripcion
    detailedPost.detailed.description? cardValues.description=detailedPost.detailed.description : cardValues.description="";
    cardValues.styleInfo=PostCss.longInfoCont;

    //Hagp chequeo de las imagenes
    if(detailedPost.detailed.images){cardValues.imgs=detailedPost.detailed.images.map((element,index)=><img key={"img_"+index} className={PostCss.cardPostImg} src={element} alt={"nu existe :c"}/>)}
    if(cardValues.imgs.length)
    {
        cardValues.showImgs=<div id={PostCss.bigImgsCont}>
                                <div id={PostCss.backLink} onClick={()=>navigate(-1)}><button id={PostCss.backBut}><FontAwesomeIcon icon={ faAngleLeft }/>Back</button></div>

                                <div id={PostCss.indexImg}> <p id={PostCss.leftIndex}>{imgNum+1}</p> | <p>{cardValues.imgs.length}</p> </div>
                                <div id={PostCss.arrImgCont}>{cardValues.imgs[imgNum]}</div>
                                <button onClick={()=>{handleImgNum("back")}} id={PostCss.CarouselButLeft}><FontAwesomeIcon icon={ faAngleLeft }/></button>
                                <button onClick={()=>{handleImgNum("next")}} id={PostCss.CarouselButRight}><FontAwesomeIcon icon={ faAngleRight }/></button>
                            </div>
        cardValues.styleInfo=PostCss.infoCont;
    }
    else{
        cardValues.backWoImgs= <div id={PostCss.backLinkWoImg} onClick={()=>navigate(-1)}><button id={PostCss.backButWoImgs}><FontAwesomeIcon icon={ faAngleLeft }/>Back</button></div>
    }

    //css de likes 
    detailedPost.detailed.likes.includes(user.currentUser?._id) ? cardValues.likeImg=PostCss.likedImg : cardValues.likeImg=PostCss.notLikedImg; 
    detailedPost.detailed.shares.includes(user.currentUser?._id) ? cardValues.sharedImg=PostCss.sharedImg : cardValues.sharedImg=PostCss.notSharedImg; 

    //los numeros de likes y shares, ademas del icono de favorito
    cardValues.likes=detailedPost.detailed.likes.length;
    cardValues.shares=detailedPost.detailed.shares.length;
    cardValues.saved=detailedPost.detailed.favorite;

    //Comentarios
    let commentArr=detailedPost.detailed.comments.map((element,index)=> {return <Comment key={"comment_"+index+"_user_"+element._id} comment={element.comment} photo={element.user.profilePhoto} id={element.user._id} name={element.user.username}/>})

    return(
        <div id={PostCss.bigPostCont}>

            <div id={cardValues.styleInfo}>
                <div id={PostCss.userInfoCont}> 
                    <img id={PostCss.posterImg} src={detailedPost.detailed.userPhoto? detailedPost.detailed.userPhoto : "http://localhost:4000/default_profile_photo.svg"} alt="photo :x"/>
                    <Link to={`/user/${detailedPost.userid}/*`} id={PostCss.posterName}>{detailedPost.userName}</Link>
                </div>
                <h1 >{detailedPost.title}</h1>

                <div id={PostCss.bigDescriptionCont}>{cardValues.description}</div>

                <div id={PostCss.bigAnaliticsCont}>
                    <div id={PostCss.likesShell} onClick={()=>{}}> <FontAwesomeIcon className={cardValues.likeImg} icon={faHeart}/> {cardValues.likes}</div>
                    <div id={PostCss.sharesShell} onClick={()=>{}}> <FontAwesomeIcon className={cardValues.sharedImg} icon={faShareSquare} /> {cardValues.shares}</div>

                    <div id={PostCss.favoritesShell}>{cardValues.saved}</div>

                    {cardValues.backWoImgs}
                </div>

                <div id={PostCss.newCommentaryCont}>
                        <textarea placeholder='Add a comment n.n' name="newComment" id={PostCss.newCommentInput} value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
                        <button id={PostCss.newCommentaryBut} onClick={sendComment}>Send</button>
                </div>

                <div className={PostCss.commentSection}>
                    {commentArr}
                </div>
            </div>
            {cardValues.showImgs}
        </div>
    )
}