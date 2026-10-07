import React from 'react';
import { X, Bell, CheckCheck, Calendar, Pill, AlertTriangle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, navigateTo } = useApp();

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appointment': return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'medicine': return <Pill className="w-4 h-4 text-emerald-400" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      default: return <FileText className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-950/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-navy-900 border-l border-navy-700 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base text-white">Notifications</h3>
            <span className="text-xs bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded-full">
              {notifications.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bell className="w-10 h-10 mx-auto text-navy-700 mb-2" />
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.category === 'appointment') navigateTo('appointments');
                  if (notif.category === 'medicine') navigateTo('medicines');
                  if (notif.category === 'emergency') navigateTo('ambulance');
                }}
                className={`p-3.5 rounded-xl border transition cursor-pointer ${
                  notif.read 
                    ? 'bg-navy-950/50 border-navy-800/80 text-slate-400' 
                    : 'bg-navy-800 border-teal-500/30 text-slate-200 shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-navy-900 rounded-lg shrink-0 border border-navy-700">
                    {getCategoryIcon(notif.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-xs text-white truncate">{notif.title}</h4>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-300">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-navy-800 text-center">
          <button
            onClick={() => notifications.forEach(n => markNotificationAsRead(n.id))}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center justify-center gap-1.5 mx-auto"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        </div>

      </div>
    </div>
  );
};
