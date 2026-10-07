import React, { useState } from 'react';
import { 
  X, Ambulance, Siren, PhoneCall, MapPin, Building2, ShieldAlert, 
  Clock, CheckCircle2, Navigation, AlertTriangle 
} from 'lucide-react';
import { HOSPITALS } from '../data/mockData';
import { Hospital } from '../types';
import { useApp } from '../context/AppContext';

export const AmbulanceBookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { requestAmbulance, patientProfile } = useApp();

  const [selectedHospital, setSelectedHospital] = useState<Hospital>(HOSPITALS[0]);
  const [ambulanceType, setAmbulanceType] = useState<'Basic Life Support (BLS)' | 'Advanced Life Support (ALS)' | 'Patient Transport'>('Advanced Life Support (ALS)');

  if (!isOpen) return null;

  const handleConfirmDispatch = () => {
    requestAmbulance(selectedHospital, ambulanceType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-navy-900 border-2 border-rose-500/80 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-800 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl animate-pulse">
              <Siren className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-black bg-white text-red-700 px-2 py-0.5 rounded uppercase tracking-wide">
                Priority Dispatch
              </span>
              <h2 className="text-xl font-black text-white mt-1">Emergency Ambulance Dispatch</h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Pickup & Destination */}
          <div className="space-y-3 bg-navy-950 p-4 rounded-2xl border border-navy-800 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Pickup Patient Location</span>
                <span className="font-bold text-white text-xs">{patientProfile.location}</span>
                <span className="text-[10px] text-teal-400 block mt-0.5">✓ Live GPS Pinpoint Verified</span>
              </div>
            </div>

            <div className="border-t border-navy-800/80 pt-2.5 flex items-start gap-2.5">
              <div className="p-1.5 bg-red-500/20 text-red-400 rounded-lg shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Destination Hospital ER</span>
                <select
                  value={selectedHospital.id}
                  onChange={(e) => {
                    const found = HOSPITALS.find(h => h.id === e.target.value);
                    if (found) setSelectedHospital(found);
                  }}
                  className="w-full bg-navy-900 border border-navy-700 text-white font-bold text-xs rounded-xl p-2 mt-1 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  {HOSPITALS.map(hosp => (
                    <option key={hosp.id} value={hosp.id} className="bg-navy-900 text-white">
                      {hosp.name} ({hosp.distance} • {hosp.edOvercrowding} ER Occupancy)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ambulance Equipment Tier */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Select Ambulance Equipment Level:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { type: 'Advanced Life Support (ALS)', desc: 'Ventilator, Defibrillator, Paramedic', badge: 'Recommended' },
                { type: 'Basic Life Support (BLS)', desc: 'Oxygen, Stretcher, First Aid', badge: 'Standard' },
                { type: 'Patient Transport', desc: 'Wheelchair & Basic Stretcher', badge: 'Non-Critical' }
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => setAmbulanceType(item.type as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    ambulanceType === item.type 
                      ? 'bg-rose-500/20 border-rose-500 text-white shadow-md' 
                      : 'bg-navy-950 border-navy-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{item.type.split(' ')[0]}</span>
                    <span className="text-[9px] font-bold bg-navy-900 text-slate-300 px-1.5 py-0.2 rounded border border-navy-700">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Contact Broadcast Check */}
          <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Notify Emergency Contact: <strong>{patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.phone})</strong></span>
            </div>
            <span className="text-[10px] font-bold bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded">Auto-Alert</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px]">Estimated Arrival</span>
            <span className="font-black text-amber-400 text-base flex items-center gap-1">
              <Clock className="w-4 h-4" /> 6 Minutes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-slate-300 font-bold text-xs rounded-xl transition">
              Cancel
            </button>
            <button
              onClick={handleConfirmDispatch}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl transition shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Ambulance className="w-4 h-4 text-amber-300" />
              <span>CONFIRM AMBULANCE DISPATCH</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
