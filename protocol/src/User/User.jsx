import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../ReduxToolkit/apiCalls/userCall";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import css from "./User.module.css";
import Donation from "../donation/Donation";

export default function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [donationShow,setDonationShow] = useState(true);

  const { id } = useParams();
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    getUser(dispatch, id);
  }, []);

  if (userData.isFetching)
    return <div id={css.userStatus}>Loading Fuel, be patient!</div>;
  else if (userData.error) { 
    return <div id={css.userStatus}>Error!_Rocket Lost</div>; 
  }

  let donateLength= donationShow? css.longDonationBut : css.shortDonationBut;
  
  return (
    <div id={css.container}>
      <div id={css.upperCont}>
        {userData?.currentUser ? (
          <div id={css.container}>
            <div id={css.bannerCont}>
              <img src={ userData.currentUser?.backgroundPhoto ? userData.currentUser?.backgroundPhoto : "/default_banner_photo.svg"} alt="backgroundPhoto not found" id={css.banner}/>
            </div>
            
            <div id={css.profileSection}>
              <img src={ userData.currentUser?.profilePhoto ? userData.currentUser?.profilePhoto : "/default_profile_photo.svg"} alt="profilePhoto not found" id={css.profilePhoto}/>
              
              <div>
                <h1>{userData.currentUser?.fullName ? userData.currentUser?.fullName : userData.currentUser?.email.split("@")[0]}</h1>
                <p>@{userData.currentUser.username ? userData.currentUser?.username : userData.currentUser?.email.split("@")[0]} </p>

                <div>
                  <Link to={"following"} id={css.followsLink}> <button> {userData.currentUser?.followings.length} following </button></Link>
                  <Link to={"followers"} id={css.followsLink}> <button> {userData.currentUser?.followers.length} followers </button> </Link>
                </div>
              </div>

              <div id={css.donationCont}>
                <Donation />
                <button onClick={()=>setDonationShow(!donationShow)} id={donateLength}><FontAwesomeIcon id={css.butSvgDecoLeft} icon={faAngleLeft}/> <p>{donationShow?"Donate to Artist":""}</p>  <FontAwesomeIcon id={css.butSvgDecoRight} icon={faAngleRight}/></button>        
              </div>
              

            </div>

            <div id={css.postsButtons}>
              <Link to={"posts"} id={css.postsLink}> <button>POSTS</button> </Link>
              {/* <Link to={"favorites"} id={css.postsLink}> <button>FAVORITES</button> </Link> */}
              <Link to={`edit`} id={css.postsLink}> <button>EDIT</button> </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* <h1>{userData.currentUser.fullName? userData.currentUser.fullName : userData.currentUser.email.split("@")[0]}</h1>
              <p>@{userData.currentUser.username? userData.currentUser.username : userData.currentUser.email.split("@")[0]}</p>
              <div>
                <Link to={"following"} id={css.followsLink}>
                  <button>{userData.currentUser.following.length} following</button>
                </Link>
                <Link to={"followers"} id={css.followsLink}>
                  <button>{userData.currentUser.followers.length} followers</button>
                </Link>
              </div> */}
            <span>loading</span>
          </div>
        )}
      </div>
      {/* <div id={css.postsButtons}>
          <Link to={"posts"} id={css.postsLink}>
            <button>POSTS</button>
          </Link>
          <Link to={"favorites"} id={css.postsLink}>
            <button>FAVORITES</button>
          </Link>
        </div> */}

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
