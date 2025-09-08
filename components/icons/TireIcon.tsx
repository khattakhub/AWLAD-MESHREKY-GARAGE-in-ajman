
import React from 'react';

const TireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 15.91a4.5 4.5 0 01-6.364 0 4.5 4.5 0 010-6.364 4.5 4.5 0 016.364 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-6.364-2.25L7.91 16.5m8.18-2.25L16.09 13.5m-8.18 2.25L5.636 18.364m12.728-12.728L16.09 7.91M7.91 7.91L5.636 5.636" />
  </svg>
);

export default TireIcon;
