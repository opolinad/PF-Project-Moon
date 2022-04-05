import axios from "axios";
import { FEED_DATABASE, NOT_FOUND_404, SUCCESS_200 } from "../consts";
import { feedDatabase, resetPage, setFeedToLoading } from "../reducers/homeSlice";

export const getSearchResults = async (id = null, dispatch, search = "", selectedCategory = "", filter = "", order = "recent", page = 1) => {
  let q = "";

  if (page === 1) {
    q = q + "&order=" + order;
    q = q + "&page=" + 1;
    if (search !== "") {
      q = "search=" + search;
    }
    if (selectedCategory !== "") {
      q = q + "&category=" + selectedCategory;
    }
    if (filter !== "") {
      q = q + "&filter=" + filter;
    }
    if (order !== "") {
    }
    if (id) {
      const res = await axios.get(`/api/feed/${id}?${q}`);
      let status = NOT_FOUND_404;
      if (res.data.length) status = SUCCESS_200;

      if (res.data.posts) {
        console.log("con users")
        dispatch(feedDatabase({ status, posts: res.data.posts, users: res.data.users }))
      } else {
        console.log("sin users")
        dispatch(feedDatabase({ status, posts: res.data }))
      }

    }
  }

};
