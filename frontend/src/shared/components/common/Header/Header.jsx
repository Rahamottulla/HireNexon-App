import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = (path) =>
    `text-sm font-medium transition ${
      location.pathname === path
        ? "text-blue-600 border-b-2 border-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/public/hi.png"
              alt="HireNexon"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/candidates" className={navLinkClass("/candidates")}>
              For Candidates
            </Link>
            <Link to="/employers" className={navLinkClass("/employers")}>
              For Employers
            </Link>
            <Link to="/universities" className={navLinkClass("/universities")}>
              For Universities
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Post a Free Job
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/candidates"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              For Candidates
            </Link>
            <Link
              to="/employers"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              For Employers
            </Link>
            <Link
              to="/universities"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              For Universities
            </Link>

            <div className="pt-3 border-t flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700"
              >
               Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-center"
              >
                Post a Free Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
