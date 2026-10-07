import React from 'react';
import { 
  User, Phone, ShieldAlert, Heart, Activity, AlertTriangle, 
  MapPin, Pill, Clock, FileText, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PatientProfileCard: React.FC = () => {
  const { patientProfile, setEmergencyInfoCardOpen } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
            {patientProfile.name.split(' ')[0][0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{patientProfile.name}</h1>
              <span className="text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded">
                Verified Patient ID
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <span>{patientProfile.age} Yrs Old</span>
              <span>•</span>
              <span>{patientProfile.gender}</span>
              <span>•</span>
              <span className="font-bold text-amber-400">Blood Group: {patientProfile.bloodGroup}</span>
            </p>
          </div>
        </div>

        {/* Emergency Info Card Trigger */}
        <button
          onClick={() => setEmergencyInfoCardOpen(true)}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center gap-2 border border-rose-400/30"
        >
          <ShieldAlert className="w-4 h-4 text-amber-300" />
          <span>Show Emergency ID Card</span>
        </button>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact & Location */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>Primary Location & Emergency Contact</span>
          </h3>

          <div className="bg-navy-950 p-3 rounded-xl border border-navy-800 space-y-1.5 text-xs">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Home Address</span>
            <p className="text-slate-200 font-medium">{patientProfile.location}</p>
          </div>

          <div className="bg-navy-950 p-3 rounded-xl border border-navy-800 space-y-1.5 text-xs">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Designated Emergency Contact</span>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">{patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relation})</p>
                <p className="text-teal-400 font-mono text-xs">{patientProfile.emergencyContact.phone}</p>
              </div>
              <a href={`tel:${patientProfile.emergencyContact.phone}`} className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Allergies & Drug Warnings */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Documented Medical Allergies</span>
          </h3>

          <div className="bg-amber-950/30 border border-amber-500/30 p-3.5 rounded-xl space-y-2">
            {patientProfile.allergies.map((alg, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-amber-200 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{alg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Medications */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-400" />
            <span>Active Prescription Medications</span>
          </h3>

          <div className="space-y-2">
            {patientProfile.currentMedications.map((med, i) => (
              <div key={i} className="bg-navy-950 border border-navy-800 p-3 rounded-xl text-xs text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{med}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Chronic Medical History</span>
          </h3>

          <div className="space-y-2">
            {patientProfile.medicalHistory.map((hist, i) => (
              <div key={i} className="bg-navy-950 border border-navy-800 p-3 rounded-xl text-xs text-slate-200 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{hist}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
