import React from 'react';
import Navbar from './components/NavBar/Navbar';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Authentication/SignIn';
import SignUpPage from './pages/Authentication/SignUp';
import Profile from './pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
