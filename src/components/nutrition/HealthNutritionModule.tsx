import React, { useState } from 'react';
import { 
  HeartPulse, BookOpen, Database, Sparkles, Activity, Droplets, TrendingUp, User, ShieldAlert 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

import { HealthWellnessDashboard } from './HealthWellnessDashboard';
import { ConditionFoodGuide } from './ConditionFoodGuide';
import { FoodNutritionDatabase } from './FoodNutritionDatabase';
import { AIMealAssistant } from './AIMealAssistant';
import { DailyNutritionDashboard } from './DailyNutritionDashboard';
import { BMICalculator } from './BMICalculator';
import { ProteinGuidance } from './ProteinGuidance';
import { HydrationTracker } from './HydrationTracker';
import { FitnessActivity } from './FitnessActivity';
import { SleepWellness } from './SleepWellness';
import { ProgressTracker } from './ProgressTracker';
import { HealthConditionType } from '../../types';

export const HealthNutritionModule: React.FC = () => {
  const { userHealthProfile } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<string>('dashboard');
  const [selectedGuideCondition, setSelectedGuideCondition] = useState<HealthConditionType>('thyroid');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-navy-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-500 text-white rounded-2xl shadow-md">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Health, Nutrition & Fitness
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Evidence-based food guides, allergy-safe meal assistant & metabolic health tracking
              </p>
            </div>
          </div>
        </div>

        {/* Action Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 12 Condition Guides Active
          </span>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-navy-800 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'dashboard'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <HeartPulse className="w-4 h-4" /> Overview Dashboard
        </button>

        <button
          onClick={() => setActiveSubTab('guides')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'guides'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 12 Condition Guides
        </button>

        <button
          onClick={() => setActiveSubTab('database')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'database'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <Database className="w-4 h-4" /> Food Database
        </button>

        <button
          onClick={() => setActiveSubTab('meal_assistant')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'meal_assistant'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <Sparkles className="w-4 h-4" /> AI Meal Assistant
        </button>

        <button
          onClick={() => setActiveSubTab('daily_targets')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'daily_targets'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <Activity className="w-4 h-4" /> 13 Daily Nutrients
        </button>

        <button
          onClick={() => setActiveSubTab('hydration')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'hydration'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <Droplets className="w-4 h-4" /> Hydration & Fitness
        </button>

        <button
          onClick={() => setActiveSubTab('progress')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'progress'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Progress Tracking
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeSubTab === 'profile'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800'
          }`}
        >
          <User className="w-4 h-4" /> BMI & Profile
        </button>
      </div>

      {/* Main Tab Content Display */}
      {activeSubTab === 'dashboard' && (
        <HealthWellnessDashboard
          onNavigateTab={(tab) => setActiveSubTab(tab)}
          onSelectConditionGuide={(condId) => setSelectedGuideCondition(condId as HealthConditionType)}
        />
      )}

      {activeSubTab === 'guides' && (
        <ConditionFoodGuide initialCondition={selectedGuideCondition} />
      )}

      {activeSubTab === 'database' && (
        <FoodNutritionDatabase />
      )}

      {activeSubTab === 'meal_assistant' && (
        <AIMealAssistant profile={userHealthProfile} />
      )}

      {activeSubTab === 'daily_targets' && (
        <DailyNutritionDashboard />
      )}

      {activeSubTab === 'hydration' && (
        <div className="space-y-8">
          <HydrationTracker profile={userHealthProfile} />
          <FitnessActivity profile={userHealthProfile} />
          <SleepWellness profile={userHealthProfile} />
        </div>
      )}

      {activeSubTab === 'progress' && (
        <ProgressTracker />
      )}

      {activeSubTab === 'profile' && (
        <div className="space-y-8">
          <BMICalculator profile={userHealthProfile} />
          <ProteinGuidance profile={userHealthProfile} />
        </div>
      )}

      {/* Medical Disclaimer Footer */}
      <div className="p-4 bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-2xl text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
          <ShieldAlert className="w-4 h-4 text-amber-500" /> Mandatory Clinical Disclaimer
        </div>
        <p className="leading-relaxed">
          The Health, Nutrition & Fitness module provides educational food guides, metabolic calculations (Mifflin-St Jeor), and nutrient tracking. It is strictly non-diagnostic and does not replace medical advice from a Registered Dietitian, Endocrinologist, or Nephrologist.
        </p>
      </div>
    </div>
  );
};
