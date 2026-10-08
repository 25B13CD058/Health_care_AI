import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, AlertTriangle, Utensils, Zap, Info, ShieldAlert, Sparkles, Heart 
} from 'lucide-react';
import { HEALTH_CONDITION_GUIDES } from '../../data/nutritionData';
import { HealthConditionType } from '../../types';

interface ConditionFoodGuideProps {
  initialCondition?: HealthConditionType;
}

export const ConditionFoodGuide: React.FC<ConditionFoodGuideProps> = ({ initialCondition = 'thyroid' }) => {
  const [selectedId, setSelectedId] = useState<HealthConditionType>(initialCondition);

  const guide = HEALTH_CONDITION_GUIDES.find(g => g.id === selectedId) || HEALTH_CONDITION_GUIDES[0];

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Health Conditions Food Guide</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
              12 Medical Guides
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Evidence-based nutritional recommendations tailored to specific health & chronic conditions
          </p>
        </div>

        {/* Dropdown selector for smaller screens */}
        <div className="md:hidden">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value as HealthConditionType)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white"
          >
            {HEALTH_CONDITION_GUIDES.map(g => (
              <option key={g.id} value={g.id}>{g.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Condition Pills Navigation (Desktop) */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6">
        {HEALTH_CONDITION_GUIDES.map(g => {
          const isActive = g.id === selectedId;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedId(g.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
              }`}
            >
              {g.title.split(' (')[0]}
            </button>
          );
        })}
      </div>

      {/* Selected Condition Card Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent p-5 rounded-2xl border border-teal-500/20 mb-6">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {guide.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
          {guide.shortDescription}
        </p>

        {guide.subTypesNotes && (
          <div className="mt-3 p-3 bg-white/80 dark:bg-navy-900/80 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800">
            <strong>Clinical Context & Subtypes:</strong> {guide.subTypesNotes}
          </div>
        )}

        {guide.medicationInteractionNotice && (
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 rounded-xl text-xs font-medium text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{guide.medicationInteractionNotice}</span>
          </div>
        )}
      </div>

      {/* 3 Columns: Recommended / Limit / Medical Supervision */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recommended Foods */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h5 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">Recommended Foods</h5>
          </div>
          <div className="space-y-3">
            {guide.recommendedFoods.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-navy-900 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50 shadow-2xs">
                <div className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{item.why}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Foods to Limit */}
        <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/60">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h5 className="font-bold text-sm text-amber-900 dark:text-amber-200">Foods to Limit / Moderation</h5>
          </div>
          <div className="space-y-3">
            {guide.foodsToLimit.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-navy-900 p-3.5 rounded-xl border border-amber-100 dark:border-amber-900/50 shadow-2xs">
                <div className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{item.why}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Guidance Foods */}
        <div className="bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl p-5 border border-purple-200 dark:border-purple-800/60">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h5 className="font-bold text-sm text-purple-900 dark:text-purple-200">Medical Guidance / Precautions</h5>
          </div>
          <div className="space-y-3">
            {guide.medicalGuidanceFoods.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-navy-900 p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/50 shadow-2xs">
                <div className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{item.why}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Nutrients & Meal Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Nutrients of Interest */}
        <div className="p-5 bg-slate-50 dark:bg-navy-950 rounded-2xl border border-slate-200 dark:border-navy-800">
          <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Key Nutrients of Interest
          </h5>
          <div className="space-y-3">
            {guide.nutrientsOfInterest.map((n, idx) => (
              <div key={idx} className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800 text-xs">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>{n.name}</span>
                  <span className="text-teal-600 dark:text-teal-400 font-normal">Sources: {n.sources}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{n.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 1-Day Sample Meal Plan */}
        <div className="p-5 bg-slate-50 dark:bg-navy-950 rounded-2xl border border-slate-200 dark:border-navy-800">
          <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-teal-500" /> Sample 1-Day Meal Pattern
          </h5>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800">
              <span className="font-bold text-teal-600 dark:text-teal-400">Breakfast: </span>
              <span className="text-slate-700 dark:text-slate-300">{guide.mealIdeas.breakfast}</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800">
              <span className="font-bold text-teal-600 dark:text-teal-400">Lunch: </span>
              <span className="text-slate-700 dark:text-slate-300">{guide.mealIdeas.lunch}</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800">
              <span className="font-bold text-teal-600 dark:text-teal-400">Evening Snack: </span>
              <span className="text-slate-700 dark:text-slate-300">{guide.mealIdeas.snack}</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800">
              <span className="font-bold text-teal-600 dark:text-teal-400">Dinner: </span>
              <span className="text-slate-700 dark:text-slate-300">{guide.mealIdeas.dinner}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Notes & Disclaimers */}
      <div className="p-4 bg-slate-100 dark:bg-navy-950 rounded-xl text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-800 space-y-1">
        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
          <Info className="w-4 h-4 text-teal-500" /> Non-Diagnostic Educational Notice
        </div>
        {guide.medicalNotes.map((note, idx) => (
          <p key={idx}>• {note}</p>
        ))}
      </div>
    </div>
  );
};
