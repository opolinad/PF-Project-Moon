import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../ReduxToolkit/apiCalls/userCall";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight,faCertificate, faCircleNotch, faPalette } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router";
import css from "./User.module.css";
import Donation from "../donation/Donation";
import { followCall } from "../ReduxToolkit/apiCalls/followUser";

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [donationShow,setDonationShow] = useState(true);

  const { id } = useParams();
  const userData = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(()=> getUser(dispatch, id) , [id])

  if (userData.isFetching)
    return <div id={css.userStatus}>Loading Fuel, be patient!</div>;
  else if (userData.error) { 
    return <div id={css.userStatus}>Error!_Rocket Lost</div>; 
  }

  let followingShow = user?.followings.includes(userData.currentUser?._id);

  let donateLength= donationShow? css.longDonationBut : css.shortDonationBut;

  let donationDiv = (
  <div id={css.donationCont}>
    <Donation />
    <button onClick={()=>setDonationShow(!donationShow)} id={donateLength}><FontAwesomeIcon id={css.butSvgDecoLeft} icon={faAngleLeft}/> <p>{donationShow?"Donate to Artist":""}</p>  <FontAwesomeIcon id={css.butSvgDecoRight} icon={faAngleRight}/></button>        
  </div>)

  let editDiv = (<Link to={`edit`} id={css.postsLink}> <button>EDIT</button> </Link>);
  let walletDiv = (<Link to={`wallet`} id={css.postsLink}> <button>WALLET</button> </Link>);
  let portfolioDiv = (<Link to={"portfolio"} id={css.postsLink}> <button>PORTFOLIO</button></Link>);
  
  return (
    <div id={css.container}>
      <div id={css.upperCont}>
        {userData?.currentUser ? (
          <div id={css.container}>
            <div id={css.bannerCont}>
              <img src={ userData.currentUser?.backgroundPhoto ? userData.currentUser?.backgroundPhoto : "/default_banner_photo.svg"} alt="backgroundPhoto not found" id={css.banner}/>
            </div>
            
            <div id={css.profileSection}>
              {userData.currentUser?.artist? <div id={css.artistBadge}><FontAwesomeIcon icon={faPalette}/></div> : ""}
              
              <div id={css.leftProfileSect}>
                <div id={css.profPhotoCont}>
                  <div><img src={ userData.currentUser?.profilePhoto ? userData.currentUser?.profilePhoto : "/default_profile_photo.svg"} alt="profilePhoto not found" id={css.profilePhoto}/></div>
                </div>

                {user?._id === userData.currentUser?._id ? "" : 
                <button id={followingShow ? css.followingButton : css.followButton} onClick={()=>followCall(user?._id,userData.currentUser?._id,followingShow ? "following" : "follow",dispatch,user)}>
                  <FontAwesomeIcon icon={followingShow ? faCertificate : faCircleNotch } />{followingShow ? " Following" : " Follow"}
                </button>}  
              </div>
              
              <div>
                <h1>{userData.currentUser?.fullName ? userData.currentUser?.fullName : userData.currentUser?.email.split("@")[0]}</h1>
                <p>@{userData.currentUser.username ? userData.currentUser?.username : userData.currentUser?.email.split("@")[0]} </p>

                <div>
                  <Link to={"following"} id={css.followsLink}> <button> {userData.currentUser?.followings.length} following </button></Link>
                  <Link to={"followers"} id={css.followsLink}> <button> {userData.currentUser?.followers.length} followers </button> </Link>
                </div>
              </div>

              { user?._id !== userData.currentUser?._id && userData.currentUser?.artist ? donationDiv : ""}
            </div>

            <div id={css.postsButtons}>
              <Link to={"posts"} id={css.postsLink}> <button>POSTS</button> </Link>
              {/* <Link to={"favorites"} id={css.postsLink}> <button>FAVORITES</button> </Link> */}
              { user?._id === userData.currentUser?._id ? editDiv : ""}
              { user?._id === userData.currentUser?._id ? walletDiv : ""}
              {userData.currentUser?.artist ? portfolioDiv : ""}
              {/* {portfolioDiv} */}
            </div>
          </div>
        ) : (
          <div>
            <span>loading</span>
          </div>
        )}
      </div>

      <form>
        <div></div>
      </form>
      <Link id={css.backLink} to={"/home"}>
        <button id={css.backBut}>
          <FontAwesomeIcon icon={faAngleLeft} /> Home
        </button>
      </Link>
    </div>
  );
}
