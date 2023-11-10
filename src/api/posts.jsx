import { client } from './fetch.jsx';

export const getPosts = (userId) => {
  return client.get(`/posts?userId=${userId}`);
};

export const addPost = (newPost) => {
  return client.post('/posts', newPost);
};

export const deletePost = (postId) => {
  return client.delete(`/posts/${postId}`);
};

export const updatePost = (postId, payload) => {
  return client.patch(`/posts/${postId}`, payload);
};