import React, { useState, useEffect } from 'react';
import { 
  X, Truck, MapPin, Phone, CheckCircle2, Clock, ShieldCheck, 
  Package, ChevronRight, UserCheck 
} from 'lucide-react';
import { MedicineOrder } from '../types';

export const DeliveryTrackerModal: React.FC<{ order: MedicineOrder | null; onClose: () => void }> = ({ order, onClose }) => {
  const [currentStep, setCurrentStep] = useState(3); // Default step: Assigned to Delivery Partner
  const [eta, setEta] = useState(25);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => (prev > 1 ? prev - 1 : 25));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!order) return null;

  const steps = [
    { label: 'Prescription Verified', desc: 'Checked by licensed pharmacist' },
    { label: 'Order Confirmed', desc: 'Packed at Apollo Pharmacy' },
    { label: 'Preparing Package', desc: 'Tamper-proof seal applied' },
    { label: 'Assigned to Partner', desc: 'Rahul K. picked up order' },
    { label: 'Out for Delivery', desc: 'On route to patient location' },
    { label: 'Delivered', desc: 'Handover complete' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 space-y-0">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-teal-950 p-6 border-b border-navy-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded">
                Live Pharmacy Delivery Tracking
              </span>
              <span className="text-xs text-slate-400">Order #{order.id}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1">24/7 Express Medicine Order</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full bg-navy-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Delivery Partner Card */}
        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-teal-950/60 to-navy-950 p-4 rounded-2xl border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={order.deliveryPartner.photo} 
                alt={order.deliveryPartner.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500/50 shadow-lg" 
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">{order.deliveryPartner.name}</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                    ★ {order.deliveryPartner.rating}
                  </span>
                </div>
                <p className="text-xs text-teal-400 font-medium">{order.deliveryPartner.vehicle}</p>
                <p className="text-[11px] text-slate-400">Assigned Pharmacy Delivery Partner</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="text-right sm:text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Delivery</span>
                <span className="text-lg font-black text-amber-400">{eta} Mins</span>
              </div>
              <a
                href={`tel:${order.deliveryPartner.phone}`}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Rahul K.</span>
              </a>
            </div>
          </div>

          {/* Simulated Map Visualizer */}
          <div className="bg-navy-950 border border-navy-800 rounded-2xl p-4 relative overflow-hidden h-40 flex items-center justify-center">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e3e62_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
            
            {/* Animated Path */}
            <div className="relative z-10 w-full max-w-md flex items-center justify-between px-6">
              
              {/* Pharmacy Node */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border-2 border-teal-500 flex items-center justify-center text-teal-400 mx-auto shadow-lg">
                  <Package className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 block">Pharmacy Desk</span>
              </div>

              {/* Connecting Line with Delivery Vehicle */}
              <div className="flex-1 h-1 bg-navy-800 mx-4 relative">
                <div className="h-full bg-gradient-to-r from-teal-500 to-amber-400 w-3/4 animate-pulse" />
                <div className="absolute top-1/2 left-2/3 -translate-y-1/2 bg-amber-400 text-navy-950 p-1.5 rounded-full shadow-lg animate-bounce">
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              {/* Patient Node */}
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 mx-auto shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-300 mt-1 block">Patient Home</span>
              </div>

            </div>
          </div>

          {/* Status Pipeline Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Order Status Timeline:</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-xl border text-left transition ${
                      isCurrent 
                        ? 'bg-teal-500/20 border-teal-500 text-white' 
                        : (isCompleted ? 'bg-navy-950 border-navy-800 text-slate-300' : 'bg-navy-950/40 border-navy-900 text-slate-500')
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-teal-400' : 'text-slate-600'}`} />
                      <span className="font-bold text-xs">{step.label}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-navy-800 bg-navy-950 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Delivery to: <strong className="text-white">{order.deliveryAddress}</strong>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 font-bold rounded-xl transition">
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
};
