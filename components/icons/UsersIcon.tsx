import React from 'react';

const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.51.056 1.02.082 1.5.082a2.25 2.25 0 012.25 2.25v1.148c0 .69-.157 1.36-.436 1.962M12 10.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM12 10.5a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0zM3.75 6.75a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-7.5z" />
  </svg>
);

export default UsersIcon;
