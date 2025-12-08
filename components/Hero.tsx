
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const MoireVisual = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const rotateScroll = useTransform(scrollY, [0, 1000], [0, 90]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX / window.innerWidth - 0.5) * 15, 
      y: (clientY / window.innerHeight - 0.5) * 15 
    });
  };

  return (
    <div 
      className="relative w-full h-[800px] flex items-center justify-center overflow-hidden pointer-events-auto mix-blend-screen opacity-60"
      onMouseMove={handleMouseMove}
    >
      
      {/* Slow Rotating Ring A - Reacts to Scroll */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-40"
        style={{ rotate: rotateScroll }}
        animate={{ 
          x: mousePos.x * -1,
          y: mousePos.y * -1 
        }}
        transition={{ 
          x: { type: "spring", stiffness: 50 },
          y: { type: "spring", stiffness: 50 }
        }}
      >
        <svg viewBox="0 0 1000 1000" className="w-[140%] h-[140%] animate-[spin_60s_linear_infinite]">
          {Array.from({ length: 60 }).map((_, i) => (
            <line 
              key={i}
              x1="500" y1="500"
              x2={500 + 800 * Math.cos(i * 6 * (Math.PI / 180))}
              y2={500 + 800 * Math.sin(i * 6 * (Math.PI / 180))}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </motion.div>

      {/* Counter Rotating Ring B */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-30"
        animate={{ 
          x: mousePos.x,
          y: mousePos.y
        }}
        transition={{ 
           x: { type: "spring", stiffness: 50 },
           y: { type: "spring", stiffness: 50 }
        }}
      >
        <svg viewBox="0 0 1000 1000" className="w-[140%] h-[140%] animate-[spin_80s_linear_infinite_reverse]">
          {Array.from({ length: 80 }).map((_, i) => (
            <line 
              key={i}
              x1="500" y1="500"
              x2={500 + 800 * Math.cos(i * 4.5 * (Math.PI / 180))}
              y2={500 + 800 * Math.sin(i * 4.5 * (Math.PI / 180))}
              stroke="#D4AF37"
              strokeWidth="0.25"
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-space-950/60 to-space-950 pointer-events-none" />
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col pt-20 border-b border-white/5 overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-[0.02]" />

      <div className="container mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full items-center">
          
          {/* Main Typography Column */}
          <div className="lg:col-span-6 py-20 relative z-20 flex flex-col justify-center h-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-12"
            >
               <div className="w-1.5 h-1.5 bg-accent-gold" />
               <span className="text-[10px] font-mono text-accent-gold uppercase tracking-[0.2em]">
                 Est. 1979
               </span>
               <div className="h-[1px] w-12 bg-white/10" />
               <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
                 Palestine, TX
               </span>
            </motion.div>
            
            <div className="relative mb-10">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium text-5xl md:text-7xl lg:text-[6.5rem] text-white leading-[0.9] tracking-tighter"
              >
                Mission-
                <br />
                Critical
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-4xl md:text-6xl lg:text-[5.5rem] text-slate-500 leading-[1.0] mt-2 tracking-tight"
              >
                Aerospace Distribution.
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-slate-400 font-light max-w-lg leading-relaxed mb-12 pl-1"
            >
              Global logistics and precision inventory management for the world's most demanding flight programs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-space-950 font-display font-bold uppercase tracking-[0.15em] text-xs hover:bg-slate-200 transition-colors"
              >
                Access Inventory
              </button>
            </motion.div>
          </div>

          {/* Right Column / Kinetic Art */}
          <div className="hidden lg:flex lg:col-span-6 h-[90vh] relative items-center justify-center overflow-hidden">
             <div className="absolute right-[-20%] top-0 w-[140%] h-[140%]">
               <MoireVisual />
             </div>
          </div>

        </div>
      </div>
      
      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <motion.div 
          className="flex flex-col items-center gap-2 opacity-30"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
           <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </section>
  );
};
