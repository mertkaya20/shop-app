import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-stone-50 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center gap-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="font-serif text-xl font-semibold tracking-tight text-stone-900 mr-auto"
        >
          Cart<span className="text-amber-600">ify</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm tracking-wide transition-colors duration-200 ${
                isActive
                  ? "text-stone-900 font-medium"
                  : "text-stone-500 hover:text-stone-900"
              }`
            }
          >
            Home
          </NavLink>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative text-stone-800 hover:text-amber-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-medium w-4.5 h-4.5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="text-sm font-medium text-stone-800 border border-stone-200 px-5 py-2 rounded hover:border-stone-900 transition-colors duration-200"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="text-sm font-medium text-stone-50 bg-stone-900 px-5 py-2 rounded hover:bg-amber-700 transition-colors duration-200"
          >
            Register
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden ml-auto flex flex-col gap-1.25 p-1"
        >
          <span
            className={`block w-6 h-[1.5px] bg-stone-900 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-stone-900 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-stone-900 transition-all duration-300 ${
              menuOpen ? "-rotate-45 translate-y-[-6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64 border-t border-stone-200" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-sm tracking-wide ${
                isActive ? "text-stone-900 font-medium" : "text-stone-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-sm tracking-wide ${
                isActive ? "text-stone-900 font-medium" : "text-stone-500"
              }`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/login"
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-sm tracking-wide ${
                isActive ? "text-stone-900 font-medium" : "text-stone-500"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-sm tracking-wide ${
                isActive ? "text-stone-900 font-medium" : "text-stone-500"
              }`
            }
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
