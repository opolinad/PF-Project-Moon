import requestApiProtocol from "../../../settings/requestMethod";
import {
  postsStart,
  postsSuccess,
  postsFailure,
} from "../../reducers/postsReducers";

//TRAE TODOS LOS USUARIOS
export const getAllPosts = async (dispatch) => {
  dispatch(postsStart());
  try {
    const resp = await requestApiProtocol.get("/posts");
    dispatch(postsSuccess(resp.data));
  } catch (error) {
    dispatch(postsFailure());
  }
};

export const deletePost = async(postId, token)=>{
  try {
    const res = await requestApiProtocol.delete(`/posts/${postId}`, { headers:{token}})
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}
