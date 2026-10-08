import React, { useState } from 'react';
import { 
  Stethoscope, Calendar, Clock, User, CheckCircle2, XCircle, 
  FileText, Plus, ShieldCheck, Activity, Video, AlertCircle, Edit3, Send, RefreshCw, Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_DOCTORS } from '../../data/mockData';
import { Appointment } from '../../types';

export const DoctorDashboard: React.FC = () => {
  const { 
    appointments, 
    setActiveVideoConsult, 
    activeDoctorEmail, 
    setActiveDoctorEmail,
    updateAppointmentStatusAndNotes,
    addNotification
  } = useApp();

  const [docStatus, setDocStatus] = useState<'Available' | 'Busy' | 'Offline'>('Available');
  
  // Selected appointment for adding notes/prescription
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [prescriptionSummary, setPrescriptionSummary] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Find currently selected doctor or default to first
  const activeDoctor = DEMO_DOCTORS.find(d => d.email === activeDoctorEmail) || DEMO_DOCTORS[0];

  // Filter appointments for active doctor (or show all appointments for demo purposes)
  const doctorAppointments = appointments.filter(apt => 
    apt.doctorName.toLowerCase().includes(activeDoctor.name.split(' ')[1].toLowerCase()) ||
    apt.doctorId === activeDoctor.id ||
    appointments.length < 5 // Show demo appointments if few
  );

  const handleOpenEditModal = (apt: Appointment) => {
    setEditingApt(apt);
    setDoctorNotes(apt.doctorNotes || '');
    setPrescriptionSummary(apt.prescriptionSummary || '');
  };

  const handleSaveNotesAndStatus = async (statusOverride?: Appointment['status']) => {
    if (!editingApt) return;
    setUpdatingId(editingApt.id);

    const newStatus = statusOverride || editingApt.status;
    await updateAppointmentStatusAndNotes(
      editingApt.id,
      newStatus,
      doctorNotes,
      prescriptionSummary
    );

    addNotification(
      'Consultation Notes Saved',
      `Updated notes & prescription for patient appointment (${editingApt.doctorName}).`,
      'appointment'
    );

    setUpdatingId(null);
    setEditingApt(null);
  };

  const handleDirectStatusChange = async (apt: Appointment, newStatus: Appointment['status']) => {
    setUpdatingId(apt.id);
    await updateAppointmentStatusAndNotes(
      apt.id,
      newStatus,
      apt.doctorNotes,
      apt.prescriptionSummary
    );
    addNotification(
      'Status Updated',
      `Appointment status changed to ${newStatus}`,
      'appointment'
    );
    setUpdatingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Demo Doctor Switcher Header */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-400" />
            <h2 className="font-black text-sm text-white uppercase tracking-wider">Demo Doctor Account Switcher</h2>
            <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
              DEMO PORTAL • SAMPLE DATA
            </span>
          </div>
          <span className="text-xs text-slate-400">Select doctor account to test Patient ↔ Doctor interactivity</span>
        </div>

        {/* Doctor Badges Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {DEMO_DOCTORS.map(doc => {
            const isSelected = activeDoctor.email === doc.email;
            return (
              <button
                key={doc.id}
                onClick={() => setActiveDoctorEmail(doc.email)}
                className={`p-2 rounded-xl text-left border transition flex items-center gap-2.5 ${
                  isSelected 
                    ? 'bg-teal-500/20 border-teal-500 text-white shadow-lg shadow-teal-500/10' 
                    : 'bg-navy-950/70 border-navy-800 text-slate-300 hover:border-navy-600 hover:text-white'
                }`}
              >
                <img 
                  src={doc.photo} 
                  alt={doc.name} 
                  className={`w-9 h-9 rounded-lg object-cover border ${isSelected ? 'border-teal-400' : 'border-navy-700'}`} 
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs truncate">{doc.name}</h4>
                  <p className="text-[10px] text-teal-400 truncate">{doc.specialty}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctor Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={activeDoctor.photo} 
            alt={activeDoctor.name} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-md" 
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-white">{activeDoctor.name}</h1>
              <span className="text-xs bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2.5 py-0.5 rounded-full font-bold">
                {activeDoctor.specialty}
              </span>
              <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {activeDoctor.rating}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{activeDoctor.qualification} • {activeDoctor.experienceYears} Years Exp.</p>
            <p className="text-xs text-teal-400">{activeDoctor.hospital} • Fee: ₹{activeDoctor.fee}</p>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-2 bg-navy-950 p-2 rounded-xl border border-navy-800">
          <span className="text-xs font-semibold text-slate-400 pl-1">Consultation Desk:</span>
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
        
        {/* Patient Consultation Schedule */}
        <div className="lg:col-span-2 bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-400" />
              <span>Incoming Patient Consultation Queue</span>
            </h3>
            <span className="text-xs text-teal-300 font-bold bg-teal-500/20 px-2.5 py-1 rounded-lg border border-teal-500/30">
              {doctorAppointments.length} Patient Booking(s)
            </span>
          </div>

          <div className="space-y-4">
            {doctorAppointments.map(apt => (
              <div 
                key={apt.id} 
                className="bg-navy-950 border border-navy-800 p-4 rounded-xl hover:border-navy-700 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-900 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-bold text-teal-400 text-sm">
                      {apt.id.slice(-2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <span>Patient Appointment</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          apt.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          apt.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        }`}>
                          {apt.status}
                        </span>
                      </h4>
                      <p className="text-xs text-teal-400">{apt.consultationType} • {apt.date} at {apt.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {apt.consultationType === 'Video Consultation' && (
                      <button
                        onClick={() => setActiveVideoConsult(apt)}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition flex items-center gap-1.5 shadow-md shadow-purple-900/30"
                      >
                        <Video className="w-3 h-3" /> Start Tele-Consult
                      </button>
                    )}

                    {/* Status dropdown / direct buttons */}
                    <button
                      onClick={() => handleDirectStatusChange(apt, apt.status === 'Completed' ? 'Upcoming' : 'Completed')}
                      disabled={updatingId === apt.id}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                        apt.status === 'Completed'
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-navy-950'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {apt.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(apt)}
                      className="px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Rx & Notes
                    </button>
                  </div>
                </div>

                {/* Patient Doctor Notes & Prescription Summary preview */}
                {(apt.doctorNotes || apt.prescriptionSummary) ? (
                  <div className="bg-navy-900/90 border border-teal-500/30 rounded-xl p-3 text-xs space-y-1.5">
                    {apt.doctorNotes && (
                      <p className="text-slate-300">
                        <strong className="text-teal-400 font-semibold">Consultation Notes:</strong> {apt.doctorNotes}
                      </p>
                    )}
                    {apt.prescriptionSummary && (
                      <p className="text-teal-300 font-mono text-[11px] bg-navy-950 p-2 rounded border border-navy-800">
                        <strong className="text-amber-400 font-sans font-semibold">Digital Prescription:</strong> {apt.prescriptionSummary}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No doctor consultation notes or prescription added yet for this appointment.</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Quick Stats & Live Interactivity Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-navy-800 pb-3">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>Doctor Practice Overview</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-navy-950 border border-navy-800 p-3 rounded-xl">
                <span className="text-2xl font-black text-teal-400">{doctorAppointments.length}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Total Bookings</p>
              </div>
              <div className="bg-navy-950 border border-navy-800 p-3 rounded-xl">
                <span className="text-2xl font-black text-emerald-400">
                  {doctorAppointments.filter(a => a.status === 'Completed').length}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">Completed</p>
              </div>
              <div className="bg-navy-950 border border-navy-800 p-3 rounded-xl">
                <span className="text-2xl font-black text-amber-400">
                  {doctorAppointments.filter(a => a.status === 'Upcoming').length}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">Pending OPD</p>
              </div>
              <div className="bg-navy-950 border border-navy-800 p-3 rounded-xl">
                <span className="text-2xl font-black text-purple-400">
                  {doctorAppointments.filter(a => a.prescriptionSummary).length}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">Rx Issued</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-950/60 to-navy-900 border border-teal-500/30 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Live Patient-Doctor Interactivity</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Any changes made here (status updates, consultation notes, digital prescriptions) are saved into application state and immediately reflected in the Patient's Dashboard view.
            </p>
            <div className="p-3 bg-navy-950/80 rounded-xl border border-navy-800 text-[11px] text-slate-400 space-y-1">
              <p className="text-amber-400 font-semibold">How to test live sync:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-300">
                <li>Book an appointment as a Patient.</li>
                <li>Switch to this Doctor Dashboard.</li>
                <li>Update status to Completed & add prescription notes.</li>
                <li>Switch back to Patient Dashboard to view live notes & digital Rx!</li>
              </ol>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Doctor Notes & Digital Prescription Modal */}
      {editingApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
          <div className="bg-navy-900 border border-teal-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <span>Update Consultation & Digital Rx</span>
                </h3>
                <p className="text-xs text-teal-400 mt-0.5">
                  Doctor: {activeDoctor.name} • Appt #{editingApt.id.slice(-4)}
                </p>
              </div>
              <button 
                onClick={() => setEditingApt(null)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Appointment Status:</label>
                <div className="flex gap-2">
                  {(['Upcoming', 'Completed', 'Cancelled'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setEditingApt({ ...editingApt, status: st })}
                      className={`flex-1 py-2 font-bold rounded-xl border text-xs transition ${
                        editingApt.status === st
                          ? 'bg-teal-500 text-navy-950 border-teal-400 font-extrabold'
                          : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Clinical Consultation Notes:</label>
                <textarea
                  rows={3}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="e.g. Patient presents with elevated BP (138/88) and mild headaches. Recommended lifestyle changes, low sodium diet, and blood pressure monitoring..."
                  className="w-full bg-navy-950 border border-navy-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Digital Prescription & Dosage:</label>
                <textarea
                  rows={3}
                  value={prescriptionSummary}
                  onChange={(e) => setPrescriptionSummary(e.target.value)}
                  placeholder="e.g. Tab Telmisartan 40mg 1-0-0 after food x 30 days. Tab Paracetamol 650mg SOS for severe pain."
                  className="w-full bg-navy-950 border border-navy-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 resize-none font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingApt(null)}
                className="flex-1 py-2.5 bg-navy-950 hover:bg-slate-800 text-slate-300 font-bold rounded-xl border border-navy-800 text-xs transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveNotesAndStatus()}
                disabled={updatingId === editingApt.id}
                className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-teal-500/20"
              >
                <Send className="w-3.5 h-3.5" /> Save & Dispatch to Patient
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
