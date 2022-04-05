import requestApiProtocol from "../../../settings/requestMethod";
import {
  usersStart,
  usersSuccess,
  usersFailure,
} from "../../reducers/usersReducers";

//TRAE TODOS LOS USUARIOS
export const getAllUsers = async (dispatch) => {
  dispatch(usersStart());
  try {
    const resp = await requestApiProtocol.get("/users");
    dispatch(usersSuccess(resp.data));
  } catch (error) {
    dispatch(usersFailure());
  }
};
