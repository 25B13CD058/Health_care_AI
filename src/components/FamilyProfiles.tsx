import React from 'react';
import { 
  Users, UserCheck, Heart, Pill, AlertTriangle, FileText, 
  Plus, CheckCircle2, ShieldAlert 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FamilyProfiles: React.FC = () => {
  const { 
    familyMembers, activeFamilyMemberId, setActiveFamilyMemberId, 
    activeFamilyMember, setEmergencyInfoCardOpen, navigateTo 
  } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-teal-400" />
            <span>My Family Health Profiles</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Manage medical records, appointments, and emergency information cards for your entire household.
          </p>
        </div>

        <button
          onClick={() => setEmergencyInfoCardOpen(true)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl transition shadow-lg flex items-center gap-1.5"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Active Emergency Card</span>
        </button>
      </div>

      {/* Family Member Switcher Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {familyMembers.map(member => {
          const isActive = member.id === activeFamilyMemberId;
          return (
            <button
              key={member.id}
              onClick={() => setActiveFamilyMemberId(member.id)}
              className={`p-4 rounded-2xl border text-center transition space-y-2 group ${
                isActive 
                  ? 'bg-teal-500/20 border-teal-500 text-white shadow-xl scale-105' 
                  : 'bg-navy-900 border-navy-700 text-slate-400 hover:text-white hover:border-navy-600'
              }`}
            >
              <div className="text-3xl mx-auto group-hover:scale-110 transition">{member.avatar}</div>
              <div>
                <h3 className="font-bold text-xs truncate">{member.name.split(' ')[0]}</h3>
                <p className="text-[10px] text-teal-400 font-semibold">{member.relation}</p>
              </div>
              {isActive && (
                <span className="inline-block text-[9px] font-black bg-teal-500 text-navy-950 px-2 py-0.2 rounded-full">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Member Details Card */}
      <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 shadow-xl space-y-5">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-800 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{activeFamilyMember.avatar}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">{activeFamilyMember.name}</h2>
                <span className="text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded">
                  {activeFamilyMember.relation}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeFamilyMember.age} Yrs • {activeFamilyMember.gender} • <strong className="text-amber-400">Blood Group: {activeFamilyMember.bloodGroup}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('doctors')}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition"
            >
              Book Consultation
            </button>
          </div>
        </div>

        {/* Member Medical Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Allergies */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Allergies:
            </h4>
            <div className="space-y-1 text-xs text-slate-200">
              {activeFamilyMember.allergies.map((alg, i) => (
                <p key={i}>• {alg}</p>
              ))}
            </div>
          </div>

          {/* Current Meds */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-teal-400" /> Active Medications:
            </h4>
            <div className="space-y-1 text-xs text-slate-200">
              {activeFamilyMember.currentMedications.map((med, i) => (
                <p key={i}>• {med}</p>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" /> Chronic History:
            </h4>
            <div className="space-y-1 text-xs text-slate-200">
              {activeFamilyMember.medicalHistory.map((hist, i) => (
                <p key={i}>• {hist}</p>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
