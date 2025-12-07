
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, ChevronRight, Minimize2, Radio } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const quickActions = [
  { label: "Request A Quote", query: "I would like to request a formal quote." },
  { label: "Check Inventory", query: "How do I search your inventory?" },
  { label: "Quality Certs", query: "Are your parts AS9100 certified?" },
  { label: "Contact Sales", query: "Connect me with a sales representative." },
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "System Online. Welcome to Aerospace Fasteners Inc. How can I assist with your procurement needs?", sender: 'bot', timestamp: new Date() }
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

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // User Message
    const userMsg: Message = { id: Date.now(), text: text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate Network Latency / Processing
    setTimeout(() => {
      let botResponseText = "Thank you. A representative has been notified of your inquiry. For immediate assistance, please use the secure contact form below or call 903-723-0693.";
      
      if (text.includes("inventory") || text.includes("stock")) {
        botResponseText = "Our live inventory database is accessible via the 'Products' section. You can search by Part Number, Spec, or Category directly.";
      } else if (text.includes("quote")) {
        botResponseText = "To initiate a quote, please navigate to the Contact section or click 'Request Quote' in the navigation bar. We typically respond within 2-4 hours.";
      } else if (text.includes("cert") || text.includes("AS9100") || text.includes("ISO")) {
        botResponseText = "We are AS9100 Rev D and ISO 9001:2015 certified. All shipments include full manufacturer traceability and chemical/physical test reports.";
      }

      const botMsg: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
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
            <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative w-14 h-14 bg-space-900 border border-white/20 rounded-full flex items-center justify-center hover:border-accent-gold transition-colors shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-accent-gold/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
               <MessageSquare className="w-6 h-6 text-white group-hover:text-accent-gold transition-colors relative z-10" />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-space-950 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
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
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-4 md:right-8 z-50 w-[90vw] md:w-[400px] h-[500px] bg-space-950/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                   COMMS_LINK // ONLINE
                 </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white">
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
               {messages.map((msg) => (
                 <motion.div 
                   key={msg.id}
                   initial={{ opacity: 0, x: msg.sender === 'bot' ? -10 : 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                   <div className={`max-w-[85%] p-3 text-sm leading-relaxed border ${
                     msg.sender === 'user' 
                       ? 'bg-white/10 border-white/20 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg' 
                       : 'bg-space-900 border-accent-gold/20 text-slate-300 rounded-tr-lg rounded-bl-lg rounded-br-lg'
                   }`}>
                      {msg.sender === 'bot' && (
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                           <Terminal className="w-3 h-3 text-accent-gold" />
                           <span className="text-[9px] font-mono text-accent-gold uppercase tracking-wider">System Agent</span>
                        </div>
                      )}
                      {msg.text}
                   </div>
                 </motion.div>
               ))}
               
               {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-space-900 border border-accent-gold/20 p-3 rounded-tr-lg rounded-bl-lg rounded-br-lg flex gap-1 items-center">
                       <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                       <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                       <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-space-900 border-t border-white/10 flex gap-2 overflow-x-auto custom-scrollbar">
               {quickActions.map((action, i) => (
                 <button
                   key={i}
                   onClick={() => handleSend(action.query)}
                   className="whitespace-nowrap px-3 py-1.5 bg-white/5 border border-white/10 hover:border-accent-gold/50 hover:bg-white/10 text-[10px] text-slate-400 hover:text-white font-mono uppercase tracking-wide transition-all rounded"
                 >
                   {action.label}
                 </button>
               ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-space-950 border-t border-white/10">
               <form 
                 onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
                 className="flex items-center gap-2"
               >
                 <div className="flex-grow relative">
                    <input 
                      type="text" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="TRANSMIT MESSAGE..."
                      className="w-full bg-space-900 border border-white/10 px-4 py-2 text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-accent-gold/50 transition-colors rounded-sm"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                       <div className={`w-1.5 h-1.5 rounded-full ${inputText ? 'bg-accent-gold animate-pulse' : 'bg-slate-700'}`} />
                    </div>
                 </div>
                 <button 
                   type="submit"
                   disabled={!inputText.trim()}
                   className="p-2 bg-white text-space-950 hover:bg-accent-gold disabled:opacity-50 disabled:hover:bg-white transition-colors rounded-sm"
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
