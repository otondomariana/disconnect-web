import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          Disconnect
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            {isHome ? (
              <a href="#what-is">Qué es</a>
            ) : (
              <Link to="/#what-is">Qué es</Link>
            )}
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            {isHome ? (
              <a href="#download" className="btn-nav">Descargar</a>
            ) : (
              <Link to="/#download" className="btn-nav">Descargar</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
