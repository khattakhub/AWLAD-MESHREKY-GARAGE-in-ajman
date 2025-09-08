import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Tools from './pages/Tools';
import CarLoanCalculator from './pages/CarLoanCalculator';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Blog from './pages/Blog';
import FuelCostEstimator from './pages/FuelCostEstimator';
import CarResaleValueEstimator from './pages/CarResaleValueEstimator';
import { ThemeProvider } from './ThemeContext';
import WhatsappButton from './components/WhatsappButton';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/car-loan-calculator" element={<CarLoanCalculator />} />
                <Route path="/tools/fuel-cost-estimator" element={<FuelCostEstimator />} />
                <Route path="/tools/car-resale-value-estimator" element={<CarResaleValueEstimator />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
        </AnimatePresence>
    );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="bg-white dark:bg-brand-dark text-gray-700 dark:text-gray-300 min-h-screen font-sans transition-colors duration-300">
          <Header />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-16"
          >
            <AnimatedRoutes />
          </motion.main>
          <Footer />
          <WhatsappButton />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;