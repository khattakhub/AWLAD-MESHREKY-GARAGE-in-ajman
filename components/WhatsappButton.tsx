import React from 'react';
import WhatsappIcon from './icons/WhatsappIcon';

const WhatsappButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/971508361799"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-whatsapp-green hover:bg-whatsapp-green-hover text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon className="w-8 h-8" />
    </a>
  );
};

export default WhatsappButton;