import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
  grid?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, noPadding = false, grid = true }) => {
  return (
    <section 
      id={id} 
      className={`relative w-full scroll-mt-0 overflow-hidden border-b border-white/5 ${noPadding ? '' : 'py-24 md:py-32'} ${className}`}
    >
      {/* Technical Grid Background - Ultra Subtle */}
      {grid && (
        <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] pointer-events-none opacity-[0.015]" />
      )}
      
      {/* Vertical Axis Line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
        className="container mx-auto px-6 md:px-12 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center'; light?: boolean }> = ({ 
  title, 
  subtitle,
  align = 'left',
  light = false
}) => {
  return (
    <div className={`mb-20 ${align === 'center' ? 'text-center' : 'text-left pl-4 md:pl-0'}`}>
      <div className={`flex items-center gap-4 mb-4 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="w-8 h-[2px] bg-accent-gold"></span>
        <h2 className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent-gold uppercase">
          {title}
        </h2>
      </div>
      {subtitle && (
        <h3 className={`text-3xl md:text-5xl font-display font-medium leading-tight tracking-tight ${light ? 'text-white' : 'text-white'}`}>
          {subtitle}
        </h3>
      )}
    </div>
  );
};