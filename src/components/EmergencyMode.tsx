import React, { useState } from 'react';
import { 
  Siren, PhoneCall, Ambulance, MapPin, Building2, Share2, 
  UserCheck, ShieldAlert, Bed, Clock, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { HOSPITALS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { HospitalMap } from './HospitalMap';

export const EmergencyMode: React.FC = () => {
  const { 
    patientProfile, setEmergencyModalOpen, navigateTo, 
    setSelectedHospital, addNotification 
  } = useApp();

  const [locationShared, setLocationShared] = useState(false);
  const [contactNotified, setContactNotified] = useState(false);

  const emergencyHospitals = HOSPITALS.filter(h => h.emergencyAvailable);

  const handleShareLocation = () => {
    setLocationShared(true);
    addNotification('Location Shared', 'Your GPS location (Jubilee Hills 17.432° N, 78.407° E) has been copied & broadcasted to emergency responders.', 'emergency');
  };

  const handleNotifyContact = () => {
    setContactNotified(true);
    addNotification('Emergency Contact Alerted', `SMS & Push Notification sent to ${patientProfile.emergencyContact.name} (${patientProfile.emergencyContact.phone}).`, 'emergency');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* 🔴 Prominent Emergency Mode Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-800 to-rose-900 border-2 border-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 animate-pulse">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-white text-red-700 rounded-2xl shadow-xl shrink-0">
              <Siren className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  🚨 POSSIBLE MEDICAL EMERGENCY
                </h1>
                <span className="bg-white text-red-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Priority Mode
                </span>
              </div>
              <p className="text-sm text-rose-100 mt-1 font-medium">
                For severe chest pain, stroke symptoms, uncontrolled bleeding, or acute breathlessness, act immediately below.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Primary Emergency Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          
          {/* 1. Book Ambulance */}
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="p-4 bg-amber-400 hover:bg-amber-300 text-navy-950 rounded-2xl font-black text-xs flex flex-col items-center justify-center text-center gap-2 shadow-2xl transition hover:scale-105"
          >
            <Ambulance className="w-6 h-6" />
            <span>🚑 Book Ambulance</span>
          </button>

          {/* 2. Find ER Department */}
          <button
            onClick={() => navigateTo('hospitals')}
            className="p-4 bg-white hover:bg-slate-100 text-navy-950 rounded-2xl font-black text-xs flex flex-col items-center justify-center text-center gap-2 shadow-2xl transition hover:scale-105"
          >
            <Building2 className="w-6 h-6 text-red-600" />
            <span>🏥 Find Emergency Dept</span>
          </button>

          {/* 3. Emergency Call */}
          <a
            href="tel:108"
            className="p-4 bg-red-950 hover:bg-red-900 border border-red-500/60 text-white rounded-2xl font-black text-xs flex flex-col items-center justify-center text-center gap-2 shadow-2xl transition hover:scale-105"
          >
            <PhoneCall className="w-6 h-6 text-amber-300" />
            <span>📞 Call 108 Emergency</span>
          </a>

          {/* 4. Share Location */}
          <button
            onClick={handleShareLocation}
            className={`p-4 rounded-2xl font-black text-xs flex flex-col items-center justify-center text-center gap-2 shadow-2xl transition hover:scale-105 border ${
              locationShared ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-black/30 hover:bg-black/50 text-white border-white/30'
            }`}
          >
            <Share2 className="w-6 h-6 text-teal-300" />
            <span>{locationShared ? '✓ Location Shared' : '📍 Share GPS Location'}</span>
          </button>

          {/* 5. Notify Emergency Contact */}
          <button
            onClick={handleNotifyContact}
            className={`p-4 rounded-2xl font-black text-xs flex flex-col items-center justify-center text-center gap-2 shadow-2xl transition hover:scale-105 border ${
              contactNotified ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-black/30 hover:bg-black/50 text-white border-white/30'
            }`}
          >
            <UserCheck className="w-6 h-6 text-amber-300" />
            <span>{contactNotified ? '✓ Contact Alerted' : '👤 Alert Contact'}</span>
          </button>

        </div>

      </div>

      {/* Emergency Capacity & Live ER Map View */}
      <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-navy-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-red-500" />
              <span>Nearby 24x7 Emergency Departments & Capacity</span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Live capacity and estimated waiting times at nearby Level-1 Trauma Centers.
            </p>
          </div>

          <span className="text-[10px] font-bold bg-navy-950 text-amber-400 border border-navy-800 px-3 py-1 rounded-full">
            Demo / Simulated Availability Metrics
          </span>
        </div>

        {/* Emergency Capacity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyHospitals.slice(0, 3).map(hosp => (
            <div key={hosp.id} className="bg-navy-950 border border-navy-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-white">{hosp.name}</h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-red-400" /> {hosp.address} ({hosp.distance})
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-navy-900 p-2.5 rounded-xl border border-navy-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">ED Wait Time</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {hosp.edWaitTime}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ER Beds Left</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <Bed className="w-3 h-3 text-red-400" /> {hosp.availableBeds.emergency} Beds
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setSelectedHospital(hosp);
                    navigateTo('hospitals');
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition text-center"
                >
                  Dispatch To ER
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map Embed */}
        <div className="pt-2">
          <HospitalMap onSelectHospital={(hosp) => setSelectedHospital(hosp)} />
        </div>

      </div>

    </div>
  );
};
