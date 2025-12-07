import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { Send, MapPin, Phone, Mail, Radio, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
         
         {/* Info Column */}
         <motion.div variants={itemVariants} className="lg:col-span-5 space-y-12">
            <SectionHeader title="Contact Us" subtitle="Get a Quote" />
            
            <p className="text-slate-400 font-light leading-relaxed">
              Customer service begins before you buy. Contact us for help selecting the right products and materials.
            </p>
            
            <div className="space-y-8">
              <div className="p-8 border border-white/5 bg-white/[0.02] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <ShieldCheck className="w-12 h-12 text-white/5" />
                </div>
                
                <h4 className="text-[10px] font-mono text-accent-gold uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Facility Data</h4>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-slate-500 mt-1" />
                    <div>
                      <h5 className="text-[11px] font-bold text-white font-display uppercase tracking-wider">Address</h5>
                      <p className="text-sm text-slate-400 font-light mt-1 font-mono leading-relaxed">255 N US 287<br/>Palestine, TX 75803</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <FileText className="w-5 h-5 text-slate-500 mt-1" />
                    <div>
                      <h5 className="text-[11px] font-bold text-white font-display uppercase tracking-wider">Compliance</h5>
                      <p className="text-sm text-slate-400 font-light mt-1 font-mono">
                        Vernon Fritze<br/>Director of Compliance
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 <a href="tel:903-723-0693" className="flex items-center justify-between p-6 border border-white/5 bg-space-900 hover:border-accent-gold transition-all group">
                    <div>
                       <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Phone</span>
                       <span className="text-lg text-white font-display font-medium">903-723-0693</span>
                    </div>
                    <Phone className="w-5 h-5 text-slate-600 group-hover:text-accent-gold transition-colors" />
                 </a>
                 <div className="flex items-center justify-between p-6 border border-white/5 bg-space-900">
                    <div>
                       <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Fax</span>
                       <span className="text-lg text-slate-300 font-display font-medium">903-723-3968</span>
                    </div>
                 </div>
                 <a href="mailto:sales@afastinc.com" className="flex items-center justify-between p-6 border border-white/5 bg-space-900 hover:border-accent-gold transition-all group">
                    <div>
                       <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Email</span>
                       <span className="text-lg text-white font-display font-medium">sales@afastinc.com</span>
                    </div>
                    <Mail className="w-5 h-5 text-slate-600 group-hover:text-accent-gold transition-colors" />
                 </a>
              </div>
            </div>
         </motion.div>

         {/* Form Column */}
         <motion.div variants={formVariants} className="lg:col-span-7 bg-space-900 border border-white/10 p-8 md:p-12 relative">
            {/* Decorative Corner Markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-gold" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-gold" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-gold" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-gold" />

            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
               <h4 className="text-xs font-mono text-white flex items-center gap-2">
                  <Radio className="w-3 h-3 text-accent-red animate-pulse" />
                  CONTACT FORM
               </h4>
               <span className="text-[9px] font-mono text-slate-600">SECURE CHANNEL</span>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                     <label className="text-[10px] font-mono text-slate-500 uppercase mb-2 block tracking-wider">Full Name</label>
                     <input type="text" className="w-full bg-space-950 border-b border-white/20 p-3 text-white focus:outline-none focus:border-accent-gold transition-colors font-mono text-sm placeholder:text-slate-800" placeholder="ENTER NAME" required />
                  </div>
                  <div className="group relative">
                     <label className="text-[10px] font-mono text-slate-500 uppercase mb-2 block tracking-wider">Company</label>
                     <input type="text" className="w-full bg-space-950 border-b border-white/20 p-3 text-white focus:outline-none focus:border-accent-gold transition-colors font-mono text-sm placeholder:text-slate-800" placeholder="COMPANY NAME" required />
                  </div>
               </div>
               
               <div className="group relative">
                  <label className="text-[10px] font-mono text-slate-500 uppercase mb-2 block tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-space-950 border-b border-white/20 p-3 text-white focus:outline-none focus:border-accent-gold transition-colors font-mono text-sm placeholder:text-slate-800" placeholder="NAME@DOMAIN.COM" required />
               </div>

               <div className="group relative">
                  <label className="text-[10px] font-mono text-slate-500 uppercase mb-2 block tracking-wider">Message / Quote Details</label>
                  <textarea rows={4} className="w-full bg-space-950 border border-white/10 p-4 text-white focus:outline-none focus:border-accent-gold transition-colors font-mono text-sm placeholder:text-slate-600 resize-none" placeholder="Please include part numbers, quantities, and specs..." required />
                  <p className="mt-2 text-[10px] text-slate-500 font-mono">Typical response time: 2-4 hours</p>
               </div>

               <div className="pt-4">
                 <button 
                   type="submit" 
                   disabled={isSubmitting || isSent}
                   className={`w-full py-4 font-display font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-3 shadow-lg transition-all duration-300 ${isSent ? 'bg-green-600 text-white' : 'bg-white text-space-950 hover:bg-accent-gold hover:text-white'}`}
                 >
                    {isSubmitting ? (
                      <span className="animate-pulse">Transmitting...</span>
                    ) : isSent ? (
                      <>Sent Successfully <CheckCircle className="w-4 h-4" /></>
                    ) : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                 </button>
               </div>
            </form>
         </motion.div>
       </div>
    </Section>
  );
};