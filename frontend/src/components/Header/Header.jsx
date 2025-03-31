import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles["header-overlay"]}>
      <nav className={styles["header-nav"]}>
        <Link to="/" className={styles["header-button"]}>Home</Link>
        <Link to="/contact" className={styles["header-button"]}>Contact</Link>
        <Link to="/more" className={styles["header-button"]}>More</Link>
      </nav>
    </div>
  </header>
);

export default Header;