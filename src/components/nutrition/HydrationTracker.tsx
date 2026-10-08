import React from 'react';
import { Droplets, Plus, Minus, RotateCcw, CheckCircle2, Info } from 'lucide-react';
import { UserHealthProfile } from '../../types';
import { useApp } from '../../context/AppContext';

interface HydrationTrackerProps {
  profile: UserHealthProfile;
}

export const HydrationTracker: React.FC<HydrationTrackerProps> = ({ profile }) => {
  const { logWaterIntake, updateHealthProfile } = useApp();

  const logged = profile.loggedWaterMl;
  const target = profile.dailyWaterTargetMl;
  const percentage = Math.min(100, Math.round((logged / target) * 100));

  const handleAdd = (amount: number) => {
    logWaterIntake(amount);
  };

  const handleReset = () => {
    updateHealthProfile({ loggedWaterMl: 0 });
  };

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-xl">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hydration & Water Intake Tracker</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Track daily fluid balance for optimal kidney & metabolic health</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400">Daily Target</span>
          <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
            {(target / 1000).toFixed(1)} Liters ({target} ml)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Progress Gauge */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Hydration Progress</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {(logged / 1000).toFixed(2)} / {(target / 1000).toFixed(1)} L
            </span>
          </div>

          <div className="w-full h-4 bg-slate-100 dark:bg-navy-950 rounded-full overflow-hidden border border-slate-200 dark:border-navy-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">{percentage}% Achieved</span>
            <span className="text-slate-500 dark:text-slate-400">
              {target - logged > 0 ? `${((target - logged) / 1000).toFixed(2)} L remaining` : '🎉 Target Reached!'}
            </span>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Quick Log Fluid Intake</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleAdd(250)}
              className="py-2.5 px-3 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800 rounded-xl text-xs font-bold text-cyan-800 dark:text-cyan-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> +250 ml (Glass)
            </button>
            <button
              onClick={() => handleAdd(500)}
              className="py-2.5 px-3 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800 rounded-xl text-xs font-bold text-cyan-800 dark:text-cyan-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> +500 ml (Bottle)
            </button>
            <button
              onClick={() => handleAdd(1000)}
              className="py-2.5 px-3 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800 rounded-xl text-xs font-bold text-cyan-800 dark:text-cyan-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> +1 L (Jug)
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => handleAdd(-250)}
              disabled={logged <= 0}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-40 flex items-center gap-1"
            >
              <Minus className="w-3.5 h-3.5" /> Undo (-250ml)
            </button>

            <button
              onClick={handleReset}
              className="text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Today's Water Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
