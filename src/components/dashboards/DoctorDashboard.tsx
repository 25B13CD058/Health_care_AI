import React, { useState } from 'react';
import { 
  Stethoscope, Calendar, Clock, User, CheckCircle2, XCircle, 
  FileText, Plus, ShieldCheck, Activity, Video 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorDashboard: React.FC = () => {
  const { appointments, setActiveVideoConsult } = useApp();
  const [docStatus, setDocStatus] = useState<'Available' | 'Busy' | 'Offline'>('Available');
  const [rxNotes, setRxNotes] = useState('');
  const [prescriptionsSent, setPrescriptionsSent] = useState<string[]>([]);

  const handleSendRx = (patientName: string) => {
    if (!rxNotes.trim()) return;
    setPrescriptionsSent(prev => [...prev, `${patientName}: ${rxNotes}`]);
    setRxNotes('');
    alert(`Digital Prescription dispatched to ${patientName}'s Health Vault.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Doctor Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" 
            alt="Dr. Ananya Rao" 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Dr. Ananya Rao (Demo Doctor)</h1>
              <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded font-bold">
                Cardiology Department
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">Apollo Health City • OPD Consultation Desk</p>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-2 bg-navy-950 p-1.5 rounded-xl border border-navy-800">
          {(['Available', 'Busy', 'Offline'] as const).map(st => (
            <button
              key={st}
              onClick={() => setDocStatus(st)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                docStatus === st 
                  ? (st === 'Available' ? 'bg-emerald-500 text-navy-950 shadow-md' : (st === 'Busy' ? 'bg-amber-500 text-navy-950' : 'bg-slate-700 text-white'))
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Patient Schedule */}
        <div className="lg:col-span-2 bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              <span>Today's Consultation Schedule</span>
            </h3>
            <span className="text-xs text-teal-300 font-bold bg-teal-500/20 px-2.5 py-1 rounded-lg">
              {appointments.length} Patients Waiting
            </span>
          </div>

          <div className="space-y-3">
            {appointments.map(apt => (
              <div key={apt.id} className="bg-navy-950 border border-navy-800 p-4 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-bold text-teal-400 text-sm">
                    {apt.id.slice(-2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Rahul Verma (Patient)</h4>
                    <p className="text-[11px] text-teal-400">{apt.consultationType} • {apt.time}</p>
                    <p className="text-[10px] text-slate-400">Chief Complaint: Chest discomfort & elevated BP</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {apt.consultationType === 'Video Consultation' && (
                    <button
                      onClick={() => setActiveVideoConsult(apt)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition flex items-center gap-1"
                    >
                      <Video className="w-3.5 h-3.5" /> Start Tele-Consult
                    </button>
                  )}
                  <button className="px-3 py-1.5 bg-teal-500 text-navy-950 font-bold text-xs rounded-lg hover:bg-teal-400 transition">
                    Call Patient
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Prescription Builder */}
        <div className="lg:col-span-1 bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-navy-800 pb-3">
            <FileText className="w-4 h-4 text-teal-400" />
            <span>Digital Prescription Builder</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Select Patient:</label>
              <select className="w-full bg-navy-950 border border-navy-700 rounded-xl p-2 text-white">
                <option value="rahul">Rahul Verma (B+, 34 Yrs)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Prescription Notes & Dosage:</label>
              <textarea
                rows={4}
                value={rxNotes}
                onChange={(e) => setRxNotes(e.target.value)}
                placeholder="e.g. Tab Dolo 650mg 1-0-1 after meals x 3 days. Tab Pantocid 40mg 1-0-0 before breakfast."
                className="w-full bg-navy-950 border border-navy-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <button
              onClick={() => handleSendRx('Rahul Verma')}
              disabled={!rxNotes.trim()}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold rounded-xl transition disabled:opacity-50"
            >
              Sign & Dispatch Rx
            </button>
          </div>

          {prescriptionsSent.length > 0 && (
            <div className="pt-2 border-t border-navy-800 space-y-1 text-xs">
              <span className="text-[10px] text-slate-400 uppercase block">Sent Today:</span>
              {prescriptionsSent.map((p, i) => (
                <div key={i} className="bg-navy-950 p-2 rounded-lg text-teal-300 font-medium truncate">
                  ✓ {p}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
