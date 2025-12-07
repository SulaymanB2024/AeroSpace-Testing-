import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { ShieldCheck, Cpu, Flame, Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './ui/Modal';

const capabilities = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Flight Critical Structures",
    description: "Primary structural components for launch vehicles and hypersonics.",
    details: ["5-Axis Monolithic Machining", "Fracture Critical Class A", "Lengths up to 4 meters"],
    fullContent: {
      overview: "We specialize in large-format monolithic structural components that serve as the backbone for next-generation launch vehicles. By machining from billet rather than casting or forging, we achieve superior grain structure homogeneity and isotropic strength properties.",
      specs: [
        { label: "Max Length", value: "4000mm" },
        { label: "Max Width", value: "2500mm" },
        { label: "Tolerance", value: "+/- 0.005mm" },
        { label: "Materials", value: "Al 7050, Ti-6Al-4V" }
      ]
    }
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Complex Titanium Machining",
    description: "Hard metal mastery. Working with Ti-6Al-4V and Inconel daily.",
    details: ["High-speed removal rates", "Distortion control strategies", "Cryogenic cooling integration"],
    fullContent: {
      overview: "Titanium represents the perfect strength-to-weight ratio for orbit, but it demands respect in manufacturing. Our proprietary toolpath strategies and cryogenic cooling setups allow us to remove material faster while maintaining lower residual stress states than industry standards.",
      specs: [
        { label: "Spindle Speed", value: "20,000 RPM" },
        { label: "Coolant", value: "Liquid Nitrogen" },
        { label: "Automation", value: "Pallet Pool System" }
      ]
    }
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: "Thermal Protection Systems",
    description: "Components designed to survive re-entry and engine exhaust plumes.",
    details: ["Refractory metal forming", "Ceramic matrix integration", "Heat shield substructures"],
    fullContent: {
      overview: "When atmospheric friction creates plasma, there is no margin for error. We fabricate substructures for heat shields and engine nozzles using refractory metals like Niobium and Tantalum, as well as high-temp Nickel superalloys.",
      specs: [
        { label: "Temp Rating", value: "> 2400°F" },
        { label: "Coatings", value: "Silicide" },
        { label: "Testing", value: "Arc Jet Validated" }
      ]
    }
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Additive Integration",
    description: "Hybrid manufacturing combining SLM printing with precision post-machining.",
    details: ["Internal cooling channels", "Topology optimization", "Powder removal validation"],
    fullContent: {
      overview: "The future is grown, then refined. We employ a hybrid workflow where complex geometries are printed via DMLS/SLM, then precision-machined on critical mating surfaces. This allows for internal cooling channels impossible to achieve with subtractive methods alone.",
      specs: [
        { label: "Printers", value: "EOS M400-4" },
        { label: "Materials", value: "Inconel 718, AlSi10Mg" },
        { label: "Post-Process", value: "HIP & CNC" }
      ]
    }
  },
];

const stats = [
  { label: "Tolerance Avg", value: "±0.005mm" },
  { label: "Max Envelope", value: "4000mm" },
  { label: "On-Time Del", value: "99.4%" },
  { label: "Quality Rating", value: "Tier 1" },
];

export const Capabilities: React.FC = () => {
  const [selectedCap, setSelectedCap] = useState<typeof capabilities[0] | null>(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Section id="capabilities">
        <SectionHeader 
          title="Our Capabilities" 
          subtitle="Engineering the skeletal systems of modern flight."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {capabilities.map((cap, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              onClick={() => setSelectedCap(cap)}
              className="group p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              
              <div className="text-accent-gold mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                {cap.icon}
              </div>
              
              <h3 className="text-xl font-display font-medium text-white mb-4">
                {cap.title}
              </h3>
              
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-6 border-b border-white/5 pb-6">
                {cap.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {cap.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-500 font-display uppercase tracking-wider">
                    <span className="block w-1 h-1 bg-accent-teal mt-1 rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {stats.map((stat, idx) => (
            <motion.div variants={cardVariants} key={idx} className="text-center md:text-left">
              <div className="text-3xl font-display font-light text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-display uppercase tracking-widest text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Modal 
        isOpen={!!selectedCap} 
        onClose={() => setSelectedCap(null)}
        title={selectedCap?.title || ""}
        subtitle="Technical Overview"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div>
             <h4 className="font-display uppercase tracking-widest text-sm text-white mb-4">Process Philosophy</h4>
             <p className="text-slate-300 font-light leading-relaxed mb-8">
               {selectedCap?.fullContent?.overview}
             </p>
             
             <h4 className="font-display uppercase tracking-widest text-sm text-white mb-4">Key Specifications</h4>
             <div className="grid grid-cols-2 gap-4">
               {selectedCap?.fullContent?.specs.map((spec, i) => (
                 <div key={i} className="p-4 bg-white/5 border border-white/5">
                   <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{spec.label}</div>
                   <div className="text-white font-mono text-sm">{spec.value}</div>
                 </div>
               ))}
             </div>
           </div>
           
           <div className="relative h-64 md:h-full bg-space-950 border border-white/10 flex items-center justify-center overflow-hidden">
             {/* Abstract technical visualization placeholder */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020408_100%)] opacity-50" />
             <div className="grid grid-cols-6 grid-rows-6 gap-4 w-[150%] h-[150%] absolute animate-[spin_60s_linear_infinite] opacity-20">
               {Array.from({ length: 36 }).map((_, i) => (
                 <div key={i} className="border border-white/10" />
               ))}
             </div>
             <div className="relative z-10 text-center">
               <div className="text-6xl text-white/10 font-display font-bold">SCHEMATIC</div>
               <div className="text-xs text-accent-gold font-mono mt-2">RESTRICTED DATA VIEW</div>
             </div>
           </div>
        </div>
      </Modal>
    </>
  );
};
