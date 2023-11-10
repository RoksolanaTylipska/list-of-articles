import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Header from './components/Header/Header.jsx';
import PostsList from './components/PostsList/PostsList.jsx';
import FeedsList from './components/FeedsList/FeedsList.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/feeds" element={<FeedsList />} />
      </Routes>
    </>
  );
}

export default App;