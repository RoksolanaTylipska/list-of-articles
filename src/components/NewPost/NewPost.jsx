import React, { useState } from 'react';
import './NewPost.scss';
import { Button } from '@mui/material';

function NewPost({ handleAddPost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [inputError, setInputError] = useState(false)

  const userId = localStorage.getItem("userId");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createPost = (event) => {
    event.preventDefault();
    const newTitle = newPostTitle.trim();

    if (!newTitle) {
      setInputError("Title cant be empty")
    }

    if (newTitle) {
      const newPost = {
        id: Date.now(),
        userId: userId,
        title: newTitle,
        body: newPostBody,
      };

      handleAddPost(newPost);

      setNewPostTitle("");
      setNewPostBody("");
      closeModal();
    }
  };

  return (
    <>
      <Button onClick={openModal} variant="outlined">Add a Post</Button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h2>Create a New Post</h2>
            <form>
              <label htmlFor="modal__title">Title:</label>
              <input type="text" id="title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
              <label className="login__error">{inputError}</label>


              <label htmlFor="body">Body:</label>
              <textarea value={newPostBody} onChange={(e) => setNewPostBody(e.target.value)} id="body"></textarea>

              <Button onClick={closeModal} variant="outlined">Cancel</Button>
              <Button onClick={createPost} variant="contained">Create Post</Button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewPost;