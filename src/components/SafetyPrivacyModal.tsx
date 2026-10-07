import React from 'react';
import { 
  X, ShieldCheck, Lock, AlertTriangle, FileText, CheckCircle2, UserCheck, HeartPulse 
} from 'lucide-react';

interface SafetyPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyPrivacyModal: React.FC<SafetyPrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-navy-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-navy-900 border border-teal-500/40 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-navy-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-navy-950 font-black shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">🔒 AI Safety, Privacy & Clinical Guardrails</h2>
            <p className="text-xs text-slate-300">
              CareAI Architecture Standards for HacXLerate 2026 – AI in Healthcare
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-navy-700">
          
          {/* Card 1: Non-Diagnostic Educational Scope */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" />
              1. Non-Diagnostic Navigation Assistant
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              CareAI is engineered specifically to provide educational healthcare navigation and specialty matching. It uses language such as <em>"Suggested specialty to consider"</em> rather than definitive diagnostic claims. CareAI does not replace clinical evaluation by a qualified medical practitioner.
            </p>
          </div>

          {/* Card 2: 4-Level Emergency Protocol */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              2. Strict Emergency Triage Guardrails
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When symptoms like acute chest pain, stroke signs (FAST), severe hemorrhage, or respiratory distress are detected, CareAI instantly triggers high-visibility emergency banners, offers 1-click 108 emergency dialing, and enables automated ambulance dispatch.
            </p>
          </div>

          {/* Card 3: Privacy & Data Protection */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              3. Privacy & Data Confidentiality
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All symptom queries, health record summaries, and family profiles are encrypted locally in your browser session. Patient data is never stored, sold, or shared with unauthorized third parties.
            </p>
          </div>

          {/* Card 4: Human-in-the-loop */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              4. Doctor-in-the-Loop Workflow
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              CareAI creates structured <strong>Doctor Visit Prep Summaries</strong> to empower patients during consultations, giving licensed doctors complete context and maintaining human oversight over all medical decisions.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">CareAI Hackathon Compliance • Version 2.0</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-xs rounded-xl transition shadow-lg"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
