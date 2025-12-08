import React from 'react';
import { ArrowRight, FileCheck, MapPin, Phone, Mail, Box } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-space-950 border-t border-white/10 relative overflow-hidden">
      {/* Decorative large background text */}
      <div className="absolute -top-10 left-0 text-[12rem] font-display font-bold text-white/[0.01] pointer-events-none select-none whitespace-nowrap z-0">
        AEROSPACE FASTENERS
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <a href="#home" className="flex flex-col group mb-8 w-fit">
                <span className="font-display font-bold text-2xl tracking-wider text-white">
                  AEROSPACE FASTENERS
                </span>
                <span className="font-display text-xs tracking-[0.3em] text-slate-400 uppercase">
                  Incorporated
                </span>
              </a>
              <p className="text-slate-400 font-light max-w-sm leading-relaxed mb-8">
                Leading distributor of aircraft fastening hardware for commercial and military aerospace applications. On time, every time. Defect free.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono border border-white/20 w-fit px-4 py-3 bg-white/[0.05]">
              <FileCheck className="w-4 h-4 text-accent-gold" />
              <span className="tracking-wide font-bold">AS9100 REV D | ISO 9001:2015</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2">
             <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-8">Company</h4>
             <ul className="space-y-4">
               {['About', 'Services', 'Partners', 'News', 'Careers'].map((item) => (
                 <li key={item}>
                   <a href={`#${item.toLowerCase() === 'about' ? 'company' : item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-accent-gold transition-colors block w-fit">
                     {item}
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Product Index Column */}
          <div className="md:col-span-2">
             <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-8">Hardware</h4>
             <ul className="space-y-4">
               {['Bolts', 'Screws', 'Nuts', 'Rivets', 'Fittings', 'Washers'].map((item) => (
                 <li key={item}>
                   <button 
                      onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm text-slate-400 hover:text-white transition-colors block w-fit text-left"
                   >
                     {item}
                   </button>
                 </li>
               ))}
               <li>
                 <a href="#products" className="text-xs font-bold text-accent-gold uppercase tracking-wider mt-4 block">
                    View Full Catalog
                 </a>
               </li>
             </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-8">Stay Informed</h4>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Quarterly briefings on supply chain trends and regulatory updates. Zero spam.
            </p>
            <form className="flex border-b border-white/20 pb-2 group focus-within:border-accent-gold transition-colors" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-600 flex-grow font-mono"
              />
              <button type="submit" className="text-slate-400 group-focus-within:text-accent-gold transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            
            <div className="mt-8 flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Facility: OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
             <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider">
               © 2025 Aerospace Fasteners Inc.
             </span>
             <a href="https://aerospacefasteners.com/wp-content/uploads/sites/4/2023/01/AS9100D-ISO-90012015-Cert-2022-2025.pdf" target="_blank" rel="noreferrer" className="text-[10px] text-accent-teal hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2">
               <Box className="w-3 h-3" /> Certificate Download
             </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
             <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-slate-600 hover:text-white transition-colors group">
               <MapPin className="w-3 h-3 group-hover:text-accent-gold" />
               Palestine, TX
             </a>
             <a href="tel:903-723-0693" className="flex items-center gap-2 text-[10px] text-slate-600 hover:text-white transition-colors group">
               <Phone className="w-3 h-3 group-hover:text-accent-gold" />
               903-723-0693
             </a>
             <a href="mailto:sales@afastinc.com" className="flex items-center gap-2 text-[10px] text-slate-600 hover:text-white transition-colors group">
               <Mail className="w-3 h-3 group-hover:text-accent-gold" />
               sales@afastinc.com
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};