import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1: Initial line draw (0ms)
    // Phase 2: Text Reveal (800ms)
    // Phase 3: Loading Bar (2000ms)
    // Phase 4: Exit (3500ms)
    
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => {
        setPhase(3);
        setTimeout(onComplete, 1000); // Wait for exit animation
      }, 3500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-space-950 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="relative w-64 md:w-96">
        {/* Animated Center Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-[1px] bg-white w-full mb-8 origin-center"
        />

        {/* Main Title */}
        <div className="overflow-hidden h-16 md:h-20 mb-2 flex items-center justify-center">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: phase >= 1 ? 0 : 100 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-3xl md:text-5xl tracking-widest text-white uppercase text-center"
          >
            Elfarr
          </motion.h1>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden h-8 flex items-center justify-center">
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: phase >= 1 ? 0 : 50, opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-display text-xs md:text-sm tracking-[0.5em] text-accent-gold uppercase"
          >
            Aerospace
          </motion.p>
        </div>

        {/* Loading / System Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          className="absolute -bottom-24 left-0 right-0 flex flex-col items-center gap-2"
        >
           <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
             System Initialization
           </div>
           <div className="w-full h-[2px] bg-space-800 rounded-full overflow-hidden">
             <motion.div 
               initial={{ x: '-100%' }}
               animate={{ x: phase >= 2 ? '0%' : '-100%' }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="h-full bg-slate-500 w-full"
             />
           </div>
           <div className="flex justify-between w-full text-[9px] font-mono text-slate-600">
             <span>MEM_OK</span>
             <span>SYS_RDY</span>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
