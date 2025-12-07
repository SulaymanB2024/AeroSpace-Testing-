import React from 'react';
import { Section } from './ui/Section';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

// Consolidated list from source
const brands = [
  "Howmet Aerospace", "Shur-Lok", "Freudenberg", "Eaton", 
  "Boeing", "Pratt & Whitney", "Airbus", "Honeywell",
  "3V Fastening", "Aerofit", "Airdrome Precision", "Allan Aircraft",
  "Amatom", "Anillo Industries", "Avdel", "Avibank",
  "B&B Specialties", "Bristol Industries", "California Screw", "CBS Fasteners",
  "Crescent Mfg", "Greene Tweed", "Heartland Precision", "Ideal Fasteners",
  "Mac Fasteners", "MacLean-ESNA", "Moeller", "National Rivet",
  "Parker Seal", "Permaswage", "Smalley", "Spirol", "SPS Technologies"
];

const marqueeList = [...brands, ...brands];

export const Manufacturers: React.FC = () => {
  return (
    <div id="manufacturers" className="w-full py-32 bg-space-950 border-y border-white/5 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-20">
         <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-[1px] w-12 bg-accent-gold/30" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent-gold uppercase">
              Featured Manufacturers
            </span>
            <div className="h-[1px] w-12 bg-accent-gold/30" />
         </div>
         <h3 className="text-3xl md:text-5xl font-display font-medium text-white text-center mb-6">
           Authorized & Trusted Partners
         </h3>
         <p className="text-slate-500 font-light text-sm text-center max-w-2xl mx-auto">
           We maintain active authorized distribution agreements with critical manufacturers to ensure supply chain integrity.
         </p>
      </div>

      <div className="relative w-full border-y border-white/5 bg-space-900/30 py-12">
        {/* Vignette Gradients */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-space-950 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-space-950 to-transparent z-10" />
        
        {/* Infinite Scroll Wrapper */}
        <div className="flex overflow-hidden">
          <div className="animate-scroll flex gap-16 whitespace-nowrap pl-24">
             {marqueeList.map((brand, idx) => (
               <div key={idx} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-all duration-500 cursor-default group">
                 <span className="text-2xl md:text-4xl text-slate-300 font-display font-medium tracking-tight">
                   {brand}
                 </span>
                 <span className="w-1 h-1 bg-accent-gold rounded-full opacity-50" />
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <button className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-widest text-slate-400 hover:text-white transition-colors border-b border-white/10 hover:border-accent-gold pb-1">
           View Full Line Card <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};