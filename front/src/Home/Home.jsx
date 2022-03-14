import React from "react";
import Categories from "./components/Categories/Categories.jsx";
import Feed from "./components/Feed/Feed.jsx";

export default function Home(props)
{
    return(
        <div id="homeCont">
            <Feed/>  {/*Aca se mostrarian los posts de feed*/}
            <Categories/> {/*Categorias varias a las que se pueden acceder por links*/}
        </div>
    )
}