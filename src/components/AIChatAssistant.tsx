import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, Sparkles, User, RefreshCw, ShieldAlert, ArrowRight, Minimize2 
} from 'lucide-react';
import { analyzeSymptoms } from '../services/aiService';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isEmergency?: boolean;
}

export const AIChatAssistant: React.FC = () => {
  const { navigateTo, setEmergencyModalOpen } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your CareAI Assistant. I can help you find the right medical specialty, prepare questions for your doctor, or guide you through health services. How can I help you today?',
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    "Which doctor for chronic back pain?",
    "What questions to ask a cardiologist?",
    "How to prepare for a fasting blood test?",
    "What is an ECG vs Echo test?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    try {
      const res = await analyzeSymptoms(text);
      let aiResponseText = '';
      let isEmerg = res.isEmergency;

      if (res.isEmergency) {
        aiResponseText = `🚨 URGENT: Your symptoms may indicate an emergency (${res.redFlags.join(', ')}). Please consider calling 108 emergency immediately or booking an ambulance dispatch.`;
      } else {
        aiResponseText = `Based on your complaint, you may want to consider consulting a **${res.primarySpecialty}** specialist.\n\nKey Recommendation: ${res.explanation}\n\nSuggested Next Steps:\n${res.actionPlan.map(a => `• ${a}`).join('\n')}`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: isEmerg
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'CareAI is here to guide you to appropriate specialists. You can also explore our Specialties tab or search for verified local doctors.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 rounded-full font-black text-xs shadow-2xl transition hover:scale-105 border-2 border-teal-300 cursor-pointer"
        >
          <Bot className="w-5 h-5 text-navy-950" />
          <span className="hidden sm:inline">💬 CareAI Assistant</span>
          <span className="flex h-3 w-3 absolute -top-1 -right-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400"></span>
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="bg-navy-900 border border-teal-500/40 rounded-3xl w-[360px] sm:w-[420px] h-[520px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-teal-950 border-b border-navy-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-navy-950 font-black shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                  <span>CareAI Assistant</span>
                  <Sparkles className="w-3 h-3 text-teal-400" />
                </h3>
                <p className="text-[10px] text-teal-300">24/7 AI Healthcare Guidance</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-navy-800 transition"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-navy-950/60 scrollbar-thin scrollbar-thumb-navy-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[80%] rounded-2xl p-3 text-xs shadow-md whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-teal-500 text-navy-950 font-bold rounded-tr-none' 
                    : msg.isEmergency
                    ? 'bg-rose-950 border border-rose-500 text-rose-100 rounded-tl-none'
                    : 'bg-navy-900 border border-navy-800 text-slate-200 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>

                  {msg.isEmergency && (
                    <div className="mt-2 pt-2 border-t border-rose-500/40 flex gap-2">
                      <button
                        onClick={() => { setIsOpen(false); setEmergencyModalOpen(true); }}
                        className="px-2.5 py-1 bg-amber-400 text-navy-950 font-black rounded-lg text-[10px]"
                      >
                        Book Ambulance
                      </button>
                      <a
                        href="tel:108"
                        className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded-lg text-[10px]"
                      >
                        Call 108
                      </a>
                    </div>
                  )}

                  <span className="block text-[9px] opacity-60 text-right mt-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-navy-800 border border-navy-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                <span>CareAI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Carousel */}
          <div className="px-3 py-2 bg-navy-900 border-t border-navy-800 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[10px] font-semibold whitespace-nowrap bg-navy-950 hover:bg-navy-800 text-slate-300 border border-navy-800 hover:border-teal-500/50 px-2.5 py-1 rounded-lg transition"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-navy-900 border-t border-navy-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask CareAI a question..."
              className="flex-1 bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputMsg.trim() || isTyping}
              className="p-2 bg-teal-500 hover:bg-teal-400 text-navy-950 rounded-xl font-bold transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
