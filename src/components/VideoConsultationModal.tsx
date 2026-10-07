import React, { useState } from 'react';
import { 
  X, Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, 
  FileText, ShieldCheck, User 
} from 'lucide-react';
import { Appointment } from '../types';

export const VideoConsultationModal: React.FC<{ appointment: Appointment | null; onClose: () => void }> = ({ appointment, onClose }) => {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'Doctor', text: 'Hello Rahul! I am reviewing your recent blood report and symptoms. How are you feeling right now?' }
  ]);

  if (!appointment) return null;

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'You', text: chatMessage }]);
    setChatMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'Doctor', text: 'Thank you for updating me. Let us review the cardiac treatment plan.' }]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-navy-950 px-6 py-3 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-teal-400" />
              <span>Telemedicine Encrypted Room</span>
            </h3>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded font-bold">
              HD Video
            </span>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full bg-navy-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Grid & Chat Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[480px]">
          
          {/* Doctor Video Stream */}
          <div className="lg:col-span-2 bg-black relative flex items-center justify-center overflow-hidden">
            <img 
              src={appointment.doctorPhoto} 
              alt={appointment.doctorName} 
              className={`w-full h-full object-cover ${videoOff ? 'opacity-20 blur-sm' : 'opacity-90'}`}
            />

            {/* Doctor Name overlay */}
            <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-navy-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <div>
                <p className="font-bold text-xs text-white">{appointment.doctorName}</p>
                <p className="text-[10px] text-teal-400">{appointment.specialty}</p>
              </div>
            </div>

            {/* Patient Self-View Thumbnail */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-navy-900 border-2 border-teal-500/50 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
              <div className="text-center">
                <User className="w-6 h-6 text-slate-400 mx-auto" />
                <span className="text-[9px] text-slate-300 font-bold block mt-1">Rahul V. (You)</span>
              </div>
            </div>

            {/* Call Action Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-navy-950/90 backdrop-blur-xs px-4 py-2 rounded-2xl border border-navy-700 shadow-2xl">
              <button
                onClick={() => setMuted(!muted)}
                className={`p-3 rounded-full transition ${muted ? 'bg-rose-600 text-white' : 'bg-navy-800 text-slate-200 hover:bg-navy-700'}`}
                title={muted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOff(!videoOff)}
                className={`p-3 rounded-full transition ${videoOff ? 'bg-rose-600 text-white' : 'bg-navy-800 text-slate-200 hover:bg-navy-700'}`}
                title={videoOff ? 'Turn Video On' : 'Turn Video Off'}
              >
                {videoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition shadow-lg"
                title="End Consultation Call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* In-Call Doctor Chat */}
          <div className="lg:col-span-1 bg-navy-900 border-l border-navy-800 flex flex-col justify-between">
            <div className="p-3 border-b border-navy-800 bg-navy-950 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <h4 className="font-bold text-xs text-white">Consultation Chat & Notes</h4>
            </div>

            <div className="flex-1 p-3 space-y-2 overflow-y-auto text-xs">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-xl max-w-[85%] ${
                    msg.sender === 'You' ? 'bg-teal-500/20 text-teal-200 border border-teal-500/30 ml-auto' : 'bg-navy-950 text-slate-300 border border-navy-800'
                  }`}
                >
                  <span className="font-bold text-[10px] text-slate-400 block mb-0.5">{msg.sender}</span>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-navy-800 bg-navy-950 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type message to doctor..."
                className="flex-1 bg-navy-900 border border-navy-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-teal-500 text-navy-950 font-bold text-xs rounded-xl hover:bg-teal-400 transition"
              >
                Send
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
