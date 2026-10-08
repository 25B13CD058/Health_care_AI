import React from 'react';
import { 
  HeartPulse, Sparkles, Activity, Scale, Droplets, Drumstick, Footprints, Moon, ShieldAlert, ChevronRight, CheckCircle2, Utensils 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartHealthWarnings } from './SmartHealthWarnings';
import { HEALTH_CONDITION_GUIDES } from '../../data/nutritionData';

interface HealthWellnessDashboardProps {
  onNavigateTab: (tabKey: string) => void;
  onSelectConditionGuide: (condId: string) => void;
}

export const HealthWellnessDashboard: React.FC<HealthWellnessDashboardProps> = ({ 
  onNavigateTab, 
  onSelectConditionGuide 
}) => {
  const { userHealthProfile } = useApp();

  const heightM = userHealthProfile.heightCm / 100;
  const bmi = heightM > 0 ? Number((userHealthProfile.weightKg / (heightM * heightM)).toFixed(1)) : 0;

  const waterPct = Math.min(100, Math.round((userHealthProfile.loggedWaterMl / userHealthProfile.dailyWaterTargetMl) * 100));
  const proteinPct = Math.min(100, Math.round((userHealthProfile.loggedProteinG / userHealthProfile.dailyProteinTargetG) * 100));
  const stepPct = Math.min(100, Math.round((userHealthProfile.loggedSteps / userHealthProfile.targetSteps) * 100));

  return (
    <div className="space-y-8">
      {/* Educational & Clinical Smart Banners */}
      <SmartHealthWarnings profile={userHealthProfile} />

      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Clinical Health, Nutrition & Fitness Suite
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Personalized Disease-Aware Nutrition & Wellness
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Targeted nutritional guides for Thyroid, Diabetes, PCOS, Hypertension & Heart Care. Complete with allergy filtering and Mifflin-St Jeor metabolic tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('meal_assistant')}
              className="py-3 px-5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Utensils className="w-4 h-4" /> AI Meal Generator
            </button>
            <button
              onClick={() => onNavigateTab('guides')}
              className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-2xl transition-all border border-white/15 flex items-center justify-center gap-2"
            >
              Browse 12 Condition Guides
            </button>
          </div>
        </div>
      </div>

      {/* 5 Core Metric Progress Rings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* BMI Card */}
        <div 
          onClick={() => onNavigateTab('profile')}
          className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm hover:border-teal-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Body Mass Index</span>
              <Scale className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{bmi}</div>
            <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-1">
              Weight: {userHealthProfile.weightKg} kg
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Caloric Target</span>
            <span className="font-bold text-slate-900 dark:text-white">Mifflin Calculated</span>
          </div>
        </div>

        {/* Hydration Card */}
        <div 
          onClick={() => onNavigateTab('hydration')}
          className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm hover:border-cyan-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Hydration Progress</span>
              <Droplets className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">
              {(userHealthProfile.loggedWaterMl / 1000).toFixed(1)} L
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-navy-950 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${waterPct}%` }} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Daily Goal: {(userHealthProfile.dailyWaterTargetMl / 1000).toFixed(1)}L</span>
            <span className="font-bold text-cyan-600">{waterPct}%</span>
          </div>
        </div>

        {/* Protein Card */}
        <div 
          onClick={() => onNavigateTab('profile')}
          className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm hover:border-indigo-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Protein Intake</span>
              <Drumstick className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {userHealthProfile.loggedProteinG} g
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-navy-950 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${proteinPct}%` }} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Target: {userHealthProfile.dailyProteinTargetG}g</span>
            <span className="font-bold text-indigo-600">{proteinPct}%</span>
          </div>
        </div>

        {/* Steps Card */}
        <div 
          onClick={() => onNavigateTab('hydration')}
          className="p-5 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 shadow-sm hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Physical Movement</span>
              <Footprints className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {userHealthProfile.loggedSteps.toLocaleString()}
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-navy-950 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stepPct}%` }} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>Goal: {userHealthProfile.targetSteps.toLocaleString()} steps</span>
            <span className="font-bold text-emerald-600">{stepPct}%</span>
          </div>
        </div>
      </div>

      {/* Health Conditions Showcase Grid */}
      <div className="bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Explore Health Conditions Food Guides</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Clinical nutrition recommendations for chronic disease management</p>
          </div>
          <button
            onClick={() => onNavigateTab('guides')}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            View All 12 Guides <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HEALTH_CONDITION_GUIDES.slice(0, 6).map(guide => (
            <div
              key={guide.id}
              onClick={() => {
                onSelectConditionGuide(guide.id);
                onNavigateTab('guides');
              }}
              className="p-4 bg-slate-50 dark:bg-navy-950 rounded-2xl border border-slate-200 dark:border-navy-800 hover:border-teal-400 dark:hover:border-teal-600 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  {guide.title.split(' (')[0]}
                </h4>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {guide.shortDescription}
              </p>
              <div className="pt-2 text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                ✓ {guide.recommendedFoods.length} Recommended Foods Included
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
