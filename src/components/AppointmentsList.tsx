import React, { useState } from 'react';
import { 
  Calendar, Clock, Video, Building2, MapPin, CheckCircle2, 
  XCircle, ArrowRight, Stethoscope 
} from 'lucide-react';
import { Appointment } from '../types';
import { useApp } from '../context/AppContext';

export const AppointmentsList: React.FC = () => {
  const { appointments, cancelAppointment, setActiveVideoConsult, navigateTo } = useApp();
  const [activeFilter, setActiveFilter] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  const filteredAppointments = appointments.filter(a => a.status === activeFilter);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Calendar className="w-7 h-7 text-teal-400" />
            <span>My Appointments</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Manage your doctor consultations, join online video sessions, or reschedule visits.
          </p>
        </div>

        <button
          onClick={() => navigateTo('doctors')}
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-extrabold text-xs rounded-xl transition shadow-lg flex items-center gap-1.5"
        >
          <Stethoscope className="w-4 h-4" />
          <span>Book New Consultation</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-navy-900 border border-navy-700 p-2 rounded-2xl shadow-xl">
        {(['Upcoming', 'Completed', 'Cancelled'] as const).map(tab => {
          const count = appointments.filter(a => a.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeFilter === tab 
                  ? 'bg-teal-500 text-navy-950 shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-navy-800'
              }`}
            >
              <span>{tab} Appointments</span>
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-black ${
                activeFilter === tab ? 'bg-navy-950 text-teal-300' : 'bg-navy-950 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <Calendar className="w-10 h-10 mx-auto text-navy-700" />
            <h3 className="font-bold text-white text-base">No {activeFilter} Appointments</h3>
            <p className="text-xs">Schedule a consultation with a specialist from our 27 medical departments.</p>
          </div>
        ) : (
          filteredAppointments.map(apt => (
            <div 
              key={apt.id}
              className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:border-teal-500/50"
            >
              <div className="flex items-start gap-4">
                <img 
                  src={apt.doctorPhoto} 
                  alt={apt.doctorName} 
                  className="w-14 h-14 rounded-2xl object-cover border border-navy-700 shrink-0" 
                />
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white">{apt.doctorName}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      apt.consultationType === 'Video Consultation' 
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                        : 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                    }`}>
                      {apt.consultationType}
                    </span>
                  </div>

                  <p className="text-xs text-teal-400 font-semibold">{apt.specialty}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-teal-400" />
                      <span>{apt.hospital}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{apt.date}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-navy-800 pt-3 md:pt-0">
                {apt.status === 'Upcoming' && (
                  <>
                    {apt.consultationType === 'Video Consultation' ? (
                      <button
                        onClick={() => setActiveVideoConsult(apt)}
                        className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl transition shadow-md flex items-center gap-1.5"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Video Consultation</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => navigateTo('hospitals')}
                        className="px-3.5 py-2.5 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-xs rounded-xl transition border border-navy-700 flex items-center gap-1.5"
                      >
                        <MapPin className="w-4 h-4 text-teal-400" />
                        <span>Get Hospital Map</span>
                      </button>
                    )}

                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="px-3 py-2.5 bg-navy-950 hover:bg-rose-950/50 text-rose-400 hover:text-rose-300 font-bold text-xs rounded-xl transition border border-navy-800"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {apt.status === 'Completed' && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" /> Consultation Completed
                  </span>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
