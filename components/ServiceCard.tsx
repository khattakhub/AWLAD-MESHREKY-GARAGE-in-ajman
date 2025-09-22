import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  // FIX: Updated the 'icon' prop type to be more specific, allowing 'className' to be passed during cloning.
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  const bookingUrl = link ? `${link}?service=${encodeURIComponent(title)}` : '';

  const prominentIcon = React.cloneElement(icon, {
    className: 'w-10 h-10 text-brand-blue',
  });

  const content = (
    <>
      <div className="mb-6 inline-block rounded-full bg-brand-blue/10 p-4 transition-transform duration-300 group-hover:scale-110 dark:bg-brand-blue/20">
        {prominentIcon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
      {link && (
        <div className="mt-auto pt-4">
          <div className="inline-block bg-transparent border border-brand-blue text-brand-blue font-semibold text-sm py-2 px-4 rounded-lg group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
            Book Now &rarr;
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="group bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/10 hover:-translate-y-2 border-l-4 border-l-brand-blue">
      {link ? <Link to={bookingUrl} className="flex flex-col h-full">{content}</Link> : content}
    </div>
  );
};

export default ServiceCard;