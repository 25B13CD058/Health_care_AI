import React, { useState } from 'react';
import { 
  Calendar, FileText, Stethoscope, Pill, Activity, Sparkles, 
  CheckCircle2, Clock, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HealthTimeline: React.FC = () => {
  const { timelineItems, activeFamilyMember } = useApp();
  const [aiSummaryGenerated, setAiSummaryGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'report': return { icon: FileText, label: 'Medical Report', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
      case 'consultation': return { icon: Stethoscope, label: 'OPD Consultation', color: 'bg-teal-500/20 text-teal-300 border-teal-500/40' };
      case 'prescription': return { icon: Pill, label: 'Rx Order', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'lab': return { icon: Activity, label: 'Lab Test', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      default: return { icon: Calendar, label: 'Appointment', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    }
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiSummaryGenerated(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Calendar className="w-7 h-7 text-teal-400" />
              <span>My Health Timeline</span>
            </h1>
            <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded">
              {activeFamilyMember.name}
            </span>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Chronological history of medical reports, doctor consultations, lab tests, and prescriptions.
          </p>
        </div>

        <button
          onClick={handleGenerateSummary}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Analyzing History...' : 'Generate AI Health Summary'}</span>
        </button>
      </div>

      {/* Generated AI Health Summary Box */}
      {aiSummaryGenerated && (
        <div className="bg-navy-900 border border-teal-500/50 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>CareAI Longitudinal Health Summary</span>
            </h3>
            <span className="text-[10px] bg-navy-950 text-slate-400 px-2 py-1 rounded border border-navy-800">
              Demo Educational Summary
            </span>
          </div>

          <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-3 text-xs leading-relaxed text-slate-200">
            <p>
              <strong>Chronological Overview for {activeFamilyMember.name}:</strong> Over the past 9 months, you have maintained regular wellness tracking spanning lipid panels, echocardiograms, and specialist consultations.
            </p>

            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              <li><strong>Cardiovascular Health:</strong> Echo scan (Aug 2026) confirmed normal sinus rhythm with LVEF 62%.</li>
              <li><strong>Metabolic Management:</strong> Fasting blood sugar (118 mg/dL) and total cholesterol (215 mg/dL) remain under active dietary management alongside Metformin SR 500mg.</li>
              <li><strong>Dermatology Care:</strong> Skin rash episode in May 2026 successfully resolved with Tacrolimus treatment.</li>
            </ul>

            <div className="pt-2 border-t border-navy-800 text-[11px] text-slate-400 italic">
              CareAI summary is for educational reference and does not replace formal clinical assessment by your primary care physician.
            </div>
          </div>
        </div>
      )}

      {/* Chronological Timeline Stream */}
      <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        
        {/* Timeline Center Line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-navy-700" />

        <div className="space-y-6 relative z-10">
          {timelineItems.map((item, idx) => {
            const badge = getCategoryBadge(item.category);
            const Icon = badge.icon;

            return (
              <div key={item.id} className="flex items-start gap-5 group">
                
                {/* Timeline Circle Node */}
                <div className="w-10 h-10 rounded-2xl bg-navy-950 border-2 border-teal-500/50 flex items-center justify-center text-teal-400 shrink-0 shadow-lg group-hover:scale-110 transition">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Timeline Card */}
                <div className="flex-1 bg-navy-950 border border-navy-800 hover:border-teal-500/40 rounded-2xl p-4 shadow-md transition space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border self-start ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">{item.date}</span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.details}</p>

                  {item.doctorName && (
                    <p className="text-[11px] text-teal-400 font-medium pt-1">
                      Attending Physician: {item.doctorName}
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
