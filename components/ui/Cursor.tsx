
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text'>('default');
  const [label, setLabel] = useState('');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine cursor state based on element type
      if (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A' || target.closest('a')) {
        setHoverState('pointer');
        setLabel('VIEW');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setHoverState('text');
        setLabel('TYPE');
      } else if (target.classList.contains('cursor-pointer')) {
        setHoverState('pointer');
        setLabel('SELECT');
      } else {
        setHoverState('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <style>{`
        body, a, button, input, textarea { cursor: none !important; }
      `}</style>
      
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {/* Main Reticle */}
        <motion.div
          className="absolute top-0 left-0 mix-blend-difference"
          animate={{
            x: position.x - 16,
            y: position.y - 16,
            scale: hoverState !== 'default' ? 1.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.5
          }}
        >
          <div className="relative w-8 h-8">
            {/* Rotating Ring */}
            <motion.div 
              className="absolute inset-0 border border-white rounded-full opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-1 h-1 bg-white rounded-full" />
            </div>
            
            {/* Active State Ring */}
            <AnimatePresence>
              {hoverState !== 'default' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-[-4px] border border-accent-gold rounded-full opacity-50"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating Label */}
        <motion.div
          className="absolute top-0 left-0 ml-6 mt-6 pointer-events-none mix-blend-difference"
          animate={{
            x: position.x,
            y: position.y,
            opacity: label ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
        >
           <div className="flex items-center gap-2">
             <div className="h-[1px] w-4 bg-white" />
             <span className="text-[10px] font-mono font-bold text-white tracking-widest">{label}</span>
           </div>
        </motion.div>
      </div>
    </>
  );
};
    