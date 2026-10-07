import React, { useState } from 'react';
import { 
  X, Building2, MapPin, Phone, Star, Siren, Bed, ShieldCheck, 
  Stethoscope, Award, Calendar, Navigation, CheckCircle2 
} from 'lucide-react';
import { Hospital } from '../types';
import { DOCTORS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const HospitalDetailsModal: React.FC<{ hospital: Hospital | null; onClose: () => void }> = ({ hospital, onClose }) => {
  const { setSelectedDoctor, navigateTo, setEmergencyModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'specialties' | 'beds' | 'facilities'>('overview');

  if (!hospital) return null;

  const hospitalDoctors = DOCTORS.filter(d => d.hospitalId === hospital.id || d.hospital.includes(hospital.name.split(' ')[0]));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Banner */}
        <div className="relative h-48 bg-navy-950">
          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-navy-950/80 text-slate-300 hover:text-white rounded-full transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {hospital.openStatus}
              </span>
              {hospital.emergencyAvailable && (
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  <Siren className="w-3 h-3" /> 24x7 Emergency
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-white mt-1">{hospital.name}</h2>
            <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{hospital.address} ({hospital.distance})</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-navy-800 bg-navy-950 px-6 py-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'doctors', label: `Doctors (${hospitalDoctors.length})` },
            { id: 'specialties', label: 'Specialties' },
            { id: 'beds', label: 'Bed Capacity' },
            { id: 'facilities', label: 'Facilities' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition whitespace-nowrap ${
                activeTab === tab.id ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 bg-navy-950 p-4 rounded-2xl border border-navy-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Rating</span>
                  <span className="text-sm font-extrabold text-amber-400 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400" /> {hospital.rating}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">ED Overcrowding</span>
                  <span className={`text-sm font-extrabold ${hospital.edOvercrowding === 'Low' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {hospital.edOvercrowding}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Available Doctors</span>
                  <span className="text-sm font-extrabold text-teal-300">
                    {hospital.doctorsAvailable}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Key Departments:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {hospital.departments.map((dept, idx) => (
                    <div key={idx} className="bg-navy-950 border border-navy-800 p-2.5 rounded-xl text-xs text-slate-200 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{dept}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">24x7 Emergency Contact Desk</span>
                <a href={`tel:${hospital.contact}`} className="text-sm font-bold text-teal-400 hover:underline flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  <span>{hospital.contact}</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="space-y-3">
              {hospitalDoctors.map(doc => (
                <div key={doc.id} className="bg-navy-950 border border-navy-800 rounded-xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={doc.photo} alt={doc.name} className="w-12 h-12 rounded-xl object-cover border border-navy-700" />
                    <div>
                      <h4 className="font-bold text-xs text-white">{doc.name}</h4>
                      <p className="text-[11px] text-teal-400">{doc.specialty} • {doc.experience} yrs exp</p>
                      <p className="text-[10px] text-slate-400">Fee: ₹{doc.fee}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doc);
                      onClose();
                      navigateTo('doctors');
                    }}
                    className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-lg transition"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'specialties' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hospital.specialties.map((spec, idx) => (
                <div key={idx} className="bg-navy-950 border border-navy-800 p-3 rounded-xl text-center text-xs font-semibold text-slate-200">
                  {spec}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'beds' && (
            <div className="grid grid-cols-3 gap-3 bg-navy-950 p-6 rounded-2xl border border-navy-800 text-center">
              <div className="space-y-1">
                <Bed className="w-6 h-6 text-rose-400 mx-auto" />
                <span className="text-[10px] text-slate-400 block">Emergency Beds</span>
                <span className="text-xl font-extrabold text-white">{hospital.availableBeds.emergency}</span>
              </div>
              <div className="space-y-1">
                <Bed className="w-6 h-6 text-amber-400 mx-auto" />
                <span className="text-[10px] text-slate-400 block">ICU Beds</span>
                <span className="text-xl font-extrabold text-white">{hospital.availableBeds.icu}</span>
              </div>
              <div className="space-y-1">
                <Bed className="w-6 h-6 text-teal-400 mx-auto" />
                <span className="text-[10px] text-slate-400 block">General Beds</span>
                <span className="text-xl font-extrabold text-white">{hospital.availableBeds.general}</span>
              </div>
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="grid grid-cols-2 gap-2">
              {hospital.facilities.map((fac, idx) => (
                <div key={idx} className="bg-navy-950 border border-navy-800 p-3 rounded-xl text-xs text-slate-200 flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 flex items-center justify-between gap-3">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <Navigation className="w-4 h-4 text-teal-400" />
            <span>Get Directions</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                setEmergencyModalOpen(true);
              }}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Siren className="w-4 h-4" />
              <span>Dispatch Ambulance</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
