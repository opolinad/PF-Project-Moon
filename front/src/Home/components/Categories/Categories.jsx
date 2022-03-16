import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOADING_0, NOT_FOUND_404, STARTING_STATUS, SUCCESS_200 } from "../../../redux/consts";
import Actions from "../../../redux/actions";

const dummy=[];
export default function Categories(props)
{
    const categories = useSelector(state=>state.categories);
    const selectedCategory = useSelector(state=>state.selectedCategory)
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

    function handleCategoryClick(name)
    {
        dispatch(Actions.selectedCategoryAction(name));
    }
    
    if(categories.status===STARTING_STATUS || categories.status===LOADING_0){categoriesArr="Loading owo..."}
    else if(categories.status===NOT_FOUND_404){categoriesArr="error! OnO";}
    else if(categories.status===SUCCESS_200){categoriesArr=categories.posts.map((element,index)=><button value={element.name} onClick={(e)=>handleCategoryClick(e.target.value)} key={"category_"+index}>{element.name}</button>);}
    
    return(
        <div id="CategoriesContainer">
            <h2>Categories!</h2>
            <div id="selectedCategory">{selectedCategory}</div>
            {categoriesArr}
            <button onClick={()=>dispatch(Actions.resetSelectedCategory())}>Reset category</button>
        </div>
    )
}