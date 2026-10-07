import React from 'react';
import { 
  Users, Stethoscope, Building2, Calendar, Pill, Ambulance, 
  TrendingUp, Activity, BarChart3, ShieldCheck 
} from 'lucide-react';
import { DOCTORS, HOSPITALS, SPECIALTIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { appointments, medicineOrders, activeAmbulance } = useApp();

  const metrics = [
    { title: 'Total Registered Patients', count: '14,290', change: '+12% this month', icon: Users, color: 'text-teal-400' },
    { title: 'Verified Doctors', count: DOCTORS.length.toString(), change: 'Across 27 specialties', icon: Stethoscope, color: 'text-blue-400' },
    { title: 'Empanelled Hospitals', count: HOSPITALS.length.toString(), change: 'GPS Synced', icon: Building2, color: 'text-indigo-400' },
    { title: 'Appointments Booked', count: (appointments.length + 1280).toString(), change: '98.4% fulfillment', icon: Calendar, color: 'text-amber-400' },
    { title: 'Medicine Orders', count: (medicineOrders.length + 3420).toString(), change: '24/7 Express', icon: Pill, color: 'text-emerald-400' },
    { title: 'Emergency Dispatches', count: (activeAmbulance ? 1 : 0 + 412).toString(), change: 'Avg ETA 5.8 mins', icon: Ambulance, color: 'text-rose-400' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">CareAI Platform Administration</h1>
            <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2.5 py-0.5 rounded font-bold">
              HacXLerate 2026 Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">Real-time health platform analytics, hospital occupancy, and emergency response performance.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-navy-900 border border-navy-700 p-4 rounded-2xl shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{m.title}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <span className="text-2xl font-black text-white block">{m.count}</span>
              <span className="text-[10px] text-teal-400 font-medium block">{m.change}</span>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts & Hospital Demand Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Specialty Demand Analytics */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-navy-800 pb-3">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <span>Specialty Consultation Demand Breakdown</span>
          </h3>

          <div className="space-y-3">
            {[
              { name: 'Cardiology', percent: 38, count: '1,420 requests' },
              { name: 'Dermatology', percent: 24, count: '980 requests' },
              { name: 'Neurology', percent: 18, count: '740 requests' },
              { name: 'Pediatrics', percent: 12, count: '510 requests' },
              { name: 'Orthopaedics', percent: 8, count: '320 requests' }
            ].map(spec => (
              <div key={spec.name} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>{spec.name}</span>
                  <span className="text-teal-400">{spec.count} ({spec.percent}%)</span>
                </div>
                <div className="h-2 bg-navy-950 rounded-full overflow-hidden border border-navy-800">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" style={{ width: `${spec.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Response & Hospital ED Occupancy */}
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-navy-800 pb-3">
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Emergency Department (ED) Capacity & Overcrowding</span>
          </h3>

          <div className="space-y-3">
            {HOSPITALS.map(hosp => (
              <div key={hosp.id} className="bg-navy-950 p-3 rounded-xl border border-navy-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{hosp.name}</h4>
                  <p className="text-[10px] text-slate-400">Emergency Beds: {hosp.availableBeds.emergency} Available</p>
                </div>

                <span className={`font-extrabold px-2.5 py-1 rounded-lg text-[10px] ${
                  hosp.edOvercrowding === 'Low' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : (hosp.edOvercrowding === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30')
                }`}>
                  {hosp.edOvercrowding} ED Occupancy
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
