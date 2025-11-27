import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="hirenexon-logo">
            <img src="/images/hi.png" alt="HireNexon" />
            {/* Removed the text span */}
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            
            <Link to="/employers" className={location.pathname === '/employers' ? 'active' : ''}>For Employers</Link>
          </nav>
          
          <div className="header-actions">
            <Link to="/login" className="btn-login">Sign in</Link>
            <Link to="/register" className="btn btn-primary">Post a Job</Link>
          </div>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
