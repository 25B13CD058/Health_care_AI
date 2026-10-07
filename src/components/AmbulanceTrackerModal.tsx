import React, { useState, useEffect } from 'react';
import { 
  X, Siren, Ambulance, MapPin, Phone, Building2, Clock, 
  CheckCircle2, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { AmbulanceRequest } from '../types';
import { useApp } from '../context/AppContext';

export const AmbulanceTrackerModal: React.FC<{ request: AmbulanceRequest | null; onClose: () => void }> = ({ request, onClose }) => {
  const { cancelAmbulance } = useApp();
  const [eta, setEta] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => (prev > 1 ? prev - 1 : 6));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-navy-900 border-2 border-red-500 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Animated Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-red-800 p-6 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl animate-pulse">
              <Siren className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">LIVE AMBULANCE DISPATCHED</h2>
                <span className="bg-amber-400 text-navy-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">Unit {request.vehicleNumber}</span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">Emergency vehicle is en route to patient pickup location.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Driver & Unit Details */}
        <div className="p-6 space-y-5">
          
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shrink-0">
                <Ambulance className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{request.driverName}</h3>
                <p className="text-xs text-rose-400 font-semibold">{request.vehicleNumber} • {request.ambulanceType}</p>
                <p className="text-[10px] text-slate-400">Level-1 Paramedic Resuscitation Unit</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="text-right sm:text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Arrival ETA</span>
                <span className="text-xl font-black text-amber-400 flex items-center gap-1">
                  <Clock className="w-4 h-4 animate-spin" /> {eta} Mins
                </span>
              </div>
              <a
                href={`tel:${request.driverPhone}`}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Call Driver</span>
              </a>
            </div>
          </div>

          {/* Animated Route Visualizer */}
          <div className="bg-navy-950 border border-navy-800 rounded-2xl p-4 relative overflow-hidden h-44 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            
            <div className="relative z-10 w-full max-w-lg flex items-center justify-between px-4">
              
              {/* Pickup Pin */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 mx-auto shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 block">Patient Location</span>
              </div>

              {/* Moving Ambulance */}
              <div className="flex-1 h-1 bg-navy-800 mx-4 relative">
                <div className="h-full bg-gradient-to-r from-red-600 to-amber-400 w-1/2 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-2xl animate-pulse">
                  <Ambulance className="w-5 h-5 text-amber-300" />
                </div>
              </div>

              {/* Hospital Destination Pin */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 mx-auto shadow-lg">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 block">{request.destinationHospital.name.split(' ')[0]}</span>
              </div>

            </div>
          </div>

          {/* Emergency Routing Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
              <span className="text-[10px] text-slate-400 block uppercase">Destination ER</span>
              <span className="font-bold text-white truncate block">{request.destinationHospital.name}</span>
            </div>
            <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
              <span className="text-[10px] text-slate-400 block uppercase">Emergency Contact Alert</span>
              <span className="font-bold text-teal-300 truncate block">Sent to {request.patientPhone}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 flex items-center justify-between">
          <button
            onClick={cancelAmbulance}
            className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-rose-400 font-bold text-xs rounded-xl transition"
          >
            Cancel Dispatch
          </button>
          <button onClick={onClose} className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition">
            Minimize Tracking
          </button>
        </div>

      </div>
    </div>
  );
};
