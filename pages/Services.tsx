import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Our Automotive Services</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-16">
          We provide a full range of services to keep your vehicle in peak condition, delivered by certified expert technicians.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {SERVICES.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon}
              title={service.title}
              description={service.description}
              link="/booking"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
