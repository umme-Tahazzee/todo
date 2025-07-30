'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Subtext() {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text text-lg sm:text-xl mb-10 h-10 overflow-hidden ">
      <AnimatePresence mode="wait">
        <motion.p
          key={showFirst ? 'line1' : 'line2'}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-lg sm:text-xl mb-2 text-gray-300 tracking-widest"
        >
          {showFirst
            ? 'Where focus meets action.'
            : 'Your success starts here.'}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
