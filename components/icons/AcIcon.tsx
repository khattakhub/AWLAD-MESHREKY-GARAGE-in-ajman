
import React from 'react';

const AcIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6.75-9H18.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636l12.728 12.728m-12.728 0L18.364 5.636" />
  </svg>
);

export default AcIcon;
