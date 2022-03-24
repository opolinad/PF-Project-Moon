import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoriesLoading, setSelectedCategory, resetSelectedCategory, setFeedToLoading } from "../../../ReduxToolkit/reducers/homeSlice";
import { getCategoriesAsync } from "../../../ReduxToolkit/apiCalls/categoriesCall";
import { STARTING_STATUS, LOADING_0, NOT_FOUND_404, SUCCESS_200 } from "../../../ReduxToolkit/consts";

import CategoriesCss from "./Categories.module.css";

export default function Categories(props) {
    const categories = useSelector(state => state.categories);
    const selectedCategory = useSelector(state => state.selectedCategory)
    const dispatch = useDispatch();
    let categoriesArr;
    let selectedCategoryCont = "";
    useEffect(() => {
        // if (categories?.status === STARTING_STATUS) {
            getCategoriesAsync(dispatch);
        // }
    }, []);  //busco las categorias al back
    function handleCategoryClick(name) {
        dispatch(setFeedToLoading());
        dispatch(setSelectedCategory(name));
    }

    function handleResetCategory()
    {
        dispatch(setFeedToLoading());
        dispatch(resetSelectedCategory())
    }

    if (selectedCategory) selectedCategoryCont = <div id={CategoriesCss.selectedCategory} >{selectedCategory} <p onClick={() => handleResetCategory()}>X</p></div>;
    if (categories?.status === STARTING_STATUS || categories.status === LOADING_0) { categoriesArr = <p className={CategoriesCss.categoryStatus}>Loading Rockets...</p> }
    else if (categories?.status === NOT_FOUND_404) { categoriesArr = <p className={CategoriesCss.categoryStatus}>No Rockets Found!</p>; }
    else if (categories?.status === SUCCESS_200) { categoriesArr = categories.posts.categories.map((element, index) => <button className={CategoriesCss.category} value={element} onClick={(e) => handleCategoryClick(e.target.value)} key={"category_" + index}>{element}</button>) }
    //Cada categoria es un boton que actualiza la selectedCategory

    return (
        <div id={CategoriesCss.CategoriesContainer}>
            <h2 id={CategoriesCss.categoriesH2}>Categories</h2>
            {selectedCategoryCont}
            <div id={CategoriesCss.categoriesArrCont}>{categoriesArr}</div>
        </div>)
}