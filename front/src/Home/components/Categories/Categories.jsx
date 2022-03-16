import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOADING_0, NOT_FOUND_404, STARTING_STATUS, SUCCESS_200 } from "../../../redux/consts";
import Actions from "../../../redux/actions";

const dummy=[];
export default function Categories(props)
{
    const categories = useSelector(state=>state.categories);
    const dispatch = useDispatch();

    useEffect(()=>
    {
        if(categories.status===STARTING_STATUS)
        {
            dispatch(Actions.setCategoriesToLoading())
            dispatch(Actions.categoriesDataBaseAction())
        }
    },[]);
    let categoriesArr;
    
    if(categories.status===STARTING_STATUS || categories.status===LOADING_0){categoriesArr="Loading owo..."}
    else if(categories.status===NOT_FOUND_404){categoriesArr="error! OnO";}
    else if(categories.status===SUCCESS_200){categoriesArr=categories.posts.map((element,index)=><Link to={"/home/category/"+element.id}>{element.name}</Link>);}
    
    return(
        <div id="CategoriesContainer">
            <h2>Categories!</h2>
            {categoriesArr}
        </div>
    )
}