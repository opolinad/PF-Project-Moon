import axios from "axios";
import { FEED_DATABASE, NOT_FOUND_404, SUCCESS_200 } from "../consts";
import { feedDatabase } from "../reducers/homeSlice";

export const getSearchResults = async (
  id,
  dispatch,
  search = "",
  selectedCategory = "",
  filter = "",
  order = "",
  page = 1
) => {
  let q = "";

  q = q + "&order=" + order;
  q = q + "page=" + page;
  if (search !== "") {
    q = "?search=" + search;
  }
  if (selectedCategory !== "") {
    q = q + "&category=" + selectedCategory;
  }
  if (filter !== "") {
    q = q + "&filter=" + filter;
  }
  if (order !== "") {
  }

  const resp = await axios.get(`http://localhost:3001/api/feed/${id}?${q}`); //Se tiene que cambiar la ruta a feed
  let status = NOT_FOUND_404;
  if (resp.data.length) {
    status = SUCCESS_200;
  }
  dispatch(feedDatabase({ status, posts: resp.data }));
};
