import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./UserPosts.module.css"
import { allPostById } from '../ReduxToolkit/apiCalls/userPostsById';
import { useState } from 'react';
import CardPost from '../CardPost/CardPost'

export default function Posts() {
    // const {user} = useParams()
    const user = useSelector(state => state.user.currentUser);
    const posts = useSelector(state => state.userPostsById.posts);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        allPostById(dispatch, user._id)
            .then(res => {
                setLoading(false)
            })
    }, [dispatch, user])


    // const userData = {
    //     backgroundPhoto: "https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-blue-violet-line-banner-background-image_271519.jpg",
    //     profilePhoto: "https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg",
    //     username: "homerdona",
    //     fullName: "homero simpson",
    //     birthday: "29-10-2001",
    //     following: [{user: "barto", name:"bart simpson", image:""},{user: "lisa", name:"lisa simpson", image:""},{user: "march", name:"march simpson", image:""}],
    //     followers: [{user: "lisa", name:"lisa simpson", image:""},{user: "march", name:"march simpson", image:""}],
    //     posts: [{title: "homero", image: "https://pbs.twimg.com/media/FOGGI51XsAA97Y3?format=jpg&name=small"}, {title: "lisa", image: "https://pbs.twimg.com/media/FOFxffqWUAoegHC?format=jpg&name=small"}],
    //     favorites: [{ title: "bart", image: "https://pbs.twimg.com/media/FOFBicMXIAI2DR5?format=jpg&name=small"}, {title: "apu", image: "https://pbs.twimg.com/media/FOEzsHqWQAUxnO2?format=jpg&name=small"}, {title: "krusty", image: "https://pbs.twimg.com/media/FN8OZ9rXIAIyebn?format=jpg&name=small"}]
    // }

    // const URL = useLocation();
    // let displaying = userData.posts
    // if(URL.pathname.includes("favorites")) displaying = userData.favorites;

    return (
        <div id={css.container}>
            {
                loading ? (
                    <>
                        <p>loading...</p>
                    </>
                ) : (
                    <>
                        {
                            posts && posts?.map(data => (
                                <CardPost key={data._id} categories={data.categories} title={data.title} description={data.description} imgs={data.images} shares={data.shares} likes={data.likes} id={data._id} />
                            ))
                        }
                    </>
                )
            }
            {/* <div>
                {displaying? displaying.map((e) => {
                    return (
                        <div>
                            <h1>{e.title}</h1>
                            <img src={e.image} alt="not found" />
                        </div>
                    )
                }): null}
            </div> */}
            <button>LOAD MORE</button>
        </div>
    )
}