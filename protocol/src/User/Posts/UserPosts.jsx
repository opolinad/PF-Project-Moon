import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./UserPosts.module.css";
import {
  allPostById,
  clearUserPost,
} from "../../ReduxToolkit/apiCalls/userPostsById";
import { useState } from "react";
import CardPost from "../../CardPost/CardPost";
import { clearPost } from "../../ReduxToolkit/reducers/usersPosts";

export default function Posts() {
  const {id} = useParams()

  const user = useSelector((state) => state.user.currentUser);
  const currentUser = useSelector((state) => state.userData.currentUser);
  const posts = useSelector((state) => state.userPostsById.posts);
  const isFetching = useSelector((state) => state.userPostsById.isFetching);
  const error = useSelector((state) => state.userPostsById.error);
  
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    if(posts.length===0)allPostById(dispatch, user._id, currentUser?._id)
    return ()=>dispatch(clearPost())
  }, [dispatch, user, currentUser,id]);

  console.log(posts,isFetching)

  let displaying = posts;

  if(isFetching && posts.length===0)return (<div id={css.container}><p>loading...</p></div>)
  else if(error) return (<div id={css.container}><p>error</p></div>)

  return (
    <div id={css.container}>

        <>
          {displaying &&
            displaying?.map((data,i) => (
              <CardPost
                key={data._id+"_"+i}
                title={data.title}
                shared={data.share}
                shareUser={data.shareUser}
                description={data.description}
                imgs={data.images}
                shares={data.shares}
                likes={data.likes}
                id={data._id}
                price={data.price}
                // categories={data.categories}
                userName={data.user.username}
                userPhoto={data.user.profilePhoto}
                userId={data.user._id}
                sold={data.sold}
                soldUser={data.soldUser}
                shoppedUser={data.shoppedUser}
                componentFather={"UserPost"}
              />
            ))}
        </>
      {/* <button>LOAD MORE</button> */}
    </div>
  );
}
