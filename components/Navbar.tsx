import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const navItems = [
  { name: 'Company', href: '#company' },
  { name: 'Products', href: '#products' },
  { name: 'Services', href: '#services' },
  { name: 'Partners', href: '#manufacturers' },
  { name: 'News', href: '#news' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY + 150;
      let current = '';
      for (const item of navItems) {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = item.href;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-space-950/80 backdrop-blur-md border-white/5 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-6 h-6 bg-white flex items-center justify-center">
               <div className="w-2 h-2 bg-space-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-[0.15em] text-white group-hover:text-accent-gold transition-colors leading-none">
                AEROSPACE FASTENERS
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-[10px] font-mono uppercase tracking-[0.15em] transition-colors hover:text-accent-gold relative group
                    ${activeSection === item.href ? 'text-white' : 'text-slate-500'}
                  `}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-accent-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${activeSection === item.href ? 'scale-x-100' : ''}`} />
                </a>
              ))}
            </nav>
            
            <a 
              href="#contact"
              className="relative px-6 py-2 overflow-hidden group border border-white/20"
            >
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative text-white group-hover:text-space-950 text-[10px] font-bold font-mono uppercase tracking-widest transition-colors duration-300">
                Initiate RFQ
              </span>
            </a>
          </div>

          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Precision Scroll Progress */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
           <motion.div style={{ width }} className="h-full bg-accent-gold" />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-space-950 flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <nav className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display font-light uppercase tracking-widest text-white hover:text-accent-gold"
                >
                  {item.name}
                </a>
              ))}
              <a
                 href="#contact"
                 onClick={() => setMobileMenuOpen(false)}
                 className="mt-8 px-8 py-3 bg-white text-space-950 font-bold uppercase tracking-widest text-sm"
              >
                Initiate RFQ
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};