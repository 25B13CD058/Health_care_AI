import React from 'react';
import { 
  X, ShieldAlert, Phone, Heart, AlertTriangle, Pill, 
  MapPin, UserCheck, Printer 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmergencyCardModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { patientProfile } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/90 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-navy-900 border-2 border-red-500 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Emergency Card Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-red-800 p-5 text-white flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-black bg-amber-400 text-navy-950 px-2 py-0.2 rounded uppercase">
                EMERGENCY MEDICAL ID CARD
              </span>
              <h2 className="text-lg font-black text-white mt-0.5">First Responder Critical Data</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4 bg-navy-950 text-xs">
          
          {/* Patient Details & Blood Group Badge */}
          <div className="flex items-start justify-between bg-navy-900 p-4 rounded-2xl border border-navy-700">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Patient Name</span>
              <h3 className="text-xl font-extrabold text-white">{patientProfile.name}</h3>
              <p className="text-xs text-slate-300">{patientProfile.age} Yrs • {patientProfile.gender}</p>
            </div>

            <div className="bg-red-600/30 border-2 border-red-500 text-red-300 px-3 py-2 rounded-xl text-center shadow-lg">
              <span className="text-[9px] font-bold uppercase block">Blood Group</span>
              <span className="text-xl font-black text-white">{patientProfile.bloodGroup}</span>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-navy-900 p-3.5 rounded-xl border border-navy-700 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Emergency Contact</span>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-sm">{patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relation})</p>
                <p className="text-teal-400 font-mono">{patientProfile.emergencyContact.phone}</p>
              </div>
              <a href={`tel:${patientProfile.emergencyContact.phone}`} className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
            </div>
          </div>

          {/* Allergies Alert Box */}
          <div className="bg-amber-950/40 border border-amber-500/40 p-3.5 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> KNOWN DRUG ALLERGIES:
            </span>
            <p className="font-bold text-white text-xs">{patientProfile.allergies.join(', ')}</p>
          </div>

          {/* Current Meds */}
          <div className="bg-navy-900 p-3.5 rounded-xl border border-navy-700 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Current Medications</span>
            <p className="text-slate-200">{patientProfile.currentMedications.join(' • ')}</p>
          </div>

          {/* Chronic Conditions */}
          <div className="bg-navy-900 p-3.5 rounded-xl border border-navy-700 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Medical History</span>
            <p className="text-slate-200">{patientProfile.medicalHistory.join(' • ')}</p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-navy-800 bg-navy-900 flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print / Save ID
          </button>
          <button onClick={onClose} className="px-5 py-2 bg-teal-500 text-navy-950 font-bold text-xs rounded-xl hover:bg-teal-400 transition">
            Close Card
          </button>
        </div>

      </div>
    </div>
  );
};
