import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardPost from "../../../CardPost/CardPost.jsx";
import CardUser from "../../../CardUser/CardUser.jsx";
import {
  setFeedToLoading,
  resetPage,
  resetOptions,
  resetSelectedCategory,
} from "../../../ReduxToolkit/reducers/homeSlice.js";
import { searchingAction } from "../../../ReduxToolkit/reducers/navBarSlice.js";
import { getSearchResults } from "../../../ReduxToolkit/apiCalls/searchCall.js";
import FeedCss from "./Feed.module.css";
import {
  STARTING_STATUS,
  LOADING_0,
  NOT_FOUND_404,
  SUCCESS_200,
} from "../../../ReduxToolkit/consts.js";
import { setDetailedLoading } from "../../../ReduxToolkit/reducers/postSlice.js";

let flag_1Carga = true;

export default function Feed(props) {
  const dispatch = useDispatch();

  const query = useLocation();

  const feed = useSelector((state) => state.feed);
  const user = useSelector((state) => state.user);
  const filterAndOrder = useSelector((state) => state.filterAndOrder);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const search = useSelector((state) => state.search);
  const homePage = useSelector((state) => state.homePage);
  const currentUser = useSelector((state) => state.user.currentUser);


  useEffect(() => 
  {
    if (flag_1Carga) 
    {
      if (!query.search && search !== "") dispatch(searchingAction(""));
      else if (query.search && search !== query.search.split("=")[1])
        dispatch(searchingAction(query.search.split("=")[1]));
      getSearchResults(user.currentUser?._id, dispatch, query.search.split("=")[1], "", "", "recent", 1);
      dispatch(resetOptions());
      dispatch(resetSelectedCategory());
      dispatch(resetPage());
    } 
    else if (!flag_1Carga) {getSearchResults(user.currentUser?._id, dispatch, search, selectedCategory, filterAndOrder.filter, filterAndOrder.ordering, homePage.page);}
    flag_1Carga = false;
    dispatch(setDetailedLoading());
  }, [filterAndOrder, search, selectedCategory]);

  let postsArr;
  let usersArr;
  if (feed.status === STARTING_STATUS || feed.status === LOADING_0) {
    postsArr = (
      <p className={FeedCss.feedStatus}>Loading the Sweet Sweet Posts</p>
    );
  } else if (feed.status === NOT_FOUND_404) {
    postsArr = <p className={FeedCss.feedStatus}>Error! No Post Found</p>;
  } else if (feed.status === SUCCESS_200)
    postsArr = feed.posts?.map((element, index) => {
      return (
        <CardPost
          key={"post_" + element._id} 
          title={element.title} 
          description={element.description} 
          imgs={element.images}
          price={element.price} 
          shares={element.shares} 
          shared={element.share} 
          shareUser={element.user}
          likes={element.likes} 
          id={element._id}
          userName={element.shareUser? element.shareUser.username : element.user.username}
          userPhoto={element.shareUser? element.shareUser.profilePhoto : element.user.profilePhoto} 
          userId={element.shareUser? element.shareUser._id : element.user._id}
          categories={element.categories} componentFather={"Feed"}
        />
      );
    });

    usersArr = 
      feed.users?.map((e) => {
        return (
          <CardUser
          image={e.profilePhoto}
          fullName={e.fullname? e.fullName : e.email.split("@")[0]}
          userName={e.username}
          currentUserId={currentUser._id}
          userId={e._id}
          />
        )
      })
      

    const [displaying, setDisplaying] = useState(3)
    let usersDisplaying = usersArr?.length? usersArr.slice(0, displaying) : "";
    function loadMore(e){
        setDisplaying(displaying + 3)
        usersDisplaying = usersArr?.slice(0, displaying);
    }


  return <div id={FeedCss.FeedContainer}>
      {usersArr?.length? <h3 id={FeedCss.statusUsersCard}>Users</h3> : null}
      <div id={FeedCss.cardUserArrCont}>{usersDisplaying}</div>
      {usersArr?.length? <button id={FeedCss.loadButUsers} onClick={() => loadMore()}>load more users</button> : null}

      {postsArr}
    </div>;

}
