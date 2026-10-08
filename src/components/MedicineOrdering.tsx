import React, { useState } from 'react';
import { 
  Pill, Search, ShoppingBag, Upload, ShieldCheck, Info, AlertTriangle, 
  CheckCircle2, Plus, Minus, Trash2, ArrowRight, Truck, MapPin, X, BookOpen, ShieldAlert, Sparkles, Filter 
} from 'lucide-react';
import { MEDICINES, EXPANDED_MEDICINES } from '../data/mockData';
import { Medicine, MedicineInfo } from '../types';
import { useApp } from '../context/AppContext';

export const MedicineOrdering: React.FC = () => {
  const { 
    cart, addToCart, removeFromCart, updateCartQty, clearCart, 
    placeMedicineOrder, patientProfile 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'order' | 'search'>('search');

  // Ordering State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMedForInfo, setSelectedMedForInfo] = useState<Medicine | null>(null);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(patientProfile.location);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Expanded Database State
  const [infoSearchTerm, setInfoSearchTerm] = useState('');
  const [infoCategoryFilter, setInfoCategoryFilter] = useState('All');
  const [selectedExpandedMed, setSelectedExpandedMed] = useState<MedicineInfo | null>(null);

  const categories = ['All', 'Fever & Pain Relief', 'Antibiotic', 'Allergy & Cold', 'Acid Reflux & Stomach', 'Diabetes Care', 'Respiratory Care', 'Hydration & Wellness', 'Vitamins & Supplements'];
  const infoCategories = ['All', 'Pain/fever', 'Allergy', 'Acidity', 'Cough/cold', 'Oral rehydration', 'Vitamins/minerals', 'Skin care/topical'];

  const filteredMedicines = MEDICINES.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) || med.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredExpandedMedicines = EXPANDED_MEDICINES.filter(med => {
    const query = infoSearchTerm.toLowerCase();
    const matchesSearch = !query || 
      med.name.toLowerCase().includes(query) || 
      med.genericName.toLowerCase().includes(query) ||
      med.symptomsSupported.some(s => s.toLowerCase().includes(query)) ||
      med.category.toLowerCase().includes(query);
    const matchesCat = infoCategoryFilter === 'All' || med.category === infoCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  const hasPrescriptionItem = cart.some(item => item.medicine.prescriptionRequired);

  const handlePlaceOrder = () => {
    if (hasPrescriptionItem && !prescriptionUploaded) {
      alert('Please upload a valid doctor prescription to proceed with prescription medications.');
      return;
    }
    placeMedicineOrder(deliveryAddress);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Pill className="w-7 h-7 text-teal-400" />
              <span>Medicines & Healthcare Products</span>
            </h1>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
              Verified Information & Express Pharmacy
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Search common medicines, review safety precautions, and order genuine pharmacy products.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-navy-950 p-1 rounded-2xl border border-navy-700 shrink-0">
          <button
            onClick={() => setActiveSubTab('search')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'search' ? 'bg-teal-500 text-navy-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Medicine Search & Safety DB
          </button>
          <button
            onClick={() => setActiveSubTab('order')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === 'order' ? 'bg-teal-500 text-navy-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Express Pharmacy Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: EXPANDED MEDICINE SEARCH & SAFETY DATABASE */}
      {activeSubTab === 'search' && (
        <div className="space-y-6">
          
          {/* Medical Safety Disclaimer Notice */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-amber-300">Mandatory Medical Safety Notice</h4>
              <p className="leading-relaxed">
                This medicine information database is for educational and general informational purposes only. It does not replace advice, diagnosis, or treatment from a qualified healthcare professional. Do not prescribe, alter dosage, or discontinue prescribed medications without medical consultation.
              </p>
            </div>
          </div>

          {/* Search Controls */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search medicines by name or symptom (e.g. Cetirizine, Paracetamol, Allergy, Fever, Acidity)..."
                  value={infoSearchTerm}
                  onChange={(e) => setInfoSearchTerm(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="md:col-span-4 flex items-center justify-end text-xs text-slate-400">
                <span>Showing <strong>{filteredExpandedMedicines.length}</strong> medicines</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
              <span className="text-xs font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-teal-400" /> Category:
              </span>
              {infoCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setInfoCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                    infoCategoryFilter === cat
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                      : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Expanded Medicine Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExpandedMedicines.map(med => (
              <div
                key={med.id}
                className="bg-navy-900 border border-navy-700 hover:border-teal-500/50 p-5 rounded-3xl shadow-xl transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-white text-base">{med.name}</h3>
                      <p className="text-xs text-teal-400 font-medium mt-0.5">{med.genericName}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                      med.otcOrPrescription === 'Over-The-Counter (OTC)'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      {med.otcOrPrescription}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <span className="font-bold text-slate-400 block text-[11px]">Primary Common Uses:</span>
                    <ul className="space-y-1">
                      {med.commonUses.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 block mb-1 font-semibold uppercase">Symptoms Addressed:</span>
                    <div className="flex flex-wrap gap-1">
                      {med.symptomsSupported.map((sym, idx) => (
                        <span key={idx} className="text-[10px] bg-navy-950 text-teal-300 border border-navy-800 px-2 py-0.5 rounded-md font-mono">
                          {sym}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedExpandedMed(med)}
                  className="w-full py-2.5 bg-navy-950 hover:bg-navy-800 text-teal-300 font-bold text-xs rounded-xl border border-navy-800 transition flex items-center justify-center gap-1.5"
                >
                  <Info className="w-4 h-4 text-teal-400" /> View Safety & Side Effects Guide
                </button>
              </div>
            ))}
          </div>

          {filteredExpandedMedicines.length === 0 && (
            <div className="bg-navy-900 border border-navy-700 rounded-3xl p-12 text-center text-slate-400 space-y-2">
              <Pill className="w-10 h-10 mx-auto text-navy-700" />
              <h3 className="font-bold text-white text-base">No medicine matching "{infoSearchTerm}"</h3>
              <p className="text-xs">Try searching by generic name like Paracetamol, Cetirizine, or symptoms like Allergy.</p>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: PHARMACY EXPRESS DELIVERY & CATALOG */}
      {activeSubTab === 'order' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Catalog & Search */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Search Bar & Category Filter */}
            <div className="bg-navy-900 border border-navy-700 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search medicines in pharmacy inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                      selectedCategory === cat 
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/50' 
                        : 'bg-navy-950 text-slate-400 border-navy-800 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Medicine Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredMedicines.map(med => (
                <div 
                  key={med.id}
                  className="bg-navy-900 border border-navy-700 hover:border-teal-500/50 p-4 rounded-2xl shadow-xl transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-white text-sm">{med.name}</h3>
                        <p className="text-[11px] text-slate-400">{med.category} • {med.unit}</p>
                      </div>
                      <span className="text-xs font-black text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                        ₹{med.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">{med.usage}</p>

                    <div className="flex items-center gap-2 pt-1 text-[10px]">
                      {med.prescriptionRequired ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          <AlertTriangle className="w-3 h-3" /> Rx Required
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          <ShieldCheck className="w-3 h-3" /> OTC (No Rx Needed)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-navy-800">
                    <button
                      onClick={() => setSelectedMedForInfo(med)}
                      className="p-2 text-slate-400 hover:text-teal-400 bg-navy-950 rounded-xl border border-navy-800 hover:border-teal-500/40 transition"
                      title="View Usage & Side Effects"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(med)}
                      className="flex-1 py-2 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Pharmacy Cart Drawer */}
          <div className="lg:col-span-1 bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-teal-400" />
                <h2 className="font-bold text-white text-base">Pharmacy Cart</h2>
              </div>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-[10px] text-rose-400 hover:underline">
                  Clear All
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-slate-500 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto text-navy-800" />
                <p className="text-xs">Your pharmacy cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.medicine.id} className="bg-navy-950 p-2.5 rounded-xl border border-navy-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{item.medicine.name}</div>
                        <div className="text-[10px] text-teal-400 font-semibold">₹{item.medicine.price} × {item.quantity} = ₹{item.medicine.price * item.quantity}</div>
                      </div>
                      <div className="flex items-center gap-1 bg-navy-900 border border-navy-800 rounded-lg p-0.5">
                        <button onClick={() => updateCartQty(item.medicine.id, item.quantity - 1)} className="p-1 text-slate-400 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-white px-1">{item.quantity}</span>
                        <button onClick={() => updateCartQty(item.medicine.id, item.quantity + 1)} className="p-1 text-slate-400 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {hasPrescriptionItem && (
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                      <span className="flex items-center gap-1">
                        <Upload className="w-4 h-4" /> Doctor Prescription Needed
                      </span>
                      {prescriptionUploaded && <span className="text-emerald-400 text-[10px]">✓ Uploaded</span>}
                    </div>
                    <p className="text-[11px] text-slate-300">Your cart contains prescription items. Upload prescription to proceed.</p>
                    <button
                      onClick={() => setPrescriptionUploaded(!prescriptionUploaded)}
                      className={`w-full py-1.5 rounded-lg text-xs font-bold transition border ${
                        prescriptionUploaded 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                    >
                      {prescriptionUploaded ? '✓ Prescription Attached' : 'Attach Sample Prescription'}
                    </button>
                  </div>
                )}

                <div className="border-t border-navy-800 pt-3 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Subtotal:</span>
                    <span className="font-bold text-white">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Express 25-Min Delivery:</span>
                    <span className="font-bold text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white border-t border-navy-800 pt-2">
                    <span>Total Amount:</span>
                    <span className="text-teal-400">₹{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Place Order & Track Delivery</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Safety Info Modal for Catalog Medicines */}
      {selectedMedForInfo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-md w-full shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-base text-white">{selectedMedForInfo.name}</h3>
                <p className="text-xs text-teal-400 font-semibold">{selectedMedForInfo.category}</p>
              </div>
              <button onClick={() => setSelectedMedForInfo(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                <span className="font-bold text-slate-300 block mb-1">General Usage Guide:</span>
                <p className="text-slate-300">{selectedMedForInfo.usage}</p>
              </div>

              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                <span className="font-bold text-rose-300 block mb-1">Common Side Effects:</span>
                <ul className="list-disc list-inside text-slate-400">
                  {selectedMedForInfo.sideEffects.map((se, i) => <li key={i}>{se}</li>)}
                </ul>
              </div>

              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                <span className="font-bold text-amber-300 block mb-1">Safety Precautions:</span>
                <ul className="list-disc list-inside text-slate-400">
                  {selectedMedForInfo.precautions.map((pr, i) => <li key={i}>{pr}</li>)}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSelectedMedForInfo(null)}
              className="w-full py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold text-xs rounded-xl transition"
            >
              Close Safety Guide
            </button>
          </div>
        </div>
      )}

      {/* Expanded Medicine Detailed Safety Modal */}
      {selectedExpandedMed && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-teal-500/40 rounded-3xl max-w-xl w-full shadow-2xl p-6 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedExpandedMed(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  selectedExpandedMed.otcOrPrescription === 'Over-The-Counter (OTC)'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {selectedExpandedMed.otcOrPrescription}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{selectedExpandedMed.category} • {selectedExpandedMed.form}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">{selectedExpandedMed.name}</h3>
              <p className="text-xs text-teal-400 font-semibold">{selectedExpandedMed.genericName}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-navy-800">
                <h4 className="font-bold text-teal-300 mb-1">Common Uses & Indications</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedExpandedMed.commonUses.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              </div>

              <div className="bg-navy-950 p-3.5 rounded-2xl border border-navy-800">
                <h4 className="font-bold text-slate-200 mb-1">General Precautions & Administration</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedExpandedMed.generalPrecautions.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>

              <div className="bg-rose-950/30 p-3.5 rounded-2xl border border-rose-500/30">
                <h4 className="font-bold text-rose-300 mb-1">Important Safety Warnings & High-Risk Groups</h4>
                <ul className="list-disc list-inside space-y-1 text-rose-200">
                  {selectedExpandedMed.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>

              <div className="bg-navy-950 p-3.5 rounded-2xl border border-navy-800">
                <h4 className="font-bold text-amber-300 mb-1">Common Side Effects</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {selectedExpandedMed.sideEffects.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              {selectedExpandedMed.interactions && selectedExpandedMed.interactions.length > 0 && (
                <div className="bg-navy-950 p-3.5 rounded-2xl border border-navy-800">
                  <h4 className="font-bold text-purple-300 mb-1">Medication Interactions</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {selectedExpandedMed.interactions.map((it, i) => <li key={i}>{it}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {/* Mandatory Disclaimer Box */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-200 leading-relaxed">
              <strong>Medical Disclaimer:</strong> This medicine information is for educational purposes only and does not replace advice from a qualified healthcare professional.
            </div>

            <button
              onClick={() => setSelectedExpandedMed(null)}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition"
            >
              Close Safety Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
