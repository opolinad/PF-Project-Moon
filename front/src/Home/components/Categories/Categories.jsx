import React from "react";
import { Link } from "react-router-dom";


const dummy=[];
export default function Categories(props)
{

    let categoriesArr=dummy.map((element,index)=><Link to={"/home/category/"+element.id}>{element.name}</Link>)
    return(
        <div id="CategoriesContainer">
            <h2>Categories!</h2>
            {categoriesArr}
        </div>
    )
}