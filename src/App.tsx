import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyBanner } from './components/EmergencyBanner';
import { NotificationsDrawer } from './components/NotificationsDrawer';

// Modules
import { AIHealthAssistant } from './components/AIHealthAssistant';
import { SpecialtiesGrid } from './components/SpecialtiesGrid';
import { DoctorCard } from './components/DoctorCard';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { HospitalMap } from './components/HospitalMap';
import { HospitalDetailsModal } from './components/HospitalDetailsModal';
import { MedicineOrdering } from './components/MedicineOrdering';
import { DeliveryTrackerModal } from './components/DeliveryTrackerModal';
import { AmbulanceBookingModal } from './components/AmbulanceBookingModal';
import { AmbulanceTrackerModal } from './components/AmbulanceTrackerModal';
import { HealthRecords } from './components/HealthRecords';
import { ReportSummaryModal } from './components/ReportSummaryModal';
import { VideoConsultationModal } from './components/VideoConsultationModal';
import { AppointmentsList } from './components/AppointmentsList';
import { PatientProfileCard } from './components/PatientProfileCard';
import { EmergencyCardModal } from './components/EmergencyCardModal';
import { EmergencyMode } from './components/EmergencyMode';
import { HealthTimeline } from './components/HealthTimeline';
import { FamilyProfiles } from './components/FamilyProfiles';
import { AIChatAssistant } from './components/AIChatAssistant';
import { SafetyPrivacyModal } from './components/SafetyPrivacyModal';
import { AuthModal } from './components/AuthModal';
import { HealthNutritionModule } from './components/nutrition/HealthNutritionModule';
import { CTScanCentersMap } from './components/CTScanCentersMap';

// Dashboards
import { PatientDashboard } from './components/dashboards/PatientDashboard';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { PharmacyDashboard } from './components/dashboards/PharmacyDashboard';
import { DeliveryDashboard } from './components/dashboards/DeliveryDashboard';
import { AmbulanceDashboard } from './components/dashboards/AmbulanceDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';

