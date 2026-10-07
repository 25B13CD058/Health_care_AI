import React from 'react';
import { Truck, MapPin, Phone, CheckCircle2, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeliveryDashboard: React.FC = () => {
  const { medicineOrders } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Driver Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
            alt="Rahul K." 
            className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-400" 
          />
          <div>
            <h1 className="text-xl font-black text-white">Rahul K. (Demo Delivery Partner)</h1>
            <p className="text-xs text-teal-400 font-medium">Vehicle: Hero Electric Scooter (TS09 EB 4021) • ★ 4.9 Rating</p>
          </div>
        </div>
      </div>

      {/* Active Delivery Queue */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white border-b border-navy-800 pb-3 flex items-center gap-2">
          <Truck className="w-5 h-5 text-teal-400" />
          <span>Assigned Express Delivery Jobs</span>
        </h3>

        {medicineOrders.length === 0 ? (
          <div className="text-center py-10 text-slate-400 space-y-2">
            <Truck className="w-8 h-8 mx-auto text-navy-700" />
            <p className="text-xs">No active delivery assignments. Place a medicine order from the Medicines tab to populate this portal.</p>
          </div>
        ) : (
          medicineOrders.map(order => (
            <div key={order.id} className="bg-navy-950 border border-navy-800 p-4 rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Order #{order.id}</span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded font-bold">
                  Out for Delivery (ETA 25 mins)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-navy-900 p-3 rounded-lg border border-navy-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">Pickup Store</span>
                  <span className="font-bold text-teal-300">Apollo Health City Central Pharmacy</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Delivery Address</span>
                  <span className="font-bold text-white">{order.deliveryAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href={`tel:${order.deliveryPartner.phone}`} 
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" /> Call Patient
                </a>
                <button className="px-4 py-2 bg-teal-500 text-navy-950 font-bold rounded-lg hover:bg-teal-400 transition flex items-center gap-1.5">
                  <Navigation className="w-4 h-4" /> Start GPS Navigation
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
