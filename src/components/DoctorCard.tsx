import React from 'react';
import { 
  Star, MapPin, CheckCircle2, Video, Calendar, ShieldCheck, 
  Building2, Award, Clock
} from 'lucide-react';
import { Doctor } from '../types';
import { useApp } from '../context/AppContext';

export const DoctorCard: React.FC<{ doctor: Doctor; onOpenProfile: () => void }> = ({ doctor, onOpenProfile }) => {
  const { setSelectedDoctor, bookAppointment, navigateTo } = useApp();

  return (
    <div className="bg-navy-900 border border-navy-700 hover:border-teal-500/50 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between space-y-4 group">
      
      {/* Top Header: Photo, Name, Verified Badge, Rating */}
      <div className="flex items-start gap-4">
        <img 
          src={doctor.photo} 
          alt={doctor.name} 
          className="w-16 h-16 rounded-2xl object-cover border border-navy-700 shadow-md group-hover:scale-105 transition" 
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-bold text-base text-white truncate flex items-center gap-1.5">
              <span>{doctor.name}</span>
              {doctor.verified && (
                <span title="Verified Credentials">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                </span>
              )}
            </h3>
          </div>

          <p className="text-xs font-bold text-teal-400 mt-0.5">{doctor.specialty}</p>
          <p className="text-[11px] text-slate-400 truncate">{doctor.qualifications}</p>
          
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{doctor.rating}</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">({doctor.reviewCount} reviews)</span>
            <span className="text-slate-500">•</span>
            <span className="font-semibold text-slate-300">{doctor.experience} yrs exp</span>
          </div>
        </div>
      </div>

      {/* Hospital & Distance */}
      <div className="bg-navy-950 p-3 rounded-xl border border-navy-800 space-y-1.5 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="truncate font-medium">{doctor.hospital}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{doctor.distance}</span>
          </span>
          <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
            doctor.availability === 'Available Today' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-navy-800 text-slate-400'
          }`}>
            {doctor.availability}
          </span>
        </div>
      </div>

      {/* Outcome Metric Tag */}
      {doctor.outcomeMetric && (
        <div className="text-[10px] text-slate-400 bg-navy-950/60 border border-navy-800 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span className="italic truncate">{doctor.outcomeMetric}</span>
        </div>
      )}

      {/* Fee & Actions */}
      <div className="pt-2 border-t border-navy-800 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Consult Fee</span>
          <span className="text-sm font-extrabold text-white">₹{doctor.fee}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProfile}
            className="px-3 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold text-xs rounded-xl transition border border-navy-700"
          >
            Profile
          </button>
          <button
            onClick={() => {
              setSelectedDoctor(doctor);
              bookAppointment(doctor, 'Tomorrow, 10:30 AM', '10:30 AM', 'In-person');
              navigateTo('appointments');
            }}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-bold text-xs rounded-xl transition shadow-md"
          >
            Book Appointment
          </button>
        </div>
      </div>

    </div>
  );
};
