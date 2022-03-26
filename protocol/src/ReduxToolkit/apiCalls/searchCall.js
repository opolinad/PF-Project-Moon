import axios from "axios";
import { FEED_DATABASE, NOT_FOUND_404, SUCCESS_200 } from "../consts";
import { feedDatabase, resetPage, setFeedToLoading } from "../reducers/homeSlice";

export const getSearchResults = async (id=null,dispatch,search = "",selectedCategory = "",filter = "",order = "") =>
{
  let q = "";

  //dispatch(setFeedToLoading());

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

  const resp = await axios.get(`http://localhost:3001/api/feed/${id}?${q}`);
  let status = NOT_FOUND_404;
  if (resp.data.length) {
    status = SUCCESS_200;
  }
};
