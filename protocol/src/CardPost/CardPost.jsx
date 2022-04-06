import axios from "axios";
import React, { useEffect, useState } from "react";
import Cardpost from "./CardPost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { deletePost } from "../ReduxToolkit/apiCalls/postCall";
import { faHeart, faShareSquare, faCommentAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import socket from "../Conversations/socket";
import StripeCheckout from "react-stripe-checkout";
import Logo from "../assets/default_profile_photo.svg";
import { useDispatch, useSelector } from "react-redux";
import { likeAction, shareAction } from "../ReduxToolkit/apiCalls/cardPostCall";
import { useNavigate } from "react-router";
import { setSelectedCategory } from "../ReduxToolkit/reducers/homeSlice";
import { Toast } from "../helpers/alerts/alert";
import Swal from 'sweetalert2';

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
        <div key={"img_" + i + "_id_" + id} onClick={() => navigate("/post/" + id)} className={`${Cardpost.imgSingleCont} ${raw}`}>
          <img className={Cardpost.cardpostImg} src={imgs[i]} alt={"nu existe :c"}/>
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
  const user = useSelector((state) => state.user.currentUser);
  // const selectedCategories = useSelector(state => state.selectedCategories)

  let cardValues = {};
  if (props.likes.some(e => e._id === user?._id))cardValues.likeImg = Cardpost.likedImg;
  else cardValues.likeImg = Cardpost.notLikedImg;
  if (props.shares.some(e => e._id === user?._id))cardValues.sharedImg = Cardpost.sharedImg;
  else cardValues.sharedImg = Cardpost.notSharedImg;

  props.description
    ? (cardValues.description = props.description)
    : (cardValues.description = "");

  props.price
    ? (cardValues.price = props.price)
    : (cardValues.price = "");

  cardValues.categories = (
    <div id={Cardpost.categoriesCont}>
      {props.categories?.map((element, index) => (
        <button key={"cardpost_" + props._id + "_category" + index} value={element} className={Cardpost.category} onClick={(e)=>dispatch(setSelectedCategory(e.target.value))}>{element}</button>
      ))}
    </div>
  );

  props.shared? cardValues.shared = <div className={Cardpost.sharedCont}>Post shared by <Link to={`/users/${props.shareUser?._id}`}>{props.shareUser? (props.shareUser.username? props.shareUser.username : "user") : ""}</Link> </div> : cardValues.shared="";

  props.sold? cardValues.sold = <div className={Cardpost.sharedCont}>{props.soldUser? `Post sold by `: `Post purchased by `}<Link to={"/users/"+props.soldUser?._id}>{props.soldUser? (props.soldUser.username? props.soldUser.username : "user") : props.shoppedUser? (props.shoppedUser.username? props.shoppedUser.username : "user") : ""}</Link> </div> : cardValues.sold="";

  cardValues.likes = props.likes.length;
  cardValues.shares = props.shares.length;
  cardValues.favorite = props.favorite;
  const KEY =
  "pk_test_51KhjjyI7TYGSS0jsLUhfTM1b6D1CGvXdAw90KV1nXso6bES1yebf1jNNjImBF5vbvpYs4BBkM1RYMOj4Q8q9fCUS00UpSjNYNN";
  async function handlePayment (token){
    try {
      const { data }= await axios.post(
        "/api/checkout/payment",
        {
          tokenId: token.id,
          amount: props.price*100,
        }
      );
      if(data.success) {
        const order = {
          type: 'sold',
          user: user._id,
          to: props.userId,
          amount: props.price,
          card: data.success.payment_method_details.card.brand + ' ' + data.success.payment_method_details.card.last4,
          ticket: data.success.receipt_url
        }
        await axios.post(`/api/orders/${props.userId}`, order);
        order.type="buy";
        await axios.post(`/api/orders/${user._id}`, order);
        await axios.post(`/api/posts/buy/${props.id}`, {idUser: user._id})
      }
    } catch (error) {
      console.log(error);
    }
  }
  const stripeOptions = {
    name: "Protocol Moon",
    image: Logo,
    description: `Checkout price is ${props.price} USD`,
    stripeKey: KEY,
    token: handlePayment,
    amount:props.price*100
  };

  function handleNotifications(type) {
    setLiked(true);
    if(user?._id !== props.userId) {
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: props.userId,
      type,
    });
    }
  }

  function handleLike() {
    let index;
    for (let i = 0; i < feed.length; i++) {
      if (feed[i]._id === props.id) index = i;
    }
    if(!props.likes.filter(like => like._id === user._id).length > 0) {
    handleNotifications(1);
    }
    likeAction(
      dispatch,
      props.id,
      {idUser: userData._id},
      userData.accessToken,
      index
    );
  }

  function handleShare() {
    let index;
    for (let i = 0; i < feed.length; i++) {
      if (feed[i]._id === props.id) index = i;
    }
    if(!props.shares.filter(share => share._id === user._id).length > 0) {
    handleNotifications(2);
    }
    shareAction(
      dispatch,
      props.id,
      { idUser: userData._id },
      userData.accessToken,
      index
    );
  }

  function handleDelete(postId) {
    Swal.fire({
      title: 'Are you sure you want to delete this post?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let arr = props.componentFather === "Feed" ? feed : userPosts;
        deletePost(
          dispatch,
          postId,
          userData.accessToken,
          arr,
          props.componentFather
        );
        Toast.fire({
          icon: 'info',
          title: 'Post deleted',
        })
      }else{
        Toast.fire({
          icon: 'info',
          title: 'Post NOT deleted',
        })
      }
    })
  }

  function handleComment() {

    navigate("/post/" + props.id);
  }

    return (
      <div className={Cardpost.CardPostCont}>
        <div className={Cardpost.userInfoCont}>
          <Link to={`/users/${props.userId}`} className={Cardpost.userName}>
            <div className={Cardpost.userPhotoCont}><img className={Cardpost.userPhoto} src={ props.userPhoto ? props.userPhoto : "./default_profile_photo.svg"} alt="not_found"/></div>
            <p className={Cardpost.userNameP}>{props.userName}</p>
          </Link>
          {props.userId === user?._id && (
            <span className={Cardpost.deleteBut} onClick={() => handleDelete(props.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          )}
        </div>
        {/* shared */}
        {cardValues.shared}

        {/* sold */}
        {cardValues.sold}

        {/* title */}
        <h2 className={Cardpost.cardPostTitle}>{props.title}</h2>

        {/* description */}
        <div className={Cardpost.descriptionCont}>
          <p className={Cardpost.cardPostDescription}>{cardValues.description}</p>
        </div>

        {/* {cardValues.imgs} */}
        <ImgPreviews imgs={props.imgs} id={props.id} />

        {cardValues.sold && !props.soldUser? <p className={Cardpost.cardPostPrice}>SOLD</p> : <p></p>}

        {cardValues.price!=="" && <StripeCheckout {...stripeOptions} billingAddress shippingAddress> <p className={Cardpost.cardPostPrice}>{cardValues.price} USD</p> </StripeCheckout> }

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
            <div style={{cursor:"pointer"}} onClick={() => handleComment()}>
              <FontAwesomeIcon icon={faCommentAlt} /> Commentaries
            </div>
          </div>
        </div>
      </div>
    );
  }
