import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { motion } from 'framer-motion';
import { Modal } from './ui/Modal';
import { Maximize2 } from 'lucide-react';

const programs = [
  {
    code: "PROGRAM ORBITAL GLASS",
    sector: "Heavy Lift Launch",
    description: "Designed and manufactured the primary gimbal assembly for a reusable methane-engine booster.",
    outcome: "Reduced part count by 40% via monolithic machining.",
    tech: ["Inconel 718", "5-Axis", "NDT Level 3"],
    image: "https://picsum.photos/seed/rocket/800/600",
    fullDetails: {
      challenge: "The client needed a gimbal assembly capable of thrust vectoring a 500,000 lbf engine, but traditional bolted assemblies were too heavy and prone to harmonic vibration failure.",
      solution: "We reimagined the 42-part assembly as a single monolithic Inconel 718 forging, machined to near-net shape. This eliminated 90% of the fasteners and increased stiffness by 60%.",
      impact: "The vehicle successfully completed 12 static fires and reached orbit on its maiden flight."
    }
  },
  {
    code: "PROJECT SILENT WING",
    sector: "Unmanned Defense",
    description: "Fabrication of leading-edge titanium spars for a high-altitude, long-endurance surveillance platform.",
    outcome: "Achieved surface profile tolerance of 0.002mm.",
    tech: ["Ti-6Al-4V", "Metrology", "Stress Relief"],
    image: "https://picsum.photos/seed/wing/800/600",
    fullDetails: {
      challenge: "Laminar flow requirements on the wing surface demanded profile tolerances previously thought impossible for large titanium structures due to spring-back.",
      solution: "We developed a proprietary multi-stage stress relief and machining process. By alternating between cryo-treatment and high-speed finishing passes, we neutralized internal stresses.",
      impact: "The platform achieved a 14% increase in loiter time due to drag reduction."
    }
  },
  {
    code: "INITIATIVE AEON",
    sector: "Commercial Supersonic",
    description: "Prototypes for cabin structural nodes focused on weight reduction and aesthetic finish.",
    outcome: "Delivered 12 flight-ready shipsets ahead of schedule.",
    tech: ["Al-Li 2195", "Anodizing", "Topology Opt"],
    image: "https://picsum.photos/seed/plane/800/600",
    fullDetails: {
      challenge: "Supersonic flight economics require extreme weight optimization without sacrificing passenger safety or cabin acoustic dampening.",
      solution: "Using generative design (topology optimization), we created organic-looking nodes printed in aluminum and finished to a mirror shine for visible cabin interiors.",
      impact: "Weight reduced by 22kg per aircraft, translating to $4M in fuel savings over the fleet lifetime."
    }
  }
];

export const Programs: React.FC = () => {
  const [selectedProg, setSelectedProg] = useState<typeof programs[0] | null>(null);

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };

  return (
    <>
      <Section id="programs" className="bg-space-900/30">
        <SectionHeader 
          title="Programs & Case Studies" 
          subtitle="Confidential excellence delivered." 
        />
        
        <div className="space-y-12">
          {programs.map((prog, idx) => (
            <motion.div 
              key={idx} 
              variants={rowVariants}
              onClick={() => setSelectedProg(prog)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-12 last:border-0 last:pb-0 group cursor-pointer"
            >
              
              {/* Text Content */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-accent-teal/10 text-accent-teal text-[10px] font-display uppercase tracking-widest border border-accent-teal/20">
                    {prog.sector}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent-gold transition-colors flex items-center gap-2">
                  {prog.code}
                  <Maximize2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-300 font-serif text-lg leading-relaxed mb-4">
                  {prog.description}
                </p>
                <div className="mb-6 pl-4 border-l border-accent-gold/50">
                  <p className="text-sm text-slate-400 italic">
                    "{prog.outcome}"
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {prog.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono text-slate-500">
                      // {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="lg:col-span-7 order-1 lg:order-2 relative overflow-hidden h-[300px] lg:h-[400px]">
                <div className="absolute inset-0 bg-accent-teal/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img 
                  src={prog.image} 
                  alt={prog.code}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 z-20 text-white font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 backdrop-blur-sm">
                  CLICK_TO_EXPAND
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 py-8 border-y border-white/10 flex flex-wrap justify-between items-center gap-6 opacity-60">
          <div className="text-xs font-display uppercase tracking-widest text-slate-500">
            Flight Hours Supported <span className="text-white ml-2">50,000+</span>
          </div>
          <div className="text-xs font-display uppercase tracking-widest text-slate-500">
            Missions Deployed <span className="text-white ml-2">142</span>
          </div>
          <div className="text-xs font-display uppercase tracking-widest text-slate-500">
            Years Active <span className="text-white ml-2">12</span>
          </div>
          <div className="text-xs font-display uppercase tracking-widest text-slate-500">
            Zero Defect Rate <span className="text-white ml-2">99.8%</span>
          </div>
        </div>
      </Section>

      <Modal
        isOpen={!!selectedProg}
        onClose={() => setSelectedProg(null)}
        title={selectedProg?.code || ""}
        subtitle={selectedProg?.sector}
      >
        <div className="space-y-8">
          <img 
            src={selectedProg?.image} 
            alt={selectedProg?.code}
            className="w-full h-64 md:h-80 object-cover grayscale"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="font-display uppercase tracking-widest text-xs text-accent-gold mb-2">The Challenge</h4>
                <p className="text-slate-300 font-light">{selectedProg?.fullDetails?.challenge}</p>
              </div>
              <div>
                <h4 className="font-display uppercase tracking-widest text-xs text-white mb-2">Our Solution</h4>
                <p className="text-slate-300 font-light">{selectedProg?.fullDetails?.solution}</p>
              </div>
              <div>
                <h4 className="font-display uppercase tracking-widest text-xs text-accent-teal mb-2">Impact</h4>
                <p className="text-slate-300 font-light">{selectedProg?.fullDetails?.impact}</p>
              </div>
            </div>

            <div className="lg:col-span-1 bg-white/5 p-6 border border-white/5 h-fit">
              <h4 className="font-display uppercase tracking-widest text-xs text-white mb-4 border-b border-white/10 pb-2">Technical Stack</h4>
              <ul className="space-y-3">
                {selectedProg?.tech.map((t, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{t}</span>
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
