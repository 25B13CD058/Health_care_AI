import React from 'react';
import { HeartPulse, ShieldAlert, Award, ChevronRight, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  onOpenSafetyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSafetyModal }) => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-navy-800 text-xs">
      
      {/* Medical Safety Disclaimer Strip */}
      <div className="bg-navy-900/80 border-b border-navy-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong className="text-amber-300">Important Medical Disclaimer:</strong> CareAI provides educational healthcare navigation, preliminary specialty recommendation, and facility discovery assistance. It does <strong className="text-white">NOT</strong> diagnose medical conditions or autonomously prescribe prescription drugs. For severe, sudden, or life-threatening symptoms (such as chest pain, loss of consciousness, or severe trauma), seek immediate professional emergency medical care or call 108.
            </p>
          </div>

          {onOpenSafetyModal && (
            <button
              onClick={onOpenSafetyModal}
              className="px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 rounded-lg text-[11px] font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>AI Safety & Privacy</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-teal-400" />
              </div>
              <span className="font-extrabold text-lg text-white">Care<span className="text-teal-400">AI</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              AI-powered healthcare navigation, preliminary specialty guidance, nearby hospital discovery, and emergency support.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-teal-300 bg-teal-950/60 border border-teal-800/60 px-3 py-1.5 rounded-lg">
              <Award className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Built for <strong>HacXLerate 2026 – AI in Healthcare</strong></span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Platform Navigation</h4>
            <ul className="space-y-2">
              {[
                { id: 'assistant', label: 'AI Health Assistant' },
                { id: 'specialties', label: '27 Medical Specialties' },
                { id: 'doctors', label: 'Find Verified Doctors' },
                { id: 'hospitals', label: 'Nearby Hospitals & Map' },
                { id: 'medicines', label: '24/7 Medicine Pharmacy' },
                { id: 'ambulance', label: 'Emergency & Ambulance' }
              ].map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => navigateTo(link.id)}
                    className="hover:text-teal-300 transition flex items-center gap-1 group text-xs cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties Overview */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Key Specialties</h4>
            <ul className="space-y-2">
              {['Cardiology', 'Neurology', 'Dermatology', 'Pediatrics', 'Orthopaedics', 'Gastroenterology'].map(spec => (
                <li key={spec}>
                  <button 
                    onClick={() => navigateTo('specialties')}
                    className="hover:text-teal-300 transition flex items-center gap-1 group text-xs cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400" />
                    <span>{spec} Care</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Emergency Support</h4>
            <div className="bg-navy-900 border border-navy-800 p-3 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">National Medical ER:</span>
                <a href="tel:108" className="font-bold text-rose-400 hover:underline">108</a>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">National Emergency:</span>
                <a href="tel:112" className="font-bold text-rose-400 hover:underline">112</a>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Tele-MANAS Mental Health:</span>
                <a href="tel:14416" className="font-bold text-teal-400 hover:underline">14416</a>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Demo Data Mode active for HacXLerate 2026 presentation.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-navy-900 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 CareAI Healthcare Systems. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {onOpenSafetyModal && (
              <button
                onClick={onOpenSafetyModal}
                className="hover:text-teal-300 transition cursor-pointer"
              >
                Safety & Privacy Compliance
              </button>
            )}
            <p className="text-slate-400">One AI. Every Healthcare Need.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
