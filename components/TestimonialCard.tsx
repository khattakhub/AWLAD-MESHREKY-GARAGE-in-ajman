import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, title }) => {
  return (
    <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-6 h-full flex flex-col">
      <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{quote}"</p>
      <div className="mt-auto">
        <p className="font-bold text-gray-900 dark:text-white">{author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
