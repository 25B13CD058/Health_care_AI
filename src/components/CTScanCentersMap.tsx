import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Building2, MapPin, Phone, Star, ShieldAlert, List, Map as MapIcon, 
  Filter, ExternalLink, Activity, Search, Navigation, CheckCircle2, Award 
} from 'lucide-react';
import { DiagnosticCenter } from '../types';
import { DIAGNOSTIC_CENTERS } from '../data/mockData';

export const CTScanCentersMap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [activeCenter, setActiveCenter] = useState<DiagnosticCenter | null>(DIAGNOSTIC_CENTERS[0]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const servicesList = ['CT Scan', 'MRI', 'X-Ray', 'Ultrasound', 'PET Scan', 'Diagnostic Lab'];

  // Filter & Sort Centers
  const filteredCenters = DIAGNOSTIC_CENTERS.filter(center => {
    const matchesService = selectedService === 'all' || center.services.includes(selectedService as any);
    const matchesSearch = !searchLocation.trim() || 
      center.name.toLowerCase().includes(searchLocation.toLowerCase()) || 
      center.area.toLowerCase().includes(searchLocation.toLowerCase()) || 
      center.city.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesService && matchesSearch;
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

    // Add Center Pins
    filteredCenters.forEach(center => {
      const customIcon = L.divIcon({
        className: 'custom-diag-marker',
        html: `
          <div style="background-color: #7C3AED; color: white; border-radius: 12px; padding: 6px 10px; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; gap: 4px; cursor: pointer;">
            <span>🔬</span>
            <span>${center.name.split(' ')[0]}</span>
          </div>
        `,
        iconSize: [110, 32],
        iconAnchor: [55, 16]
      });

      const marker = L.marker([center.lat, center.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveCenter(center);
      });
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, selectedService, searchLocation, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 border border-navy-700 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Activity className="w-7 h-7 text-purple-400" />
              <span>Nearby CT Scan & Diagnostic Imaging Centers</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Verified Imaging Labs
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Locate 128-Slice CT Scans, 3T MRI, Digital X-Rays, Ultrasound & PET Scan centers with verified ratings and directions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              viewMode === 'map' ? 'bg-purple-600 text-white shadow-md' : 'bg-navy-950 text-slate-400 hover:text-white border border-navy-800'
            }`}
          >
            <MapIcon className="w-4 h-4" /> Map View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              viewMode === 'list' ? 'bg-purple-600 text-white shadow-md' : 'bg-navy-950 text-slate-400 hover:text-white border border-navy-800'
            }`}
          >
            <List className="w-4 h-4" /> List View
          </button>
        </div>
      </div>

      {/* Location Search & Service Filter Bar */}
      <div className="bg-navy-900 border border-navy-700 p-4 rounded-2xl shadow-xl space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Location Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by area or city (e.g. Jubilee Hills, Banjara Hills, Gachibowli)..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
              className="w-full bg-navy-950 border border-navy-700 text-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-purple-500"
            >
              <option value="distance">Sort by Distance (Nearest First)</option>
              <option value="rating">Sort by Rating (Highest First)</option>
            </select>
          </div>

          <div className="md:col-span-3 flex items-center justify-end text-xs text-slate-400">
            <span>Found <strong>{filteredCenters.length}</strong> Diagnostic Centers</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-400" /> Imaging Filter:
          </span>
          <button
            onClick={() => setSelectedService('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedService === 'all'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-slate-200'
            }`}
          >
            All Services
          </button>
          {servicesList.map(service => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedService === service
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-slate-200'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map or List Container */}
      {viewMode === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-8 bg-navy-900 border border-navy-700 rounded-3xl p-2 shadow-xl h-[520px] relative">
            <div ref={mapContainerRef} className="w-full h-full rounded-2xl overflow-hidden z-10" />
          </div>

          {/* Sidebar Active Center Details */}
          <div className="lg:col-span-4 bg-navy-900 border border-navy-700 rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            {activeCenter ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                      Selected Diagnostic Center
                    </span>
                    <h3 className="font-extrabold text-white text-lg mt-0.5">{activeCenter.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" /> {activeCenter.address}
                    </p>
                  </div>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg font-bold border border-purple-500/30">
                    {activeCenter.distanceKm} km
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs border-y border-navy-800 py-3">
                  <div className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{activeCenter.rating}</span>
                    <span className="text-slate-400 font-normal">({activeCenter.reviewCount} reviews)</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <div className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> {activeCenter.accreditation}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Imaging & Diagnostic Services</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCenter.services.map((svc, i) => (
                      <span key={i} className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg font-semibold">
                        ✓ {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-navy-950 rounded-xl text-xs text-slate-300 space-y-1">
                  <div><strong>Operating Hours:</strong> {activeCenter.operatingHours}</div>
                  <div><strong>Contact Phone:</strong> {activeCenter.phone}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={`tel:${activeCenter.phone}`}
                    className="py-2.5 bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs rounded-xl border border-navy-600 flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-purple-400" /> Call Lab
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${activeCenter.lat},${activeCenter.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Directions
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12">
                Click a pin marker on the map to view diagnostic center details.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.map(center => (
            <div
              key={center.id}
              className="bg-navy-900 border border-navy-700 hover:border-purple-500/50 p-5 rounded-3xl shadow-xl transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-white text-base">{center.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" /> {center.address}
                    </p>
                  </div>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg font-bold border border-purple-500/30 shrink-0">
                    {center.distanceKm} km
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {center.rating}
                  </span>
                  <span className="text-slate-500">({center.reviewCount} reviews)</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-semibold">{center.accreditation}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {center.services.map((svc, idx) => (
                    <span key={idx} className="text-[11px] bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded-md font-semibold">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-navy-800">
                <a
                  href={`tel:${center.phone}`}
                  className="py-2 bg-navy-950 hover:bg-navy-800 text-white font-bold text-xs rounded-xl border border-navy-800 flex items-center justify-center gap-1 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-400" /> Call
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition"
                >
                  <Navigation className="w-3.5 h-3.5" /> Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
