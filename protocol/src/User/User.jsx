import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../ReduxToolkit/apiCalls/userCall";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router";
import css from "./User.module.css";

export default function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const userData = useSelector((state) => state.userData);
    useEffect(() => {
        getUser(dispatch, id)
    }, []);
    /* getUser(dispatch, id) */

    // const userdata = {
    //     _id: '6236268600ef79423f81a729',
    //     email: 'tester@gmail.com',
    //     password: 'U2FsdGVkX1+eu40intuwCUcoDxLk4h2o6gPABXweRP8=',
    //     followers: [],
    //     following: []
    // }

    // const changeDates = {
    //   profilePhoto:
    //     "https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg",
    //   backgroundPhoto:
    //     "https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-blue-violet-line-banner-background-image_271519.jpg",
    //   username: "admin",
    //   fullName: "user admin",
    // };

    return (
        <div id={css.container}>
            <div id={css.upperCont}>
                {userData?.currentUser ? (
                    <div id={css.container}>
                        <div id={css.bannerCont}>
                            <img
                                src={
                                    userData.currentUser?.backgroundPhoto
                                        ? userData.currentUser?.backgroundPhoto
                                        : "/default_banner_photo.svg"
                                }
                                alt="backgroundPhoto not found"
                                id={css.banner}
                            />
                        </div>
                        <div id={css.profileSection}>
                            <img
                                src={
                                    userData.currentUser?.profilePhoto
                                        ? userData.currentUser?.profilePhoto
                                        : "/default_profile_photo.svg"
                                }
                                alt="profilePhoto not found"
                                id={css.profilePhoto}
                            />
                            <div>
                                <h1>
                                    {userData.currentUser?.fullName
                                        ? userData.currentUser?.fullName
                                        : userData.currentUser?.email.split("@")[0]}
                                </h1>
                                <p>@
                                    {userData.currentUser.username
                                        ? userData.currentUser?.username
                                        : userData.currentUser?.email.split("@")[0]}
                                </p>
                                <div>
                                    <Link to={"following"} id={css.followsLink}>
                                        <button>
                                            {userData.currentUser?.following.length} following
                                        </button>
                                    </Link>
                                    <Link to={"followers"} id={css.followsLink}>
                                        <button>
                                            {userData.currentUser?.followers.length} followers
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div id={css.postsButtons}>
                            <Link to={"posts"} id={css.postsLink}>
                                <button>POSTS</button>
                            </Link>
                            <Link to={"favorites"} id={css.postsLink}>
                                <button>FAVORITES</button>
                            </Link>
                            <Link to={`edit`} id={css.postsLink}>
                                <button>EDIT</button>
                            </Link>
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
                <div>

                </div>
            </form>
            <Link id={css.backLink} to={"/home"}>
                <button id={css.backBut}><FontAwesomeIcon icon={faAngleLeft} /> Home</button>
            </Link>

        </div>
    );
}
