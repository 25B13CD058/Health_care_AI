import React, { useState } from 'react';
import { 
  Activity, Footprints, Heart, ShieldAlert, Plus, CheckCircle2, Flame, Award 
} from 'lucide-react';
import { UserHealthProfile } from '../../types';
import { useApp } from '../../context/AppContext';

interface FitnessActivityProps {
  profile: UserHealthProfile;
}

export const FitnessActivity: React.FC<FitnessActivityProps> = ({ profile }) => {
  const { logNutritionProgress } = useApp();

  const [stepsInput, setStepsInput] = useState<number>(profile.loggedSteps);
  const [isLogged, setIsLogged] = useState(false);

  const targetSteps = profile.targetSteps;
  const stepPercentage = Math.min(100, Math.round((stepsInput / targetSteps) * 100));

  const handleSaveSteps = () => {
    logNutritionProgress({ steps: stepsInput });
    setIsLogged(true);
    setTimeout(() => setIsLogged(false), 2500);
  };

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fitness & Movement Guidance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Condition-adapted physical activity recommendations</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400">Daily Step Goal</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {targetSteps.toLocaleString()} Steps
          </div>
        </div>
      </div>

      {/* Step Logger & Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8 bg-slate-50 dark:bg-navy-950 p-5 rounded-2xl border border-slate-200 dark:border-navy-800">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-emerald-500" /> Daily Step Progress
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {stepsInput.toLocaleString()} / {targetSteps.toLocaleString()} steps ({stepPercentage}%)
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-200 dark:bg-navy-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${stepPercentage}%` }}
            />
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Log Today's Steps</label>
            <input
              type="number"
              value={stepsInput}
              onChange={(e) => setStepsInput(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={handleSaveSteps}
            className="mt-5 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            {isLogged ? <CheckCircle2 className="w-4 h-4" /> : 'Log Steps'}
          </button>
        </div>
      </div>

      {/* Condition-Based Activity Guidance Cards */}
      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
        Tailored Physical Activity Prescriptions
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Heart className="w-4 h-4 text-rose-500" /> Diabetes & Blood Sugar
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            15-minute brisk walk within 30 minutes after meals significantly lowers postprandial glucose spikes via GLUT4 translocation.
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Activity className="w-4 h-4 text-indigo-500" /> Thyroid & Fatigue
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Moderate resistance training + yoga 3-4 days/week stimulates basal metabolic rate without overtaxing adrenal cortisol levels.
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Flame className="w-4 h-4 text-orange-500" /> Hypertension & Heart
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Zone 2 aerobic exercise (walking, cycling, swimming). Avoid heavy maximal weightlifting with breath holding (Valsalva).
          </p>
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Safety Rule:</strong> Always perform a 5-10 minute light warmup and cool-down. Stop exercising immediately and seek medical care if you experience chest tightness, irregular heart palpitations, or shortness of breath.
        </div>
      </div>
    </div>
  );
};
