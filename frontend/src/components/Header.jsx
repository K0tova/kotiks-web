import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="header-overlay">
      <h1>Olga Kotova</h1>
      <nav>
        <Link to="/contact" className="contact-button">Contact Me</Link>
      </nav>
    </div>
  </header>
);

export default Header;