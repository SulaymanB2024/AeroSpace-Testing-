import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { ArrowUpRight, FileText, Calendar, Tag } from 'lucide-react';
import { Modal } from './ui/Modal';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const articles = [
  {
    category: "COMPLIANCE",
    title: "BCBSTX Alert: Transparency in Coverage",
    excerpt: "Compliance notice referencing the federal Transparency in Coverage Final Rule.",
    date: "2025.01.01",
    content: {
      body: [
        "In compliance with the federal Transparency in Coverage Final Rule issued by the U.S. Departments of Health and Human Services, Labor, and the Treasury, Aerospace Fasteners Incorporated provides access to machine-readable files made available on its behalf by Blue Cross Blue Shield of Texas.",
        "These files include negotiated rates with in-network providers and allowed amounts for out-of-network providers, formatted for researcher and application developer access."
      ],
      link: "https://www.bcbstx.com/asomrf?EIN=751767255&brand=bcbstx"
    }
  },
  {
    category: "TECHNICAL",
    title: "How are O-Rings Used in the Aerospace Industry?",
    excerpt: "Understanding the critical role of O-Rings in hydraulic, fuel, and pneumatic systems.",
    date: "2024.11.15",
    content: {
      body: [
        "O-rings are vital for sealing hydraulic lines, fuel systems, and pneumatic pressurization systems in aircraft. Selecting the correct material is crucial for safety and performance.",
        "Common materials include Viton (FKM) for high temperatures and fuel resistance, and Buna-N (Nitrile) for general hydraulic fluids. Aerospace Fasteners stocks a wide range of MS, NAS, and AS standard O-rings."
      ]
    }
  },
  {
    category: "BUYER GUIDANCE",
    title: "Choosing the Right Aerospace Hardware Distributor",
    excerpt: "Key factors to evaluate: Certification, Traceability, and Inventory Depth.",
    date: "2024.10.20",
    content: {
      body: [
        "When selecting a partner, look for AS9100 Rev D certification as a baseline. Traceability is non-negotiable—every part must track back to the mill.",
        "Aerospace Fasteners Inc. combines these quality standards with deep inventory (34,000+ sq ft facility) and flexible service models like VMI and Kitting."
      ]
    }
  }
];

export const News: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  return (
    <Section id="news">
      <SectionHeader title="Latest News" subtitle="Industry Updates" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
        {articles.map((article, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            onClick={() => setSelectedArticle(article)}
            className="bg-space-950 p-10 border-b md:border-b-0 border-r border-white/10 last:border-r-0 hover:bg-white/[0.02] transition-colors group cursor-pointer flex flex-col h-full relative overflow-hidden"
          >
            
            <div className="flex justify-between items-center mb-8">
              <span className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-accent-gold uppercase tracking-widest">
                {article.category}
              </span>
            </div>
            
            <h3 className="text-xl font-display font-medium text-white mb-4 leading-tight group-hover:text-accent-gold transition-colors">
              {article.title}
            </h3>
            
            <p className="text-sm text-slate-400 font-light leading-relaxed mb-8 flex-grow opacity-80">
              {article.excerpt}
            </p>
            
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors border-t border-white/5 pt-6 mt-auto">
              Read Article <ArrowUpRight className="w-3 h-3" />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        title={selectedArticle?.category || ""}
        subtitle="News Update"
      >
        <div className="max-w-3xl mx-auto">
           <div className="border-b border-white/10 pb-6 mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-6 leading-tight">
                {selectedArticle?.title}
              </h2>
              <div className="flex flex-wrap gap-6 text-sm text-slate-500 font-mono">
                 <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4" /> {selectedArticle?.date}
                 </div>
              </div>
           </div>
           
           <div className="font-serif text-lg text-slate-300 leading-relaxed space-y-6">
              {selectedArticle?.content.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
           </div>
           
           {selectedArticle?.content.link && (
             <div className="mt-8">
                <a href={selectedArticle.content.link} target="_blank" rel="noreferrer" className="text-accent-gold hover:text-white transition-colors underline text-sm">
                   View Machine-Readable Files
                </a>
             </div>
           )}
        </div>
      </Modal>
    </Section>
  );
};