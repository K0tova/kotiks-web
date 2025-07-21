import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const NavLinks = () => (
    <>
      <Link to="/" className={styles["header-button"]} onClick={() => setOpen(false)}>Home</Link>
      <Link to="/contact" className={styles["header-button"]} onClick={() => setOpen(false)}>Contact</Link>
      <Link to="/more" className={styles["header-button"]} onClick={() => setOpen(false)}>More</Link>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={styles["header-overlay"]}>
        {/* Desktop nav */}
        <nav className={styles["header-nav"]}>
          <NavLinks />
        </nav>

        {/* Hamburger */}
        <button
          className={styles.menuButton}
          aria-label="Toggle navigation"
          aria-controls="nav-drawer"
          aria-expanded={open}
          onClick={toggle}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div id="nav-drawer" className={`${styles.mobileDrawer} ${open ? styles.open : ''}`}>
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
