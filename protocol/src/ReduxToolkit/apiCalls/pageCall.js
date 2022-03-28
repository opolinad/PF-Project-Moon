import axios from "axios";
import {  NOT_FOUND_404, SUCCESS_200} from "../consts";
import { feedNextPageDatabase, nextPage } from '../reducers/homeSlice';

export const findNextPage = async (dispatch, search = "", selectedCategory = "", filter = "", order = "", page = 1) => {
    let q = "";
    

    if (search != "") { q = "?search=" + search; }
    if (selectedCategory != "") { q = q + "&category=" + selectedCategory; }
    if (filter != "") { q = q + "&filter=" + filter; }
    if (order != "") { q = q + "&order=" + order; }
    q = q + "&page=" + (page+1);

    console.log(q)

    const resp = await axios.get("/api/posts"); // hay que cambiar la ruta al feed
    let status = NOT_FOUND_404;
    if (resp.data.length) { status = SUCCESS_200 }
    dispatch(feedNextPageDatabase(resp.data)); //envia los 20 post
    dispatch(nextPage(page+1)) //update de page a page+1
}
