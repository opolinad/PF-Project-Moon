import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getUser } from "../redux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import css from "./User.module.css";

export default function User() {
    const dispatch = useDispatch()
<<<<<<< HEAD
    const { id } = useParams()
    const userData = useSelector((state) => state.userData)
    useEffect(() => dispatch(getUser(dispatch, id)), [])
    /* getUser(dispatch, id) */

    console.log("id", id)
    console.log("userData", userData)

    const userdata = {
        _id: '6236268600ef79423f81a729',
        email: 'tester@gmail.com',
        password: 'U2FsdGVkX1+eu40intuwCUcoDxLk4h2o6gPABXweRP8=',
        followers: [],
        following: []
    }

    const couldBe = {
        backgroundPhoto: "https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-blue-violet-line-banner-background-image_271519.jpg",
        profilePhoto: "https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg",
        username: "homerdona",
        fullName: "homero simpson",
        following: [],
        followers: [],
    }

    return (
        <div>
            {
                userData.currentUser ?
                    <div id={css.container}>
                        <img src={couldBe.backgroundPhoto} alt="backgroundPhoto not found" id={css.banner} />
                        <div id={css.profileSection}>
                            <img src={couldBe.profilePhoto} alt="profilePhoto not found" id={css.profilePhoto} />
                            <div>
                                <h1>{couldBe.fullName}</h1>
                                <p>@{couldBe.username}</p>
                                <div>
                                    <Link to={"following"} id={css.followsLink}><button>{userData.following.length} following</button></Link>
                                    <Link to={"followers"} id={css.followsLink}><button>{userData.followers.length} followers</button></Link>
                                </div>
                            </div>
                        </div>
                        <div id={css.postsButtons}>
                            <Link to={"posts"} id={css.postsLink}><button>POSTS</button></Link>
                            <Link to={"favorites"} id={css.postsLink}><button>FAVORITES</button></Link>
                        </div>
                    </div>
                    :
                    <div>
                        <span>loading</span>
                    </div>
            }
=======
    const {id} = useParams()
    const userData = useSelector ((state) => state.userData)
    useEffect (() => dispatch(getUser( id)), [])
    /* getUser(dispatch, id) */

  console.log("id", id);
  console.log("userData", userData);

  // const userdata = {
  //     _id: '6236268600ef79423f81a729',
  //     email: 'tester@gmail.com',
  //     password: 'U2FsdGVkX1+eu40intuwCUcoDxLk4h2o6gPABXweRP8=',
  //     followers: [],
  //     following: []
  // }

  const couldBe = {
    backgroundPhoto:
      "https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-blue-violet-line-banner-background-image_271519.jpg",
    profilePhoto:
      "https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg",
    username: "homerdona",
    fullName: "homero simpson",
    following: [],
    followers: [],
  };

  const changeDates = {
    profilePhoto:
      "https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg",
    backgroundPhoto:
      "https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-blue-violet-line-banner-background-image_271519.jpg",
    username: "admin",
    fullName: "user admin",
  };
    return(

        <div id={css.container}>
            <div id={css.bannerCont}><img src={userData.backgroundPhoto} alt="backgroundPhoto not found" id={css.banner}/></div>
            <div id={css.profileSection}>
                <img src={userData.profilePhoto} alt="profilePhoto not found" id={css.profilePhoto}/>
                <div id={css.infoCont}>
                    <h1>{userData.fullName}</h1>
                    <p>@{userData.username}</p>
                    <div id={css.followsCont}>
                        <Link to={"following"} id={css.followsLink}><button>{userData.following.length} following</button></Link>
                        <Link to={"followers"} id={css.followsLink}><button>{userData.followers.length} followers</button></Link>

            {/*<div>
            {
            userData.currentUser?
            <div id={css.container}>
                <img src={couldBe.backgroundPhoto} alt="backgroundPhoto not found" id={css.banner}/>
                <div id={css.profileSection}>
                    <img src={couldBe.profilePhoto} alt="profilePhoto not found" id={css.profilePhoto}/>
                    <div>
                        <h1>{couldBe.fullName}</h1>
                        <p>@{couldBe.username}</p>
                        <div>
                            <Link to={"following"} id={css.followsLink}><button>{userData.currentUser.following.length} following</button></Link>
                            <Link to={"followers"} id={css.followsLink}><button>{userData.currentUser.followers.length} followers</button></Link>
                        </div>*/}

                    </div>
                </div>
                <div id={css.postsButtons}>
                    <Link to={"posts"} id={css.postsLink}><button>POSTS</button></Link>
                    <Link to={"favorites"} id={css.postsLink}><button>FAVORITES</button></Link>
                </div>
            </div>
            :
            <div>
              <h1>{couldBe.fullName}</h1>
              <p>@{couldBe.username}</p>
              <div>
                <Link to={"following"} id={css.followsLink}>
                  <button>{userData.following.length} following</button>
                </Link>
                <Link to={"followers"} id={css.followsLink}>
                  <button>{userData.followers.length} followers</button>
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
          </div>
        </div>
      ) : (
        <div>
          <span>loading</span>
        </div>
      )}
      <form>
        <div>
          <img
            src={changeDates.backgroundPhoto}
            alt="backgroundPhoto not found"
            id={css.banner}
          />
          <img src="./profile.svg" id={css.banner} alt="logo not found" />
          <h1>{changeDates.fullName}</h1>
          <p>{changeDates.username}</p>
          <Link to={"users/:id*/edit"} id={css.postsLink}>
            <button>EDIT</button>
          </Link>
>>>>>>> d2a956207542a9b6b953111982a02b26fa59c8bb
        </div>
      </form>
    </div>
  );
}
