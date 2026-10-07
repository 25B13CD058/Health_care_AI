import React from 'react';
import { Siren, PhoneCall, Ambulance } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmergencyBanner: React.FC = () => {
  const { setEmergencyModalOpen, navigateTo } = useApp();

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="p-1.5 bg-white/20 rounded-full animate-pulse">
            <Siren className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide uppercase bg-white/20 px-2 py-0.5 rounded text-xs mr-2">
              Need Urgent Medical Help?
            </span>
            <span className="text-sm font-medium hidden md:inline">
              Chest pain, severe injury, or breathing trouble? Priority 24/7 dispatch available.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:108"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-700 text-xs font-bold rounded-lg hover:bg-red-50 transition shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 108 Emergency</span>
          </a>
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950 text-white text-xs font-bold rounded-lg hover:bg-red-900 transition border border-red-500/50 shadow-sm"
          >
            <Ambulance className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Ambulance</span>
          </button>
        </div>
      </div>
    </div>
  );
};
