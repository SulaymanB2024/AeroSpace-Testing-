import React from 'react';
import { Section, SectionHeader } from './ui/Section';
import { motion } from 'framer-motion';

export const Materials: React.FC = () => {
  return (
    <Section id="materials">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Narrative Left */}
        <div className="lg:col-span-4">
          <SectionHeader title="Materials & Processes" />
          <p className="text-slate-300 font-serif text-xl leading-relaxed mb-8">
            The alchemy of flight requires a deep respect for raw matter.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            We don't simply cut metal; we manage internal stresses, grain structures, and thermal expansion properties. 
            From exotic nickel superalloys to flight-grade aluminum, our material library is curated for the extreme environments of orbit and re-entry.
          </p>
          <div className="p-6 border border-accent-gold/20 bg-accent-gold/5 relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold/50" />
             <h4 className="text-accent-gold font-display text-sm uppercase tracking-widest mb-2">Note on Sourcing</h4>
             <p className="text-xs text-slate-400">
               All materials are DFARS compliant and fully traceable to the mill. We maintain a strict chain of custody for all flight-critical hardware.
             </p>
          </div>
        </div>

        {/* Data Table Right */}
        <div className="lg:col-span-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 text-xs font-display uppercase tracking-widest text-white pl-4">Family</th>
                  <th className="py-4 text-xs font-display uppercase tracking-widest text-slate-500">Grades</th>
                  <th className="py-4 text-xs font-display uppercase tracking-widest text-slate-500 hidden md:table-cell">Applications</th>
                  <th className="py-4 text-xs font-display uppercase tracking-widest text-slate-500 text-right pr-4">Qual Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { fam: "Titanium", grades: "Ti-6Al-4V, Ti-5553", app: "Structural, Fasteners", qual: "OEM Tier 1" },
                  { fam: "Nickel Alloys", grades: "Inconel 625, 718, Hastelloy", app: "Hot Section, Nozzles", qual: "High Temp Cert" },
                  { fam: "Aluminum", grades: "7075-T7351, 6061-T6, 2195", app: "Fuselage, Bulkheads", qual: "Standard" },
                  { fam: "Steel", grades: "17-4 PH, 15-5 PH, A286", app: "Landing Gear, Pins", qual: "OEM Tier 1" },
                  { fam: "Additive", grades: "AlSi10Mg, Inconel 718", app: "Complex Geometry", qual: "Dev & Flight" },
                ].map((row, i) => (
                  <motion.tr 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group cursor-default relative"
                  >
                    <td className="py-6 font-display font-medium text-white pl-4 relative">
                      {/* Subtle hover indicator */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-accent-gold group-hover:h-8 transition-all duration-300" />
                      {row.fam}
                    </td>
                    <td className="py-6 text-sm text-slate-400 font-mono group-hover:text-slate-200 transition-colors">{row.grades}</td>
                    <td className="py-6 text-sm text-slate-400 hidden md:table-cell">{row.app}</td>
                    <td className="py-6 text-right pr-4">
                      <span className="inline-block px-2 py-1 bg-green-900/20 text-green-400/80 group-hover:text-green-400 group-hover:bg-green-900/40 text-[10px] font-mono uppercase border border-green-800/30 group-hover:border-green-500/50 transition-all">
                        {row.qual}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {["5-Axis CNC", "Wire EDM", "DMLS Printing", "Heat Treatment", "CMM Inspection"].map((proc, i) => (
              <div key={i} className="flex-shrink-0 px-6 py-3 border border-white/10 text-xs font-display uppercase tracking-widest text-slate-400 hover:border-accent-gold/50 hover:text-accent-gold transition-colors cursor-default bg-space-900/50">
                {proc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};