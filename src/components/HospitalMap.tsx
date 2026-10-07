import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Building2, MapPin, Phone, Star, Siren, ShieldAlert, Users, 
  Bed, ArrowRight, List, Map as MapIcon, Filter, ExternalLink,
  Pill, Activity, Stethoscope, Ambulance, Clock, CheckCircle2 
} from 'lucide-react';
import { Hospital, FacilityType } from '../types';
import { HOSPITALS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const HospitalMap: React.FC<{ onSelectHospital: (hosp: Hospital) => void }> = ({ onSelectHospital }) => {
  const { setEmergencyModalOpen } = useApp();
  
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedFacilityType, setSelectedFacilityType] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [filterEmergencyOnly, setFilterEmergencyOnly] = useState<boolean>(false);
  const [activeHospital, setActiveHospital] = useState<Hospital | null>(HOSPITALS[0]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Filter & Sort Hospitals / Facilities
  const filteredHospitals = HOSPITALS.filter(hosp => {
    const matchesFacility = selectedFacilityType === 'all' || hosp.facilityType === selectedFacilityType;
    const matchesEmergency = !filterEmergencyOnly || hosp.emergencyAvailable;
    const matchesSpecialty = selectedSpecialty === 'all' || hosp.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    return matchesFacility && matchesEmergency && matchesSpecialty;
  }).sort((a, b) => {
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    return b.rating - a.rating;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (viewMode !== 'map' || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Center around Jubilee Hills Node (17.4325, 78.4070)
    const map = L.map(mapContainerRef.current).setView([17.4325, 78.4070], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Patient Pin
    const patientIcon = L.divIcon({
      className: 'custom-patient-marker',
      html: `
        <div style="background-color: #3B82F6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 12px rgba(59,130,246,0.8); display: flex; align-items: center; justify-content: center;">
          <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    L.marker([17.4320, 78.4050], { icon: patientIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; color: #0F172A;">
          <strong>📍 Your GPS Location</strong><br/>
          Jubilee Hills Node (Simulated 17.432° N, 78.407° E)
        </div>
      `);

    // Add Facility Markers
    filteredHospitals.forEach(hosp => {
      const isEmergency = hosp.emergencyAvailable;
      const isPharmacy = hosp.facilityType === 'pharmacy';
      const isDiagnostic = hosp.facilityType === 'diagnostic';

      let bgColor = isEmergency ? '#DC2626' : '#0D9488';
      let iconSymbol = '🏥';
      if (isPharmacy) { bgColor = '#059669'; iconSymbol = '💊'; }
      if (isDiagnostic) { bgColor = '#2563EB'; iconSymbol = '🧪'; }
      
      const customIcon = L.divIcon({
        className: 'custom-hosp-marker',
        html: `
          <div style="background-color: ${bgColor}; color: white; border-radius: 12px; padding: 6px 10px; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 4px; cursor: pointer;">
            <span>${iconSymbol}</span>
            <span>${hosp.name.split(' ')[0]}</span>
          </div>
        `,
        iconSize: [110, 32],
        iconAnchor: [55, 16]
      });

      const marker = L.marker([hosp.lat, hosp.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveHospital(hosp);
      });
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, selectedFacilityType, filterEmergencyOnly, selectedSpecialty, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 shadow-xl space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <Building2 className="w-7 h-7 text-teal-400" />
                <span>Smart Healthcare Map & Facility Directory</span>
              </h1>
              <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2.5 py-0.5 rounded">
                Demo / Simulated Capacity Metrics
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Find hospitals, emergency departments, pharmacies, diagnostic labs, and nearby doctors with real-time distance sorting.
            </p>
          </div>

          {/* Map / List View Toggle */}
          <div className="flex items-center gap-2 bg-navy-950 p-1 rounded-xl border border-navy-800 shrink-0">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                viewMode === 'map' ? 'bg-teal-500 text-navy-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Map View</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                viewMode === 'list' ? 'bg-teal-500 text-navy-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </button>
          </div>
        </div>

        {/* Facility Type Filters */}
        <div className="flex flex-wrap items-center gap-2 border-t border-navy-800 pt-3">
          <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-teal-400" /> Facility Type:
          </span>
          {[
            { id: 'all', label: 'All Facilities', icon: Building2 },
            { id: 'emergency', label: '🚨 Emergency ERs', icon: Siren },
            { id: 'hospital', label: '🏥 Super Hospitals', icon: Building2 },
            { id: 'pharmacy', label: '💊 Pharmacies', icon: Pill },
            { id: 'diagnostic', label: '🧪 Diagnostics', icon: Activity }
          ].map(fac => {
            const IconComponent = fac.icon;
            return (
              <button
                key={fac.id}
                onClick={() => setSelectedFacilityType(fac.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border ${
                  selectedFacilityType === fac.id
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-xs'
                    : 'bg-navy-950 text-slate-400 border-navy-800 hover:border-navy-700 hover:text-slate-200'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{fac.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort & Toggle Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-950 p-3 rounded-2xl border border-navy-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">Sort By:</span>
            <button
              onClick={() => setSortBy('distance')}
              className={`px-3 py-1 rounded-lg font-bold transition ${sortBy === 'distance' ? 'bg-teal-500 text-navy-950' : 'text-slate-400 hover:text-white'}`}
            >
              📍 Distance (Nearest First)
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-3 py-1 rounded-lg font-bold transition ${sortBy === 'rating' ? 'bg-teal-500 text-navy-950' : 'text-slate-400 hover:text-white'}`}
            >
              ★ Top Rated
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filterEmergencyOnly}
                onChange={(e) => setFilterEmergencyOnly(e.target.checked)}
                className="w-4 h-4 rounded text-teal-500 focus:ring-0 bg-navy-900 border-navy-700"
              />
              <span className="font-bold text-rose-300">24x7 Emergency Available Only</span>
            </label>
          </div>
        </div>

      </div>

      {/* View Modes */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Leaflet Canvas */}
          <div className="lg:col-span-2 bg-navy-900 border border-navy-700 rounded-3xl overflow-hidden shadow-2xl h-[540px] relative">
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            <div className="absolute bottom-3 left-3 z-10 bg-navy-950/90 border border-navy-700 text-slate-300 px-3 py-1.5 rounded-xl text-[10px] backdrop-blur-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Simulated GPS Location: Jubilee Hills Node (17.432° N, 78.407° E)</span>
            </div>
          </div>

          {/* Active Facility Card Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {activeHospital ? (
              <div className="bg-navy-900 border border-navy-700 rounded-3xl p-5 shadow-xl space-y-4">
                <img src={activeHospital.image} alt={activeHospital.name} className="w-full h-36 rounded-2xl object-cover border border-navy-800" />

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-base text-white">{activeHospital.name}</h3>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {activeHospital.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" /> {activeHospital.address} ({activeHospital.distance})
                  </p>
                </div>

                {/* Simulated Hospital Capacity Indicators */}
                <div className="bg-navy-950 p-3 rounded-2xl border border-navy-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-b border-navy-900 pb-1">
                    <span>CAPACITY METRIC</span>
                    <span className="text-amber-400 text-[10px]">Demo / Simulated</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Emergency Dept Wait</span>
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {activeHospital.edWaitTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Emergency Beds</span>
                      <span className="font-bold text-white flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-teal-400" /> {activeHospital.availableBeds.emergency} Available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-navy-800 flex items-center gap-2">
                  <button
                    onClick={() => onSelectHospital(activeHospital)}
                    className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition text-center shadow-md"
                  >
                    View Details
                  </button>
                  {activeHospital.emergencyAvailable && (
                    <button
                      onClick={() => setEmergencyModalOpen(true)}
                      className="px-3.5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition"
                      title="Book Emergency Ambulance"
                    >
                      <Siren className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-navy-900 border border-navy-700 rounded-3xl p-8 text-center text-slate-400">
                <MapPin className="w-8 h-8 mx-auto text-teal-400 mb-2" />
                <p className="text-xs">Click any marker on the map to inspect details.</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(hosp => (
            <div key={hosp.id} className="bg-navy-900 border border-navy-700 rounded-3xl p-5 shadow-xl transition space-y-4 flex flex-col justify-between">
              <div>
                <img src={hosp.image} alt={hosp.name} className="w-full h-40 rounded-2xl object-cover border border-navy-800 mb-3" />
                
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base text-white">{hosp.name}</h3>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {hosp.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" /> {hosp.address} ({hosp.distance})
                </p>

                <div className="mt-3 bg-navy-950 p-3 rounded-xl border border-navy-800 text-xs flex items-center justify-between">
                  <span className="text-slate-300">Wait Time: <strong className="text-emerald-400">{hosp.edWaitTime}</strong></span>
                  <span className="text-slate-300">ER Beds: <strong className="text-white">{hosp.availableBeds.emergency}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-navy-800 flex items-center justify-between gap-2">
                <a href={`tel:${hosp.contact}`} className="px-3 py-2 bg-navy-800 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-teal-400" /> Call
                </a>
                <button
                  onClick={() => onSelectHospital(hosp)}
                  className="flex-1 py-2 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition text-center"
                >
                  View Facility Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
