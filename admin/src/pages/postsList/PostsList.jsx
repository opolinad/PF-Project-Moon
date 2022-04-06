import React, { useEffect, useState } from "react";
import "./postsList.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatablePosts from "../../components/datatablePosts/DatatablePosts";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/apiCalls/postsCall/postsCall";

const UsersList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getAllPosts(dispatch).then((response) => setisLoading(false));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatablePosts posts={posts} />
      </div>
    </div>
  );
};

export default UsersList;
