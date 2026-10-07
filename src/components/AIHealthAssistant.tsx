import React, { useState } from 'react';
import { 
  Bot, AlertTriangle, ShieldAlert, Sparkles, Stethoscope, 
  ArrowRight, RefreshCw, Info, Mic, MicOff, Globe, ClipboardList 
} from 'lucide-react';
import { analyzeSymptoms, generateDoctorVisitPrep } from '../services/aiService';
import { SymptomAnalysisResult, Language, DoctorVisitPrep, CarePathStep } from '../types';
import { useApp } from '../context/AppContext';
import { AICarePathTracker } from './AICarePathTracker';
import { DoctorVisitPrepModal } from './DoctorVisitPrepModal';

export const AIHealthAssistant: React.FC<{ initialInput?: string }> = ({ initialInput = '' }) => {
  const { navigateTo, setSelectedDoctor, setEmergencyModalOpen, language, setLanguage, addSymptomAnalysis } = useApp();
  
  const [inputText, setInputText] = useState(initialInput);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<SymptomAnalysisResult | null>(null);
  const [activeCareStep, setActiveCareStep] = useState<CarePathStep>('symptoms');

  const [prepModalOpen, setPrepModalOpen] = useState(false);
  const [prepData, setPrepData] = useState<DoctorVisitPrep | null>(null);

  const samplePrompts = [
    { text: "I have severe chest pain and difficulty breathing.", badge: "Emergency Scenario" },
    { text: "Persistent headache with blurred vision and dizziness for 2 days.", badge: "Neurology" },
    { text: "Red itchy skin rash with small blisters on arms.", badge: "Dermatology" },
    { text: "My 6-year-old child has high fever and severe cough.", badge: "Pediatrics" },
    { text: "Severe abdominal pain and acid reflux after eating.", badge: "Gastroenterology" }
  ];

  // Speech Recognition Listener
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Browser Speech Recognition API is not supported in this browser. Please use text input or Chrome.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (language === 'hi') recognition.lang = 'hi-IN';
      else if (language === 'te') recognition.lang = 'te-IN';
      else recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleAnalyze(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
      alert('Microphone speech input initiated. Type your symptoms below.');
    }
  };

  const handleAnalyze = async (queryText?: string) => {
    const textToUse = queryText || inputText;
    if (!textToUse.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setActiveCareStep('analysis');

    setTimeout(async () => {
      const res = await analyzeSymptoms(textToUse);
      setResult(res);
      setIsAnalyzing(false);

      if (res.isEmergency) {
        setActiveCareStep('urgency');
      } else {
        setActiveCareStep('specialist');
      }

      // Automatically save symptom analysis history to Supabase database
      addSymptomAnalysis(res);

      // Generate visit prep model automatically
      const generatedPrep = generateDoctorVisitPrep(
        { symptoms: textToUse, duration: 'Recent', severity: 'moderate' },
        res
      );
      setPrepData(generatedPrep);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner with Multilingual & Voice Assistant */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center shadow-lg text-white shrink-0">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">CareAI Specialty & Urgency Navigator</h1>
                <span className="text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-400" /> Educational AI
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Speak or type what you are experiencing. CareAI maps your complaint to relevant medical specialties and assesses urgency.
              </p>
            </div>
          </div>

          {/* Multilingual Selector */}
          <div className="flex items-center gap-2 bg-navy-950 p-1.5 rounded-xl border border-navy-800 shrink-0">
            <Globe className="w-4 h-4 text-teal-400 ml-1" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-slate-200 font-bold text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="en" className="bg-navy-900 text-white">English</option>
              <option value="hi" className="bg-navy-900 text-white">हिंदी (Hindi)</option>
              <option value="te" className="bg-navy-900 text-white">తెలుగు (Telugu)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic AI Care Path Tracker Bar */}
      <AICarePathTracker 
        currentStep={activeCareStep} 
        onSelectStep={(step) => setActiveCareStep(step)} 
      />

      {/* Main Symptom Input Card with Voice Action */}
      <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-extrabold text-white">
              Describe your symptoms or healthcare complaint:
            </label>
            <p className="text-xs text-slate-400">
              You can speak via microphone or type in natural language (English / Hindi / Telugu).
            </p>
          </div>

          {/* Microphone Voice Button */}
          <button
            onClick={handleToggleVoice}
            className={`px-4 py-2 rounded-xl text-xs font-black transition shadow-lg flex items-center gap-2 border ${
              isListening 
                ? 'bg-rose-600 text-white border-rose-400 animate-pulse' 
                : 'bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-teal-400" />}
            <span>{isListening ? 'Listening...' : '🎙️ Speak to CareAI'}</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or speak symptoms here... (e.g., 'I have severe headache, dizziness, and blurred vision since yesterday.')"
            className="w-full bg-navy-950 border border-navy-700 rounded-2xl p-4 text-slate-100 text-sm focus:outline-none focus:border-teal-500 placeholder-slate-500 transition resize-none"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {inputText && (
              <button
                onClick={() => { setInputText(''); setResult(null); setActiveCareStep('symptoms'); }}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || !inputText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Symptoms</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sample Scenario Chips */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            Or select a sample scenario:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(prompt.text);
                  handleAnalyze(prompt.text);
                }}
                className="text-left text-xs bg-navy-950 hover:bg-navy-800 border border-navy-800 hover:border-teal-500/50 text-slate-300 px-3 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <span>{prompt.text}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  prompt.badge.includes('Emergency') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-teal-500/20 text-teal-300'
                }`}>
                  {prompt.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="bg-navy-900 border border-navy-700 rounded-3xl p-8 text-center space-y-3">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="text-base font-bold text-white">Analyzing Complaint Taxonomy & Safety Protocols...</h3>
        </div>
      )}

      {/* Structured AI Analysis Result */}
      {result && !isAnalyzing && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Emergency Alert (If Emergency Symptoms Detected) */}
          {result.isEmergency && (
            <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-2 border-red-500 rounded-3xl p-6 text-white shadow-2xl space-y-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-red-600 text-white rounded-2xl shadow-md shrink-0">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">🚨 POSSIBLE MEDICAL EMERGENCY DETECTED</h2>
                  <p className="text-xs text-rose-100 mt-1">
                    Your description contains symptoms (<strong className="underline">{result.redFlags.join(', ')}</strong>) requiring immediate emergency medical evaluation.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setEmergencyModalOpen(true)}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-navy-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer"
                >
                  🚑 Book Ambulance Now
                </button>
                <a
                  href="tel:108"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-lg transition"
                >
                  📞 Call 108 Emergency
                </a>
                <button
                  onClick={() => navigateTo('hospitals')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20"
                >
                  🏥 Find Emergency Department
                </button>
              </div>
            </div>
          )}

          {/* Structured Output Card */}
          <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 shadow-xl space-y-5">
            
            {/* Header: Specialty & Urgency Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-navy-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  POSSIBLE SPECIALTY TO CONSIDER
                </span>
                <h2 className="text-2xl font-black text-white mt-0.5">
                  {result.primarySpecialty}
                  {result.secondarySpecialty && (
                    <span className="text-xs font-normal text-slate-400 ml-2">
                      (or {result.secondarySpecialty})
                    </span>
                  )}
                </h2>
              </div>

              {/* Urgency Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">URGENCY:</span>
                <span className={`text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider ${
                  result.urgencyLevel === 'urgent'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : result.urgencyLevel === 'priority'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : result.urgencyLevel === 'soon'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {result.urgencyLevel === 'urgent' 
                    ? '🔴 Urgent / Emergency' 
                    : result.urgencyLevel === 'priority' 
                    ? '🟠 Priority (24-48 Hours)' 
                    : result.urgencyLevel === 'soon'
                    ? '🟡 Soon (This Week)'
                    : '🟢 Routine Consultation'}
                </span>
              </div>
            </div>

            {/* Doctor Visit Prep Action Trigger */}
            <div className="bg-gradient-to-r from-teal-500/10 via-navy-950 to-navy-950 border border-teal-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-xs text-white">📋 Prepare For Your Doctor Consultation</h4>
                  <p className="text-[11px] text-slate-300">Generate a structured visit checklist, symptoms log, and questions for your doctor.</p>
                </div>
              </div>

              <button
                onClick={() => setPrepModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Prepare Me For My Doctor</span>
              </button>
            </div>

            {/* Reason Explanation */}
            <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-teal-400" />
                Reason for Recommendation:
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Recommended Doctors Preview */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                  <span>Nearby {result.primarySpecialty} Specialists Available:</span>
                </h3>
                <button
                  onClick={() => {
                    setActiveCareStep('specialist');
                    navigateTo('doctors', { specialtyId: result.primarySpecialtyId });
                  }}
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                >
                  <span>View All Doctors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.recommendedDoctors.slice(0, 2).map(doc => (
                  <div key={doc.id} className="bg-navy-950 border border-navy-800 rounded-xl p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={doc.photo} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border border-navy-700" />
                      <div>
                        <h4 className="font-bold text-xs text-white">{doc.name}</h4>
                        <p className="text-[11px] text-teal-400 font-semibold">{doc.specialty} • {doc.experience} yrs exp</p>
                        <p className="text-[10px] text-slate-400">{doc.hospital}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDoctor(doc);
                        navigateTo('doctors');
                      }}
                      className="px-3.5 py-1.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Diagnostic Disclaimer */}
            <div className="pt-3 border-t border-navy-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Important Educational Disclaimer:</strong> CareAI provides preliminary specialty recommendations and educational navigation. CareAI does <strong>not</strong> diagnose diseases or replace professional medical advice from a qualified doctor.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Doctor Visit Prep Modal */}
      <DoctorVisitPrepModal
        prepData={prepData}
        isOpen={prepModalOpen}
        onClose={() => setPrepModalOpen(false)}
      />

    </div>
  );
};
