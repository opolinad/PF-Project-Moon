import axios from "axios";
import {
  userPostsStart,
  userPostsSuccess,
  userPostsFailure,
  clearPost,
} from "../reducers/usersPosts";

export const allPostById = async (dispatch, id, currentId) => {
  dispatch(userPostsStart());
  console.log(id,currentId)
  try {
    const res = await axios.get(`/api/profile/${currentId}/${id}`);
    dispatch(userPostsSuccess(res.data));
  } catch (error) {
    dispatch(userPostsFailure());
  }
};

export const clearUserPost = async (dispatch) => {
  try {
    dispatch(clearPost());
  } catch (error) {
    dispatch(userPostsFailure());
  }
};
