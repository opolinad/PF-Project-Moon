import requestApiProtocol from "../../../settings/requestMethod";
import {
  userStart,
  userSuccess,
  userFailure,
} from "../../reducers/userReducers";

//TRAE UN USUARIO POR ID
export const getUserById = async (dispatch, id) => {
  dispatch(userStart());
  try {
    const resp = await requestApiProtocol.get(`/users/${id}`);
    dispatch(userSuccess(resp.data));
  } catch (error) {
    dispatch(userFailure());
  }
};
