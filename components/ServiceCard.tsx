import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  const content = (
    <>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
      {link && (
        <div className="mt-auto pt-4">
          <span className="text-brand-blue font-semibold text-sm hover:underline">
            Learn More &rarr;
          </span>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-6 flex flex-col h-full transition-all duration-300 hover:border-brand-blue hover:shadow-lg hover:shadow-brand-blue/10 hover:-translate-y-2">
      {link ? <Link to={link} className="flex flex-col h-full">{content}</Link> : content}
    </div>
  );
};

export default ServiceCard;