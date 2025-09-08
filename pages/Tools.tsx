import React from 'react';
import ToolCard from '../components/ToolCard';
import { TOOLS } from '../constants';

const Tools: React.FC = () => {
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Automotive Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-16">
          Empowering you with the right tools to make informed decisions about your vehicle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          {TOOLS.map((tool, index) => (
            <ToolCard 
              key={index} 
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              path={tool.path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
