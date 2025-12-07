import React from 'react';
import { Section, SectionHeader } from './ui/Section';
import { Leaf, Recycle, Zap } from 'lucide-react';

export const Sustainability: React.FC = () => {
  return (
    <Section id="sustainability" className="bg-space-900">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <SectionHeader 
          title="Sustainability" 
          subtitle="Responsible engineering for a finite planet." 
          align="center"
        />
        <p className="text-slate-400 font-light text-lg">
          Aerospace hardware is often viewed through the lens of performance alone. 
          We view it through the lens of lifecycle efficiency. Minimizing waste in the factory means maximizing payload to orbit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Recycle className="w-8 h-8 text-accent-teal" />,
            title: "Yield Optimization",
            val: "90%",
            desc: "Scrap metal recycling rate across all titanium and aluminum machining operations."
          },
          {
            icon: <Zap className="w-8 h-8 text-accent-gold" />,
            title: "Energy Efficiency",
            val: "Carbon Neutral",
            desc: "Our production facility operates on 100% renewable grid energy."
          },
          {
            icon: <Leaf className="w-8 h-8 text-green-400" />,
            title: "Material Science",
            val: "Lifecycle",
            desc: "Designing components for extended service intervals to reduce replacement frequency."
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-space-950 p-8 border-t-2 border-slate-800 hover:border-white transition-colors">
            <div className="mb-6">{item.icon}</div>
            <div className="text-3xl font-display font-bold text-white mb-2">{item.val}</div>
            <h4 className="text-sm font-display uppercase tracking-widest text-slate-500 mb-4">{item.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};