import React from 'react';

const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.534a.75.75 0 01-.806-.748l.005-4.286a.75.75 0 01.748-.806l3.722-.534zM15.75 8.511v4.286c0 .884.616 1.648 1.448 1.826l3.722.534a.75.75 0 01.806.748l-.005 4.286a.75.75 0 01-.748.806l-3.722-.534a2.25 2.25 0 01-1.98-2.193v-4.286c0-1.136.847-2.1 1.98-2.193l3.722-.534z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m15-7.5v-1.5a3 3 0 10-6 0v1.5a3 3 0 106 0z" transform="translate(-1, 0)"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5a3 3 0 106 0v-1.5a3 3 0 10-6 0v1.5z" />
  </svg>
);

export default ChatBubbleIcon;
