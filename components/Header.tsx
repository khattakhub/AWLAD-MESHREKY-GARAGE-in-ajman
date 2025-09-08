import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';
import { useTheme } from '../ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold tracking-wider text-gray-900 dark:text-white">
            AWLAD MESHREKY
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <NavLink to="/services" className={({ isActive }) => `transition ${isActive ? 'text-brand-blue' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Services</NavLink>
            <NavLink to="/tools" className={({ isActive }) => `transition ${isActive ? 'text-brand-blue' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Tools</NavLink>
            <NavLink to="/blog" className={({ isActive }) => `transition ${isActive ? 'text-brand-blue' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Blog</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `transition ${isActive ? 'text-brand-blue' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Contact</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
            <Link to="/booking" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">
              Book Appointment
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
