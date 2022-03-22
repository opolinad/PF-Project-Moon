import React from 'react';
import { Link } from "react-router-dom";
import css from "./NotFound.module.css";


export default function NotFound(){

    return(
        <div id={css.container}>
            <div id={css.message}>
                <h1>404</h1>
                <h6>Sorry, the page you are looking for could not be found.</h6>
                <Link to={"/home"} id={css.link}>GO HOME</Link>
            </div>
            <img src="/sad_moon.svg" alt="svg not found" width="500"/>
        </div>
    )
}