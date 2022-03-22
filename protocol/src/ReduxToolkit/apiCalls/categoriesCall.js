import axios from "axios";
import { NOT_FOUND_404, SUCCESS_200 } from "../consts";
import { getCategories } from "../reducers/homeSlice";

export let getCategoriesAsync = async (dispatch) => {
    let resp = await axios.get("http://localhost:3001/api/categories");
    let status = NOT_FOUND_404;
    if (resp.data.categories.length) { status = SUCCESS_200 }
    dispatch(getCategories({status, post:resp.data}));
}