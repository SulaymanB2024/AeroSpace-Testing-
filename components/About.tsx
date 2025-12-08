
import React from 'react';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const LogisticsVisual = () => (
  <div className="absolute inset-0 bg-space-950 overflow-hidden">
    {/* Clean Network Nodes */}
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
         <defs>
            <radialGradient id="nodeGrad" cx="0.5" cy="0.5" r="0.5">
               <stop offset="0%" stopColor="white" stopOpacity="1" />
               <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
         </defs>
         {/* Generated Nodes */}
         {Array.from({ length: 8 }).map((_, i) => {
            const cx = Math.random() * 400;
            const cy = Math.random() * 600;
            return (
               <g key={i}>
                  <circle cx={cx} cy={cy} r="2" fill="white" />
                  <circle cx={cx} cy={cy} r="20" fill="url(#nodeGrad)" opacity="0.1" />
                  <line x1={cx} y1={cy} x2={200} y2={300} stroke="white" strokeWidth="0.5" opacity="0.1" />
               </g>
            )
         })}
      </svg>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-space-950/20" />
  </div>
);

const TimelineVisual = () => (
   <div className="flex justify-between items-center w-full mt-12 border-t border-white/10 pt-8 relative">
      <div className="absolute top-8 left-0 w-full h-[1px] bg-white/10" />
      {[
         { year: '1979', label: 'Founded' },
         { year: '1996', label: 'Facility Exp.' },
         { year: '2015', label: 'ISO 9001' },
         { year: '2025', label: 'Global Scale' }
      ].map((pt, i) => (
         <div key={i} className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-3 h-3 bg-space-950 border border-white/30 rounded-full" />
            <div className="text-white font-mono text-sm">{pt.year}</div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest hidden md:block">{pt.label}</div>
         </div>
      ))}
   </div>
);

export const About: React.FC = () => {
  return (
    <Section id="company">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-y border-white/10">
        
        {/* Left: Content Dashboard */}
        <div className="p-12 md:p-24 flex flex-col justify-center bg-space-900/10">
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent-gold uppercase mb-8">
               COMPANY PROFILE
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-medium text-white leading-[1.1] mb-8">
              Precision Distribution. <br />
              <span className="text-slate-600 font-serif italic">Since 1979.</span>
            </h3>
            <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg border-l border-white/10 pl-8">
              <motion.p variants={itemVariants}>
                Aerospace Fasteners Inc. is a leading distributor of aircraft fastening hardware and fittings for commercial and military aerospace applications. Based in Palestine, Texas, we have served the industry for over 45 years.
              </motion.p>
              <motion.p variants={itemVariants}>
                Our 34,000+ square foot facility spans three buildings, supporting barcode-managed inventory, kitting, and VMI programs. We are AS9100 Rev D and ISO 9001:2015 certified.
              </motion.p>
            </div>
            
            <TimelineVisual />
          </motion.div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {[
              { val: "1979", label: "Established", sub: "Family-owned" },
              { val: "34k", label: "Sq. Ft. Facility", sub: "Palestine, TX" },
              { val: "300+", label: "Global Clients", sub: "Commercial/Defense" },
              { val: "AS9100", label: "Certified", sub: "Rev D / ISO 9001" }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-3xl font-display font-medium text-white mb-2">{stat.val}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                <p className="text-xs text-slate-600">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Leadership Viewport */}
        <motion.div variants={itemVariants} className="relative min-h-[600px] bg-space-950 border-l border-white/10 flex flex-col justify-end overflow-hidden group">
           <LogisticsVisual />
           
           <div className="relative z-10 p-12 lg:p-24">
              <div className="border-t border-white/10 pt-8">
                 <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-8">
                   Leadership Team
                 </h4>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                   {[
                     { name: "Jason Elfarr", role: "President / Secretary" },
                     { name: "Carole Elfarr", role: "Vice President" },
                     { name: "Travis Link", role: "Quality / Warehouse Mgr" },
                     { name: "Kay Herod", role: "Office Manager" },
                     { name: "Vernon Fritze", role: "Director of Compliance" }
                   ].map((person, i) => (
                     <li key={i} className="group/item">
                       <span className="text-lg font-medium text-white block mb-1 group-hover/item:text-accent-gold transition-colors">{person.name}</span>
                       <span className="text-xs text-slate-500 uppercase tracking-wide">{person.role}</span>
                     </li>
                   ))}
                 </ul>
              </div>
           </div>
        </motion.div>
      </div>
    </Section>
  );
};
