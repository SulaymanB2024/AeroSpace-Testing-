import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-space-950/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-space-900/90 border border-white/10 shadow-2xl pointer-events-auto relative custom-scrollbar flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 left-0 right-0 bg-space-900/95 backdrop-blur-md z-10 border-b border-white/10 p-6 md:p-8 flex justify-between items-start">
                <div>
                   <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-2">{title}</h2>
                   {subtitle && <p className="text-accent-gold font-serif italic text-lg">{subtitle}</p>}
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-slate-400 group-hover:text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {children}
              </div>

              {/* Decorative footer line */}
              <div className="h-1 w-full bg-gradient-to-r from-accent-gold via-accent-copper to-accent-teal" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
