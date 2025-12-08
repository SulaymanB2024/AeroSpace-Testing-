
import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { ClipboardCheck, PackageCheck, Truck, Layers, ArrowRight, RefreshCw, Box } from 'lucide-react';
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

// --- Visualizations ---

const TraceabilityVisual = () => (
  <div className="bg-space-950 p-6 border border-white/5 rounded-lg my-8">
     <h5 className="text-[10px] font-mono uppercase text-slate-500 mb-6 tracking-widest">Digital Thread / Chain of Custody</h5>
     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
        <div className="absolute top-4 left-4 bottom-4 w-[2px] bg-white/10 md:w-full md:h-[2px] md:top-6 md:left-0 -z-0" />
        
        {[
          { label: "Mill Source", sub: "Raw Material", active: true },
          { label: "Manufacturer", sub: "Production", active: true },
          { label: "Distributor", sub: "AFI Inspect", active: true },
          { label: "Client", sub: "Installation", active: true }
        ].map((step, i) => (
          <div key={i} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 bg-space-950 p-2 md:p-0">
             <div className={`w-3 h-3 rounded-full border border-white/20 ${step.active ? 'bg-accent-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-space-950'}`} />
             <div className="md:text-center">
                <div className="text-xs font-bold text-white uppercase">{step.label}</div>
                <div className="text-[9px] text-slate-500 font-mono uppercase">{step.sub}</div>
             </div>
          </div>
        ))}
     </div>
  </div>
);

