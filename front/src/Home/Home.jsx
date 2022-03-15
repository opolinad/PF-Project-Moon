import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { STARTING_STATUS } from "../redux/consts.js";
import Categories from "./components/Categories/Categories.jsx";
import Feed from "./components/Feed/Feed.jsx";
import Actions from "../redux/actions/index.js";

export default function Home(props)
{

    return(
        <div id="homeCont">
            <div id="filterOrderCont">

            </div>
            <Feed/>  {/*Aca se mostrarian los posts de feed*/}
            <Categories/> {/*Categorias varias a las que se pueden acceder por links*/}
        </div>
    )
}