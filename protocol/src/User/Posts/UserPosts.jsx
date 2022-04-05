import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./UserPosts.module.css"
import { allPostById } from '../../ReduxToolkit/apiCalls/userPostsById';
import { useState } from 'react';
import CardPost from '../../CardPost/CardPost'

export default function Posts() {
    // const {user} = useParams()
    const user = useSelector(state => state.user.currentUser);
    const currentUser = useSelector(state => state.userData)
    const posts = useSelector(state => state.userPostsById.posts);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        allPostById(dispatch, user._id, currentUser?._id)
            .then(res => {
                setLoading(false)
            })
    }, [dispatch, user])

    const URL = useLocation();
    let displaying = posts

    return (
        <div id={css.container}>
            {
                loading ? (<p>loading...</p>) : 
                (
                <>
                    {displaying && displaying?.map(data => (<CardPost key={data._id} title={data.title} shared={data.share} shareUser={data.shareUser} description={data.description} imgs={data.images} shares={data.shares} likes={data.likes} id={data._id} userName={data.user.username} userPhoto={data.user.profilePhoto} userId={data.user._id} componentFather={"UserPost"}/>))}
                </>
                )
            }
            <button>LOAD MORE</button>
        </div>
    )
}