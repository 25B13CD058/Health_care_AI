import React, { useState } from 'react';
import { 
  Pill, Search, ShoppingBag, Upload, ShieldCheck, Info, AlertTriangle, 
  CheckCircle2, Plus, Minus, Trash2, ArrowRight, Truck, MapPin, X
} from 'lucide-react';
import { MEDICINES } from '../data/mockData';
import { Medicine } from '../types';
import { useApp } from '../context/AppContext';

export const MedicineOrdering: React.FC = () => {
  const { 
    cart, addToCart, removeFromCart, updateCartQty, clearCart, 
    placeMedicineOrder, patientProfile 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMedForInfo, setSelectedMedForInfo] = useState<Medicine | null>(null);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(patientProfile.location);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const categories = ['All', 'Fever & Pain Relief', 'Antibiotic', 'Allergy & Cold', 'Acid Reflux & Stomach', 'Diabetes Care', 'Respiratory Care', 'Hydration & Wellness', 'Vitamins & Supplements'];

  const filteredMedicines = MEDICINES.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) || med.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || med.category === selectedCategory;
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
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Pill className="w-7 h-7 text-teal-400" />
              <span>Medicines & Pharmacy</span>
            </h1>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
              24/7 Express Delivery
            </span>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            Order genuine OTC medicines, upload doctor prescriptions, and get fast doorstep delivery with live tracking.
          </p>
        </div>

        {/* Prescription Safety Disclaimer Banner */}
        <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-700 text-xs text-slate-300 max-w-sm flex items-start gap-2">
          <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <p className="text-[11px]">
            <strong>Safety Protocol:</strong> Prescription drugs require a verified doctor’s prescription. CareAI does not prescribe prescription medications autonomously.
          </p>
        </div>
      </div>

      {/* Main Grid: Products Catalog vs Cart Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Catalog & Search */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search Bar & Category Filter */}
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search medicine name, salt, or category (e.g., Paracetamol, Dolo, Allegra)..."
                className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition border ${
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

          {/* Medicines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMedicines.map(med => {
              const inCart = cart.find(i => i.medicine.id === med.id);

              return (
                <div 
                  key={med.id} 
                  className="bg-navy-900 border border-navy-700 hover:border-teal-500/50 rounded-2xl p-4 shadow-xl transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start gap-3">
                    <img src={med.image} alt={med.name} className="w-16 h-16 rounded-xl object-cover border border-navy-700 shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-xs text-white line-clamp-1">{med.name}</h3>
                      </div>

                      <p className="text-[10px] text-teal-400 font-semibold">{med.category}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{med.unit}</p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-extrabold text-white">₹{med.price}</span>
                        {med.prescriptionRequired && (
                          <span className="text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                            Rx Required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 bg-navy-950 p-2 rounded-lg border border-navy-800 line-clamp-2">
                    {med.usage}
                  </p>

                  <div className="pt-2 border-t border-navy-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedMedForInfo(med)}
                      className="text-[11px] font-semibold text-slate-400 hover:text-teal-300 flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Safety Info</span>
                    </button>

                    {inCart ? (
                      <div className="flex items-center gap-2 bg-navy-950 px-2 py-1 rounded-xl border border-teal-500/40">
                        <button onClick={() => updateCartQty(med.id, inCart.quantity - 1)} className="text-slate-300 hover:text-white">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-teal-300">{inCart.quantity}</span>
                        <button onClick={() => updateCartQty(med.id, inCart.quantity + 1)} className="text-slate-300 hover:text-white">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(med, 1)}
                        className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs rounded-xl transition flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Cart & Checkout Panel */}
        <div className="lg:col-span-1 space-y-4 sticky top-20">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-teal-400" />
                <span>Pharmacy Cart ({cart.length})</span>
              </h3>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-[10px] text-rose-400 hover:underline">
                  Clear All
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <Pill className="w-8 h-8 mx-auto text-navy-700" />
                <p className="text-xs">Your pharmacy cart is empty.</p>
                <p className="text-[10px] text-slate-500">Select OTC medicines or upload a prescription to order.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.medicine.id} className="bg-navy-950 border border-navy-800 p-2.5 rounded-xl flex items-center justify-between gap-2 text-xs">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-white truncate">{item.medicine.name}</h4>
                        <p className="text-[10px] text-teal-400">₹{item.medicine.price} × {item.quantity}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateCartQty(item.medicine.id, item.quantity - 1)} className="p-1 text-slate-400 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-white">{item.quantity}</span>
                        <button onClick={() => updateCartQty(item.medicine.id, item.quantity + 1)} className="p-1 text-slate-400 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeFromCart(item.medicine.id)} className="p-1 text-rose-400 hover:text-rose-300 ml-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prescription Upload Area (If Rx items present) */}
                {hasPrescriptionItem && (
                  <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Rx Prescription Required
                      </span>
                      {prescriptionUploaded && <span className="text-[10px] text-emerald-400 font-bold">✓ Uploaded</span>}
                    </div>

                    <button
                      onClick={() => setPrescriptionUploaded(!prescriptionUploaded)}
                      className={`w-full py-2 rounded-lg text-xs font-bold transition border flex items-center justify-center gap-1.5 ${
                        prescriptionUploaded 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{prescriptionUploaded ? 'Prescription Attached (Demo)' : 'Upload Doctor Prescription'}</span>
                    </button>
                  </div>
                )}

                {/* Order Summary */}
                <div className="pt-2 border-t border-navy-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>24/7 Express Delivery Fee</span>
                    <span className="text-emerald-400 font-semibold">FREE (Demo)</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-white pt-1 border-t border-navy-800">
                    <span>Total Amount</span>
                    <span className="text-teal-300">₹{cartTotal}</span>
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

      </div>

      {/* Safety Info Modal */}
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

    </div>
  );
};
