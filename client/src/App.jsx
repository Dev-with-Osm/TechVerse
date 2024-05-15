import React from 'react';
import Navbar from './components/NavBar/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Authentication/SignIn';
import SignUpPage from './pages/Authentication/SignUp';
import Profile from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PageNotFound from './pages/PageNotFound';
import AboutPage from './pages/AboutPage';
import AddPost from './pages/AddPostPage';
import PostPage from './pages/PostPage';
import UserPosts from './pages/UserPosts';
import EditPost from './pages/EditPost';
import PostsPage from './pages/PostsPage';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="edit-post/:postId" element={<EditPost />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/new-post" element={<AddPost />} />
            <Route path="/my-posts" element={<UserPosts />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
