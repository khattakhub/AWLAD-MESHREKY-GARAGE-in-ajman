

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Tools from './pages/Tools';
import CarLoanCalculator from './pages/CarLoanCalculator';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import FuelCostEstimator from './pages/FuelCostEstimator';
import CarResaleValueEstimator from './pages/CarResaleValueEstimator';
import { ThemeProvider } from './ThemeContext';
import WhatsappButton from './components/WhatsappButton';
// FIX: Switched to a namespace import for framer-motion to resolve type errors with motion props.
import * as FM from 'framer-motion';

import { AdminLogin } from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminSubscribers from './pages/admin/AdminSubscribers';
import AdminServices from './pages/admin/AdminServices';
import AdminSettings from './pages/admin/AdminSettings';

import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Loader from './components/Loader';
import MobileBottomNav from './components/MobileBottomNav';


const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        // FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import.
        <FM.motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </FM.motion.div>
    );
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            <ScrollToTop />
            <div className="bg-white dark:bg-brand-dark text-gray-700 dark:text-gray-300 min-h-screen font-sans transition-colors duration-300">
                {!isAdminRoute && <Header />}
                <main className={`${!isAdminRoute ? 'pt-16' : ''} pb-16 md:pb-0`}>
                    {/* FIX: Replaced `AnimatePresence` with `FM.AnimatePresence` to use the namespaced import. */}
                    <FM.AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                            <Route path="/tools" element={<PageWrapper><Tools /></PageWrapper>} />
                            <Route path="/tools/car-loan-calculator" element={<PageWrapper><CarLoanCalculator /></PageWrapper>} />
                            <Route path="/tools/fuel-cost-estimator" element={<PageWrapper><FuelCostEstimator /></PageWrapper>} />
                            <Route path="/tools/car-resale-value-estimator" element={<PageWrapper><CarResaleValueEstimator /></PageWrapper>} />
                            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                            <Route path="/booking" element={<PageWrapper><Booking /></PageWrapper>} />
                            <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
                            <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
                            <Route path="/refund" element={<PageWrapper><Refund /></PageWrapper>} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin" element={<AdminLayout />}>
                                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="appointments" element={<AdminAppointments />} />
                                <Route path="subscribers" element={<AdminSubscribers />} />
                                <Route path="services" element={<AdminServices />} />
                                <Route path="settings" element={<AdminSettings />} />
                            </Route>
                        </Routes>
                    </FM.AnimatePresence>
                </main>
                {!isAdminRoute && location.pathname === '/' && <Footer />}
                {!isAdminRoute && <WhatsappButton />}
                {!isAdminRoute && <MobileBottomNav />}
            </div>
        </>
    );
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for a better user experience on fast connections
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <HashRouter>
        {/* FIX: Replaced `AnimatePresence` with `FM.AnimatePresence` to use the namespaced import. */}
        <FM.AnimatePresence>
          {isLoading && (
            // FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import.
            <FM.motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Loader />
            </FM.motion.div>
          )}
        </FM.AnimatePresence>
        {!isLoading && <AppContent />}
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;