const VMIVisual = () => (
  <div className="bg-space-950 p-8 border border-white/5 rounded-lg my-8 flex items-center justify-center">
    <div className="relative w-48 h-48">
       {/* Rotating Cycle */}
       <svg className="w-full h-full animate-[spin_10s_linear_infinite] opacity-30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="1" strokeDasharray="10 5" fill="none" />
       </svg>
       
       <div className="absolute inset-0 flex items-center justify-center">
          <RefreshCw className="w-8 h-8 text-accent-teal" />
       </div>
       
       {/* Nodes */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-space-950 px-2 py-1 text-[9px] font-mono text-white border border-white/20">SCAN</div>
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-space-950 px-2 py-1 text-[9px] font-mono text-white border border-white/20">RESTOCK</div>
       <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-space-950 px-2 py-1 text-[9px] font-mono text-white border border-white/20">USAGE</div>
       <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-space-950 px-2 py-1 text-[9px] font-mono text-white border border-white/20">DATA</div>
    </div>
  </div>
);

const KittingVisual = () => (
  <div className="bg-space-950 p-6 border border-white/5 rounded-lg my-8">
     <h5 className="text-[10px] font-mono uppercase text-slate-500 mb-6 tracking-widest">BOM Consolidation</h5>
     <div className="flex items-center justify-center gap-8">
        <div className="space-y-2">
           {[1,2,3].map((_, i) => (
             <div key={i} className="flex items-center gap-2 opacity-60">
                <div className="w-2 h-2 border border-white/50 rounded-full" />
                <div className="w-16 h-2 bg-white/10 rounded-sm" />
             </div>
           ))}
        </div>
        <ArrowRight className="w-4 h-4 text-slate-500" />
        <div className="w-16 h-20 border border-accent-gold/50 bg-accent-gold/5 flex items-center justify-center relative">
           <Box className="w-6 h-6 text-accent-gold" />
           <div className="absolute -bottom-4 text-[9px] font-mono text-accent-gold">KIT ID-01</div>
        </div>
     </div>
  </div>
);

// --- Component ---

const services = [
  {
    title: "Quality Control",
    desc: "Rigorous inspection protocols ensuring 100% defect-free delivery.",
    icon: <ClipboardCheck className="w-8 h-8" />,
    points: ["AS9100 Rev D Certified", "In-House Metrology", "Lot Traceability"],
    cta: "View QC Standards",
    content: (
      <>
        <h4 className="font-display font-medium text-white text-lg mb-4">Zero Compromise Assurance</h4>
        <p className="text-slate-300 font-light leading-relaxed mb-6">
          Our quality management system is the backbone of our operation. Every part that enters our facility is subjected to a rigorous inspection protocol before it is ever cleared for inventory. We maintain a digital thread for every fastener, ensuring that mill certifications, test reports, and plating certs are instantly retrievable.
        </p>
        <TraceabilityVisual />
        <ul className="grid grid-cols-2 gap-4 mt-6">
           <li className="text-sm text-slate-400 flex items-center gap-2"><div className="w-1 h-1 bg-accent-gold rounded-full" /> Keyence Optical Inspection</li>
           <li className="text-sm text-slate-400 flex items-center gap-2"><div className="w-1 h-1 bg-accent-gold rounded-full" /> Zeiss CMM Validation</li>
           <li className="text-sm text-slate-400 flex items-center gap-2"><div className="w-1 h-1 bg-accent-gold rounded-full" /> Hardness Testing</li>
           <li className="text-sm text-slate-400 flex items-center gap-2"><div className="w-1 h-1 bg-accent-gold rounded-full" /> XRF Material Analysis</li>
        </ul>
      </>
    )
  },
  {
    title: "VMI Programs",
    desc: "Vendor Managed Inventory solutions to optimize throughput.",
    icon: <RefreshCw className="w-8 h-8" />,
    points: ["Bin Management", "Auto-Replenishment", "Usage Analytics"],
    cta: "Discuss VMI Program",
    content: (
      <>
        <h4 className="font-display font-medium text-white text-lg mb-4">Streamlined Logistics</h4>
        <p className="text-slate-300 font-light leading-relaxed mb-6">
           Stop managing bins and start managing production. Our VMI programs place critical hardware directly at the point of use. Our team monitors consumption rates, manages min/max levels, and handles replenishment automatically—eliminating stockouts and reducing administrative overhead.
        </p>
        <VMIVisual />
        <p className="text-sm text-slate-400 mt-4">
           We offer full barcode integration and API connectivity to your existing ERP system for seamless billing and tracking.
        </p>
      </>
    )
  },
  {
    title: "Kitting Services",
    desc: "Custom BOM consolidation for efficient assembly lines.",
    icon: <Layers className="w-8 h-8" />,
    points: ["Custom Labeling", "BOM Logic", "Just-In-Time"],
    cta: "Request Kit Assessment",
    content: (
       <>
         <h4 className="font-display font-medium text-white text-lg mb-4">Assembly-Ready Deliverables</h4>
         <p className="text-slate-300 font-light leading-relaxed mb-6">
            Reduce technician search time and FOD risk with custom kitting. We consolidate complete Bill of Materials (BOMs) into single-SKU packages, organized by assembly step or workstation.
         </p>
         <KittingVisual />
         <ul className="space-y-2 mt-4">
            <li className="text-sm text-slate-400">• Reduction in purchase orders processed</li>
            <li className="text-sm text-slate-400">• Elimination of mixed stock and FOD</li>
            <li className="text-sm text-slate-400">• Simplified receiving inspection</li>
         </ul>
       </>
    )
  },
  {
    title: "Consignment",
    desc: "On-site inventory maintenance to preserve working capital.",
    icon: <Truck className="w-8 h-8" />,
    points: ["Pay-On-Use", "Zero Lead Time", "Asset Management"],
    cta: "Start Consignment",
    content: (
       <>
         <h4 className="font-display font-medium text-white text-lg mb-4">Capital Efficiency</h4>
         <p className="text-slate-300 font-light leading-relaxed mb-6">
            Maintain the security of on-site stock without the balance sheet liability. Our consignment programs place Aerospace Fasteners-owned inventory in your facility. You are billed only when product is pulled for production.
         </p>
         <div className="p-4 bg-white/5 border-l-2 border-accent-gold">
            <p className="text-sm text-white italic">"Inventory when you need it. Capital when you don't."</p>
         </div>
       </>
    )
  }
];

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <>
      <Section id="services">
        <SectionHeader 
          chapter="03/06"
          title="Operational Services" 
          subtitle="Supply Chain Engineering" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <SpotlightCard 
              key={idx} 
              service={service} 
              onClick={() => setSelectedService(service)} 
            />
          ))}
        </div>
      </Section>

      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ""}
        subtitle="Service Detail"
      >
         {selectedService && selectedService.content}
      </Modal>
    </>
  );
};
