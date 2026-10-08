import React from 'react';
import { 
  Drumstick, Wheat, Flame, Shield, Bone, Droplet, Sun, Zap, Citrus, HeartPulse, Activity, AlertTriangle, Droplets 
} from 'lucide-react';
import { DAILY_NUTRIENT_TARGETS } from '../../data/nutritionData';

const iconMap: Record<string, React.ReactNode> = {
  Drumstick: <Drumstick className="w-5 h-5 text-indigo-500" />,
  Wheat: <Wheat className="w-5 h-5 text-amber-500" />,
  Flame: <Flame className="w-5 h-5 text-orange-500" />,
  Shield: <Shield className="w-5 h-5 text-blue-500" />,
  Bone: <Bone className="w-5 h-5 text-slate-500" />,
  Droplet: <Droplet className="w-5 h-5 text-rose-500" />,
  Sun: <Sun className="w-5 h-5 text-amber-500" />,
  Zap: <Zap className="w-5 h-5 text-yellow-500" />,
  Citrus: <Citrus className="w-5 h-5 text-lime-500" />,
  HeartPulse: <HeartPulse className="w-5 h-5 text-pink-500" />,
  Activity: <Activity className="w-5 h-5 text-emerald-500" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-rose-500" />,
  Droplets: <Droplets className="w-5 h-5 text-cyan-500" />
};

export const DailyNutritionDashboard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">13 Essential Daily Nutrient Targets</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Recommended dietary reference intakes for optimal physiological function</p>
        </div>
        <span className="text-xs bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full font-semibold">
          13 Micro & Micronutrients
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {DAILY_NUTRIENT_TARGETS.map((n, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 hover:border-teal-300 dark:hover:border-teal-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-white dark:bg-navy-900 rounded-lg shadow-xs border border-slate-100 dark:border-navy-800">
                  {iconMap[n.icon] || <Activity className="w-5 h-5 text-teal-500" />}
                </div>
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded">
                  {n.target}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{n.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                {n.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-navy-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Status</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">On Track</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
