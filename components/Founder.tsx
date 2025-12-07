import React from 'react';
import { Section } from './ui/Section';

export const Founder: React.FC = () => {
  return (
    <Section id="founder" noPadding>
      <div className="flex flex-col md:flex-row h-auto md:h-screen min-h-[800px]">
        {/* Image Side */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-full">
          <img 
            src="https://picsum.photos/seed/presley/900/1200" 
            alt="Monochrome photograph of Presley Elfarr in a minimalist hangar"
            className="w-full h-full object-cover grayscale" 
          />
          <div className="absolute inset-0 bg-space-950/20 mix-blend-multiply" />
          <div className="absolute bottom-12 left-12 text-white">
            <h3 className="font-display font-bold text-2xl tracking-widest uppercase">Presley Elfarr</h3>
            <p className="font-serif italic text-slate-300">Founder & CEO</p>
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 bg-space-950 flex items-center p-12 md:p-24">
          <div>
            <span className="block h-[1px] w-20 bg-accent-gold mb-8" />
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-8">
              "To build for space is to strip away the unessential. It is the ultimate exercise in honesty."
            </h2>
            
            <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
              <p>
                Presley Elfarr founded ELFARR AEROSPACE with a singular conviction: that industrial manufacturing lacked the intentionality of high design.
              </p>
              <p>
                Trained as both a mechanical engineer and an industrial designer, she brings a relentless eye for proportion and surface quality to an industry typically obsessed only with function. Under her direction, a bracket is never just a bracket—it is a study in force vectors and material efficiency.
              </p>
              <p>
                She serves not only as CEO but as Creative Director of the physical product, personally approving the surface finish standards and toolpath strategies that define the Elfarr signature.
              </p>
            </div>
            
            <div className="mt-12">
               <img src="https://picsum.photos/seed/signature/200/60" alt="Presley Signature" className="h-12 opacity-50 invert" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};