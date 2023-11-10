import React, { useEffect, useState } from "react";
import "./PostsList.scss"
import PostItem from "../PostItem/PostItem.jsx";
import * as postServises from "../../api/posts.jsx";
import { Box, CircularProgress } from "@mui/material";
import NewPost from "../NewPost/NewPost.jsx";

function PostsList() {
  const userId = localStorage.getItem("userId");

  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    postServises.getPosts(userId) 
      .then((data) => {
        setPosts(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(
        setLoader(true)
      );
  // eslint-disable-next-line
  }, []);

  const handleDeletePost = (postId) => {
    postServises.deletePost(postId)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleAddPost = (newPost) => {
    postServises.addPost(newPost)
      .then((createdPost) => {
        setPosts((prevPosts) => [...prevPosts, createdPost]);
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  return (
    <div className="posts"> 
      <h2 className="posts__title">
        Hello! Here your list of posts!
      </h2>
      
      {loader ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <ul className="posts__lists">
            {posts &&
              posts.map((post, index) => (
                <li key={post.id}>
                  <PostItem post={post} handleDeletePost={handleDeletePost} />
                </li>
              ))}
          </ul>
          
          <NewPost handleAddPost={handleAddPost} />
        </>
      )}
    </div>
  );
}

export default PostsList;