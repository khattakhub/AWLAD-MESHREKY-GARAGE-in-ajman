
import React, { useEffect, useRef } from 'react';
import * as FM from 'framer-motion';
import WhatsappIcon from './icons/WhatsappIcon';

const WhatsappButton: React.FC = () => {
  const x = FM.useMotionValue(0);
  const y = FM.useMotionValue(0);
  const constraintsRef = useRef(null);
  const wasDragged = useRef(false);

  // Load position from localStorage on mount
  useEffect(() => {
    const savedTransform = localStorage.getItem('whatsapp-button-transform');
    if (savedTransform) {
      try {
        const { savedX, savedY } = JSON.parse(savedTransform);
        if (typeof savedX === 'number' && typeof savedY === 'number') {
          x.set(savedX);
          y.set(savedY);
        }
      } catch (e) {
        console.error("Could not parse whatsapp button position from localStorage", e);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleDragEnd = () => {
    // Save the final transform values to localStorage
    localStorage.setItem('whatsapp-button-transform', JSON.stringify({ savedX: x.get(), savedY: y.get() }));
  };

  return (
    // A container for drag constraints, covering the entire viewport.
    // It's not visible and doesn't interfere with clicks.
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-[49]">
      <FM.motion.a
        href="https://wa.me/971508361799"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-6 right-6 bg-whatsapp-green text-white rounded-full shadow-lg z-50 flex items-center justify-center w-16 h-16 cursor-grab active:cursor-grabbing pointer-events-auto"
        aria-label="Chat on WhatsApp (draggable)"
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        style={{ x, y }}
        onDragStart={() => {
            wasDragged.current = false;
        }}
        onDrag={(event, info) => {
            // If there's a noticeable drag, mark it as dragged.
            if (Math.abs(info.offset.x) > 2 || Math.abs(info.offset.y) > 2) {
                wasDragged.current = true;
            }
        }}
        onDragEnd={handleDragEnd}
        onClickCapture={(e) => {
            // If the button was dragged, prevent the default link navigation.
            // Using onClickCapture to stop event propagation early.
            if (wasDragged.current) {
                e.preventDefault();
                e.stopPropagation();
            }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        // The component keeps its base animation
        animate={{
          scale: [1, 1.05, 1],
        }}
      >
        <WhatsappIcon className="w-8 h-8" />
      </FM.motion.a>
    </div>
  );
};

export default WhatsappButton;