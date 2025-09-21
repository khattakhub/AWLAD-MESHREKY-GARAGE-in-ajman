import React from 'react';
import { getPolicies } from '../data/store';

const Terms: React.FC = () => {
  const policies = getPolicies();
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
          <p>{policies.terms}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;