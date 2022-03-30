import React, { useEffect } from "react";
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


  useEffect(() => {
    if (flag_1Carga) {
      if (!query.search && search !== "") dispatch(searchingAction(""));
      else if (query.search && search !== query.search.split("=")[1])
        dispatch(searchingAction(query.search.split("=")[1]));
      getSearchResults(
        user.currentUser?._id,
        dispatch,
        query.search.split("=")[1],
        "",
        "",
        "recent",
        1
      );
      dispatch(resetOptions());
      dispatch(resetSelectedCategory());
      dispatch(resetPage());
    } else if (!flag_1Carga) {
      getSearchResults(
        user.currentUser?._id,
        dispatch,
        search,
        selectedCategory,
        filterAndOrder.filter,
        filterAndOrder.ordering,
        homePage.page
      );
      /* SI HAY UN HOMEPAGE DEBERIA NO ENVIAR NADA Y DEBERIA VER ALGO DEL SEARCH POR ACA OWO */
    }
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
    console.log("FEED RENDERIZANDO")
    postsArr = feed.posts?.map((element, index) => {
      return (
        <CardPost
          key={"post_" + element._id}
          title={element.title}
          description={element.description}
          imgs={element.images}
          shares={element.shares}
          shared={element.share}
          shareUser={element.shareUser}
          likes={element.likes}
          id={element._id}
          userName={element.user.username}
          userPhoto={element.user.profilePhoto}
          userId={element.user._id}
          categories={element.categories}
          componentFather={"Feed"}
        />
      );
    });

    usersArr = feed.users?.map((e) => {
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


  return <div id={FeedCss.FeedContainer}>
      {usersArr? <p>some users that match your search...</p> : null}
      {usersArr}
      {usersArr? <button>load more users</button> : null}
      {postsArr}
    </div>;

}
