import React from 'react';
import { motion } from 'framer-motion';
import WhatsappIcon from './icons/WhatsappIcon';

const WhatsappButton: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/971508361799"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-whatsapp-green text-white rounded-full shadow-lg z-50 flex items-center overflow-hidden cursor-pointer"
      aria-label="Chat on WhatsApp"
      whileHover="hover"
      initial="rest"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
        <WhatsappIcon className="w-8 h-8" />
      </div>
      <motion.span
        className="font-semibold text-base pr-6 whitespace-nowrap"
        variants={{
          rest: { opacity: 0, width: 0, x: -10 },
          hover: { opacity: 1, width: 'auto', x: 0 }
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Chat with us
      </motion.span>
    </motion.a>
  );
};

export default WhatsappButton;
