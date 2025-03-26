import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1>Olga - Senior Data Scientist</h1>
    <nav>
      <Link to="/contact">Contact Me</Link>
    </nav>
  </header>
);

export default Header;