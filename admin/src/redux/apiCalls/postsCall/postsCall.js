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
