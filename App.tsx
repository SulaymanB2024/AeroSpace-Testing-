import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { Manufacturers } from './components/Manufacturers';
import { News } from './components/News';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Cursor } from './components/ui/Cursor';

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[30] opacity-[0.04] mix-blend-overlay select-none">
    <div 
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-space-950 text-slate-200 overflow-x-hidden selection:bg-accent-gold/30 selection:text-white relative">
      <GrainOverlay />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Products />
        <Services />
        <Manufacturers />
        <News />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;