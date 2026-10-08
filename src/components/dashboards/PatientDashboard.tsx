import React, { useState } from 'react';
import { 
  Bot, Stethoscope, Building2, Pill, Ambulance, FileText, Calendar, 
  ArrowRight, ShieldAlert, HeartPulse, Search, Star, MapPin, Clock, 
  Bed, CheckCircle2, Sparkles, PhoneCall, Mic, Users, Activity, Siren, Utensils 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HOSPITALS, DOCTORS } from '../../data/mockData';
import { HealthReminders } from '../HealthReminders';

export const PatientDashboard: React.FC = () => {
  const { 
    patientProfile, navigateTo, setSelectedDoctor, setEmergencyModalOpen,
    appointments, activeAmbulance, activeDeliveryTracker, setSelectedHospital,
    activeFamilyMember
  } = useApp();

  const [symptomInput, setSymptomInput] = useState('');

  const upcomingApt = appointments.find(a => a.status === 'Upcoming');

  const handleSymptomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;
    navigateTo('assistant');
  };

  return (
    <div className="space-y-8">
      
      {/* Homepage Hero Section */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-teal-950 border border-teal-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>HacXLerate 2026 AI Platform</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase">
              ONE AI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-blue-400">
                EVERY HEALTHCARE NEED.
              </span>
            </h1>
            
            <p className="text-base text-teal-300 font-bold pt-1">
              "Not sure which doctor you need?"
            </p>
            <p className="text-sm text-slate-300 font-medium">
              Describe what you're experiencing in your own words or speak to CareAI. We guide you to the right specialty, nearby hospitals, and emergency care.
            </p>
          </div>

          {/* Large Symptom Input Box */}
          <form onSubmit={handleSymptomSearch} className="relative max-w-2xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="Type your symptoms here (e.g. 'chest pain and difficulty breathing' or 'skin rash')..."
              className="w-full bg-navy-950/90 border-2 border-teal-500/40 rounded-2xl pl-12 pr-36 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 shadow-2xl transition"
            />
            <button
              type="submit"
              onClick={() => navigateTo('assistant')}
              className="absolute right-2 top-2 px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl transition shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </form>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('assistant')}
              className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              <span>🎙️ Speak to CareAI</span>
            </button>

            <button
              onClick={() => navigateTo('assistant')}
              className="px-6 py-3.5 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-xs rounded-xl transition border border-navy-600 flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-teal-400" />
              <span>⌨️ Type your symptoms</span>
            </button>
          </div>

        </div>
      </div>

      {/* Prominent Emergency Mode Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 rounded-2xl p-5 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-red-500/40">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="p-3 bg-white/20 rounded-2xl animate-pulse shrink-0">
            <ShieldAlert className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Need Urgent Emergency Assistance?</h3>
            <p className="text-xs text-rose-100">Chest pain, stroke signs, severe trauma or acute breathing trouble require immediate dispatch.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('emergency')}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-white text-red-700 font-black text-xs rounded-xl hover:bg-red-50 transition shadow-md text-center flex items-center justify-center gap-1.5"
          >
            <Siren className="w-4 h-4" />
            <span>Emergency Mode</span>
          </button>
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-navy-950 text-white font-black text-xs rounded-xl hover:bg-navy-900 transition border border-red-400/40 text-center flex items-center justify-center gap-1.5 shadow-md"
          >
            <Ambulance className="w-4 h-4 text-amber-400" />
            <span>Book Ambulance</span>
          </button>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Healthcare Navigation Shortcuts
          </h2>
          <span className="text-xs text-teal-400 font-bold">
            Active Profile: {activeFamilyMember.name}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {[
            { id: 'assistant', title: 'AI Assistant', icon: Bot, color: 'text-teal-400' },
            { id: 'nutrition', title: 'Nutrition & Diet', icon: Utensils, color: 'text-lime-400' },
            { id: 'specialties', title: '27 Specialties', icon: Stethoscope, color: 'text-blue-400' },
            { id: 'hospitals', title: 'Nearby Hospitals', icon: Building2, color: 'text-indigo-400' },
            { id: 'medicines', title: 'Medicines', icon: Pill, color: 'text-emerald-400' },
            { id: 'ambulance', title: 'Ambulance', icon: Ambulance, color: 'text-rose-400' },
            { id: 'records', title: 'Health Records', icon: FileText, color: 'text-purple-400' },
            { id: 'timeline', title: 'Health Timeline', icon: Activity, color: 'text-amber-400' },
            { id: 'family', title: 'My Family', icon: Users, color: 'text-sky-400' }
          ].map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => navigateTo(action.id)}
                className="bg-navy-900 border border-navy-700 hover:border-teal-500/50 p-4 rounded-2xl shadow-xl transition flex flex-col items-center text-center space-y-2 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-navy-950 border border-navy-800 flex items-center justify-center group-hover:scale-110 transition shadow-inner">
                  <Icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <span className="font-bold text-xs text-white group-hover:text-teal-300 transition">
                  {action.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid: Reminders vs Nearby Hospitals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Alerts & Reminders */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Active Ambulance Tracking Alert */}
          {activeAmbulance && (
            <div className="bg-gradient-to-r from-red-950 to-navy-900 border-2 border-red-500 p-4 rounded-2xl text-white space-y-2 shadow-xl animate-pulse">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-amber-400 flex items-center gap-1">
                  <Ambulance className="w-4 h-4" /> Live Ambulance Active
                </span>
                <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-black">
                  ETA {activeAmbulance.etaMinutes} Mins
                </span>
              </div>
              <p className="text-xs text-slate-200">Unit: {activeAmbulance.vehicleNumber} ({activeAmbulance.driverName})</p>
              <button
                onClick={() => navigateTo('ambulance')}
                className="w-full py-1.5 bg-red-600 hover:bg-red-500 font-bold text-xs rounded-xl transition text-center"
              >
                View Live Map Tracking
              </button>
            </div>
          )}

          {/* Active Delivery Tracker Alert */}
          {activeDeliveryTracker && (
            <div className="bg-navy-900 border border-teal-500/50 p-4 rounded-2xl text-white space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-teal-400 flex items-center gap-1">
                  <Pill className="w-4 h-4" /> Medicine Delivery Active
                </span>
                <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded text-[10px] font-bold">
                  ETA {activeDeliveryTracker.estimatedDeliveryMinutes} Mins
                </span>
              </div>
              <p className="text-xs text-slate-300">Driver: Rahul K. • Order #{activeDeliveryTracker.id}</p>
              <button
                onClick={() => navigateTo('medicines')}
                className="w-full py-1.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition text-center"
              >
                Track Express Delivery
              </button>
            </div>
          )}

          {/* Upcoming Appointment Alert */}
          {upcomingApt && (
            <div className="bg-navy-900 border border-navy-700 p-5 rounded-2xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-navy-800 pb-2">
                <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Next Appointment
                </span>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img src={upcomingApt.doctorPhoto} alt={upcomingApt.doctorName} className="w-12 h-12 rounded-xl object-cover border border-navy-700" />
                <div>
                  <h4 className="font-bold text-xs text-white">{upcomingApt.doctorName}</h4>
                  <p className="text-[11px] text-teal-400 font-semibold">{upcomingApt.specialty}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-amber-400" /> {upcomingApt.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigateTo('appointments')}
                className="w-full py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-xs rounded-xl transition border border-navy-700 text-center"
              >
                View Appointment Details
              </button>
            </div>
          )}

          {/* Health Reminders Component */}
          <HealthReminders />

        </div>

        {/* Right Column: Nearby Emergency Hospitals & Featured Doctors */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Nearby Hospitals Section */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-400" />
                  <span>Nearby Emergency Hospitals & Wait Times</span>
                </h3>
                <p className="text-xs text-slate-400">Jubilee Hills / Gachibowli Node (Demo GPS)</p>
              </div>

              <button
                onClick={() => navigateTo('hospitals')}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                <span>View Hospital Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOSPITALS.slice(0, 2).map(hosp => (
                <div key={hosp.id} className="bg-navy-950 border border-navy-800 rounded-xl p-4 space-y-3">
                  <img src={hosp.image} alt={hosp.name} className="w-full h-28 rounded-lg object-cover" />
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-white truncate">{hosp.name}</h4>
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> {hosp.rating}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-teal-400" /> {hosp.address} ({hosp.distance})
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-navy-900">
                    <span className="text-emerald-400 font-bold">{hosp.edWaitTime} ED Wait Time</span>
                    <button
                      onClick={() => {
                        setSelectedHospital(hosp);
                        navigateTo('hospitals');
                      }}
                      className="text-xs font-bold text-teal-400 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Doctors Section */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                <span>Featured Verified Specialists</span>
              </h3>
              <button
                onClick={() => navigateTo('doctors')}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                <span>View All Doctors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DOCTORS.slice(0, 2).map(doc => (
                <div key={doc.id} className="bg-navy-950 border border-navy-800 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={doc.photo} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border border-navy-700" />
                    <div>
                      <h4 className="font-bold text-xs text-white">{doc.name}</h4>
                      <p className="text-[11px] text-teal-400">{doc.specialty} • {doc.experience} yrs</p>
                      <p className="text-[10px] text-slate-400">{doc.hospital}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doc);
                      navigateTo('doctors');
                    }}
                    className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-lg transition"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
