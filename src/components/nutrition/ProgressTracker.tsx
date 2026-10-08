import React, { useState } from 'react';
import { 
  TrendingUp, Calendar, Scale, Droplets, Drumstick, Footprints, Moon, Award, Plus, CheckCircle2 
} from 'lucide-react';
import { NutritionLogEntry } from '../../types';
import { useApp } from '../../context/AppContext';

export const ProgressTracker: React.FC = () => {
  const { nutritionLogs, logNutritionProgress, userHealthProfile } = useApp();

  const [showLogModal, setShowLogModal] = useState(false);

  const [weight, setWeight] = useState(userHealthProfile.weightKg);
  const [water, setWater] = useState(userHealthProfile.loggedWaterMl);
  const [protein, setProtein] = useState(userHealthProfile.loggedProteinG);
  const [steps, setSteps] = useState(userHealthProfile.loggedSteps);
  const [sleep, setSleep] = useState(userHealthProfile.loggedSleepHours);

  const latestLog = nutritionLogs[nutritionLogs.length - 1] || null;
  const firstLog = nutritionLogs[0] || null;

  const weightChange = (firstLog?.weightKg !== undefined && latestLog?.weightKg !== undefined) 
    ? Number((latestLog.weightKg - firstLog.weightKg).toFixed(1)) 
    : 0;
  const avgSteps = Math.round(nutritionLogs.reduce((acc, l) => acc + (l.steps || 0), 0) / (nutritionLogs.length || 1));
  const avgWater = Math.round(nutritionLogs.reduce((acc, l) => acc + (l.waterMl || 0), 0) / (nutritionLogs.length || 1));
  const avgAdherence = Math.round(nutritionLogs.reduce((acc, l) => acc + (l.adherenceScore || 0), 0) / (nutritionLogs.length || 1));

  const handleSaveLog = async () => {
    await logNutritionProgress({
      weightKg: weight,
      waterMl: water,
      proteinG: protein,
      steps: steps,
      sleepHours: sleep,
      adherenceScore: 92
    });
    setShowLogModal(false);
  };

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Progress & Trend Tracking</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Historical logs of body weight, hydration, steps & adherence</p>
          </div>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" /> Log Today's Metrics
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Scale className="w-4 h-4 text-teal-500" /> Weight Progress
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            {latestLog ? `${latestLog.weightKg} kg` : '--'}
          </div>
          <div className="text-[11px] font-semibold mt-0.5">
            {weightChange < 0 ? (
              <span className="text-emerald-600">{weightChange} kg (Lost)</span>
            ) : weightChange > 0 ? (
              <span className="text-amber-600">+{weightChange} kg (Gained)</span>
            ) : (
              <span className="text-slate-400">0.0 kg (Maintained)</span>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Droplets className="w-4 h-4 text-cyan-500" /> Avg Daily Water
          </div>
          <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-1">
            {(avgWater / 1000).toFixed(1)} L / day
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">7-Day Rolling Avg</div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Footprints className="w-4 h-4 text-emerald-500" /> Avg Daily Steps
          </div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {avgSteps.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">7-Day Rolling Avg</div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Award className="w-4 h-4 text-amber-500" /> Plan Adherence
          </div>
          <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {avgAdherence}%
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">High Compliance</div>
        </div>
      </div>

      {/* Historical Log Table */}
      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
        Historical Entry Logs
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-navy-950 border-y border-slate-200 dark:border-navy-800 text-slate-500 font-semibold">
              <th className="p-3">Date</th>
              <th className="p-3">Weight (kg)</th>
              <th className="p-3">BMI</th>
              <th className="p-3">Water (ml)</th>
              <th className="p-3">Protein (g)</th>
              <th className="p-3">Steps</th>
              <th className="p-3">Sleep</th>
              <th className="p-3 text-right">Adherence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-navy-800 font-medium text-slate-700 dark:text-slate-300">
            {nutritionLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-navy-950/60 transition-colors">
                <td className="p-3 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-500" /> {log.date}
                </td>
                <td className="p-3">{log.weightKg} kg</td>
                <td className="p-3">{log.bmi}</td>
                <td className="p-3 text-cyan-600 dark:text-cyan-400">{log.waterMl} ml</td>
                <td className="p-3 text-indigo-600 dark:text-indigo-400">{log.proteinG} g</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">{(log.steps || 0).toLocaleString()}</td>
                <td className="p-3">{log.sleepHours} hrs</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    {log.adherenceScore}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 w-full max-w-md rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-navy-700 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Log Today's Health Metrics</h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Body Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Water Intake (ml)</label>
              <input
                type="number"
                step="50"
                value={water}
                onChange={(e) => setWater(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Protein Logged (g)</label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Steps Taken</label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Sleep Hours</label>
                <input
                  type="number"
                  step="0.5"
                  value={sleep}
                  onChange={(e) => setSleep(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-semibold"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowLogModal(false)}
                className="w-1/2 py-2.5 bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLog}
                className="w-1/2 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-xs rounded-xl"
              >
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
