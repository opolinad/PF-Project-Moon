import axios from "axios";
import { LOADING_0, SUCCESS_200, NOT_FOUND_404, END_ALL } from "../consts.js"
import { portfolioError, portfolioFilter, portfolioOrder, portfolioStart, portfolioUpdate } from "../reducers/portfolioSlice.js";


export const portfolioByPage = async (page=1,currentId=-1,designerId=-1,dispatch,command="",option="") =>
{
    console.log("portfolioByPage")
    dispatch(portfolioStart());
    try
    {
        let res;
        let statusPortolio;
        // dispatch(portfolioUpdate({posts:res.data, statusPortolio}));

        switch (command) 
        {
            case "more": //CASO: primer carga // cargar siguiente pagina
                res = await axios.get(`/api/profile/portfolio/${designerId}?page=${page}`); ///api/profile/portfolio/:idUser
                console.log(res.data)
                statusPortolio= res.data.length? SUCCESS_200 : END_ALL;

                dispatch(portfolioUpdate({posts:res.data, statusPortolio}));
            break;

            case "order": //CASO: cambio ordenamiento, la pagina va a 1
                res = await axios.get(`/api/profile/portfolio/${designerId}?page=${page}`);
                console.log(res.data)
                statusPortolio= res.data.length? SUCCESS_200 : END_ALL;

                dispatch(portfolioUpdate({posts:res.data, statusPortolio}));
                dispatch(portfolioOrder(option))
            break;

            case "filter": //CASO: cambio de filtro, la pagina va a 1 
                res = await axios.get(`/api/profile/portfolio/${designerId}?page=${page}`);
                console.log(res.data)
                statusPortolio= res.data.length? SUCCESS_200 : END_ALL;

                dispatch(portfolioUpdate({posts:res.data, statusPortolio}));
                dispatch(portfolioFilter(option))
                break;
        
            default:
                break;
        }
    }
    catch(e)
    {
        console.log(e)
        dispatch(portfolioError());
    }

}