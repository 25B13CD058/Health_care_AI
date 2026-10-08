import React from 'react';
import { AlertTriangle, Info, ShieldAlert, Heart, Activity } from 'lucide-react';
import { UserHealthProfile } from '../../types';

interface SmartHealthWarningsProps {
  profile: UserHealthProfile;
}

export const SmartHealthWarnings: React.FC<SmartHealthWarningsProps> = ({ profile }) => {
  const heightM = profile.heightCm / 100;
  const bmi = profile.heightCm > 0 ? profile.weightKg / (heightM * heightM) : 0;

  const warnings: { id: string; type: 'warning' | 'info' | 'caution'; title: string; text: string; icon: React.ReactNode }[] = [];

  if (profile.hasKidneyDisease) {
    warnings.push({
      id: 'kidney',
      type: 'caution',
      title: 'Kidney Health Precaution',
      text: 'High protein diets, potassium, and phosphorus intake must be strictly monitored and prescribed by a Nephrologist or Renal Dietitian.',
      icon: <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
    });
  }

  if (profile.healthConditions.includes('thyroid')) {
    warnings.push({
      id: 'thyroid',
      type: 'info',
      title: 'Thyroid Medication Timing Notice',
      text: 'Take Levothyroxine on an empty stomach with plain water at least 30–60 minutes before breakfast. Avoid taking Calcium, Iron, Soy, or high-fiber foods within 4 hours of your dose.',
      icon: <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
    });
  }

  if (profile.healthConditions.includes('high_bp')) {
    warnings.push({
      id: 'hypertension',
      type: 'warning',
      title: 'Sodium Intake Restriction',
      text: 'Keep daily sodium intake below 2,000 mg (approx 1 tsp total salt). Avoid packaged snacks, instant soups, and pickles.',
      icon: <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
    });
  }

  if (bmi > 30) {
    warnings.push({
      id: 'high-bmi',
      type: 'warning',
      title: 'High BMI Clinical Advisory',
      text: 'Your current BMI indicates Class 1+ Obesity. Consult a physician before beginning high-impact or vigorous exertion routines.',
      icon: <Activity className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
    });
  } else if (bmi > 0 && bmi < 18.5) {
    warnings.push({
      id: 'low-bmi',
      type: 'warning',
      title: 'Underweight Clinical Advisory',
      text: 'Your BMI is below 18.5. Focus on dense, nutrient-rich whole foods and consult a doctor to evaluate for underlying metabolic conditions.',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
    });
  }

  if (warnings.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {warnings.map((w) => (
        <div
          key={w.id}
          className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            w.type === 'caution'
              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              : w.type === 'warning'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
          }`}
        >
          {w.icon}
          <div>
            <h4 className="font-semibold text-sm mb-1">{w.title}</h4>
            <p className="text-xs leading-relaxed opacity-90">{w.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
