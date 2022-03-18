import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { STARTING_STATUS } from "../redux/consts.js";
import Categories from "./components/Categories/Categories.jsx";
import Feed from "./components/Feed/Feed.jsx";
import Actions from "../redux/actions/index.js";
import Filter from "./components/Filters And Order/Filter.jsx";
import Ordering from "./components/Filters And Order/Ordering.jsx";

export default function Home(props)
{
    const dispatch= useDispatch()

    return(
        <div id="homeCont">
            <div id="filterOrderCont">
                <Filter/>
                <Ordering/>
                <button onClick={()=>dispatch(Actions.resetOptions())} id="resetOption">Reset</button>
            </div>
            <Feed/>  {/*Aca se mostrarian los posts de feed*/}
            <Categories/> {/*Categorias varias a las que se pueden acceder por links*/}
        </div>
    )
}