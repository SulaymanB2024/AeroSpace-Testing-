import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Settings, Disc, CircleDot, Hexagon, ArrowRight, Anchor, Cpu, Box, XCircle, Terminal, FileText, List, Grid } from 'lucide-react';
import { Modal } from './ui/Modal';

// Product Data aligned with Aerospace Fasteners Inc. Inventory
const productData = [
  { 
    id: "fittings",
    icon: <Settings className="w-5 h-5" />, 
    name: "Fittings", 
    desc: "Flared, flareless, and standard fittings.", 
    std: "AN / MS / NAS",
    summary: "Fluid connection hardware",
    specs: {
      types: ["Flared Fittings", "Flareless Fittings", "Standard Fittings"],
      part_numbers: ["AN774 - AN939", "MS20819 - MS21905", "AN6289"],
      manufacturers: ["Howmet", "Shur-Lok", "Pamco", "Aerofit", "Permaswage"]
    }
  },
  { 
    id: "screws",
    icon: <Wrench className="w-5 h-5" />, 
    name: "Screws", 
    desc: "Socket cap, flange, machine, and self-tapping screws.", 
    std: "AN / MS / NAS",
    summary: "Structural and system screws",
    specs: {
      types: ["Socket Cap", "Flange", "Machine", "Self-Tapping", "Hex Cap", "Set Screws"],
      part_numbers: ["AN115401+", "MS24673", "NAS1121", "NAS1351", "MS51975"],
      manufacturers: ["B&B Specialties", "Ideal Fasteners", "SPS Fasteners", "Mac Fasteners"]
    }
  },
  { 
    id: "bolts",
    icon: <Hexagon className="w-5 h-5" />, 
    name: "Bolts", 
    desc: "Hex, carriage, structural, and close-tolerance bolts.", 
    std: "AN / MS / NAS",
    summary: "Structural fastening",
    specs: {
      types: ["Hex Bolts", "Carriage Bolts", "Structural Bolts", "Close Tolerance", "12-Point"],
      part_numbers: ["AN3-20", "MS20004-20024", "NAS1003-1020", "NAS624-644"],
      manufacturers: ["Howmet", "Acufast", "GS Aerospace", "Reid Products"]
    }
  },
  { 
    id: "pins",
    icon: <Anchor className="w-5 h-5" />, 
    name: "Pins", 
    desc: "Cotter, dowel, hitch, and spring pins.", 
    std: "MS / NAS / AN",
    summary: "Assembly retention",
    specs: {
      types: ["Cotter Pins", "Dowel Pins", "Hitch Pins", "Spring Pins"],
      part_numbers: ["MS24665", "MS20253", "NAS561", "AN380", "MS16555"],
      standards: ["AN", "MS", "NAS", "NASM"]
    }
  },
  { 
    id: "nuts",
    icon: <Box className="w-5 h-5" />, 
    name: "Nuts", 
    desc: "Locknuts, castle, hex, and wing nuts.", 
    std: "AN / MS / NAS",
    summary: "Secure fastening",
    specs: {
      types: ["Castle", "Locknuts", "Hex", "Wing", "Rivet Nuts", "K-Lock"],
      part_numbers: ["AN310-365", "MS21042", "NAS679", "MS20365", "NAS1021"],
      manufacturers: ["MacLean-ESNA", "Bristol Industries", "SPS Technologies"]
    }
  },
  { 
    id: "orings",
    icon: <CircleDot className="w-5 h-5" />, 
    name: "O-Rings", 
    desc: "O-rings and retaining rings.", 
    std: "MS / NAS / AS",
    summary: "Sealing and retention",
    specs: {
      types: ["Extruded", "Lathe Cut", "Metal", "Spiral Rings"],
      part_numbers: ["MS28775", "MS29513", "M83248/1", "NAS1611"],
      manufacturers: ["Parker Seal", "Freudenberg-NOK", "Smalley", "Trelleborg"]
    }
  },
  { 
    id: "rivets",
    icon: <Disc className="w-5 h-5" />, 
    name: "Rivets", 
    desc: "Solid, blind, tubular, and structural rivets.", 
    std: "MS / NAS / BACR",
    summary: "Permanent fastening",
    specs: {
      types: ["Solid", "Blind", "Tubular", "Split", "Drive"],
      part_numbers: ["MS20470", "MS20426", "NAS1919", "BACR15"],
      manufacturers: ["National Rivet", "Avdel", "Allfast", "Cherry Aerospace"]
    }
  },
  { 
    id: "washers",
    icon: <Disc className="w-5 h-5" />, 
    name: "Washers", 
    desc: "Flat, lock, sealing, and wave washers.", 
    std: "AN / MS / NAS",
    summary: "Load distribution",
    specs: {
      types: ["Flat", "Split Lock", "Sealing", "Wave", "Countersunk"],
      part_numbers: ["AN960", "MS35338", "NAS1149", "MS20002"],
      manufacturers: ["Spirol", "Superior Washer", "Boker's"]
    }
  },
  { 
    id: "specialty",
    icon: <Cpu className="w-5 h-5" />, 
    name: "Specialty", 
    desc: "Shims, spacers, bushings, cable ties.", 
    std: "Custom",
    summary: "Miscellaneous hardware",
    specs: {
      types: ["Shims", "Spacers", "Bushings", "Bearings", "Cable Ties", "U-Bolts"],
      manufacturers: ["Amatom", "Unicorp", "Young Engineers", "Panduit"]
    }
  },
];

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof productData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = productData.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.std.toLowerCase().includes(query)
    );
  });

  return (
    <Section id="products">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <SectionHeader 
          title="Hardware Catalog" 
          subtitle="Inventory Database"
          align="left"
        />
        
        {/* View Toggle */}
        <div className="flex items-center gap-2 mb-20 md:mb-20">
           <button 
             onClick={() => setViewMode('grid')}
             className={`p-3 border transition-all duration-300 ${viewMode === 'grid' ? 'bg-white border-white text-space-950' : 'border-white/20 text-slate-500 hover:text-white hover:border-white/50'}`}
           >
             <Grid className="w-4 h-4" />
           </button>
           <button 
             onClick={() => setViewMode('list')}
             className={`p-3 border transition-all duration-300 ${viewMode === 'list' ? 'bg-white border-white text-space-950' : 'border-white/20 text-slate-500 hover:text-white hover:border-white/50'}`}
           >
             <List className="w-4 h-4" />
           </button>
        </div>
      </div>
      
      {/* Search Header - Refined */}
      <div className="mb-12">
         <div className="relative group max-w-full md:max-w-3xl mx-auto md:mx-0">
            <div className="absolute inset-0 bg-accent-gold/5 blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative flex items-center bg-space-950 border-b border-white/20 p-4 transition-colors group-focus-within:border-accent-gold">
               <Terminal className="w-5 h-5 text-slate-500 group-focus-within:text-accent-gold mr-4 transition-colors" />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search Inventory..." 
                 className="flex-grow bg-transparent border-none text-white placeholder:text-slate-700 font-mono text-lg focus:outline-none w-full"
               />
               {searchQuery && (
                 <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-white">
                   <XCircle className="w-5 h-5" />
                 </button>
               )}
            </div>
            
            {/* Status Line */}
            <div className="flex justify-between mt-2 font-mono text-[9px] uppercase tracking-widest text-slate-600">
               <div>Database: Online</div>
               <div>Matches: {filteredProducts.length}</div>
            </div>
         </div>
      </div>
      
      {/* Content Area */}
      <div className="min-h-[400px]">
        {filteredProducts.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProducts.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setSelectedProduct(item)}
                      className="group relative bg-space-900/50 border border-white/10 p-8 hover:border-white/30 transition-all duration-300 cursor-pointer flex flex-col h-[360px]"
                    >
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />

                      <div className="flex justify-between items-start mb-8">
                         <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent-gold/10 group-hover:border-accent-gold/50 transition-colors">
                            <div className="text-slate-400 group-hover:text-accent-gold transition-colors">
                               {item.icon}
                            </div>
                         </div>
                         <span className="font-mono text-[9px] text-slate-600">CAT: {item.id.toUpperCase()}</span>
                      </div>
                      
                      <h3 className="text-2xl font-display font-medium text-white mb-2 group-hover:text-accent-gold transition-colors">
                        {item.name}
                      </h3>
                      
                      <div className="w-8 h-[1px] bg-white/20 mb-6 group-hover:w-full transition-all duration-500" />
                      
                      <p className="text-sm text-slate-400 font-light mb-auto">
                        {item.desc}
                      </p>
                      
                      <div className="mt-8 pt-4 border-t border-dashed border-white/10 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">{item.std}</span>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                              View Specs <ArrowRight className="w-3 h-3 text-accent-gold" />
                            </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              // LIST VIEW - Technical Manifest Style
              <div className="border border-white/10 bg-space-950">
                <div className="grid grid-cols-12 bg-white/5 p-4 border-b border-white/10 text-[9px] font-mono text-slate-500 uppercase tracking-widest sticky top-0 z-10">
                   <div className="col-span-1">REF</div>
                   <div className="col-span-3">Category</div>
                   <div className="col-span-4">Description</div>
                   <div className="col-span-2">Standards</div>
                   <div className="col-span-2 text-right">Action</div>
                </div>
                {filteredProducts.map((item, idx) => (
                   <motion.div 
                     key={item.id}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.05 }}
                     onClick={() => setSelectedProduct(item)}
                     className="grid grid-cols-12 p-5 border-b border-white/5 items-center hover:bg-white/[0.05] transition-colors cursor-pointer group relative overflow-hidden"
                   >
                      {/* Row Scanline Effect */}
                      <div className="absolute inset-0 bg-accent-gold/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 pointer-events-none" />

                      <div className="col-span-1 font-mono text-[10px] text-slate-600 group-hover:text-accent-gold relative z-10">{(idx + 1).toString().padStart(2, '0')}</div>
                      <div className="col-span-3 font-display font-medium text-white text-lg flex items-center gap-3 relative z-10">
                         {item.icon} {item.name}
                      </div>
                      <div className="col-span-4 text-sm text-slate-400 font-light font-mono relative z-10">{item.desc}</div>
                      <div className="col-span-2 font-mono text-xs text-slate-500 relative z-10">{item.std}</div>
                      <div className="col-span-2 text-right relative z-10">
                         <span className="inline-flex items-center gap-2 text-[9px] uppercase font-bold text-accent-gold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            Spec Sheet <FileText className="w-3 h-3" />
                         </span>
                      </div>
                   </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border border-white/10 border-dashed bg-space-900/30">
            <p className="text-slate-500 font-mono mb-2">NO_MATCH_FOUND</p>
            <p className="text-slate-600 text-xs">Try searching for "AN", "MS", or "Bolt"</p>
          </div>
        )}
      </div>
      
      {/* Product Modal */}
      <Modal 
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || ""}
        subtitle="Product Category"
      >
        <div className="space-y-8">
           <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="p-4 bg-white/5 border border-white/10">
                 {selectedProduct?.icon}
              </div>
              <div>
                 <p className="text-lg text-slate-300 font-light">{selectedProduct?.desc}</p>
                 <p className="text-xs text-slate-500 font-mono mt-1">STANDARDS: {selectedProduct?.std}</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent-teal" /> Types & Series
                 </h4>
                 <ul className="space-y-2">
                    {selectedProduct?.specs.types.map((type, i) => (
                       <li key={i} className="text-sm text-slate-400 border-b border-white/5 pb-2 font-mono">{type}</li>
                    ))}
                 </ul>
              </div>
              
              <div>
                 <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest mb-4">
                    Sample Part Numbers
                 </h4>
                 <div className="bg-space-950 border border-white/10 p-4 font-mono text-xs text-accent-gold overflow-hidden">
                    {selectedProduct?.specs.part_numbers?.map((pn, i) => (
                       <div key={i} className="mb-1">{pn}</div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="pt-6 border-t border-white/10">
              <h4 className="text-[10px] font-display font-bold text-white uppercase tracking-widest mb-4">
                 Representative Manufacturers
              </h4>
              <div className="flex flex-wrap gap-2">
                 {selectedProduct?.specs.manufacturers?.map((mfg, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
                       {mfg}
                    </span>
                 ))}
              </div>
           </div>

           <button 
             onClick={() => {
                setSelectedProduct(null);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
             }}
             className="w-full py-4 bg-accent-gold text-space-950 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
           >
             Request Quote for {selectedProduct?.name}
           </button>
        </div>
      </Modal>
    </Section>
  );
};