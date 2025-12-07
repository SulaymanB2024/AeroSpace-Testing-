import React from 'react';
import { Section, SectionHeader } from './ui/Section';
import { ArrowUpRight } from 'lucide-react';

export const Careers: React.FC = () => {
  return (
    <Section id="careers">
      <SectionHeader title="Join The Vanguard" subtitle="For those who obsess over microns." />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-xl text-slate-300 mb-8 font-serif">
            We are not looking for employees. We are looking for artisans of the machine age.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            If you believe that a toolpath is a form of art, and that a non-conformance report is a personal affront to your craft, you belong here. 
            We offer an environment of quiet focus, elite tooling, and the most challenging geometries in the industry.
          </p>
          <a href="mailto:careers@elfarr.aerospace" className="inline-flex items-center gap-2 text-white border-b border-accent-gold pb-1 hover:text-accent-gold transition-colors font-display uppercase tracking-widest text-sm">
            Send Portfolio & CV <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-6">
          {[
            { role: "Senior Manufacturing Engineer", detail: "Must dream in 5-axis. Mastercam expertise required." },
            { role: "Precision CNC Machinist", detail: "Setup and run. Exotic alloys. Zero scrap tolerance." },
            { role: "Quality & Test Lead", detail: "The final gatekeeper. GD&T mastery is non-negotiable." },
          ].map((job, idx) => (
            <div key={idx} className="group p-6 border border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-display font-medium text-white group-hover:text-accent-teal transition-colors">
                  {job.role}
                </h4>
                <span className="text-slate-600 text-xs uppercase tracking-wider">Open</span>
              </div>
              <p className="text-sm text-slate-500 font-light">
                {job.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};