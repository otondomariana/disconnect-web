import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Close dropdown on outside click
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error('Failed to log out', error);
      }
    }
  };

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

          {currentUser ? (
            <>
              {isAdmin && (
                <li>
                  <Link to="/admin" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Admin Panel</Link>
                </li>
              )}
              <li className="nav-dropdown-container">
                <button
                  className="nav-dropdown-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <BiUser size={18} style={{ marginRight: '4px' }} />
                  {currentUser.displayName || currentUser.email.split('@')[0]} <FaChevronDown size={12} style={{ marginLeft: '4px' }} />
                </button>
                <div className={`nav-dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                  <button onClick={handleLogout} className="nav-dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MdLogout size={16} /> Cerrar sesión
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth" style={{ color: 'var(--text-dark)' }}>Identificarse</Link>
            </li>
          )}

          <li>
            {isHome ? (
              <a href="#download" className="btn-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiDownload size={16} /> Descargar
              </a>
            ) : (
              <Link to="/#download" className="btn-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiDownload size={16} /> Descargar
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
