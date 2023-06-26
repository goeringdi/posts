import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Импорт стилей, если они есть

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="Navbar">
      <button onClick={toggleMenu}>
        {isMenuOpen ? 'Close menu' : 'Open menu'}
      </button>
      
      {isMenuOpen && (
        <nav className="Navbar-menu">
          <img src="ava.jpg" alt="Your avatar" />
          <p>Your Name</p>
          <p>your-email@example.com</p>

          <ul>
            <li><Link to="/">Список постов</Link></li>
            <li><Link to="/about-me">Обо мне</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
