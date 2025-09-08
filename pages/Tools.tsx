import React from 'react';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../constants';
import { motion, Variants } from 'framer-motion';

// FIX: Separated container and item variants to resolve framer-motion type error.
// The container variant is responsible for orchestrating the staggering of child animations.
const containerVariants: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// The item variant defines the animation for each individual tool card.
const itemVariants: Variants = {
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

const Tools: React.FC = () => {
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Automotive Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-16">
          Empowering you with the right tools to make informed decisions about your vehicle.
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-5xl mx-auto"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TOOLS.map((tool, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ToolCard 
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                path={tool.path}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Tools;