import React, { useState } from 'react';
import { Siren, Ambulance, MapPin, Phone, Building2, CheckCircle2, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AmbulanceDashboard: React.FC = () => {
  const { activeAmbulance, cancelAmbulance } = useApp();
  const [sirenOn, setSirenOn] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* Driver Header */}
      <div className="bg-gradient-to-r from-red-950 via-navy-900 to-red-950 border-2 border-red-500/80 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600 text-white rounded-2xl animate-pulse">
            <Siren className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">Ramesh Kumar (Demo Emergency Driver)</h1>
              <span className="bg-amber-400 text-navy-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Unit TS 09 AMB 102
              </span>
            </div>
            <p className="text-xs text-rose-300">Level-1 Trauma & Resuscitation Ambulance • ALS Qualified</p>
          </div>
        </div>

        <button
          onClick={() => setSirenOn(!sirenOn)}
          className={`px-4 py-2 rounded-xl text-xs font-black transition border ${
            sirenOn ? 'bg-red-600 text-white border-red-400 animate-pulse' : 'bg-navy-800 text-slate-400'
          }`}
        >
          {sirenOn ? '🚨 SIREN ACTIVE' : 'Siren Muted'}
        </button>
      </div>

      {/* Active Dispatch Card */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white border-b border-navy-800 pb-3 flex items-center gap-2">
          <Ambulance className="w-5 h-5 text-rose-400" />
          <span>Active Emergency Dispatch Queue</span>
        </h3>

        {activeAmbulance ? (
          <div className="bg-navy-950 border border-red-500/40 p-5 rounded-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-white">Dispatch #{activeAmbulance.id}</span>
              <span className="bg-red-600 text-white font-extrabold px-3 py-1 rounded-full text-xs animate-pulse">
                ETA {activeAmbulance.etaMinutes} MINS TO PICKUP
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-navy-900 p-4 rounded-xl border border-navy-800">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Pickup Location</span>
                <span className="font-bold text-white flex items-center gap-1 text-xs mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> {activeAmbulance.pickupLocation.address}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Destination Hospital ER</span>
                <span className="font-bold text-rose-400 flex items-center gap-1 text-xs mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-rose-400" /> {activeAmbulance.destinationHospital.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${activeAmbulance.patientPhone}`}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" /> Call Patient Emergency Contact
              </a>
              <button
                onClick={cancelAmbulance}
                className="px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-slate-300 font-bold text-xs rounded-xl transition"
              >
                Complete Mission
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400 space-y-2">
            <Ambulance className="w-8 h-8 mx-auto text-navy-700" />
            <p className="text-xs">No active emergency dispatch callouts right now.</p>
            <p className="text-[10px] text-slate-500">Book an ambulance from the Ambulance tab to trigger active dispatch mode.</p>
          </div>
        )}
      </div>

    </div>
  );
};
