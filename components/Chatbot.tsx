
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, ChevronRight, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  action?: { label: string; link: string };
}

const quickActions = [
  { label: "Request Quote", query: "I would like to request a formal quote." },
  { label: "Search Inventory", query: "How do I search your inventory?" },
  { label: "View Certifications", query: "What certifications do you hold?" },
  { label: "Track Order", query: "I need to check order status." },
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Good day. I am the Aerospace Fasteners concierge. How may I assist you with your procurement today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (text: string): { text: string; action?: { label: string; link: string } } => {
    const lower = text.toLowerCase();
    
    if (lower.match(/inventory|stock|search|find/)) {
      return { 
        text: "Our entire catalog of certified SKUs is available for real-time search. You can filter by standard (AN, MS, NAS) or category.",
        action: { label: "Open Catalog", link: "#products" }
      };
    }
    if (lower.match(/quote|price|cost|buy|rfq/)) {
      return {
        text: "I can direct you to our priority quote request form. Our engineering team typically reviews inquiries within 2-4 hours.",
        action: { label: "Start RFQ", link: "#contact" }
      };
    }
    if (lower.match(/cert|iso|as9100|quality/)) {
      return {
        text: "We maintain AS9100 Rev D and ISO 9001:2015 certifications. All hardware ships with full manufacturer traceability.",
        action: { label: "View QC", link: "#services" }
      };
    }
    if (lower.match(/location|address|where/)) {
      return { text: "Our headquarters and primary distribution facility is located at 255 N US 287, Palestine, TX 75803." };
    }
    if (lower.match(/phone|call|number/)) {
      return { text: "You can reach our sales desk directly at 903-723-0693 during business hours (CST)." };
    }
    
    return { text: "I've noted that inquiry. A specialist will be better suited to assist—would you like to open a priority ticket?" };
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // User Message
    const userMsg: Message = { id: Date.now(), text: text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate Processing
    setTimeout(() => {
      const response = generateResponse(text);
      const botMsg: Message = { 
        id: Date.now() + 1, 
        text: response.text, 
        sender: 'bot', 
        timestamp: new Date(),
        action: response.action
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-40 group"
          >
            <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-2xl overflow-hidden">
               <Sparkles className="w-5 h-5 text-white" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 right-4 md:right-8 z-50 w-[90vw] md:w-[380px] h-[550px] bg-space-950/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                 <div>
                   <h3 className="font-display font-medium text-white text-sm">Concierge</h3>
                   <p className="text-[10px] text-slate-400">Aerospace Fasteners Inc.</p>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto p-5 space-y-6 custom-scrollbar">
               {messages.map((msg) => (
                 <motion.div 
                   key={msg.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                 >
                   <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                     msg.sender === 'user' 
                       ? 'bg-white text-space-950 rounded-2xl rounded-tr-sm shadow-md' 
                       : 'bg-white/5 border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm'
                   }`}>
                      {msg.text}
                   </div>
                   
                   {msg.action && (
                     <button 
                       onClick={() => {
                         const element = document.querySelector(msg.action!.link);
                         element?.scrollIntoView({ behavior: 'smooth' });
                         setIsOpen(false);
                       }}
                       className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-gold hover:text-white transition-colors ml-1"
                     >
                       <ChevronRight className="w-3 h-3" /> {msg.action.label}
                     </button>
                   )}
                   
                   <span className="text-[10px] text-slate-600 mt-2 px-1">
                     {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                 </motion.div>
               ))}
               
               {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                       <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                       <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                       <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-space-950/50 border-t border-white/5">
               {/* Quick Actions */}
               <div className="flex gap-2 overflow-x-auto custom-scrollbar mb-4 pb-2">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(action.query)}
                      className="whitespace-nowrap px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[10px] text-slate-300 font-medium transition-all rounded-full"
                    >
                      {action.label}
                    </button>
                  ))}
               </div>

               <form 
                 onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
                 className="relative"
               >
                 <input 
                   type="text" 
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   placeholder="Type your inquiry..."
                   className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all rounded-xl"
                 />
                 <button 
                   type="submit"
                   disabled={!inputText.trim()}
                   className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-space-950 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                 >
                   <Send className="w-4 h-4" />
                 </button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
    