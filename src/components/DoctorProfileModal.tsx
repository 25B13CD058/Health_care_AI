import React, { useState } from 'react';
import { 
  X, Star, ShieldCheck, MapPin, Building2, Clock, Globe, 
  Calendar, Video, Award, CheckCircle2 
} from 'lucide-react';
import { Doctor } from '../types';
import { useApp } from '../context/AppContext';

export const DoctorProfileModal: React.FC<{ doctor: Doctor | null; onClose: () => void }> = ({ doctor, onClose }) => {
  const { bookAppointment, navigateTo } = useApp();
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultType, setConsultType] = useState<'In-person' | 'Video Consultation'>('In-person');

  if (!doctor) return null;

  const slotsToDisplay = doctor.availableSlots || ['10:00 AM Today', '04:30 PM Today', '11:00 AM Tomorrow'];
  const activeSlot = selectedSlot || slotsToDisplay[0];

  const handleConfirmBooking = () => {
    bookAppointment(doctor, activeSlot.includes('Today') ? 'Today' : 'Tomorrow', activeSlot.split(' ')[0] + ' ' + activeSlot.split(' ')[1], consultType);
    onClose();
    navigateTo('appointments');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Photo Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-teal-950 p-6 border-b border-navy-800 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-navy-800/80 text-slate-400 hover:text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img 
              src={doctor.photo} 
              alt={doctor.name} 
              className="w-24 h-24 rounded-2xl object-cover border-2 border-teal-500/50 shadow-xl" 
            />
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">{doctor.name}</h2>
                {doctor.verified && (
                  <span className="flex items-center gap-1 text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full font-bold">
                    <ShieldCheck className="w-3 h-3 text-teal-400" /> Verified Doctor
                  </span>
                )}
              </div>
              
              <p className="text-sm font-bold text-teal-400">{doctor.specialty} • {doctor.experience} Years Experience</p>
              <p className="text-xs text-slate-300">{doctor.qualifications}</p>
              
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{doctor.rating} ({doctor.reviewCount} reviews)</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{doctor.languages.join(', ')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Hospital & Location */}
          <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span>Hospital Affiliation:</span>
              </span>
              <span className="text-teal-400 font-semibold">{doctor.distance}</span>
            </div>
            <p className="text-sm font-bold text-white">{doctor.hospital}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{doctor.location}</span>
            </p>
          </div>

          {/* Outcome Metric Note */}
          {doctor.outcomeMetric && (
            <div className="bg-navy-800/60 p-3.5 rounded-xl border border-navy-700 flex items-start gap-2.5 text-xs text-slate-300">
              <Award className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">Clinical Metric Transparency:</span>
                <span className="italic text-slate-300">{doctor.outcomeMetric}</span>
              </div>
            </div>
          )}

          {/* Consultation Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Select Consultation Mode:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setConsultType('In-person')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  consultType === 'In-person' 
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300' 
                    : 'bg-navy-950 border-navy-800 text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>In-Person Hospital Visit</span>
              </button>
              <button
                onClick={() => setConsultType('Video Consultation')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  consultType === 'Video Consultation' 
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300' 
                    : 'bg-navy-950 border-navy-800 text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video Consultation</span>
              </button>
            </div>
          </div>

          {/* Available Slots */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Available Time Slots:</span>
              <span className="text-teal-400 text-[11px] normal-case">{doctor.clinicTimings}</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slotsToDisplay.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    activeSlot === slot 
                      ? 'bg-teal-500 text-navy-950 border-teal-400 font-bold shadow-md' 
                      : 'bg-navy-950 border-navy-800 text-slate-300 hover:bg-navy-800'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Consultation Fee</span>
            <span className="text-lg font-black text-white">₹{doctor.fee}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-300 font-bold text-xs rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl transition shadow-lg flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm & Book Appointment</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
