import React from 'react';
import { POLICIES } from '../constants';

const Privacy: React.FC = () => {
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
          <p>{POLICIES.privacy}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
