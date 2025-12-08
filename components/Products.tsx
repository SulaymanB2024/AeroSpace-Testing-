
import React, { useState } from 'react';
import { Section, SectionHeader } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Settings, Disc, CircleDot, Hexagon, ArrowRight, Anchor, Cpu, Box, XCircle, Search, List, Grid, ArrowUpDown } from 'lucide-react';
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
    stock: "High",
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
    stock: "High",
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
    stock: "High",
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
    stock: "Med",
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
    stock: "High",
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
    stock: "High",
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
    stock: "High",
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
    stock: "High",
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
    stock: "Low",
    specs: {
      types: ["Shims", "Spacers", "Bushings", "Bearings", "Cable Ties", "U-Bolts"],
      manufacturers: ["Amatom", "Unicorp", "Young Engineers", "Panduit"]
    }
  },
];

type SortField = 'id' | 'name' | 'desc' | 'std' | 'stock';

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof productData[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredProducts = productData
    .filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.std.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <Section id="products">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <SectionHeader 
          chapter="02/06"
          title="Hardware Catalog" 
          subtitle="Inventory Database"
          align="left"
        />
        
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
           <button 
             onClick={() => setViewMode('grid')}
             className={`p-2 rounded transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-space-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
           >
             <Grid className="w-4 h-4" />
           </button>
           <button 
             onClick={() => setViewMode('list')}
             className={`p-2 rounded transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-space-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
           >
             <List className="w-4 h-4" />
           </button>
        </div>
      </div>
      
      {/* Search Header - Elegant */}
      <div className="mb-12">
         <div className="relative group w-full">
            <div className="relative flex items-center bg-white/5 border border-white/10 p-4 rounded-xl transition-colors focus-within:bg-white/10 focus-within:border-white/30">
               <div className="pr-4 text-slate-500">
                  <Search className="w-5 h-5" />
               </div>
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search by part number, standard, or category..." 
                 className="flex-grow bg-transparent border-none text-white placeholder:text-slate-500 text-lg focus:outline-none w-full font-display"
               />
               {searchQuery && (
                 <button onClick={() => setSearchQuery('')} className="pl-4 text-slate-500 hover:text-white">
                   <XCircle className="w-5 h-5" />
                 </button>
               )}
            </div>
         </div>
      </div>
      
      {/* Content Area */}
      <div className="min-h-[400px]">
        {filteredProducts.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setSelectedProduct(item)}
                      className="group bg-space-900 border border-white/5 p-8 hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col h-[340px] rounded-2xl hover:bg-white/[0.02] relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-space-950 transition-colors duration-500">
                            {item.icon}
                         </div>
                         <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest border border-white/10 px-2 py-1 rounded bg-space-950">{item.std}</span>
                      </div>
                      
                      <h3 className="text-2xl font-display font-medium text-white mb-2 group-hover:text-accent-gold transition-colors">
                        {item.name}
                      </h3>
                      
                      <p className="text-sm text-slate-400 font-light mb-auto leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.desc}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                         <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">View Specs</span>
                         <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-accent-gold group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              // LIST VIEW - High Fidelity Manifest
              <div className="rounded-xl border border-white/10 bg-space-900 overflow-x-auto">
                <div className="min-w-[800px] grid grid-cols-12 bg-white/5 p-4 border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   <div className="col-span-1 cursor-pointer hover:text-white flex items-center gap-1" onClick={() => handleSort('id')}>
                     ID <ArrowUpDown className="w-3 h-3" />
                   </div>
                   <div className="col-span-3 cursor-pointer hover:text-white flex items-center gap-1" onClick={() => handleSort('name')}>
                     Item Family <ArrowUpDown className="w-3 h-3" />
                   </div>
                   <div className="col-span-4 cursor-pointer hover:text-white flex items-center gap-1" onClick={() => handleSort('desc')}>
                     Specification <ArrowUpDown className="w-3 h-3" />
                   </div>
                   <div className="col-span-2 text-center cursor-pointer hover:text-white flex items-center justify-center gap-1" onClick={() => handleSort('std')}>
                     Standards <ArrowUpDown className="w-3 h-3" />
                   </div>
                   <div className="col-span-1 text-center cursor-pointer hover:text-white flex items-center justify-center gap-1" onClick={() => handleSort('stock')}>
                     Status <ArrowUpDown className="w-3 h-3" />
                   </div>
                   <div className="col-span-1 text-right">Action</div>
                </div>
                {filteredProducts.map((item, idx) => (
                   <motion.div 
                     key={item.id}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.05 }}
                     onClick={() => setSelectedProduct(item)}
                     className="min-w-[800px] grid grid-cols-12 p-5 border-b border-white/5 items-center hover:bg-white/[0.04] transition-colors cursor-pointer group text-sm relative"
                   >
                      <div className="col-span-1 text-slate-600 font-mono">{(idx + 1).toString().padStart(2, '0')}</div>
                      <div className="col-span-3 font-medium text-white flex items-center gap-3">
                         <span className="text-slate-500 opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</span> {item.name}
                      </div>
                      <div className="col-span-4 text-slate-400 font-light truncate pr-4">{item.desc}</div>
                      <div className="col-span-2 text-slate-500 text-xs font-mono text-center bg-white/5 rounded py-1 mx-2">{item.std}</div>
                      <div className="col-span-1 flex justify-center">
                         <div className={`w-2 h-2 rounded-full ${item.stock === 'High' ? 'bg-green-500' : 'bg-yellow-500'} shadow-[0_0_8px_rgba(34,197,94,0.4)]`} />
                      </div>
                      <div className="col-span-1 text-right">
                         <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            SELECT
                         </span>
                      </div>
                   </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border border-white/10 rounded-xl bg-space-900/30">
            <Search className="w-8 h-8 text-slate-600 mb-4" />
            <p className="text-slate-400 mb-2 font-display">No matching items found.</p>
            <p className="text-slate-600 text-xs">Try searching for generic terms like "Bolt" or "Screw"</p>
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
        {selectedProduct && (
          <div className="space-y-8">
             <div className="flex items-center gap-6 border-b border-white/10 pb-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                   {selectedProduct.icon && React.cloneElement(selectedProduct.icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
                </div>
                <div>
                   <p className="text-xl text-slate-200 font-light leading-relaxed">{selectedProduct.desc}</p>
                   <div className="flex gap-3 mt-3">
                     {selectedProduct.std.split('/').map(s => (
                       <span key={s} className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-slate-300 font-mono">{s.trim()}</span>
                     ))}
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                      Types & Configurations
                   </h4>
                   <ul className="space-y-3">
                      {selectedProduct.specs.types.map((type, i) => (
                         <li key={i} className="text-sm text-slate-300 flex items-center gap-3">
                           <div className="w-1 h-1 bg-accent-gold rounded-full" /> {type}
                         </li>
                      ))}
                   </ul>
                </div>
                
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                      Sample Part Numbers
                   </h4>
                   <div className="bg-space-950 rounded-xl border border-white/10 p-6 font-mono text-sm text-slate-300 shadow-inner">
                      {selectedProduct.specs.part_numbers?.map((pn, i) => (
                         <div key={i} className="mb-2 last:mb-0 text-slate-400 hover:text-white transition-colors cursor-default">{pn}</div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="pt-8 border-t border-white/10">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                   Representative Manufacturers
                </h4>
                <div className="flex flex-wrap gap-2">
                   {selectedProduct.specs.manufacturers?.map((mfg, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-colors cursor-default">
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
               className="w-full py-5 bg-white text-space-950 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-slate-200 transition-colors shadow-lg mt-4"
             >
               Request Quote for {selectedProduct.name}
             </button>
          </div>
        )}
      </Modal>
    </Section>
  );
};
