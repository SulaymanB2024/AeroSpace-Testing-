import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { ClipboardCheck, PackageCheck, Truck, Layers, ArrowRight, BarChart, Factory } from 'lucide-react';
import { Modal } from './ui/Modal';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const updateMousePosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return { mousePosition, updateMousePosition };
};

interface SpotlightCardProps {
  service: any;
  onClick: () => void;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ service, onClick }) => {
  const { mousePosition, updateMousePosition } = useMousePosition();
  
  return (
    <motion.div 
      variants={itemVariants}
      onClick={onClick}
      onMouseMove={updateMousePosition}
      className="relative bg-space-900/30 border border-white/10 p-10 flex flex-col group cursor-pointer overflow-hidden transition-colors duration-500"
    >
       {/* Spotlight Effect */}
       <div 
         className="absolute pointer-events-none inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
         style={{
           background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.05), transparent 40%)`
         }}
       />
       
       <div className="text-white/40 mb-10 group-hover:text-accent-gold transition-colors duration-500 relative z-10">
         {service.icon}
       </div>
       
       <h3 className="text-2xl font-display font-medium text-white mb-4 relative z-10">
         {service.title}
       </h3>
       
       <p className="text-sm text-slate-400 font-light mb-10 leading-relaxed min-h-[60px] relative z-10">
         {service.desc}
       </p>

       <ul className="space-y-4 pt-6 border-t border-white/10 mt-auto relative z-10">
         {service.points.map((pt: string, i: number) => (
           <li key={i} className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
             <div className="w-1 h-1 bg-slate-700 rounded-full group-hover:bg-accent-gold transition-colors" />
             {pt}
           </li>
         ))}
       </ul>
       
       <div className="mt-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors relative z-10">
         {service.cta} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
       </div>
    </motion.div>
  );
};

const services = [
  {
    id: "qc",
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: "Quality Control",
    desc: "Every part inspected to AS9100 Rev D standards.",
    points: ["AS9100 Rev D", "ISO 9001:2015", "Lot Traceability"],
    cta: "View QC Standards",
    fullDetails: {
      subtitle: "On-Time, Defect-Free",
      description: "Our quality philosophy is simple: On time every time, defect free. All parts are inspected prior to shipment, with paperwork maintained at Aerospace Fasteners Inc. Our calibration equipment meets ANSI/NCSL Z540-1-1994 standards.",
      features: [
        { label: "Certification", value: "AS9100 Rev D" },
        { label: "Certification", value: "ISO 9001:2015" },
        { label: "Compliance", value: "ITAR Registered" },
        { label: "Traceability", value: "100% Paperwork Retention" }
      ]
    }
  },
  {
    id: "vmi",
    icon: <Layers className="w-6 h-6" />,
    title: "VMI Programs",
    desc: "Vendor Managed Inventory solutions.",
    points: ["Barcode Managed", "Auto Replenish", "Bin Stocking"],
    cta: "Discuss VMI Program",
    fullDetails: {
      subtitle: "Vendor Managed Inventory",
      description: "Avoid downtime with our VMI programs. We manage your on-hand stock levels and replenishment using barcode-managed systems with full lot traceability. We support Bin Stocking, KAN-BAN, and Long Term Agreements (LTA).",
      features: [
        { label: "System", value: "Barcode Management" },
        { label: "Types", value: "Bin Stocking, KAN-BAN" },
        { label: "Contracts", value: "Long Term Agreements" },
        { label: "Benefit", value: "Prevent Line Stoppage" }
      ]
    }
  },
  {
    id: "kitting",
    icon: <PackageCheck className="w-6 h-6" />,
    title: "Kitting Services",
    desc: "Pre-bundled hardware for specific projects.",
    points: ["Custom BOMs", "Project Specific", "Ready-to-Use"],
    cta: "Request Kit Assessment",
    fullDetails: {
      subtitle: "Custom Kitting",
      description: "Receive only the hardware you need, pre-bundled for specific assemblies. Our kitting service reduces handling time and simplifies your production line. We kit to your exact Bill of Materials (BOM).",
      features: [
        { label: "Accuracy", value: "BOM Matched" },
        { label: "Packaging", value: "Custom Labeling" },
        { label: "Efficiency", value: "Reduced Handling" },
        { label: "Flexibility", value: "Any Volume" }
      ]
    }
  },
  {
    id: "consignment",
    icon: <Truck className="w-6 h-6" />,
    title: "Consignment",
    desc: "Maintain on-site inventory, pay on use.",
    points: ["Capital Efficiency", "Immediate Access", "Budget Friendly"],
    cta: "Start Consignment",
    fullDetails: {
      subtitle: "Consignment Inventory",
      description: "Maintain on-site inventory while preserving working capital. Our consignment programs place the stock you need at your facility, billing you only when the product is consumed.",
      features: [
        { label: "Financial", value: "Preserve Capital" },
        { label: "Access", value: "Immediate Availability" },
        { label: "Billing", value: "Pay Per Use" },
        { label: "Location", value: "On-Site Management" }
      ]
    }
  }
];

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <Section id="services" className="bg-space-950 border-y border-white/5">
      <SectionHeader title="Our Services" subtitle="Value-Added Solutions" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <SpotlightCard key={idx} service={service} onClick={() => setSelectedService(service)} />
        ))}
      </div>

      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ""}
        subtitle={selectedService?.fullDetails.subtitle}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
             <p className="text-slate-300 font-light leading-relaxed text-lg">
               {selectedService?.fullDetails.description}
             </p>
             <div>
               <h4 className="text-xs font-display font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Factory className="w-4 h-4 text-accent-teal" /> Key Features
               </h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {selectedService?.fullDetails.features.map((feat, i) => (
                   <div key={i} className="bg-white/5 border border-white/5 p-4">
                     <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{feat.label}</div>
                     <div className="text-white font-medium text-sm">{feat.value}</div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
          
          <div className="flex items-center justify-center bg-space-950 border border-white/10 p-8">
             <button 
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-accent-gold text-space-950 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
             >
                Contact Us About {selectedService?.title} <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </Modal>
    </Section>
  );
};