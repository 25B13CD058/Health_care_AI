import React from 'react';
import { 
  FileText, Activity, AlertTriangle, Stethoscope, Building2, ClipboardList, CheckCircle2 
} from 'lucide-react';
import { CarePathStep } from '../types';

interface AICarePathTrackerProps {
  currentStep: CarePathStep;
  onSelectStep?: (step: CarePathStep) => void;
}

export const AICarePathTracker: React.FC<AICarePathTrackerProps> = ({ currentStep, onSelectStep }) => {
  const steps: { id: CarePathStep; label: string; sublabel: string; icon: React.ReactNode }[] = [
    { 
      id: 'symptoms', 
      label: '1. Symptoms', 
      sublabel: 'Describe Complaint', 
      icon: <FileText className="w-4 h-4" /> 
    },
    { 
      id: 'analysis', 
      label: '2. AI Analysis', 
      sublabel: 'Taxonomy Match', 
      icon: <Activity className="w-4 h-4" /> 
    },
    { 
      id: 'urgency', 
      label: '3. Urgency', 
      sublabel: 'Safety Triage', 
      icon: <AlertTriangle className="w-4 h-4" /> 
    },
    { 
      id: 'specialist', 
      label: '4. Specialist', 
      sublabel: 'Doctor Match', 
      icon: <Stethoscope className="w-4 h-4" /> 
    },
    { 
      id: 'hospital', 
      label: '5. Facility', 
      sublabel: 'Hospital & ER', 
      icon: <Building2 className="w-4 h-4" /> 
    },
    { 
      id: 'preparation', 
      label: '6. Visit Prep', 
      sublabel: 'Doctor Summary', 
      icon: <ClipboardList className="w-4 h-4" /> 
    }
  ];

  const getStepIndex = (stepId: CarePathStep) => steps.findIndex(s => s.id === stepId);
  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="bg-navy-900 border border-teal-500/30 p-4 rounded-3xl shadow-xl overflow-x-auto">
      <div className="flex items-center justify-between min-w-[700px] relative px-2">
        {/* Connecting Background Line */}
        <div className="absolute top-5 left-10 right-10 h-0.5 bg-navy-800 -z-0" />
        <div 
          className="absolute top-5 left-10 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500 -z-0"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 90}%` }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep && onSelectStep(step.id)}
              disabled={!onSelectStep}
              className={`flex flex-col items-center gap-1.5 relative z-10 transition group text-center cursor-pointer disabled:cursor-default focus:outline-none`}
            >
              {/* Step Icon Badge */}
              <div 
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition border shadow-md ${
                  isCurrent 
                    ? 'bg-teal-500 text-navy-950 border-teal-300 ring-4 ring-teal-500/20 scale-110' 
                    : isCompleted 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                    : 'bg-navy-950 text-slate-500 border-navy-800 group-hover:border-slate-600'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : step.icon}
              </div>

              {/* Label & Sublabel */}
              <div>
                <span className={`block text-[11px] font-extrabold transition ${
                  isCurrent ? 'text-teal-300 font-black' : isCompleted ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
                <span className="block text-[9px] text-slate-400 font-medium">
                  {step.sublabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
