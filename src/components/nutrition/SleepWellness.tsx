import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Wind, Play, Pause, RotateCcw, CheckCircle2, Star, Info, Sparkles 
} from 'lucide-react';
import { UserHealthProfile } from '../../types';
import { useApp } from '../../context/AppContext';

interface SleepWellnessProps {
  profile: UserHealthProfile;
}

export const SleepWellness: React.FC<SleepWellnessProps> = ({ profile }) => {
  const { logNutritionProgress } = useApp();

  const [sleepInput, setSleepInput] = useState<number>(profile.loggedSleepHours);
  const [isLogged, setIsLogged] = useState(false);

  // Guided Breathing State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathingTimer, setBreathingTimer] = useState(4);

  const targetSleep = profile.targetSleepHours;

  const handleSaveSleep = () => {
    logNutritionProgress({ sleepHours: sleepInput });
    setIsLogged(true);
    setTimeout(() => setIsLogged(false), 2500);
  };

  // Breathing Animation Cycle (Box Breathing: 4s - 4s - 4s - 4s)
  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathingTimer(prev => {
        if (prev > 1) return prev - 1;

        // Advance Phase
        setBreathingPhase(current => {
          if (current === 'Inhale') return 'Hold';
          if (current === 'Hold') return 'Exhale';
          if (current === 'Exhale') return 'Rest';
          return 'Inhale';
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sleep & Mindful Relaxation Dashboard</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Circadian rhythm tracking & parasympathetic relaxation exercises</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400">Target Sleep</span>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {targetSleep} Hours / Night
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Sleep Tracker */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-navy-950 p-5 rounded-2xl border border-slate-200 dark:border-navy-800 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Last Night's Sleep</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{sleepInput} Hours</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              step="0.5"
              min="0"
              max="16"
              value={sleepInput}
              onChange={(e) => setSleepInput(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSaveSleep}
              className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1.5"
            >
              {isLogged ? <CheckCircle2 className="w-4 h-4" /> : 'Log Sleep'}
            </button>
          </div>

          <div className="p-3 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>Sleep Hygiene Tip:</strong> Keep room temperature between 18–21°C. Turn off electronic screens 60 minutes before bed to support natural melatonin production.
          </div>
        </div>

        {/* Guided Breathing Box */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-900 via-navy-900 to-slate-900 text-white p-5 rounded-2xl border border-indigo-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-sm">4-4-4 Box Breathing Relaxation</h4>
            </div>
            <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
              Stress Relief
            </span>
          </div>

          {/* Interactive Circle */}
          <div className="my-6 text-center space-y-2">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full border-4 border-indigo-400/40 transition-all duration-1000 ${
                  isBreathingActive && (breathingPhase === 'Inhale' ? 'scale-110 border-indigo-400 bg-indigo-500/20' : 'scale-95')
                }`}
              />
              <div className="text-center z-10">
                <div className="text-sm font-bold text-indigo-200">{breathingPhase}</div>
                <div className="text-3xl font-extrabold text-white font-mono mt-0.5">{breathingTimer}s</div>
              </div>
            </div>
            <p className="text-xs text-indigo-200/80">
              {breathingPhase === 'Inhale' && 'Breathe in slowly through your nose...'}
              {breathingPhase === 'Hold' && 'Gently hold your breath...'}
              {breathingPhase === 'Exhale' && 'Exhale slowly through your mouth...'}
              {breathingPhase === 'Rest' && 'Pause calmly before next cycle...'}
            </p>
          </div>

          <button
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isBreathingActive ? (
              <>
                <Pause className="w-4 h-4" /> Pause Breathing Exercise
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Start Guided Box Breathing
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
