import React, { useState } from 'react';
import "./PostItem.scss";
import { Box, CircularProgress } from '@mui/material';

function PostItem({ post, handleDeletePost }) {
  const { title, body, id } = post;
  const [loader, setLoader] = useState(false);

  const handleDelete = (id) => {
    handleDeletePost(id);
    setLoader(true);
  }

  return (
    <div className="post">
      {loader ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <button 
            className="post__delete-button" 
            onClick={() => handleDelete(id)}>
            X
          </button>
          <h6 className="post__title">{title}</h6>
          <p className="post__body">{body}</p>
        </>
      )}
    </div>
  );
}

export default PostItem;