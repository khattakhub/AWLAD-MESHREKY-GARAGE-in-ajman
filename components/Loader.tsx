import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-brand-dark z-[999]">
      <div className="w-12 h-12 border-4 border-brand-blue border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;