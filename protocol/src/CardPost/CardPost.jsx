import React, { useEffect, useState } from "react";
import Cardpost from "./CardPost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { deletePost } from "../ReduxToolkit/apiCalls/postCall";
import {
  faHeart,
  faShareSquare,
  faCommentAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import socket from "../Conversations/socket";

import { useDispatch, useSelector } from "react-redux";
import { likeAction, shareAction } from "../ReduxToolkit/apiCalls/cardPostCall";
import { useNavigate } from "react-router";

function ImgPreviews({ imgs, id }) {
  const navigate = useNavigate();

  let cardValues = {};
  if (imgs.length) {
    cardValues.testing = [];
    for (let i = 0; i < imgs.length && i < 3; i++) {
      let raw = {};
      if (i == 0 && imgs.length == 1)
        raw = Cardpost.singleImg; //Cardpost.singleImg
      else if (i == 0 && imgs.length == 2)
        raw = Cardpost.halfImg; //Cardpost.halfImg
      else if (i == 0 && imgs.length > 2)
        raw = Cardpost.quarterImg; //Cardpost.halfImg
      else if (i == 1 && imgs.length == 2)
        raw = Cardpost.halfImg; //Cardpost.quarterImg
      else if (i == 1 && imgs.length >= 3) raw = Cardpost.quarterImg; //Cardpost.quarterImg

      cardValues.testing.push(
        <div
          key={"img_" + i + "_id_" + id}
          onClick={() => navigate("/post/" + id)}
          className={`${Cardpost.imgSingleCont} ${raw}`}
        >
          <img
            className={Cardpost.cardpostImg}
            src={imgs[i]}
            alt={"nu existe :c"}
          />
        </div>
      );
    }
  }
  return <div id={Cardpost.imgPreviewCont}>{cardValues.testing}</div>;
}

export default function CardPost(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const userData = useSelector((state) => state.user.currentUser);
  const userPosts = useSelector((state) => state.userPostsById.posts);
  let feed = useSelector((state) => state.feed.posts);
  const user = useSelector((state) => state.user);

  let cardValues = {};
  props.description
    ? (cardValues.description = props.description)
    : (cardValues.description = "");
  props.likes.includes(user.currentUser?._id)
    ? (cardValues.likeImg = Cardpost.likedImg)
    : (cardValues.likeImg = Cardpost.notLikedImg);
  props.shares.includes(user.currentUser?._id)
    ? (cardValues.sharedImg = Cardpost.sharedImg)
    : (cardValues.sharedImg = Cardpost.notSharedImg);

  cardValues.categories = (
    <div id={Cardpost.categoriesCont}>
      {props.categories?.map((element, index) => (
        <p
          key={"cardpost_" + props._id + "_category" + index}
          className={Cardpost.category}
        >
          {element}
        </p>
      ))}
    </div>
  );
        console.log(props.share)

  props.shared? cardValues.shared = <div className={Cardpost.sharedCont}>Original post by <Link to={"users/"+props.shareUser?._id}>{props.shareUser?.username}</Link> </div> : cardValues.shared="";

  cardValues.likes = props.likes.length;
  cardValues.shares = props.shares.length;
  cardValues.favorite = props.favorite;

  function handleNotifications(type) {
    setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: userPosts,
      type,
    });
  }

  function handleLike() {
    let index;
    for (let i = 0; i < feed.length; i++) {
      if (feed[i]._id === props.id) index = i;
    }
    handleNotifications(1);
    likeAction(
      dispatch,
      props.id,
      { idUser: userData._id },
      userData.accessToken,
      index
    );
  }

  function handleShare() {
    let index;
    for (let i = 0; i < feed.length; i++) {
      if (feed[i]._id === props.id) index = i;
    }
    handleNotifications(2);
    shareAction(
      dispatch,
      props.id,
      { userId: userData._id },
      userData.accessToken,
      index
    );
  }

  function handleDelete(postId) {
    let arr = props.componentFather === "Feed" ? feed : userPosts;
    deletePost(
      dispatch,
      postId,
      userData.accessToken,
      arr,
      props.componentFather
    );
  }

  function handleComment() {
    handleNotifications(3);
    navigate("/post/" + props.id);
  }

    return (
      <div className={Cardpost.CardPostCont}>
        <div className={Cardpost.userInfoCont}>
          <Link to={`/users/${props.userId}`} className={Cardpost.userName}>
            <div className={Cardpost.userPhotoCont}><img className={Cardpost.userPhoto} src={ props.userPhoto ? props.userPhoto : "./default_profile_photo.svg"} alt="not_found"/></div>
            <p className={Cardpost.userNameP}>{props.userName}</p>
          </Link>
          {props.userId === user.currentUser?._id && (
            <span className={Cardpost.deleteBut} onClick={() => handleDelete(props.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          )}
        </div>
        {/* shared */}
        {cardValues.shared}

        {/* title */}
        <h2 className={Cardpost.cardPostTitle}>{props.title}</h2>
  
        {/* description */}
        <div className={Cardpost.descriptionCont}>
          <p className={Cardpost.cardPostDescription}>{cardValues.description}</p>
        </div>
  
        {/* {cardValues.imgs} */}
        <ImgPreviews imgs={props.imgs} id={props.id} />
        {cardValues.categories}
  
        <div className={Cardpost.analiticsCont}>
          {/* likes */}
          <div className={Cardpost.likesShell} onClick={() => handleLike()}>
            <FontAwesomeIcon className={cardValues.likeImg} icon={faHeart} />
            {props.likes.length}
          </div>
          {/* shares */}
          <div className={Cardpost.sharesShell} onClick={() => handleShare()}>
            <FontAwesomeIcon
              className={cardValues.sharedImg}
              icon={faShareSquare}
            />
            {props.shares.length}
          </div>
          {/* favorites */}
          {/* <div className={Cardpost.favoritesShell}>{"fav"}</div> */}
          <div className={Cardpost.commentShell}>
            <div style={{cursor:"pointer"}} onClick={() => navigate("/post/" + props.id)}>
              <FontAwesomeIcon icon={faCommentAlt} /> Commentaries
            </div>
          </div>
        </div>
      </div>
    );
  }