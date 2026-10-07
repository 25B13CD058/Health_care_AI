import React, { useState } from 'react';
import { 
  X, ClipboardList, Copy, Download, Check, Sparkles, AlertCircle, FileText, Stethoscope, HelpCircle, CheckCircle2 
} from 'lucide-react';
import { DoctorVisitPrep } from '../types';

interface DoctorVisitPrepModalProps {
  prepData: DoctorVisitPrep | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DoctorVisitPrepModal: React.FC<DoctorVisitPrepModalProps> = ({ prepData, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !prepData) return null;

  const formattedSummary = `
==================================================
CAREAI - DOCTOR VISIT PREPARATION SUMMARY
==================================================
Suggested Specialty: ${prepData.suggestedSpecialty}
Main Complaint: ${prepData.mainConcern}
Duration: ${prepData.duration}
Severity: ${prepData.severity}

SYMPTOMS:
${prepData.symptoms.map(s => `• ${s}`).join('\n')}

ADDITIONAL CONTEXT & HISTORY:
${prepData.relevantInfo}

RECOMMENDED QUESTIONS TO ASK THE DOCTOR:
${prepData.questionsToAsk.map((q, i) => `${i + 1}. ${q}`).join('\n')}

WHAT TO BRING TO YOUR APPOINTMENT:
${prepData.infoToBring.map(b => `• ${b}`).join('\n')}

--------------------------------------------------
Note: Formatted by CareAI Assistant for educational visit preparation. Not a medical diagnosis.
==================================================
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([formattedSummary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `CareAI_Doctor_Visit_Prep_${prepData.suggestedSpecialty.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">📋 Prepare Me For My Doctor</h2>
              <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded">
                AI Visit Prep
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Show or share this structured summary with your {prepData.suggestedSpecialty} specialist.
            </p>
          </div>
        </div>

        {/* Structured Content Card */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-navy-700">
          
          {/* Section 1: Core Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-navy-950 p-3 rounded-2xl border border-navy-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Specialty</span>
              <span className="text-xs font-black text-teal-300">{prepData.suggestedSpecialty}</span>
            </div>
            <div className="bg-navy-950 p-3 rounded-2xl border border-navy-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Main Concern</span>
              <span className="text-xs font-bold text-white truncate block">{prepData.mainConcern}</span>
            </div>
            <div className="bg-navy-950 p-3 rounded-2xl border border-navy-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Duration</span>
              <span className="text-xs font-bold text-slate-200">{prepData.duration}</span>
            </div>
            <div className="bg-navy-950 p-3 rounded-2xl border border-navy-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Severity</span>
              <span className="text-xs font-bold text-amber-400 capitalize">{prepData.severity}</span>
            </div>
          </div>

          {/* Section 2: Reported Symptoms */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-400" /> Key Reported Symptoms
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {prepData.symptoms.map((symptom, i) => (
                <span key={i} className="text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-lg">
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Recommended Questions for Doctor */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-400" /> Recommended Questions to Ask Your Doctor
            </h4>
            <ul className="space-y-2">
              {prepData.questionsToAsk.map((q, i) => (
                <li key={i} className="text-xs text-slate-200 flex items-start gap-2 bg-navy-900/60 p-2.5 rounded-xl border border-navy-800">
                  <span className="text-teal-400 font-bold">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: What to Bring */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Items to Bring to Consultation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {prepData.infoToBring.map((item, i) => (
                <div key={i} className="text-xs text-slate-300 bg-navy-900/60 p-2.5 rounded-xl border border-navy-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-navy-800">
          <p className="text-[11px] text-slate-400 italic">
            Educational tool for visit readiness.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-navy-950 hover:bg-navy-800 text-teal-300 border border-teal-500/40 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Summary!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 rounded-xl text-xs font-black transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Summary (.txt)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
