

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import MenuIcon from '../../components/icons/MenuIcon';
// FIX: Switched to a namespace import for framer-motion to resolve type errors with motion props.
import * as FM from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../data/firebase';
import Loader from '../../components/Loader';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // NOTE: Auth guard is temporarily disabled.
    // This allows the demo login to work without a configured Firebase backend.
    // In a production app, the original Firebase auth check should be used.
    const timer = setTimeout(() => setIsLoading(false), 300); // Simulate a quick check
    return () => clearTimeout(timer);
    
    /*
    // Original Firebase Auth Guard:
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login', { replace: true });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
    */
  }, []);

  useEffect(() => {
      setSidebarOpen(false); // Close sidebar on route change
  }, [location.pathname]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-brand-dark text-gray-800 dark:text-gray-200">
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      {/* FIX: Replaced `AnimatePresence` with `FM.AnimatePresence` to use the namespaced import. */}
      <FM.AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
            <FM.motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
            <FM.motion.div
              className="fixed inset-y-0 left-0 z-50 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            >
              <AdminSidebar onLinkClick={() => setSidebarOpen(false)} />
            </FM.motion.div>
          </>
        )}
      </FM.AnimatePresence>
      
      <div className="flex-grow flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between h-16 bg-white dark:bg-brand-card border-b dark:border-brand-border px-6 sticky top-0 z-30">
          <Link to="/admin" className="text-lg font-bold tracking-wider text-gray-900 dark:text-white">
            ADMIN
          </Link>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 dark:text-gray-400">
            <MenuIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-grow p-6 sm:p-8 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;