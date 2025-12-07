import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const MoireVisual = () => {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden pointer-events-none select-none mix-blend-screen opacity-60">
      
      {/* Radial Interference 1 */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 1000 1000" className="w-[160%] h-[160%]">
          {Array.from({ length: 90 }).map((_, i) => (
            <line 
              key={i}
              x1="500" y1="500"
              x2={500 + 800 * Math.cos(i * 4 * (Math.PI / 180))}
              y2={500 + 800 * Math.sin(i * 4 * (Math.PI / 180))}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </motion.div>

      {/* Radial Interference 2 - Counter Rotating */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-30"
        animate={{ rotate: -360 }}
        transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 1000 1000" className="w-[160%] h-[160%]">
          {Array.from({ length: 120 }).map((_, i) => (
            <line 
              key={i}
              x1="500" y1="500"
              x2={500 + 800 * Math.cos(i * 3 * (Math.PI / 180))}
              y2={500 + 800 * Math.sin(i * 3 * (Math.PI / 180))}
              stroke="#D4AF37"
              strokeWidth="0.25"
            />
          ))}
        </svg>
      </motion.div>

      {/* Central Geometric Structure */}
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-[400px] h-[400px] rounded-full border border-white/10 flex items-center justify-center relative">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-t border-r border-white/20 rounded-full"
            />
            <div className="w-[200px] h-[200px] rounded-full border border-white/5 flex items-center justify-center">
               <div className="w-1 h-1 bg-white rounded-full" />
            </div>
         </div>
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-space-950/40 to-space-950" />
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
              className="flex items-center gap-4 mb-16"
            >
               <div className="w-1.5 h-1.5 bg-accent-gold" />
               <span className="text-[10px] font-mono text-accent-gold uppercase tracking-[0.3em]">
                 Est. 1979
               </span>
               <div className="h-[1px] w-16 bg-white/10" />
               <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
                 Palestine, TX
               </span>
            </motion.div>
            
            <div className="relative mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium text-6xl md:text-8xl lg:text-[7rem] text-white leading-[0.9] tracking-tighter mix-blend-difference"
              >
                Mission
                <br />
                Critical
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-5xl md:text-7xl lg:text-[6rem] text-slate-500 leading-[1] mt-2 tracking-tight"
              >
                Aerospace.
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-slate-400 font-light max-w-lg leading-relaxed mb-16 border-l border-white/10 pl-6"
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
                className="group relative px-12 py-6 border border-white/20 text-white font-display font-bold uppercase tracking-[0.2em] text-xs hover:border-white transition-colors overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-space-950 transition-colors">Browse Hardware Catalog</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </button>
            </motion.div>
          </div>

          {/* Right Column / Kinetic Art */}
          <div className="hidden lg:flex lg:col-span-6 h-[90vh] relative items-center justify-center overflow-hidden mix-blend-lighten pointer-events-none">
             <div className="absolute right-[-10%] top-0 w-[120%] h-[120%]">
               <MoireVisual />
             </div>
          </div>

        </div>
      </div>
      
      {/* Interactive Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-space-950/50 backdrop-blur-sm py-4 px-6 md:px-12 flex justify-center items-center z-30">
        <motion.div 
          className="flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          whileHover={{ y: 5 }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
           <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </section>
  );
};