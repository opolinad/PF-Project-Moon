import axios from "axios";
import { updateFeedLikes, updateFeedShares } from "../reducers/homeSlice";
import { updatePosts } from "../reducers/usersPosts";

export const likeAction = async (dispatch, id, user, token, index) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`, user, {
      headers: {
        token,
      },
    });
    dispatch(updateFeedLikes({data: res.data, index: index}))
  } catch (error) {
    console.log("cannot run likeAction", error);
  }
};

export const shareAction = async (dispatch, id, user, token, index) => {
  try {
    console.log("id", id)
    console.log("user", user)
    console.log("token", token)
    const res = await axios.post(
      `/api/posts/share/${id}`,
      user,
      {
        headers: {
          token,
        },
      }
    );
    console.log("res", res.data)
    dispatch(updateFeedShares({data: res.data, index: index}));
  } catch (error) {
    console.log("cannot run shareAction", error);
  }
};
