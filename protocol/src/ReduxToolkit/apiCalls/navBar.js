import axios from "axios";
import { navBarSlice } from "../reducers/navBarSlice";

export function getNavbarSearch() {
  return async (dispatch, users) => {
    const n = await axios.get(`/api/users/${users}`);
    dispatch({
      navBarSlice,
      payload: n.data,
    });
  };
}
