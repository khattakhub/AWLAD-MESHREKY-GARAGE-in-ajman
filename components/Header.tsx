
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import { useTheme } from '../ThemeContext';
// FIX: Switched to a namespace import for framer-motion to resolve type errors with motion props.
import * as FM from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => `transition ${isActive ? 'text-brand-blue' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`;
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) => `text-2xl font-semibold py-2 transition ${isActive ? 'text-brand-blue' : 'text-gray-300 hover:text-white'}`;

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <NavLink to="/services" className={mobile ? mobileNavLinkClasses : navLinkClasses}>Services</NavLink>
      <NavLink to="/tools" className={mobile ? mobileNavLinkClasses : navLinkClasses}>Tools</NavLink>
      <NavLink to="/blog" className={mobile ? mobileNavLinkClasses : navLinkClasses}>Blog</NavLink>
      <NavLink to="/contact" className={mobile ? mobileNavLinkClasses : navLinkClasses}>Contact</NavLink>
      <NavLink to="/admin" className={mobile ? mobileNavLinkClasses : navLinkClasses}>Admin</NavLink>
    </>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-brand-border transition-colors duration-300">
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold tracking-wider text-gray-900 dark:text-white">
              AWLAD MESHREKY
            </Link>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <NavLinks />
            </div>
            <div className="flex items-center space-x-2">
               <button 
                onClick={toggleTheme} 
                aria-label="Toggle theme" 
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-brand-card transition-colors"
              >
                {/* FIX: Replaced `AnimatePresence` with `FM.AnimatePresence` to use the namespaced import. */}
                <FM.AnimatePresence initial={false} mode="wait">
                  {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
                  <FM.motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="absolute"
                  >
                    {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                  </FM.motion.div>
                </FM.AnimatePresence>
              </button>
              <Link to="/booking" className="hidden md:inline-block bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">
                Book Appointment
              </Link>
              <div className="md:hidden">
                 <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    aria-label="Toggle menu" 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-card"
                 >
                   <MenuIcon className="w-6 h-6" />
                 </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* FIX: Replaced `AnimatePresence` with `FM.AnimatePresence` to use the namespaced import. */}
      <FM.AnimatePresence>
        {isMenuOpen && (
          <>
            {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
            <FM.motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
            <FM.motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-brand-dark shadow-lg z-50 flex flex-col p-6"
            >
                <div className="flex justify-between items-center mb-12">
                    <Link to="/" className="text-xl font-bold tracking-wider text-white">
                        AWLAD MESHREKY
                    </Link>
                    <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-gray-400 hover:text-white transition p-2 -mr-2">
                        <CloseIcon className="w-7 h-7" />
                    </button>
                </div>
              <nav className="flex flex-col space-y-6">
                <NavLinks mobile />
              </nav>
              <Link to="/booking" className="mt-auto bg-brand-blue hover:bg-brand-blue-hover text-white font-extrabold py-3 w-full text-center rounded-lg transition duration-300 text-base">
                  Book Appointment
              </Link>
            </FM.motion.div>
          </>
        )}
      </FM.AnimatePresence>
    </>
  );
};

export default Header;
