import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Posts from './pages/HomePage';
import AboutMe from './pages/AboutPage';
import UserDetails from './pages/UserDetailPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/user-details/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
