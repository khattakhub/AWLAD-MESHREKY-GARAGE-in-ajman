import React from 'react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, path }) => {
  return (
    <Link to={path} className="block bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-6 h-full transition-all duration-300 hover:border-brand-blue hover:shadow-lg hover:shadow-brand-blue/10 hover:-translate-y-2">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </Link>
  );
};

export default ToolCard;