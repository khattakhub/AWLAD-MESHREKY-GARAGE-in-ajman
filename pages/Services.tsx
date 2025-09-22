import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { getServices } from '../data/store';
import { Link } from 'react-router-dom';
// FIX: Removed `Variants` from import to fix type resolution error.
import { motion } from 'framer-motion';
import { iconMap } from '../components/icons';

// FIX: Separated container and item variants to resolve framer-motion type error.
// The container variant is responsible for orchestrating the staggering of child animations.
// FIX: Removed `: Variants` annotation to allow TypeScript to infer the type.
const containerVariants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// The item variant defines the animation for each individual service card.
// FIX: Removed `: Variants` annotation to allow TypeScript to infer the type.
const itemVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    }
  }
};

const Services: React.FC = () => {
  const services = getServices();

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Our Automotive Services</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-16">
          We provide a full range of services to keep your vehicle in peak condition, delivered by certified expert technicians.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
             <motion.div key={index} variants={itemVariants}>
              <ServiceCard 
                icon={React.createElement(iconMap[service.iconName], { className: 'w-8 h-8 text-brand-blue' })}
                title={service.title}
                description={service.description}
                link="/booking"
              />
             </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;