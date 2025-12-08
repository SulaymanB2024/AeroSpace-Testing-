import React, { useState, useEffect } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { Send, MapPin, Phone, Mail, CheckCircle, ArrowRight, Lock, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FacilityMap = () => (
  <div className="relative w-full h-64 bg-space-900 border border-white/10 overflow-hidden group">
    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
       {/* Stylized Abstract Map of Palestine TX */}
       <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 100 H400 M100 0 V200 M300 0 V200" stroke="white" strokeWidth="0.5" />
          <path d="M50 0 L150 200 M350 0 L250 200" stroke="white" strokeWidth="0.5" />
          <rect x="120" y="80" width="40" height="40" stroke="#D4AF37" strokeWidth="1" fill="none" />
          <circle cx="140" cy="100" r="2" fill="#D4AF37" className="animate-pulse" />
       </svg>
    </div>
    <div className="absolute bottom-4 left-4">
      <div className="flex items-center gap-2 text-[10px] font-mono text-accent-gold uppercase tracking-widest bg-space-950/80 px-2 py-1 backdrop-blur-sm border border-accent-gold/20">
         <MapPin className="w-3 h-3" /> Facility HQ
      </div>
    </div>
  </div>
);

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
      <Clock className="w-3 h-3" />
      <span>{time.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit' })} CST (Palestine, TX)</span>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <Section id="contact" className="pb-32">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
         
         {/* Info Column */}
         <motion.div variants={itemVariants} className="lg:col-span-4 space-y-12">
            <div>
              <SectionHeader chapter="05/06" title="Contact" />
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-6">Start a Conversation</h2>
              <p className="text-slate-400 font-light leading-relaxed text-lg mb-6">
                Whether you need a specific part number or a full supply chain audit, our engineers are ready to assist.
              </p>
              <LiveClock />
            </div>
            
            <FacilityMap />
            
            <div className="space-y-6 pt-8 border-t border-white/10">
              <div className="group flex items-start gap-4">
                <div className="mt-1 text-accent-gold opacity-50 group-hover:opacity-100 transition-opacity">
                   <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Headquarters</h5>
                  <p className="text-slate-400 font-light text-sm">
                    255 N US 287, Palestine, TX 75803
                  </p>
                </div>
              </div>
              
              <div className="group flex items-start gap-4">
                <div className="mt-1 text-accent-gold opacity-50 group-hover:opacity-100 transition-opacity">
                   <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Direct Line</h5>
                  <a href="tel:903-723-0693" className="text-slate-400 hover:text-white transition-colors text-sm">903-723-0693</a>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="mt-1 text-accent-gold opacity-50 group-hover:opacity-100 transition-opacity">
                   <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-1">Sales & Support</h5>
                  <a href="mailto:sales@afastinc.com" className="text-slate-400 hover:text-white transition-colors text-sm">sales@afastinc.com</a>
                </div>
              </div>
            </div>
         </motion.div>

         {/* Form Column */}
         <motion.div variants={itemVariants} className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-white/5 pb-4">
               <Lock className="w-3 h-3" /> Secure Inquiry
            </div>
            <form className="space-y-12" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group relative">
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Name</label>
                     <input 
                       type="text" 
                       className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-all font-display text-lg placeholder:text-white/10" 
                       placeholder="First Last" 
                       required 
                     />
                     <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-focus-within:w-full transition-all duration-500" />
                  </div>
                  <div className="group relative">
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Company</label>
                     <input 
                       type="text" 
                       className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-all font-display text-lg placeholder:text-white/10" 
                       placeholder="Organization Name" 
                       required 
                     />
                     <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-focus-within:w-full transition-all duration-500" />
                  </div>
               </div>
               
               <div className="group relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-all font-display text-lg placeholder:text-white/10" 
                    placeholder="name@company.com" 
                    required 
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-focus-within:w-full transition-all duration-500" />
               </div>

               <div className="group relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Requirements</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-all font-sans text-base placeholder:text-white/10 resize-none leading-relaxed" 
                    placeholder="Please include part numbers, quantities, and certifications required..." 
                    required 
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-focus-within:w-full transition-all duration-500" />
                  <p className="mt-4 text-sm text-slate-400">
                    Typical response time: <span className="text-white font-medium">2-4 hours</span>. For AOG, please call directly.
                  </p>
               </div>

               <div className="flex justify-start pt-6">
                 <button 
                   type="submit" 
                   disabled={isSubmitting || isSent}
                   className={`px-12 py-5 font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center gap-3 ${
                     isSent ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white text-space-950 hover:bg-slate-200 shadow-lg'
                   }`}
                 >
                    {isSubmitting ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : isSent ? (
                      <>Message Sent <CheckCircle className="w-4 h-4" /></>
                    ) : (
                      <>Transmit Inquiry <ArrowRight className="w-4 h-4" /></>
                    )}
                 </button>
               </div>
            </form>
         </motion.div>
       </div>
    </Section>
  );
};