import React from 'react';
import { Drumstick, ShieldAlert, Check, Info, Flame, AlertCircle } from 'lucide-react';
import { UserHealthProfile } from '../../types';

interface ProteinGuidanceProps {
  profile: UserHealthProfile;
}

export const ProteinGuidance: React.FC<ProteinGuidanceProps> = ({ profile }) => {
  const weight = profile.weightKg;
  const isKidneyAffected = profile.hasKidneyDisease;

  // Calculate range
  const sedentaryMin = Math.round(weight * 0.8);
  const sedentaryMax = Math.round(weight * 1.0);
  const activeMin = Math.round(weight * 1.2);
  const activeMax = Math.round(weight * 1.6);
  const athleteMin = Math.round(weight * 1.6);
  const athleteMax = Math.round(weight * 2.0);

  const kidneyRestrictedTarget = Math.round(weight * 0.7);

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Drumstick className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personalized Protein Calculator & Guidance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tailored to your body weight ({weight} kg) & health conditions</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400">Recommended Daily Target</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {isKidneyAffected ? kidneyRestrictedTarget : profile.dailyProteinTargetG} g / day
          </div>
        </div>
      </div>

      {isKidneyAffected ? (
        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl text-rose-900 dark:text-rose-200 flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">⚠️ CRITICAL RENAL SAFETY WARNING</h4>
            <p className="text-xs leading-relaxed">
              Because you flagged Chronic Kidney Disease (CKD), high protein diets place extra filtration stress on hyperfiltering nephrons. Protein is restricted to approx <strong>0.6 – 0.8 g/kg body weight ({sedentaryMin}g – {sedentaryMax}g/day)</strong>.
            </p>
            <p className="text-[11px] text-rose-700 dark:text-rose-300 font-semibold">
              * Do NOT start high-protein powders, keto, or high-meat diets without written clearance from your Nephrologist.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-xl border ${profile.activityLevel === 'sedentary' ? 'bg-indigo-50/70 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-800' : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-navy-800'}`}>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Light / Sedentary (0.8-1.0g/kg)</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{sedentaryMin} – {sedentaryMax} g</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Sufficient for desk jobs & general wellness</p>
          </div>

          <div className={`p-4 rounded-xl border ${profile.activityLevel === 'moderate' || profile.activityLevel === 'light' ? 'bg-indigo-50/70 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-800' : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-navy-800'}`}>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Moderately Active (1.2-1.4g/kg)</div>
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{activeMin} – {activeMax} g</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Ideal for regular exercise & fitness</p>
          </div>

          <div className={`p-4 rounded-xl border ${profile.activityLevel === 'very_active' || profile.goal === 'gain' ? 'bg-indigo-50/70 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-800' : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-navy-800'}`}>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Heavy Exercise / Gain (1.6-2.0g/kg)</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">{athleteMin} – {athleteMax} g</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Supports heavy lifting & muscle hypertrophy</p>
          </div>
        </div>
      )}

      <div>
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Healthy Protein Sources (Per Serving)</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
            <div className="font-semibold text-xs text-slate-900 dark:text-white">Paneer / Cottage Cheese</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">18g protein / 100g</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
            <div className="font-semibold text-xs text-slate-900 dark:text-white">Cooked Lentils / Dal</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">9g protein / cup</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
            <div className="font-semibold text-xs text-slate-900 dark:text-white">Greek Yogurt / Hung Curd</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">10g protein / 100g</div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
            <div className="font-semibold text-xs text-slate-900 dark:text-white">Eggs (Boiled)</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">6g protein / egg</div>
          </div>
        </div>
      </div>
    </div>
  );
};
