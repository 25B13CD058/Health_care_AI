import React, { useState } from 'react';
import { Calculator, Scale, Activity, Target, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { UserHealthProfile, ActivityLevel, HealthGoal } from '../../types';
import { useApp } from '../../context/AppContext';

interface BMICalculatorProps {
  profile: UserHealthProfile;
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({ profile }) => {
  const { updateHealthProfile } = useApp();

  const [age, setAge] = useState(profile.age);
  const [sex, setSex] = useState(profile.sex);
  const [heightCm, setHeightCm] = useState(profile.heightCm);
  const [weightKg, setWeightKg] = useState(profile.weightKg);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile.activityLevel);
  const [goal, setGoal] = useState<HealthGoal>(profile.goal);
  const [hasKidneyDisease, setHasKidneyDisease] = useState(profile.hasKidneyDisease);

  const [isSaved, setIsSaved] = useState(false);

  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;

  let bmiCategory = 'Normal';
  let categoryColor = 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';

  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    categoryColor = 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiCategory = 'Normal Weight';
    categoryColor = 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiCategory = 'Overweight';
    categoryColor = 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800';
  } else {
    bmiCategory = 'Obesity Class 1+';
    categoryColor = 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  }

  const minHealthyWeight = heightM > 0 ? Number((18.5 * heightM * heightM).toFixed(1)) : 0;
  const maxHealthyWeight = heightM > 0 ? Number((24.9 * heightM * heightM).toFixed(1)) : 0;

  // Calculate Caloric Needs (Mifflin-St Jeor)
  const bmr = sex === 'male'
    ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
    : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;

  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.9
  };

  const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));

  let targetCalories = tdee;
  if (goal === 'lose') targetCalories = tdee - 400;
  if (goal === 'gain') targetCalories = tdee + 400;

  const handleSave = async () => {
    // calculate daily protein target based on body weight & activity & kidney disease
    let proteinFactor = 1.0;
    if (activityLevel === 'moderate') proteinFactor = 1.2;
    if (activityLevel === 'very_active') proteinFactor = 1.5;
    if (goal === 'gain') proteinFactor = 1.6;

    if (hasKidneyDisease) {
      proteinFactor = 0.8; // Restricted for renal care unless advised by doctor
    }

    const calculatedProteinTarget = Math.round(weightKg * proteinFactor);

    await updateHealthProfile({
      age,
      sex,
      heightCm,
      weightKg,
      activityLevel,
      goal,
      hasKidneyDisease,
      dailyProteinTargetG: calculatedProteinTarget
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">BMI & Calorie Estimator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculated based on Mifflin-St Jeor clinical formulas</p>
          </div>
        </div>
        <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold ${categoryColor}`}>
          {bmiCategory} ({bmi} BMI)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Age (Years)</label>
              <input
                type="number"
                min="10"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Biological Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as 'female' | 'male')}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
              <input
                type="number"
                min="100"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                min="30"
                max="300"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Physical Activity</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="sedentary">Sedentary (Desk Job)</option>
                <option value="light">Lightly Active (1-3 days/wk)</option>
                <option value="moderate">Moderately Active (3-5 days/wk)</option>
                <option value="very_active">Very Active (Physical Labor / Athletic)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as HealthGoal)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="maintain">Maintain Weight</option>
                <option value="lose">Weight Loss (-0.5kg/wk)</option>
                <option value="gain">Weight Gain & Muscle (+0.5kg/wk)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer p-3 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl">
              <input
                type="checkbox"
                checked={hasKidneyDisease}
                onChange={(e) => setHasKidneyDisease(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
              <span className="text-xs font-semibold text-rose-900 dark:text-rose-300">
                I have Chronic Kidney Disease (CKD) or Kidney Impairment (Applies protein restriction warnings)
              </span>
            </label>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully
              </>
            ) : (
              'Save & Update Targets'
            )}
          </button>
        </div>

        {/* Results & Gauges */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-navy-950 rounded-xl p-5 border border-slate-200 dark:border-navy-800 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Body Mass Index (BMI)</div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{bmi}</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">kg/m²</span>
            </div>

            {/* Gauge bar */}
            <div className="mt-3 relative">
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-navy-800 overflow-hidden flex">
                <div className="w-[18.5%] bg-amber-400" title="Underweight (<18.5)"></div>
                <div className="w-[25%] bg-emerald-500" title="Normal (18.5-24.9)"></div>
                <div className="w-[20%] bg-orange-400" title="Overweight (25-29.9)"></div>
                <div className="w-[36.5%] bg-rose-500" title="Obese (>=30)"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>15</span>
                <span>18.5</span>
                <span>25.0</span>
                <span>30.0</span>
                <span>40</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-navy-800">
            <div className="p-3 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Healthy Weight Range</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {minHealthyWeight} – {maxHealthyWeight} kg
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Target Daily Energy</div>
              <div className="text-sm font-bold text-teal-600 dark:text-teal-400 mt-1">
                {targetCalories} kcal / day
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl text-[11px] text-amber-900 dark:text-amber-300 leading-relaxed">
            <strong>Clinical Disclaimer:</strong> BMI is a standard population screening metric and does not distinguish between muscle mass and fat tissue. Consult your healthcare provider for individual assessment.
          </div>
        </div>
      </div>
    </div>
  );
};
