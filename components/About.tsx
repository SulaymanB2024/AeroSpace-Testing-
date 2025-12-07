import React, { useRef, useState } from 'react';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const LogisticsVisual = () => (
  <div className="absolute inset-0 bg-space-950 overflow-hidden">
    {/* Abstract Node Network */}
    <svg className="w-full h-full opacity-30" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Connecting Lines */}
      <motion.path 
        d="M 50 100 L 200 150 L 350 100 M 200 150 L 200 400 M 50 500 L 200 400 L 350 500" 
        stroke="#D4AF37" 
        strokeWidth="0.5" 
        fill="none"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Nodes */}
      {[
        { cx: 50, cy: 100 }, { cx: 200, cy: 150 }, { cx: 350, cy: 100 },
        { cx: 200, cy: 400 },
        { cx: 50, cy: 500 }, { cx: 350, cy: 500 }
      ].map((node, i) => (
        <motion.g key={i}>
          <circle cx={node.cx} cy={node.cy} r="2" fill="#D4AF37" />
          <circle cx={node.cx} cy={node.cy} r="6" stroke="white" strokeWidth="0.5" opacity="0.3" />
        </motion.g>
      ))}
    </svg>
    
    {/* Radial Overlay */}
    <div className="absolute inset-0 bg-radial-gradient from-transparent via-space-950/80 to-space-950" />
  </div>
);

export const About: React.FC = () => {
  return (
    <Section id="company">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-y border-white/10">
        
        {/* Left: Content Dashboard */}
        <div className="p-12 md:p-20 flex flex-col justify-center relative bg-space-900/10">
          <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-white/10" />
          
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-[9px] font-mono font-bold tracking-[0.3em] text-accent-gold uppercase mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-accent-gold rounded-full" /> COMPANY_PROFILE
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-medium text-white leading-[1.1] mb-8">
              Precision Distribution. <br />
              <span className="text-slate-600">Since 1979.</span>
            </h3>
            <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg pl-6 border-l border-white/10">
              <motion.p variants={itemVariants}>
                Aerospace Fasteners Inc. is a leading distributor of aircraft fastening hardware and fittings for commercial and military aerospace applications. Based in Palestine, Texas, we have served the industry for over 45 years.
              </motion.p>
              <motion.p variants={itemVariants}>
                Our 34,000+ square foot facility spans three buildings, supporting barcode-managed inventory, kitting, and VMI programs. We are AS9100 Rev D and ISO 9001:2015 certified, maintaining strict quality control for our 300+ customers worldwide.
              </motion.p>
            </div>
          </motion.div>
          
          {/* Stats Grid - Enhanced */}
          <div className="grid grid-cols-2 gap-1 mt-auto bg-white/5 border border-white/5 p-1">
            {[
              { val: "1979", label: "Established", sub: "Family-owned" },
              { val: "34k", label: "Sq. Ft. Facility", sub: "Palestine, TX" },
              { val: "300+", label: "Global Clients", sub: "Commercial/Defense" },
              { val: "ITAR", label: "Compliant", sub: "AS9100 Rev D" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants} 
                className="p-6 bg-space-950 hover:bg-space-900 transition-colors group"
              >
                <div className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent-gold transition-colors">{stat.val}</div>
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                <p className="text-[9px] text-slate-600 leading-tight font-light">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Tactical Viewport */}
        <motion.div variants={itemVariants} className="relative min-h-[600px] bg-space-950 border-l border-white/10 overflow-hidden group flex flex-col justify-end">
           {/* Technical Background */}
           <LogisticsVisual />
           
           {/* Management Team Overlay */}
           <div className="relative z-10 p-12 lg:p-20 bg-gradient-to-t from-space-950 via-space-950/95 to-transparent">
              <div className="border-t border-white/20 pt-8">
                 <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                   <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-pulse" />
                   Leadership Team
                 </h4>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                   {[
                     { name: "Jason Elfarr", role: "President / Secretary" },
                     { name: "Carole Elfarr", role: "Vice President" },
                     { name: "Travis Link", role: "Quality / Warehouse Mgr" },
                     { name: "Kay Herod", role: "Office Manager" },
                     { name: "Vernon Fritze", role: "Director of Compliance", highlight: true }
                   ].map((person, i) => (
                     <li key={i} className={`group cursor-crosshair ${person.highlight ? 'col-span-1 md:col-span-2 pt-6 mt-2 border-t border-white/5' : ''}`}>
                       <span className="text-base font-medium text-white block group-hover:text-accent-gold transition-colors font-display">{person.name}</span>
                       <span className={`text-[9px] font-mono uppercase tracking-wider ${person.highlight ? 'text-accent-teal' : 'text-slate-500'}`}>{person.role}</span>
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