import axios from "axios";
import { LOADING_0, SUCCESS_200, NOT_FOUND_404, END_ALL } from "../consts.js"
import { portfolioError, portfolioStart, portfolioUpdate } from "../reducers/portfolioSlice.js";


export const portfolioByPage = async (page=1,id,dispatch) =>
{
    dispatch(portfolioStart());
    try
    {
        const res = await axios.get(`/api/profile/${id}/portfolio?page=${page}`);
        let statusPortolio= res.data.length? SUCCESS_200 : END_ALL;
        dispatch(portfolioUpdate({posts:res.data, statusPortolio}));
    }
    catch(e)
    {
        console.log(e)
        dispatch(portfolioError());
    }

}