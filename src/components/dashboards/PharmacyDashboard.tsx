import React from 'react';
import { Pill, CheckCircle2, Truck, Package, FileCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PharmacyDashboard: React.FC = () => {
  const { medicineOrders } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Pharmacy Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Pill className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Apollo Central Pharmacy Desk</h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                24x7 Express Fulfillment Active
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">Jubilee Hills Node Hub • Licensed Pharmacist Verification Desk</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white border-b border-navy-800 pb-3 flex items-center gap-2">
          <Package className="w-5 h-5 text-teal-400" />
          <span>Incoming Medicine Orders Queue</span>
        </h3>

        {medicineOrders.length === 0 ? (
          <div className="text-center py-10 text-slate-400 space-y-2">
            <Pill className="w-8 h-8 mx-auto text-navy-700" />
            <p className="text-xs">No active pharmacy orders. Place an order from the Medicine tab to preview live queue processing.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {medicineOrders.map(order => (
              <div key={order.id} className="bg-navy-950 border border-navy-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Order #{order.id}</span>
                    <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded font-bold">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1">Delivery to: {order.deliveryAddress}</p>
                  <p className="text-slate-400">Total: ₹{order.totalAmount} • Partner: {order.deliveryPartner.name}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                    <FileCheck className="w-4 h-4" /> Prescription Verified
                  </span>
                  <button className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold rounded-lg transition">
                    Dispatch Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
