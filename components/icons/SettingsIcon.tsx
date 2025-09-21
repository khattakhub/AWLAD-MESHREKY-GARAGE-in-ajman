import React from 'react';

const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226a2.25 2.25 0 012.58 1.226c.294.956.986 1.64 1.908 1.908 1.053.304 2.112.122 2.898-.598.977-.893 2.383-.43 2.954.767a2.25 2.25 0 01-1.343 3.197.826.826 0 00-.54.678 2.25 2.25 0 01-4.085 1.58.826.826 0 00-.48-.567 2.25 2.25 0 01-2.924 0 .826.826 0 00-.48.567 2.25 2.25 0 01-4.085-1.58.826.826 0 00-.54-.678 2.25 2.25 0 01-1.343-3.197c.571-1.197 1.977-1.66 2.954-.767.786.72 1.845.902 2.898.598 1.053-.304 1.614-1.042 1.908-1.908z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default SettingsIcon;