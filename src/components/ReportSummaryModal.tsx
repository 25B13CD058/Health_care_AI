import React from 'react';
import { 
  X, Sparkles, AlertTriangle, CheckCircle2, HelpCircle, 
  Stethoscope, ShieldAlert, FileText, Info 
} from 'lucide-react';
import { HealthRecord } from '../types';
import { useApp } from '../context/AppContext';

export const ReportSummaryModal: React.FC<{ record: HealthRecord | null; onClose: () => void }> = ({ record, onClose }) => {
  const { navigateTo } = useApp();

  if (!record || !record.summary) return null;

  const { summary } = record;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-teal-950 p-6 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded uppercase">
                AI Medical Report Explanation
              </span>
              <h2 className="text-lg font-extrabold text-white mt-0.5">{record.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full bg-navy-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* 1. REPORT TYPE */}
          <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">REPORT TYPE</span>
            <span className="font-extrabold text-sm text-teal-300">{summary.reportType || record.type}</span>
          </div>

          {/* 2. KEY INFORMATION */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              KEY INFORMATION:
            </h4>
            <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-2">
              {summary.keyInformation && summary.keyInformation.map((info, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>{info}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. SIMPLE EXPLANATION */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-400" />
              SIMPLE EXPLANATION:
            </h4>
            <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 text-slate-200 leading-relaxed">
              {summary.simpleExplanation || 'Your uploaded lab panel shows values within acceptable reference limits.'}
            </div>
          </div>

          {/* 4. POSSIBLE SPECIALTY TO DISCUSS WITH */}
          <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">POSSIBLE SPECIALTY TO DISCUSS WITH</span>
              <span className="font-extrabold text-sm text-white">{summary.potentialSpecialty}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                navigateTo('doctors');
              }}
              className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition shadow-md flex items-center gap-1"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Find Specialist</span>
            </button>
          </div>

          {/* 5. QUESTIONS TO ASK YOUR DOCTOR */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-400" />
              QUESTIONS TO ASK YOUR DOCTOR:
            </h4>
            <ul className="space-y-1.5 bg-navy-950 p-3.5 rounded-xl border border-navy-800">
              {summary.questionsForDoctor.map((q, idx) => (
                <li key={idx} className="text-slate-300 flex items-start gap-2">
                  <span className="text-teal-400 font-bold">Q{idx + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer Strip */}
          <div className="bg-navy-950 p-3 rounded-xl border border-navy-800 flex items-start gap-2 text-[11px] text-slate-400">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Educational Summary Disclaimer:</strong> This is an educational summary and does <strong>not</strong> replace professional medical advice, clinical diagnosis, or formal lab interpretation.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-xs rounded-xl transition">
            Close Explanation
          </button>
        </div>

      </div>
    </div>
  );
};
