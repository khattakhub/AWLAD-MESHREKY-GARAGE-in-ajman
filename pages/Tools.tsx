
import React from 'react';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../constants';
// FIX: Switched to a namespace import for framer-motion to resolve type errors with motion props.
import * as FM from 'framer-motion';
import { iconMap } from '../components/icons';

// FIX: Re-added explicit Variants type to improve type safety and resolve inference issues.
const containerVariants: FM.Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// FIX: Re-added explicit Variants type to improve type safety and resolve inference issues.
const itemVariants: FM.Variants = {
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
        {/* FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import. */}
        <FM.motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-5xl mx-auto"
          variants={containerVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TOOLS.map((tool, index) => (
            // FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import.
            <FM.motion.div key={index} variants={itemVariants}>
              <ToolCard 
                icon={React.createElement(iconMap[tool.iconName], { className: 'w-8 h-8 text-brand-blue' })}
                title={tool.title}
                description={tool.description}
                path={tool.path}
              />
            </FM.motion.div>
          ))}
        </FM.motion.div>
      </div>
    </div>
  );
};

export default Tools;