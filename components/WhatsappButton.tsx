import React from 'react';
import { motion } from 'framer-motion';
import WhatsappIcon from './icons/WhatsappIcon';

const WhatsappButton: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/971508361799"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 right-6 bg-whatsapp-green text-white rounded-full shadow-lg z-50 flex items-center justify-center w-16 h-16 cursor-pointer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      animate={{
        scale: [1, 1.05, 1],
      }}
    >
      <WhatsappIcon className="w-8 h-8" />
    </motion.a>
  );
};

export default WhatsappButton;