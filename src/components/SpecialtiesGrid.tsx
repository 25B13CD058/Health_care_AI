import React, { useState } from 'react';
import { 
  Search, Stethoscope, HeartPulse, Brain, Sparkles, Baby, Bone, Ear, Eye, 
  Smile, Activity, Wind, Droplet, ShieldAlert, Thermometer, BrainCircuit, 
  HeartHandshake, Crosshair, Droplets, Fingerprint, Scissors, Siren, Scan, 
  Syringe, Bug, Users, ArrowRight, UserCheck
} from 'lucide-react';
import { SPECIALTIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

// Map icon string name to Lucide Icon component dynamically
const iconMap: Record<string, React.ElementType> = {
  Stethoscope, HeartPulse, Brain, Sparkles, Baby, Bone, Ear, Eye, 
  Smile, Activity, Wind, Droplet, ShieldAlert, Thermometer, BrainCircuit, 
  HeartHandshake, Crosshair, Droplets, Fingerprint, Scissors, Siren, Scan, 
  Syringe, Bug, Users, UserCheck, Sparkle: Sparkles
};

export const SpecialtiesGrid: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecialties = SPECIALTIES.filter(spec => 
    spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.commonSymptoms.some(sym => sym.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 border border-navy-700 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Stethoscope className="w-7 h-7 text-teal-400" />
            <span>Find Your Specialist</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Browse all 27 medical specialties, explore available doctors, or search by your symptoms.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search specialty or symptom (e.g. Heart, Skin, Fever)..."
            className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
          />
        </div>
      </div>

      {/* Specialty Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSpecialties.map((spec) => {
          const IconComponent = iconMap[spec.iconName] || Stethoscope;
          const isEmergency = spec.id === 'emergency-medicine';

          return (
            <div
              key={spec.id}
              className={`bg-navy-900 border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-2xl group ${
                isEmergency ? 'border-rose-500/40 bg-gradient-to-b from-navy-900 to-rose-950/30' : 'border-navy-700 hover:border-teal-500/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition group-hover:scale-110 ${
                    isEmergency 
                      ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400' 
                      : 'bg-teal-500/10 border border-teal-500/30 text-teal-400'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-navy-950 px-2 py-1 rounded-md border border-navy-800">
                    {spec.doctorCount} Doctors
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-teal-300 transition">
                  {spec.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {spec.description}
                </p>

                {/* Common Symptoms Pill list */}
                <div className="mt-3 pt-3 border-t border-navy-800/80 flex flex-wrap gap-1">
                  {spec.commonSymptoms.slice(0, 3).map((sym, i) => (
                    <span key={i} className="text-[9px] font-semibold bg-navy-950 text-slate-400 px-1.5 py-0.5 rounded border border-navy-800">
                      {sym}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">
                  {spec.hospitalCount} Hospitals
                </span>
                <button
                  onClick={() => navigateTo('doctors', { specialtyId: spec.id })}
                  className="flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-teal-300 group-hover:translate-x-0.5 transition"
                >
                  <span>View Doctors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredSpecialties.length === 0 && (
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center text-slate-400 space-y-2">
          <Stethoscope className="w-10 h-10 mx-auto text-navy-700" />
          <h3 className="font-bold text-white text-base">No specialty matching "{searchTerm}"</h3>
          <p className="text-xs">Try searching for keywords like "Heart", "Skin", "Fever", or "Child".</p>
        </div>
      )}

    </div>
  );
};
