import React from 'react';
import { ArrowRight, FileCheck, MapPin, Phone, Mail } from 'lucide-react';

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
          <div className="md:col-span-5 flex flex-col justify-between">
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
                Leading distributor of aircraft fastening hardware for commercial and military aerospace applications. On time every time, defect free.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono border border-white/20 w-fit px-4 py-3 bg-white/[0.05]">
              <FileCheck className="w-4 h-4 text-accent-gold" />
              <span className="tracking-wide font-bold">AS9100 REV D | ISO 9001:2015</span>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
             <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-8">Navigation</h4>
             <ul className="space-y-4">
               {['Company', 'Products', 'Services', 'Manufacturers', 'News', 'Contact'].map((item) => (
                 <li key={item}>
                   <a href={`#${item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-accent-gold transition-colors block w-fit">
                     {item}
                   </a>
                 </li>
               ))}
               <li>
                 <a href="https://aerospacefasteners.com/wp-content/uploads/sites/4/2023/01/AS9100D-ISO-90012015-Cert-2022-2025.pdf" target="_blank" rel="noreferrer" className="text-sm text-accent-teal hover:text-white transition-colors block w-fit mt-4 flex items-center gap-2">
                   <span className="w-1 h-1 bg-accent-teal rounded-full"></span>
                   Download ISO Certificate
                 </a>
               </li>
             </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-8">Contact</h4>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              255 N US 287, Palestine, TX 75803
            </p>
            <form className="flex border-b border-white/20 pb-2 group focus-within:border-accent-gold transition-colors" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="SUBSCRIBE FOR UPDATES" 
                className="bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-600 flex-grow font-mono"
              />
              <button type="submit" className="text-slate-400 group-focus-within:text-accent-gold transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider">
            © 2025 Aerospace Fasteners Incorporated. All Rights Reserved.
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