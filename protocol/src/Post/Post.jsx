import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPostData } from '../redux/actions/Post.js'

import { post } from '../../public/dummyStates.js';
import { useParams } from 'react-router';


/* const post/dummy = {
    title: "",
    description: "",
    likes: 0,
    shares: 0,
    saved: false,
    images: ["", ""],
    comments: [],
} */

/* let dummy={}; */
/* let dummyComments=[]; */

function Comment(props)
{
    return(
        <div className={"commentCont"}>
            <div className="commentPhotoCont">
                <img src={props.photo} alt="no foto :c" />
            </div>
            <div className="contTextComment">
                <div className="nameContComment"><Link to={"/user/"+props.id}>{props.name}</Link></div>
                <div className="commentaryShell"></div>
            </div>
        </div>
    )
}

export default function Post()
{
    const dispatch = useDispatch()
    const {username, postId} = useParams()
    const dummy = useSelector ((state) => state.postData)
    useEffect (() => dispatch(getPostData(username, postId)), [])

    const [newComment,setNewComment] = useState("")

    function sendComment()
    {
        
    }

    let cardValues={}
    dummy.description? cardValues.description=dummy.description : cardValues.description="";
    if(dummy.images){cardValues.imgs=dummy.images.map((element,index)=><img key={"img_"+index} className="cardPostImg" src={element} alt={"nu existe :c"}/>)}

    cardValues.likes=dummy.likes;
    cardValues.shares=dummy.shares;
    cardValues.saved=dummy.saved;

    let commentArr=dummy.comments.map((element,index)=>{<Comment key={"comment_"+element.id} photo={element.photo} id={element.id} name={element.name}></Comment>})

    return(
        <div className="bigPostCont">
            <h3>{dummy.title}</h3>
            <div className="bigDescriptionCont">{cardValues.description}</div>
            <div className="bigImgsCont">{cardValues.imgs}</div>
            <div className="bigAnaliticsCont">
                {cardValues.likes}
                {cardValues.shares}
                {cardValues.saved}
                <div>Comentarios</div> {/*place holder para escribir comentario*/}
            </div>
            <div id="newCommentaryCont">
                    <input type="text" name="newComment" id="newCommentInput" value={newComment} onChange={(e)=>setNewComment(e.target.value)} />
                    <button onClick={sendComment}>Send</button>
                </div>
            <div className="commentSection">
                {commentArr}
            </div>

        </div>
    )
}