import axios from "axios";
import { updateFeed } from "../reducers/homeSlice";
import { updatePosts } from "../reducers/usersPosts";

export const likeAction = async (dispatch, id, user, token, index) => {
  try {
    const res = await axios.put(`http://localhost:3001/api/posts/like/${id}`, user, {
      headers: {
        token,
      },
    });
    dispatch(updateFeed({data: res.data, index: index}))
  } catch (error) {
    console.log("cannot run likeAction", error);
  }
};

export const shareAction = async (dispatch, id, user, token) => {
  try {
    console.log("id", id)
    console.log("user", user)
    console.log("token", token)
    const res = await axios.post(
      `http://localhost:3001/api/posts/share/${id}`,
      user,
      {
        headers: {
          token,
        },
      }
    );
    dispatch(updatePosts(res.data));
  } catch (error) {
    console.log("cannot run shareAction", error);
  }
};
