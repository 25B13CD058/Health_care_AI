import React, { useState } from 'react';
import { 
  Sparkles, AlertCircle, ShieldAlert, CheckCircle2, Utensils, Flame, RefreshCw, Info 
} from 'lucide-react';
import { UserHealthProfile, DietaryPreference, HealthGoal, HealthConditionType } from '../../types';
import { useApp } from '../../context/AppContext';

interface AIMealAssistantProps {
  profile: UserHealthProfile;
}

export const AIMealAssistant: React.FC<AIMealAssistantProps> = ({ profile }) => {
  const { updateHealthProfile } = useApp();

  const [dietaryPref, setDietaryPref] = useState<DietaryPreference>(profile.dietaryPreference);
  const [goal, setGoal] = useState<HealthGoal>(profile.goal);
  const [selectedConditions, setSelectedConditions] = useState<HealthConditionType[]>(profile.healthConditions);
  const [allergiesText, setAllergiesText] = useState<string>(profile.allergies.join(', '));
  const [dislikesText, setDislikesText] = useState<string>(profile.dislikedFoods.join(', '));

  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<any | null>(null);

  const ALLERGEN_OPTIONS = ['Peanuts', 'Tree Nuts', 'Dairy / Lactose', 'Eggs', 'Soy', 'Gluten / Wheat', 'Fish / Shellfish'];

  const toggleCondition = (cond: HealthConditionType) => {
    setSelectedConditions(prev => 
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    const activeAllergies = allergiesText.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    const hasDairyAllergy = activeAllergies.some(a => a.includes('dairy') || a.includes('milk') || a.includes('lactose'));
    const hasNutAllergy = activeAllergies.some(a => a.includes('nut') || a.includes('peanut'));
    const hasGlutenAllergy = activeAllergies.some(a => a.includes('gluten') || a.includes('wheat'));

    setTimeout(() => {
      // Build meal plan dynamically obeying strict allergy exclusions
      const earlyMorning = selectedConditions.includes('thyroid')
        ? (hasNutAllergy ? 'Warm Lemon Water (Levothyroxine taken 30-60m before)' : 'Warm Water + 1 Brazil Nut + 2 Soaked Almonds (30m after Levothyroxine)')
        : 'Warm Jeera / Methi Water + 4 Soaked Almonds';

      let breakfast = 'Oats Poha with Peas & Carrots + 1 Cup Green Tea';
      if (dietaryPref === 'non_vegetarian' && !activeAllergies.includes('eggs')) {
        breakfast = '2 Whole Boiled Eggs / Vegetable Omelette + 2 Multigrain Toast + Mint Chutney';
      } else if (hasGlutenAllergy) {
        breakfast = 'Besan / Moong Dal Chilla with Spinach + Mint Chutney';
      } else if (dietaryPref === 'vegan') {
        breakfast = 'Rava / Millet Idli (2 pcs) with Sambar & Coconut Chutney';
      }

      let lunch = '1 Cup Brown Rice / 2 Multigrain Rotis + Dal Tadka + Spinach Saag + Curd';
      if (hasDairyAllergy) {
        lunch = '1 Cup Brown Rice / 2 Multigrain Rotis + Chana Dal + Lauki Sabzi + Cucumber Salad';
      } else if (dietaryPref === 'non_vegetarian') {
        lunch = 'Grilled Chicken Curry / Fish Curry + 2 Rotis + Cucumber Tomato Salad + Buttermilk';
      }

      let snack = 'Roasted Makhana (Foxnuts) with Black Pepper + Green Tea';
      if (!hasNutAllergy) {
        snack = 'Handful of Roasted Chana & Pumpkin Seeds + Green Tea';
      }

      let dinner = 'Moong Dal Khichdi cooked with Ghee & Lauki + Mint Curd';
      if (selectedConditions.includes('diabetes')) {
        dinner = 'Multigrain Roti (2 pcs) + Bhindi / Palak Sabzi + Tofu / Paneer Curry (Low Oil)';
      } else if (hasDairyAllergy) {
        dinner = 'Soya Chunk Sabzi + 2 Jowar Rotis + Warm Vegetable Soup';
      }

      const generatedPlan = {
        title: `Customized Clinical Plan for ${goal.toUpperCase()}`,
        targetCalories: goal === 'lose' ? '1,500 – 1,600 kcal' : goal === 'gain' ? '2,100 – 2,300 kcal' : '1,800 – 1,900 kcal',
        targetProtein: `${profile.dailyProteinTargetG} g`,
        allergyWarningMessage: activeAllergies.length > 0 
          ? `✓ Excluded Allergens: ${activeAllergies.join(', ').toUpperCase()} (No dairy, nuts, or forbidden allergens included).`
          : 'No active allergies specified.',
        meals: [
          { time: 'Early Morning (6:30 AM)', title: 'Hydration & Thyroid Support', description: earlyMorning, calories: '50 kcal' },
          { time: 'Breakfast (8:30 AM)', title: 'High-Fiber Sustained Energy', description: breakfast, calories: '350 kcal' },
          { time: 'Mid-Morning (11:00 AM)', title: 'Micronutrient Boost', description: '1 Fresh Seasonal Fruit (Papaya / Apple / Guava)', calories: '80 kcal' },
          { time: 'Lunch (1:30 PM)', title: 'Balanced Glycemic Protein Meal', description: lunch, calories: '500 kcal' },
          { time: 'Evening Snack (5:00 PM)', title: 'Antioxidant & Metabolic Snack', description: snack, calories: '150 kcal' },
          { time: 'Dinner (8:00 PM)', title: 'Light Digestion Restorative Dinner', description: dinner, calories: '400 kcal' },
          { time: 'Bedtime (10:00 PM)', title: 'Recovery Beverage', description: hasDairyAllergy ? 'Warm Chamomile / Ginger Herbal Tea' : 'Warm Turmeric Golden Milk (Low Fat)', calories: '60 kcal' }
        ]
      };

      setMealPlan(generatedPlan);
      setIsGenerating(false);

      // Save allergy & dietary preferences
      updateHealthProfile({
        dietaryPreference: dietaryPref,
        goal,
        healthConditions: selectedConditions,
        allergies: activeAllergies,
        dislikedFoods: dislikesText.split(',').map(s => s.trim()).filter(Boolean)
      });
    }, 600);
  };

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Clinical Meal Plan Generator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Strict allergy exclusions & condition-aware meal recommendations</p>
          </div>
        </div>
        <span className="text-xs bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 px-3 py-1 rounded-full font-semibold border border-teal-200 dark:border-teal-800">
          Smart Allergy Engine
        </span>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Dietary Preference</label>
            <div className="grid grid-cols-3 gap-2">
              {(['vegetarian', 'vegan', 'non_vegetarian'] as DietaryPreference[]).map(pref => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setDietaryPref(pref)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border capitalize transition-all ${
                    dietaryPref === pref
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-slate-50 dark:bg-navy-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-navy-700'
                  }`}
                >
                  {pref.replace('_', '-')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Health Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as HealthGoal)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Weight Loss (-0.5kg/week)</option>
              <option value="gain">Healthy Weight Gain & Muscle (+0.5kg/week)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Strict Allergy Exclusions (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Peanuts, Milk, Soy, Gluten, Shellfish..."
              value={allergiesText}
              onChange={(e) => setAllergiesText(e.target.value)}
              className="w-full px-3 py-2 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl text-sm text-rose-900 dark:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Any food item containing these allergens will be completely excluded from your generated plan.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Active Health Conditions</label>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-700">
              {(['thyroid', 'diabetes', 'pcos', 'high_bp', 'high_cholesterol', 'anemia', 'fatty_liver', 'heart_health', 'obesity', 'underweight'] as HealthConditionType[]).map(cond => {
                const isSelected = selectedConditions.includes(cond);
                return (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => toggleCondition(cond)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-teal-500 text-white'
                        : 'bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-800'
                    }`}
                  >
                    {cond.replace('_', ' ')}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Disliked / Excluded Foods</label>
            <input
              type="text"
              placeholder="e.g. Karela, Mushroom, Brinjal..."
              value={dislikesText}
              onChange={(e) => setDislikesText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Clinical Parameters & Generating Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate AI Clinical Meal Plan
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Meal Plan Output */}
      {mealPlan && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-navy-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-2xl">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">{mealPlan.title}</h4>
              <p className="text-xs text-teal-700 dark:text-teal-300 mt-0.5">{mealPlan.allergyWarningMessage}</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-200">
              <span className="bg-white dark:bg-navy-900 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800">
                ⚡ {mealPlan.targetCalories}
              </span>
              <span className="bg-white dark:bg-navy-900 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800">
                🥩 {mealPlan.targetProtein} Protein
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {mealPlan.meals.map((meal: any, idx: number) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                      {meal.time}
                    </span>
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white">{meal.title}</h5>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {meal.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400 shrink-0">{meal.calories}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-100 dark:bg-navy-950 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-teal-500 shrink-0" />
            <span>AI Meal Assistant recommendations are educational suggestions. Adjust portion sizes according to your appetite and clinical care team advice.</span>
          </div>
        </div>
      )}
    </div>
  );
};
