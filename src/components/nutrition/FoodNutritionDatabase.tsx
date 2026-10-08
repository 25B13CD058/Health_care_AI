import React, { useState } from 'react';
import { 
  Search, Filter, Info, ChevronRight, Check, X, Shield, Sparkles, Tag, Utensils, Heart 
} from 'lucide-react';
import { FOOD_DATABASE } from '../../data/nutritionData';
import { FoodCategory, FoodItem, DietaryPreference, HealthConditionType } from '../../types';

const CATEGORY_LABELS: Record<FoodCategory, string> = {
  pulses: 'Pulses & Dal',
  vegetables: 'Vegetables & Greens',
  fruits: 'Fruits',
  grains: 'Grains & Millets',
  dairy: 'Dairy & Plant Milk',
  nuts: 'Nuts & Seeds',
  eggs: 'Eggs',
  meat: 'Lean Meat',
  fish: 'Fish & Seafood',
  seeds: 'Seeds',
  fats: 'Healthy Oils & Fats',
  beverages: 'Teas & Beverages'
};

export const FoodNutritionDatabase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [indianOnly, setIndianOnly] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [selectedFoodModal, setSelectedFoodModal] = useState<FoodItem | null>(null);

  const filteredFoods = FOOD_DATABASE.filter(food => {
    // Search filter
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.vitaminsAndMinerals.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;

    // Indian origin filter
    const matchesIndian = !indianOnly || food.isIndian;

    // Dietary filter
    const matchesDiet = dietaryFilter === 'all' || food.dietaryCategory === dietaryFilter;

    // Condition filter
    const matchesCondition = conditionFilter === 'all' || food.suitableConditions.includes(conditionFilter as HealthConditionType);

    return matchesSearch && matchesCategory && matchesIndian && matchesDiet && matchesCondition;
  });

  return (
    <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-700 p-6 shadow-sm mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Searchable Food & Nutrition Database</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
              50+ Indian & Global Foods
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive nutrient profiling across 12 categories, with health condition suitability tags
          </p>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search food item or nutrient (e.g. Palak, Iron, Selenium)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Food Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => (
                <option key={catKey} value={catKey}>{label}</option>
              ))}
            </select>
          </div>

          {/* Condition Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Suitable for Any Condition</option>
              <option value="thyroid">Suitable for Thyroid</option>
              <option value="diabetes">Suitable for Diabetes</option>
              <option value="pcos">Suitable for PCOS</option>
              <option value="high_bp">Suitable for High BP</option>
              <option value="high_cholesterol">Suitable for Cholesterol</option>
              <option value="anemia">Suitable for Anemia</option>
              <option value="fatty_liver">Suitable for Fatty Liver</option>
              <option value="heart_health">Suitable for Heart Care</option>
            </select>
          </div>
        </div>

        {/* Secondary Toggles */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={indianOnly}
              onChange={(e) => setIndianOnly(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
            <span>🇮🇳 Indian Foods Only</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">Diet:</span>
            <select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-xs"
            >
              <option value="all">All Types</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non_vegetarian">Non-Vegetarian</option>
            </select>
          </div>

          <div className="text-slate-400 ml-auto font-mono">
            Showing {filteredFoods.length} items
          </div>
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map(food => (
          <div
            key={food.id}
            onClick={() => setSelectedFoodModal(food)}
            className="p-4 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 hover:border-teal-400 dark:hover:border-teal-600 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    {food.name}
                    {food.isIndian && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.5 rounded font-bold">
                        🇮🇳
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {CATEGORY_LABELS[food.category]} • {food.servingSize}
                  </span>
                </div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-1 rounded-lg">
                  {food.calories} kcal
                </span>
              </div>

              {/* Macro Bar */}
              <div className="grid grid-cols-4 gap-1 text-center bg-white dark:bg-navy-900 p-2 rounded-lg border border-slate-200/60 dark:border-navy-800 my-3 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Protein</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{food.protein}g</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Carbs</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{food.carbs}g</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Fat</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{food.fat}g</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Fiber</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{food.fiber}g</span>
                </div>
              </div>

              {/* Suitable Badges */}
              <div className="flex flex-wrap gap-1 mt-2">
                {food.suitableConditions.map(c => (
                  <span key={c} className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                    ✓ {c}
                  </span>
                ))}
                {food.moderationConditions.map(c => (
                  <span key={c} className="text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md">
                    ⚠️ limit {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-navy-800 flex items-center justify-between text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
              <span>View Micro-Nutrients & Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal detail */}
      {selectedFoodModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 w-full max-w-lg rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-navy-700 relative">
            <button
              onClick={() => setSelectedFoodModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {selectedFoodModal.name}
              {selectedFoodModal.isIndian && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">🇮🇳 Indian Origin</span>}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Category: {CATEGORY_LABELS[selectedFoodModal.category]} | Standard Serving: {selectedFoodModal.servingSize}
            </p>

            <div className="grid grid-cols-4 gap-2 my-5 text-center bg-slate-50 dark:bg-navy-950 p-3 rounded-xl border border-slate-200 dark:border-navy-800">
              <div>
                <span className="text-slate-400 text-xs block">Energy</span>
                <span className="font-bold text-teal-600 text-sm">{selectedFoodModal.calories} kcal</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Protein</span>
                <span className="font-bold text-indigo-600 text-sm">{selectedFoodModal.protein} g</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Carbs</span>
                <span className="font-bold text-amber-600 text-sm">{selectedFoodModal.carbs} g</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block">Fiber</span>
                <span className="font-bold text-emerald-600 text-sm">{selectedFoodModal.fiber} g</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Key Micronutrients & Vitamins:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFoodModal.vitaminsAndMinerals.map((v, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Suitable Health Conditions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFoodModal.suitableConditions.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              {selectedFoodModal.moderationConditions.length > 0 && (
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">Limit / Exercise Moderation For:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFoodModal.moderationConditions.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-lg font-semibold">
                        ⚠️ {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedFoodModal(null)}
              className="w-full mt-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-xs rounded-xl"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