import { SPECIALTIES } from './data/mockData';
import { Search, Filter, Stethoscope, Ambulance as AmbulanceIcon, Siren, PhoneCall } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    role, activeTab, selectedSpecialtyId,
    doctors, selectedDoctor, setSelectedDoctor,
    selectedHospital, setSelectedHospital,
    activeVideoConsult, setActiveVideoConsult,
    activeDeliveryTracker, setActiveDeliveryTracker,
    reportSummaryModal, setReportSummaryModal,
    emergencyModalOpen, setEmergencyModalOpen,
    emergencyInfoCardOpen, setEmergencyInfoCardOpen,
    authModalOpen, setAuthModalOpen,
    activeAmbulance,
    isHighContrast, isLargeText
  } = useApp();

  const [notifsOpen, setNotifsOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>(selectedSpecialtyId || 'all');

  // Filter Doctors
  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(doctorSearch.toLowerCase()) || doc.specialty.toLowerCase().includes(doctorSearch.toLowerCase()) || doc.hospital.toLowerCase().includes(doctorSearch.toLowerCase());
    const matchesSpec = selectedSpecialtyFilter === 'all' || doc.specialtyId === selectedSpecialtyFilter;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className={`min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white ${isHighContrast ? 'contrast-125 border-4 border-amber-400' : ''} ${isLargeText ? 'text-lg' : ''}`}>
      
      {/* Emergency Top Banner */}
      <EmergencyBanner />

      {/* Main Navigation Header */}
      <Navbar onOpenNotifs={() => setNotifsOpen(true)} />

      {/* Dynamic Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Role Portal Switcher Banner */}
        {role !== 'patient' && (
          <div className="mb-6 bg-teal-500/10 border border-teal-500/30 p-3 rounded-2xl flex items-center justify-between text-xs text-teal-300">
            <span>Viewing Role Portal: <strong className="capitalize text-white">{role} Portal</strong></span>
            <span className="text-[10px] bg-teal-500/20 px-2 py-0.5 rounded">HacXLerate 2026 Multi-Role View</span>
          </div>
        )}

        {/* Role Views */}
        {role === 'doctor' && <DoctorDashboard />}
        {role === 'pharmacy' && <PharmacyDashboard />}
        {role === 'delivery' && <DeliveryDashboard />}
        {role === 'ambulance' && <AmbulanceDashboard />}
        {role === 'admin' && <AdminDashboard />}

        {/* Patient Role Views (Default Tab Navigation) */}
        {role === 'patient' && (
          <>
            {activeTab === 'home' && <PatientDashboard />}
            {activeTab === 'ct_scan' && <CTScanCentersMap />}
            {activeTab === 'nutrition' && <HealthNutritionModule />}
            {activeTab === 'assistant' && <AIHealthAssistant />}
            {activeTab === 'specialties' && <SpecialtiesGrid />}

            {activeTab === 'emergency' && <EmergencyMode />}
            {activeTab === 'timeline' && <HealthTimeline />}
            {activeTab === 'family' && <FamilyProfiles />}
            
            {/* Find Doctor Tab */}
            {activeTab === 'doctors' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 border border-navy-700 p-6 rounded-2xl shadow-xl">
                  <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-2">
                      <Stethoscope className="w-7 h-7 text-teal-400" />
                      <span>Find & Book Verified Doctors</span>
                    </h1>
                    <p className="text-sm text-slate-300 mt-1">
                      Explore verified specialists across 27 departments, view hospital outcome metrics, and book slots.
                    </p>
                  </div>

                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                      placeholder="Search doctor name, specialty, hospital..."
                      className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none bg-navy-900 border border-navy-700 p-3 rounded-2xl shadow-xl">
                  <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-teal-400" /> Specialty:
                  </span>
                  <button
                    onClick={() => setSelectedSpecialtyFilter('all')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition border ${
                      selectedSpecialtyFilter === 'all' 
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/50' 
                        : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-slate-200'
                    }`}
                  >
                    All Specialties
                  </button>
                  {SPECIALTIES.map(spec => (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedSpecialtyFilter(spec.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition border ${
                        selectedSpecialtyFilter === spec.id 
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/50' 
                          : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-slate-200'
                      }`}
                    >
                      {spec.name}
                    </button>
                  ))}
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map(doc => (
                    <DoctorCard 
                      key={doc.id} 
                      doctor={doc} 
                      onOpenProfile={() => setSelectedDoctor(doc)} 
                    />
                  ))}
                </div>

                {filteredDoctors.length === 0 && (
                  <div className="bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center text-slate-400 space-y-2">
                    <Stethoscope className="w-10 h-10 mx-auto text-navy-700" />
                    <h3 className="font-bold text-white text-base">No doctor matching "{doctorSearch}"</h3>
                    <p className="text-xs">Try clearing your search or selecting a different specialty filter.</p>
                  </div>
                )}
              </div>
            )}

            {/* Hospitals Map Tab */}
            {activeTab === 'hospitals' && (
              <HospitalMap onSelectHospital={(hosp) => setSelectedHospital(hosp)} />
            )}

            {/* Medicines Tab */}
            {activeTab === 'medicines' && <MedicineOrdering />}

            {/* Emergency & Ambulance Dedicated Page */}
            {activeTab === 'ambulance' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-800 border-2 border-red-500 rounded-3xl p-8 text-white shadow-2xl space-y-6 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 rounded-2xl animate-pulse">
                        <Siren className="w-8 h-8 text-amber-300" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-black">24/7 Emergency & Ambulance Dispatch</h1>
                        <p className="text-xs text-rose-100 mt-1">
                          Immediate GPS tracking, Level-1 paramedic response, and emergency hospital routing.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <a
                        href="tel:108"
                        className="flex-1 sm:flex-initial px-6 py-3 bg-white text-red-700 font-black text-xs rounded-xl hover:bg-red-50 transition shadow-lg flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Call 108 Emergency</span>
                      </a>
                      <button
                        onClick={() => setEmergencyModalOpen(true)}
                        className="flex-1 sm:flex-initial px-6 py-3 bg-amber-400 hover:bg-amber-300 text-navy-950 font-black text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <AmbulanceIcon className="w-4 h-4" />
                        <span>BOOK AMBULANCE</span>
                      </button>
                    </div>
                  </div>
                </div>

                {activeAmbulance ? (
                  <div className="bg-navy-900 border border-teal-500/40 p-6 rounded-2xl shadow-xl text-center space-y-3">
                    <h3 className="font-extrabold text-white text-lg">Active Ambulance Dispatch in Progress</h3>
                    <p className="text-xs text-slate-300">Driver {activeAmbulance.driverName} is en route. Vehicle {activeAmbulance.vehicleNumber}.</p>
                  </div>
                ) : (
                  <div className="bg-navy-900 border border-navy-700 rounded-2xl p-8 text-center text-slate-400 space-y-2">
                    <AmbulanceIcon className="w-10 h-10 mx-auto text-navy-700" />
                    <p className="text-xs">Click "BOOK AMBULANCE" to initiate 24/7 priority emergency dispatch simulation.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'records' && <HealthRecords />}
            {activeTab === 'appointments' && <AppointmentsList />}
            {activeTab === 'profile' && <PatientProfileCard />}
          </>
        )}

      </main>

      {/* Floating Chat Widget */}
      <AIChatAssistant />

      {/* Global Modals */}
      <NotificationsDrawer isOpen={notifsOpen} onClose={() => setNotifsOpen(false)} />
      <DoctorProfileModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      <HospitalDetailsModal hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />
      <DeliveryTrackerModal order={activeDeliveryTracker} onClose={() => setActiveDeliveryTracker(null)} />
      <AmbulanceBookingModal isOpen={emergencyModalOpen} onClose={() => setEmergencyModalOpen(false)} />
      <AmbulanceTrackerModal request={activeAmbulance} onClose={() => {}} />
      <ReportSummaryModal record={reportSummaryModal} onClose={() => setReportSummaryModal(null)} />
      <VideoConsultationModal appointment={activeVideoConsult} onClose={() => setActiveVideoConsult(null)} />
      <EmergencyCardModal isOpen={emergencyInfoCardOpen} onClose={() => setEmergencyInfoCardOpen(false)} />
      <SafetyPrivacyModal isOpen={safetyModalOpen} onClose={() => setSafetyModalOpen(false)} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Footer */}
      <Footer onOpenSafetyModal={() => setSafetyModalOpen(true)} />

    </div>
  );
};

export function App() {
  return (
    <AppContent />
  );
}

export default App;
