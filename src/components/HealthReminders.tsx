import React from 'react';
import { 
  Bell, CheckCircle2, Circle, Clock, Pill, Calendar, Activity 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HealthReminders: React.FC = () => {
  const { healthReminders, toggleReminder } = useApp();

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-navy-800 pb-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-400" />
          <span>Health & Medicine Reminders</span>
        </h3>
        <span className="text-[10px] text-slate-400">Today</span>
      </div>

      <div className="space-y-2.5">
        {healthReminders.map(rem => (
          <div 
            key={rem.id}
            onClick={() => toggleReminder(rem.id)}
            className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
              rem.completed 
                ? 'bg-navy-950/40 border-navy-800/80 text-slate-500' 
                : 'bg-navy-950 border-teal-500/30 text-slate-200 hover:border-teal-500/60 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <button className="text-teal-400">
                {rem.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-slate-500" />}
              </button>
              <div>
                <h4 className={`font-semibold text-xs ${rem.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                  {rem.title}
                </h4>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-teal-400" />
                  <span>{rem.time}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
