import { 
  HealthConditionGuide, FoodItem, UserHealthProfile, NutritionLogEntry 
} from '../types';

export const HEALTH_CONDITION_GUIDES: HealthConditionGuide[] = [
  {
    id: 'thyroid',
    title: 'Thyroid Health (Hypo & Hyperthyroidism)',
    iconName: 'Activity',
    shortDescription: 'Guidance on iodine, selenium, zinc, and timing around levothyroxine thyroid medication.',
    subTypesNotes: 'Hypothyroidism (underactive) benefits from adequate iodine and selenium. Hyperthyroidism (overactive) may require limiting excessive iodine intake.',
    medicationInteractionNotice: '⚠️ Levothyroxine timing: Take thyroid medication on an empty stomach with water at least 30–60 minutes before breakfast. Avoid taking calcium or iron supplements, soy, or high-fiber meals within 4 hours of medication.',
    recommendedFoods: [
      { name: 'Brazil Nuts (1-2 daily)', why: 'Rich natural source of selenium, which supports thyroid hormone conversion (T4 to T3).' },
      { name: 'Iodized Salt', why: 'Essential for thyroid hormone production in hypothyroidism (in moderation).' },
      { name: 'Eggs & Poultry', why: 'Provides high-quality protein, tyrosine, selenium, and B-vitamins for metabolic energy.' },
      { name: 'Cooked Vegetables & Spinach', why: 'Cooking cruciferous vegetables reduces goitrogenic activity while retaining nutrients.' },
      { name: 'Pumpkin Seeds & Almonds', why: 'Excellent sources of zinc and magnesium needed for thyroid hormone synthesis.' }
    ],
    foodsToLimit: [
      { name: 'Raw Cruciferous Veggies (in high amounts)', why: 'Raw broccoli, cabbage, and kale contain goitrogens; light cooking neutralizes goitrogens.' },
      { name: 'Excess Soy Products', why: 'Soy isoflavones may interfere with thyroid hormone absorption if consumed near medication time.' },
      { name: 'Highly Processed Bakery Goods', why: 'Refined flour and trans-fats increase systemic inflammation.' }
    ],
    medicalGuidanceFoods: [
      { name: 'High-Dose Iodine / Kelp Supplements', why: 'Excessive kelp or high iodine supplements can trigger thyroid flare-ups; require medical supervision.' },
      { name: 'Gluten (if celiac or Hashimoto\'s co-exists)', why: 'Some patients with autoimmune thyroiditis benefit from gluten evaluation under medical advice.' }
    ],
    nutrientsOfInterest: [
      { name: 'Selenium', role: 'Protects thyroid gland from oxidative stress and assists T4 to T3 conversion.', sources: 'Brazil nuts, sunflower seeds, eggs' },
      { name: 'Iodine', role: 'Required substrate for T3 & T4 thyroid hormone synthesis.', sources: 'Iodized salt, dairy, seafood' },
      { name: 'Zinc', role: 'Supports thyroid hormone receptor function and pituitary signaling.', sources: 'Pumpkin seeds, chickpeas, lentils' }
    ],
    mealIdeas: {
      breakfast: 'Warm Oats Poha cooked with carrots & peas + 1 Brazil nut (30m after medication)',
      lunch: 'Brown Rice / Roti with Dal Tadka, cooked Spinach Saag, and Curd',
      snack: 'Roasted Makhana (Foxnuts) with almonds & green tea',
      dinner: 'Grilled Paneer / Chicken curry with bottle gourd (Lauki) Sabzi and 2 Multigrain Rotis'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Always follow your endocrinologist\'s prescription for thyroid hormone therapy.',
      'Regular blood tests (TSH, Free T3, Free T4) are necessary to assess thyroid dosage adequacy.'
    ]
  },
  {
    id: 'diabetes',
    title: 'Type 2 Diabetes & Blood Sugar Control',
    iconName: 'Droplet',
    shortDescription: 'Focus on low Glycemic Index (GI) complex carbs, dietary fiber, lean protein, and portion awareness.',
    recommendedFoods: [
      { name: 'Pulses & Legumes (Dal, Rajma, Chana)', why: 'High soluble fiber and slow-release complex carbs prevent sharp post-meal glucose spikes.' },
      { name: 'Non-Starchy Vegetables (Bhindi, Palak, Methi, Lauki)', why: 'Extremely low glycemic impact, high micronutrients, and satiety-promoting fiber.' },
      { name: 'Whole Grains (Millets, Barley, Oats, Brown Rice)', why: 'Lower glycemic index than refined white rice or maida.' },
      { name: 'Nuts & Seeds (Walnuts, Chia, Flaxseeds)', why: 'Healthy fats and protein slow down gastric emptying and stabilize blood sugar.' },
      { name: 'Curd & Greek Yogurt', why: 'Low GI protein source that improves gut microbiome and insulin sensitivity.' }
    ],
    foodsToLimit: [
      { name: 'Sugary Beverages & Packaged Juices', why: 'Rapid absorption of free sugars causes sudden glycemic spikes without satiety.' },
      { name: 'Refined Maida, Bakery Products & Sweets', why: 'High GI refined carbohydrates lack dietary fiber.' },
      { name: 'Deep-Fried Snacks (Samosa, Pakora)', why: 'High saturated fats impair insulin signaling when consumed frequently.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Concentrated Fruit Juices & Dried Fruits', why: 'Higher sugar density per serving; eat whole fruits with skin under portion guidance.' },
      { name: 'Over-the-Counter Diabetic Supplements', why: 'Consult your physician or dietitian before taking herbal blood sugar remedies.' }
    ],
    nutrientsOfInterest: [
      { name: 'Dietary Fiber', role: 'Delays glucose absorption and improves insulin sensitivity.', sources: 'Legumes, oats, vegetables, seeds' },
      { name: 'Chromium & Magnesium', role: 'Co-factors in insulin receptor signaling and glucose metabolism.', sources: 'Whole grains, nuts, leafy greens' }
    ],
    mealIdeas: {
      breakfast: 'Moong Dal Chilla stuffed with Paneer & Spinach + Mint Chutney',
      lunch: 'Jowar / Bajra Roti with Mixed Vegetable Sabzi, Chana Dal, and Cucumber Salad',
      snack: 'Handful of roasted Chana (Gram) & 2 Walnuts',
      dinner: 'Lauki Sabzi with Grilled Chicken/Fish or Tofu + Small portion of Quinoa or Brown Rice'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Monitor blood glucose levels regularly as advised by your doctor.',
      'Do not stop or alter insulin or oral hypoglycemic medications without medical supervision.'
    ]
  },
  {
    id: 'pcos',
    title: 'PCOS & Hormone Balance',
    iconName: 'HeartPulse',
    shortDescription: 'Support insulin sensitivity, hormone regulation, and anti-inflammatory nutrition.',
    recommendedFoods: [
      { name: 'Spearmint & Green Tea', why: 'Studies suggest spearmint tea may help lower mild androgenic markers.' },
      { name: 'Flaxseeds & Sesame Seeds', why: 'Contains lignans and essential fatty acids that support hormone metabolism.' },
      { name: 'Leafy Greens & Colorful Veggies', why: 'Packed with folate, B-vitamins, and antioxidants to combat systemic inflammation.' },
      { name: 'Lean Protein (Lentils, Tofu, Eggs, Fish)', why: 'Promotes muscle protein synthesis and reduces insulin surges after meals.' },
      { name: 'Avocado, Nuts & Olive Oil', why: 'Monounsaturated fats support progesterone and hormone synthesis.' }
    ],
    foodsToLimit: [
      { name: 'Refined Sugars & Ultra-Processed Snacks', why: 'Exacerbates hyperinsulinemia and ovarian androgen production.' },
      { name: 'Trans Fats & Hydrogenated Oils', why: 'Triggers inflammatory cascades associated with insulin resistance.' }
    ],
    medicalGuidanceFoods: [
      { name: 'High-Fat Dairy Products (individual response)', why: 'Some women with PCOS notice skin flare-ups with excess dairy; monitor personal tolerance.' }
    ],
    nutrientsOfInterest: [
      { name: 'Inositol (Myo-Inositol)', role: 'Key secondary messenger in insulin and FSH signaling.', sources: 'Beans, citrus fruits, whole grains' },
      { name: 'Vitamin D3 & Calcium', role: 'Improves follicular maturation and metabolic stability.', sources: 'Sunlight, fortified milk, eggs' }
    ],
    mealIdeas: {
      breakfast: 'Oats porridge with chia seeds, flaxseed powder, and sliced apple',
      lunch: 'Ragi Roti with Palak Paneer, Soya Chunks Curry, and Sprouted Salad',
      snack: 'Spearmint Tea with a handful of pumpkin seeds & almonds',
      dinner: 'Vegetable Soup + Baked Fish / Tofu with roasted broccoli & sweet potato'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Combine dietary adjustments with regular physical exercise for optimal hormonal health.'
    ]
  },
  {
    id: 'high_bp',
    title: 'High Blood Pressure (Hypertension DASH Diet)',
    iconName: 'Shield',
    shortDescription: 'Emphasize potassium, magnesium, calcium, and reduced sodium intake.',
    recommendedFoods: [
      { name: 'Potassium-Rich Foods (Banana, Coconut Water, Spinach)', why: 'Potassium helps counteract sodium retention and relaxes vascular walls.' },
      { name: 'Beetroot & Garlic', why: 'Natural dietary nitrates in beetroot convert to nitric oxide, promoting vasodilation.' },
      { name: 'Whole Grains & Pulses', why: 'Core components of the evidence-based DASH (Dietary Approaches to Stop Hypertension) diet.' },
      { name: 'Low-Fat Curd & Milk', why: 'Calcium and bio-peptides support blood pressure regulation.' },
      { name: 'Pomegranate & Berries', why: 'Rich in polyphenols that support endothelial blood vessel health.' }
    ],
    foodsToLimit: [
      { name: 'Excess Salt & Pickles (Achar)', why: 'High sodium leads to fluid retention and increased arterial pressure.' },
      { name: 'Processed Meats, Chips & Canned Soups', why: 'Contains hidden sodium preservatives like monosodium glutamate and sodium benzoate.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Licorice Tea & Salt Substitutes', why: 'Potassium-based salt substitutes require caution if taking ACE-inhibitors or ARBs; consult doctor.' }
    ],
    nutrientsOfInterest: [
      { name: 'Potassium', role: 'Promotes renal sodium excretion and reduces vascular resistance.', sources: 'Coconut water, bananas, potatoes, spinach' },
      { name: 'Magnesium', role: 'Helps regulate vascular smooth muscle contraction.', sources: 'Nuts, seeds, dark leafy greens' }
    ],
    mealIdeas: {
      breakfast: 'Idli with Sambhar (made with low salt) + Fresh Coconut Water',
      lunch: 'Brown Rice / Roti + Dal + Boiled Beetroot & Cucumber Salad',
      snack: 'Handful of unsalted almonds & 1 Fresh Orange / Banana',
      dinner: 'Steamed Fish or Methi Dal with Chapati and Bottle Gourd Sabzi'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Aim for sodium intake under 2,000 mg/day (approx 1 teaspoon salt) as advised by WHO/AHA.',
      'Never alter antihypertensive prescription medication without clinical approval.'
    ]
  },
  {
    id: 'high_cholesterol',
    title: 'High Cholesterol (Lipid Management)',
    iconName: 'Activity',
    shortDescription: 'Incorporate soluble beta-glucan fiber, plant sterols, and healthy unsaturated omega-3 fats.',
    recommendedFoods: [
      { name: 'Oats & Barley', why: 'Contains soluble beta-glucan fiber that binds bile acids in the gut, reducing LDL cholesterol.' },
      { name: 'Walnuts, Almonds & Flaxseeds', why: 'Rich in ALA omega-3 and plant sterols that improve HDL to LDL ratio.' },
      { name: 'Fatty Fish (Salmon, Mackerel, Sardines)', why: 'EPA and DHA omega-3 fatty acids lower serum triglycerides.' },
      { name: 'Legumes & Beans (Rajma, Chana, Moong)', why: 'Soluble fiber reduces hepatic cholesterol synthesis.' },
      { name: 'Garlic & Extra Virgin Olive Oil', why: 'Supports vascular endothelial health and limits LDL oxidation.' }
    ],
    foodsToLimit: [
      { name: 'Deep-Fried Foods & Trans Fats', why: 'Elevates atherogenic LDL and lowers protective HDL cholesterol.' },
      { name: 'Processed Bakery Products (Cakes, Biscuits with Palm Oil)', why: 'Contains industrial trans fatty acids.' },
      { name: 'Organ Meats & Excessive Butter/Ghee', why: 'Concentrated sources of dietary saturated fatty acids.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Red Yeast Rice Supplements', why: 'Contains natural monacolin K (similar to statins); requires medical supervision to avoid drug interactions.' }
    ],
    nutrientsOfInterest: [
      { name: 'Beta-Glucan Fiber', role: 'Binds intestinal cholesterol and enhances fecal excretion.', sources: 'Oats, barley, legumes' },
      { name: 'Omega-3 Fatty Acids', role: 'Reduces hepatic triglyceride secretion.', sources: 'Walnuts, flaxseeds, chia seeds, oily fish' }
    ],
    mealIdeas: {
      breakfast: 'Oatmeal cooked in almond/toned milk topped with crushed walnuts and chia seeds',
      lunch: 'Multigrain Roti with Rajma Masala, Steamed Vegetable Salad, and Low-Fat Curd',
      snack: 'Roasted Makhana with green tea',
      dinner: 'Grilled Salmon/Tofu Curry with Brown Rice and Sautéed Vegetables'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Periodic lipid profile testing is essential to monitor LDL, HDL, and Triglycerides.'
    ]
  },
  {
    id: 'anemia',
    title: 'Anemia & Iron Deficiency',
    iconName: 'Droplet',
    shortDescription: 'Combine heme & non-heme iron foods with Vitamin C to dramatically boost absorption.',
    recommendedFoods: [
      { name: 'Green Leafy Veggies (Palak, Methi, Amaranth)', why: 'Rich source of non-heme iron and folate for red blood cell formation.' },
      { name: 'Jaggery (Gur) & Dates / Raisins', why: 'Traditional mineral-dense sources of iron and trace elements.' },
      { name: 'Citrus Fruits (Lemon, Amla, Oranges)', why: 'Vitamin C converts non-heme ferric iron (Fe3+) into absorbable ferrous iron (Fe2+).' },
      { name: 'Eggs, Chicken & Red Meat', why: 'Provides highly bioavailable heme iron absorbed 2-3x more efficiently than plant iron.' },
      { name: 'Beetroot & Pomegranate', why: 'Supports hemoglobin synthesis and cellular oxygen carrying capacity.' }
    ],
    foodsToLimit: [
      { name: 'Tea & Coffee WITH Meals', why: 'Tannins and polyphenols in tea/coffee inhibit iron absorption by up to 60-70% if consumed during meals.' },
      { name: 'Excess Calcium WITH Iron Meals', why: 'Calcium competes for intestinal iron transporters; space calcium and iron intake apart.' }
    ],
    medicalGuidanceFoods: [
      { name: 'High-Dose Oral Iron Supplements', why: 'May cause gastrointestinal discomfort; should be prescribed by a physician based on Ferritin levels.' }
    ],
    nutrientsOfInterest: [
      { name: 'Iron (Heme & Non-Heme)', role: 'Core structural component of hemoglobin in RBCs.', sources: 'Spinach, dates, amla, eggs, meat' },
      { name: 'Vitamin C (Ascorbic Acid)', role: 'Enhances non-heme iron solubility and uptake.', sources: 'Amla, guava, lemons, bell peppers' },
      { name: 'Folate (Vitamin B9)', role: 'Essential for DNA synthesis and RBC maturation.', sources: 'Lentils, asparagus, green leafy veggies' }
    ],
    mealIdeas: {
      breakfast: 'Spinach (Palak) Puri / Paratha served with fresh Lemon Juice & Sprouted Moong',
      lunch: 'Roti + Beetroot Dal Curry + Amla Chutney + Cucumber Salad',
      snack: 'Handful of soaked raisins, 2 dates & roasted sesame chikki',
      dinner: 'Chicken/Egg/Tofu Curry with Lemon rice and tossed green salad'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Check Serum Ferritin, CBC, and Iron Studies to confirm the specific root cause of anemia.'
    ]
  },
  {
    id: 'fatty_liver',
    title: 'Fatty Liver (NAFLD / Metabolic Health)',
    iconName: 'Activity',
    shortDescription: 'Reduce refined sugars & fructose, increase antioxidants, choline, and hepatic protective foods.',
    recommendedFoods: [
      { name: 'Coffee (Moderate 1-2 cups)', why: 'Contains chlorogenic acid which research indicates may reduce liver enzyme levels (ALT/AST).' },
      { name: 'Cruciferous Veggies (Broccoli, Cauliflower, Cabbage)', why: 'Contains sulforaphane and glucosinolates that support hepatic phase-2 detoxification.' },
      { name: 'Green Tea', why: 'Rich in EGCG antioxidants that help reduce hepatic fat accumulation.' },
      { name: 'Avocado, Walnuts & Olive Oil', why: 'Healthy MUFA & Omega-3 fats mitigate hepatic inflammation.' },
      { name: 'High Fiber Whole Grains & Chana', why: 'Improves gut barrier function and reduces endotoxin delivery to the liver.' }
    ],
    foodsToLimit: [
      { name: 'High Fructose Corn Syrup & Sugary Sodas', why: 'Fructose is metabolized almost exclusively in the liver, stimulating de novo lipogenesis (fat production).' },
      { name: 'Alcohol', why: 'Direct hepatotoxin that accelerates steatosis and liver tissue scarring.' },
      { name: 'Refined White Flour & Fried Foods', why: 'Promotes visceral obesity and hepatic fat storage.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Milk Thistle (Silymarin) & Vitamin E', why: 'Consult a hepatologist before starting liver supplements to evaluate dosage and safety.' }
    ],
    nutrientsOfInterest: [
      { name: 'Choline', role: 'Required for VLDL assembly to export fat out of the liver.', sources: 'Eggs, soybeans, peanuts, broccoli' },
      { name: 'Vitamin E & Antioxidants', role: 'Reduces lipid peroxidation in hepatocytes.', sources: 'Sunflower seeds, almonds, spinach' }
    ],
    mealIdeas: {
      breakfast: 'Vegetable Oats Upma with peanuts & green tea / black coffee',
      lunch: 'Jowar Roti + Moong Dal + Sautéed Broccoli & Mushrooms',
      snack: 'Walnuts & green tea',
      dinner: 'Grilled Fish or Tofu Curry with Lauki Sabzi and small bowl of Brown Rice'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Gradual weight loss (0.5 to 1 kg per week) is the clinical standard for reversing NAFLD.'
    ]
  },
  {
    id: 'heart_health',
    title: 'Heart Health & Cardiovascular Wellness',
    iconName: 'HeartPulse',
    shortDescription: 'Promote endothelial function, fiber, plant sterols, and omega-3 fatty acids.',
    recommendedFoods: [
      { name: 'Oily Fish / Flaxseeds', why: 'Abundant in EPA/DHA/ALA omega-3s which stabilize cardiac rhythms and lower blood pressure.' },
      { name: 'Berries (Blueberries, Strawberries, Jamun)', why: 'Loaded with anthocyanin antioxidants that protect blood vessels against oxidative stress.' },
      { name: 'Whole Grains & Oats', why: 'Soluble fiber lowers arterial plaque buildup.' },
      { name: 'Dark Chocolate (>70% Cacao in moderation)', why: 'Flavanols promote nitric oxide release and vascular flexibility.' },
      { name: 'Nuts (Walnuts, Almonds, Pistachios)', why: 'Reduces inflammatory biomarkers like C-Reactive Protein (CRP).' }
    ],
    foodsToLimit: [
      { name: 'Trans Fats & Partially Hydrogenated Oils', why: 'Causes coronary artery inflammation and arterial stiffness.' },
      { name: 'Excess Salt & Canned Prepared Meats', why: 'Elevates blood pressure and cardiac workload.' }
    ],
    medicalGuidanceFoods: [
      { name: 'CoQ10 & Fish Oil High Dose', why: 'Discuss with your cardiologist, especially if taking anticoagulant or statin medication.' }
    ],
    nutrientsOfInterest: [
      { name: 'Omega-3 Fatty Acids', role: 'Anti-arrhythmic and anti-thrombotic properties.', sources: 'Fish, flaxseeds, walnuts, chia seeds' },
      { name: 'Polyphenols & Nitrates', role: 'Protects arterial endothelium.', sources: 'Beetroot, berries, green tea, dark cacao' }
    ],
    mealIdeas: {
      breakfast: 'Chia Seed Pudding with almond milk, blueberries, and crushed walnuts',
      lunch: 'Brown Rice with Fish Curry or Rajma + Mixed Green Salad',
      snack: 'Roasted Makhana & 1 cup Green Tea',
      dinner: 'Vegetable Soup + Baked Paneer / Chicken Breast with Steamed Asparagus & Sweet Potato'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Consult a doctor immediately if experiencing sudden chest pain or shortness of breath.'
    ]
  },
  {
    id: 'obesity',
    title: 'Weight Management (Obesity / Caloric Balance)',
    iconName: 'Activity',
    shortDescription: 'Prioritize high satiety-to-calorie ratio, lean protein, fiber, and structured meal timing.',
    recommendedFoods: [
      { name: 'High-Fiber Veggies & Salads', why: 'Fills stomach volume (gastric stretch receptors) with minimal calorie density.' },
      { name: 'Lean Protein (Paneer, Tofu, Dal, Chicken, Egg Whites)', why: 'Highest thermic effect of food (TEF 20-30%) and preserves lean muscle mass.' },
      { name: 'Clear Vegetable Soups', why: 'Pre-meal soup intake reduces overall caloric intake in subsequent meals.' },
      { name: 'Whole Pulses & Sprouted Moong', why: 'Slow digestion maintains long-lasting fullness.' },
      { name: 'Water & Green Tea', why: 'Proper hydration prevents mistaking thirst signals for hunger.' }
    ],
    foodsToLimit: [
      { name: 'Liquid Calories (Sodas, Energy Drinks, Milkshakes)', why: 'Provides fast calories without triggering brain satiety centers.' },
      { name: 'Fried Foods & Ultra-Processed Snacks', why: 'Hyper-palatable combination of fat and refined carbs promotes overeating.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Commercial Weight-Loss Pills / Fat Burners', why: 'Unregulated thermogenic supplements pose cardiovascular risks; avoid without medical approval.' }
    ],
    nutrientsOfInterest: [
      { name: 'Protein & Fiber', role: 'Maximizes satiety hormones (GLP-1, PYY) and reduces ghrelin (hunger hormone).', sources: 'Sprouts, paneer, eggs, vegetables' }
    ],
    mealIdeas: {
      breakfast: 'Sprouted Moong Salad with paneer cubes & lemon juice + 1 Boiled Egg',
      lunch: '2 Roti + Palak Dal + Cucumber & Tomato Salad + Buttermilk (Tach/Chaas)',
      snack: '1 Medium Apple + 5 Almonds',
      dinner: 'Grilled Tofu / Chicken breast with stir-fried vegetables and clear soup'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Focus on sustainable lifestyle modifications rather than crash starvation diets.'
    ]
  },
  {
    id: 'underweight',
    title: 'Nutritious Weight Gain (Underweight / Muscle Building)',
    iconName: 'Activity',
    shortDescription: 'Focus on nutrient-dense foods, healthy fats, complex carbs, and adequate protein surplus.',
    recommendedFoods: [
      { name: 'Nuts & Nut Butters (Peanut Butter, Almond Butter)', why: 'Calorically dense source of healthy fats and protein in small volumes.' },
      { name: 'Full-Cream Milk, Paneer & Greek Yogurt', why: 'Provides high quality casein & whey protein + calcium for healthy weight gain.' },
      { name: 'Bananas, Mangoes & Dried Fruits', why: 'Nutrient-dense carb sources that provide energy without digestive heaviness.' },
      { name: 'Avocados, Ghee & Olive Oil', why: 'Adds healthy calories to meals naturally.' },
      { name: 'Whole Eggs & Chicken / Fish', why: 'Essential for building lean muscle tissue alongside resistance training.' }
    ],
    foodsToLimit: [
      { name: 'Junk Foods & Deep-Fried Fast Food', why: 'Causes unhealthy visceral fat gain and elevated trans-fats despite weight increase.' },
      { name: 'Drinking Large Amounts of Water Right Before Meals', why: 'Blunts appetite and fills stomach capacity prematurely.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Mass Gainer Powder Drinks', why: 'Check sugar content and consult a nutritionist before using commercial weight gainers.' }
    ],
    nutrientsOfInterest: [
      { name: 'Complete Protein & Calories', role: 'Provides positive nitrogen balance for tissue and muscle synthesis.', sources: 'Paneer, eggs, dairy, nuts, meats' }
    ],
    mealIdeas: {
      breakfast: 'Banana Peanut Butter Shake with full-cream milk, oats, and chia seeds + 2 Boiled Eggs',
      lunch: 'Paneer Butter Masala with 3 Chapati / Paratha, Rice, Dal, and Curd',
      snack: 'Trail mix (Almonds, Cashews, Raisins, Dates) & Chana',
      dinner: 'Chicken / Fish Curry with Rice, Ghee, and mixed veggies'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Combine calorie-dense meals with resistance training to ensure weight gained is lean muscle rather than excess fat.'
    ]
  },
  {
    id: 'vitamin_d',
    title: 'Vitamin D Deficiency',
    iconName: 'Sun',
    shortDescription: 'Enhance bone density, immune defense, and calcium absorption via sun exposure & fortified foods.',
    recommendedFoods: [
      { name: 'Sunlight Exposure (15-20 mins daily)', why: 'Primary natural source where UV-B rays synthesize Vitamin D3 in the skin.' },
      { name: 'Fortified Milk, Yogurt & Plant Milks', why: 'Fortified food items help bridge dietary Vitamin D intake gaps.' },
      { name: 'Egg Yolks', why: 'Contains natural fat-soluble Vitamin D3.' },
      { name: 'Mushrooms Exposed to UV Sunlight', why: 'Unique plant source providing Vitamin D2.' },
      { name: 'Fatty Fish (Salmon, Mackerel, Tuna)', why: 'Highest natural dietary source of Vitamin D3.' }
    ],
    foodsToLimit: [
      { name: 'Excess Soda & Carbonated Drinks', why: 'Phosphoric acid in sodas can impair bone calcium & Vitamin D metabolism.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Weekly High-Dose Vitamin D3 Shots / Capsules (60,000 IU)', why: 'Severe deficiencies (< 20 ng/mL) require prescribed clinical supplementation.' }
    ],
    nutrientsOfInterest: [
      { name: 'Vitamin D3 (Cholecalciferol)', role: 'Enables intestinal calcium & phosphorus absorption.', sources: 'Sunlight, egg yolks, fortified dairy, salmon' }
    ],
    mealIdeas: {
      breakfast: 'Fortified Milk with oats, egg yolk omelette, and mushrooms',
      lunch: 'Grilled Salmon or UV-exposed Mushroom Curry with Brown Rice and Salad',
      snack: 'Handful of almonds & fortified yogurt',
      dinner: 'Paneer / Fish Tikka with Wheat Roti and Green Veggies'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Get a 25-hydroxy Vitamin D blood test to determine if oral supplementation is necessary.'
    ]
  },
  {
    id: 'vitamin_b12',
    title: 'Vitamin B12 (Cobalamin) Deficiency',
    iconName: 'Shield',
    shortDescription: 'Crucial for nerve myelin sheath maintenance, red blood cell formation, and cognitive health.',
    recommendedFoods: [
      { name: 'Milk, Curd, Paneer & Cheese', why: 'Primary vegetarian sources of bioavailable Vitamin B12.' },
      { name: 'Fortified Nutritional Yeast & Breakfast Cereals', why: 'Excellent vegan alternative for Vitamin B12.' },
      { name: 'Eggs (Yolk & White)', why: 'Contains bioavailable Vitamin B12 along with choline.' },
      { name: 'Fish, Poultry & Meat', why: 'Rich natural animal sources of Vitamin B12.' }
    ],
    foodsToLimit: [
      { name: 'Excessive Alcohol Intake', why: 'Impairs Vitamin B12 absorption in the gastric ileum.' }
    ],
    medicalGuidanceFoods: [
      { name: 'Vitamin B12 Injections / Sublingual Methylcobalamin', why: 'Recommended for strict long-term vegans or patients with malabsorption (pernicious anemia).' }
    ],
    nutrientsOfInterest: [
      { name: 'Vitamin B12 (Methylcobalamin)', role: 'Essential for DNA synthesis, erythropoiesis, and neurological myelin health.', sources: 'Dairy, eggs, meat, fortified nutritional yeast' }
    ],
    mealIdeas: {
      breakfast: 'Fortified Cereal / Oats cooked in Milk + 2 Eggs or Sprouted Sprouts with Paneer',
      lunch: 'Paneer Masala / Chicken Curry with Rice, Curd, and Salad',
      snack: 'Nutritional yeast sprinkled over roasted makhana / popcorn',
      dinner: 'Egg Curry or Dal Makhani with Roti and fresh salad'
    },
    medicalNotes: [
      'This information is for educational and wellness purposes and does not replace professional medical advice.',
      'Check Serum B12 & Methylmalonic Acid (MMA) levels if experiencing numbness or tingling in hands/feet.'
    ]
  }
];

export const FOOD_DATABASE: FoodItem[] = [
  // Grains
  {
    id: 'f-1',
    name: 'Whole Wheat Roti / Chapati',
    category: 'grains',
    servingSize: '1 medium (40g)',
    calories: 120,
    protein: 3.5,
    carbs: 22,
    fat: 1.2,
    fiber: 3.0,
    isIndian: true,
    vitaminsAndMinerals: ['B-Vitamins', 'Magnesium', 'Iron'],
    suitableConditions: ['diabetes', 'high_cholesterol', 'pcos', 'obesity'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-2',
    name: 'Brown Rice',
    category: 'grains',
    servingSize: '1 cup cooked (150g)',
    calories: 170,
    protein: 3.8,
    carbs: 36,
    fat: 1.5,
    fiber: 2.8,
    isIndian: true,
    vitaminsAndMinerals: ['Manganese', 'Selenium', 'Magnesium'],
    suitableConditions: ['diabetes', 'high_cholesterol', 'heart_health', 'fatty_liver'],
    moderationConditions: ['obesity'],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-3',
    name: 'Steamed White Rice',
    category: 'grains',
    servingSize: '1 cup cooked (150g)',
    calories: 180,
    protein: 3.2,
    carbs: 39,
    fat: 0.4,
    fiber: 0.6,
    isIndian: true,
    vitaminsAndMinerals: ['Folate'],
    suitableConditions: ['underweight'],
    moderationConditions: ['diabetes', 'obesity', 'pcos'],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-4',
    name: 'Jowar (Sorghum) Roti',
    category: 'grains',
    servingSize: '1 medium (45g)',
    calories: 135,
    protein: 4.0,
    carbs: 26,
    fat: 1.5,
    fiber: 4.2,
    isIndian: true,
    vitaminsAndMinerals: ['Iron', 'Calcium', 'Potassium'],
    suitableConditions: ['diabetes', 'pcos', 'high_bp', 'high_cholesterol'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-5',
    name: 'Rolled Oats Porridge',
    category: 'grains',
    servingSize: '1 cup cooked (200g)',
    calories: 150,
    protein: 5.5,
    carbs: 27,
    fat: 2.5,
    fiber: 4.0,
    isIndian: false,
    vitaminsAndMinerals: ['Beta-Glucan', 'Iron', 'Zinc'],
    suitableConditions: ['high_cholesterol', 'diabetes', 'heart_health', 'fatty_liver'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },

  // Pulses & Legumes
  {
    id: 'f-6',
    name: 'Moong Dal (Yellow Lentils)',
    category: 'pulses',
    servingSize: '1 cup cooked (180g)',
    calories: 145,
    protein: 9.0,
    carbs: 24,
    fat: 0.8,
    fiber: 6.5,
    isIndian: true,
    vitaminsAndMinerals: ['Folate', 'Potassium', 'Magnesium'],
    suitableConditions: ['diabetes', 'anemia', 'pcos', 'high_bp', 'fatty_liver'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-7',
    name: 'Rajma (Kidney Beans)',
    category: 'pulses',
    servingSize: '1 cup cooked (180g)',
    calories: 215,
    protein: 13.5,
    carbs: 38,
    fat: 0.9,
    fiber: 11.0,
    isIndian: true,
    vitaminsAndMinerals: ['Iron', 'Folate', 'Potassium', 'Manganese'],
    suitableConditions: ['anemia', 'diabetes', 'high_cholesterol', 'heart_health'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-8',
    name: 'Chana (Chickpeas / Garbanzo)',
    category: 'pulses',
    servingSize: '1 cup cooked (180g)',
    calories: 230,
    protein: 12.0,
    carbs: 37,
    fat: 3.5,
    fiber: 9.5,
    isIndian: true,
    vitaminsAndMinerals: ['Zinc', 'Folate', 'Iron'],
    suitableConditions: ['diabetes', 'anemia', 'pcos', 'thyroid'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-9',
    name: 'Sprouted Moong Salad',
    category: 'pulses',
    servingSize: '1 cup (150g)',
    calories: 110,
    protein: 8.5,
    carbs: 18,
    fat: 0.5,
    fiber: 5.5,
    isIndian: true,
    vitaminsAndMinerals: ['Vitamin C', 'Folate', 'Iron'],
    suitableConditions: ['obesity', 'diabetes', 'anemia', 'pcos', 'fatty_liver'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },

  // Dairy & Alternatives
  {
    id: 'f-10',
    name: 'Fresh Paneer (Cottage Cheese)',
    category: 'dairy',
    servingSize: '100g',
    calories: 265,
    protein: 18.3,
    carbs: 3.2,
    fat: 20.0,
    fiber: 0,
    isIndian: true,
    vitaminsAndMinerals: ['Calcium', 'Vitamin B12', 'Phosphorus'],
    suitableConditions: ['underweight', 'vitamin_b12', 'vitamin_d'],
    moderationConditions: ['obesity', 'high_cholesterol'],
    dietaryCategory: 'vegetarian'
  },
  {
    id: 'f-11',
    name: 'Plain Curd / Dahi',
    category: 'dairy',
    servingSize: '1 cup (200g)',
    calories: 120,
    protein: 7.0,
    carbs: 9.0,
    fat: 6.0,
    fiber: 0,
    isIndian: true,
    vitaminsAndMinerals: ['Calcium', 'Probiotics', 'Vitamin B12'],
    suitableConditions: ['diabetes', 'vitamin_b12', 'high_bp', 'pcos'],
    moderationConditions: [],
    dietaryCategory: 'vegetarian'
  },
  {
    id: 'f-12',
    name: 'Toned Cow Milk',
    category: 'dairy',
    servingSize: '1 glass (250ml)',
    calories: 150,
    protein: 8.0,
    carbs: 12.0,
    fat: 7.5,
    fiber: 0,
    isIndian: true,
    vitaminsAndMinerals: ['Calcium', 'Vitamin D3', 'Vitamin B12'],
    suitableConditions: ['vitamin_d', 'vitamin_b12', 'underweight'],
    moderationConditions: [],
    dietaryCategory: 'vegetarian'
  },

  // Eggs, Meat & Fish
  {
    id: 'f-13',
    name: 'Whole Boiled Egg',
    category: 'eggs',
    servingSize: '1 large (50g)',
    calories: 75,
    protein: 6.3,
    carbs: 0.4,
    fat: 5.0,
    fiber: 0,
    isIndian: true,
    vitaminsAndMinerals: ['Choline', 'Vitamin B12', 'Vitamin D', 'Selenium'],
    suitableConditions: ['vitamin_b12', 'vitamin_d', 'thyroid', 'fatty_liver', 'anemia'],
    moderationConditions: ['high_cholesterol'],
    dietaryCategory: 'eggetarian'
  },
  {
    id: 'f-14',
    name: 'Grilled Chicken Breast',
    category: 'meat',
    servingSize: '100g cooked',
    calories: 165,
    protein: 31.0,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    isIndian: true,
    vitaminsAndMinerals: ['Vitamin B6', 'Niacin', 'Selenium', 'Phosphorus'],
    suitableConditions: ['diabetes', 'obesity', 'pcos', 'anemia', 'underweight'],
    moderationConditions: [],
    dietaryCategory: 'non_vegetarian'
  },
  {
    id: 'f-15',
    name: 'Fish (Rohu / Katla / Salmon)',
    category: 'fish',
    servingSize: '100g cooked',
    calories: 140,
    protein: 22.0,
    carbs: 0,
    fat: 5.0,
    fiber: 0,
    isIndian: true,
    vitaminsAndMinerals: ['Omega-3', 'Vitamin D', 'Vitamin B12', 'Selenium'],
    suitableConditions: ['heart_health', 'high_cholesterol', 'fatty_liver', 'vitamin_d', 'anemia'],
    moderationConditions: [],
    dietaryCategory: 'non_vegetarian'
  },

  // Fruits
  {
    id: 'f-16',
    name: 'Fresh Apple with Skin',
    category: 'fruits',
    servingSize: '1 medium (150g)',
    calories: 80,
    protein: 0.4,
    carbs: 21,
    fat: 0.2,
    fiber: 4.4,
    isIndian: true,
    vitaminsAndMinerals: ['Vitamin C', 'Quercetin', 'Potassium'],
    suitableConditions: ['diabetes', 'high_cholesterol', 'heart_health', 'obesity', 'pcos'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-17',
    name: 'Amla (Indian Gooseberry)',
    category: 'fruits',
    servingSize: '2 fruit (50g)',
    calories: 22,
    protein: 0.5,
    carbs: 5.0,
    fat: 0.1,
    fiber: 2.2,
    isIndian: true,
    vitaminsAndMinerals: ['Vitamin C (High)', 'Antioxidants', 'Iron Helper'],
    suitableConditions: ['anemia', 'diabetes', 'fatty_liver', 'heart_health'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-18',
    name: 'Banana',
    category: 'fruits',
    servingSize: '1 medium (120g)',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.3,
    fiber: 3.1,
    isIndian: true,
    vitaminsAndMinerals: ['Potassium', 'Vitamin B6', 'Magnesium'],
    suitableConditions: ['high_bp', 'underweight', 'heart_health'],
    moderationConditions: ['diabetes', 'obesity'],
    dietaryCategory: 'vegan'
  },

  // Vegetables
  {
    id: 'f-19',
    name: 'Spinach (Palak) Cooked',
    category: 'vegetables',
    servingSize: '1 cup cooked (180g)',
    calories: 42,
    protein: 5.3,
    carbs: 6.5,
    fat: 0.5,
    fiber: 4.3,
    isIndian: true,
    vitaminsAndMinerals: ['Iron', 'Folate', 'Vitamin K', 'Magnesium', 'Potassium'],
    suitableConditions: ['anemia', 'high_bp', 'diabetes', 'fatty_liver', 'thyroid'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-20',
    name: 'Lauki (Bottle Gourd) Sabzi',
    category: 'vegetables',
    servingSize: '1 cup cooked (180g)',
    calories: 35,
    protein: 1.2,
    carbs: 7.0,
    fat: 0.2,
    fiber: 2.5,
    isIndian: true,
    vitaminsAndMinerals: ['Potassium', 'Vitamin C', 'Water'],
    suitableConditions: ['high_bp', 'diabetes', 'obesity', 'fatty_liver'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-21',
    name: 'Beetroot Steamed / Salad',
    category: 'vegetables',
    servingSize: '1 cup (130g)',
    calories: 55,
    protein: 2.1,
    carbs: 13,
    fat: 0.2,
    fiber: 3.8,
    isIndian: true,
    vitaminsAndMinerals: ['Nitrates', 'Folate', 'Potassium', 'Iron'],
    suitableConditions: ['high_bp', 'anemia', 'heart_health'],
    moderationConditions: ['diabetes'],
    dietaryCategory: 'vegan'
  },

  // Nuts & Seeds
  {
    id: 'f-22',
    name: 'Raw Almonds (Soaked)',
    category: 'nuts',
    servingSize: '10 pieces (12g)',
    calories: 70,
    protein: 2.5,
    carbs: 2.6,
    fat: 6.0,
    fiber: 1.5,
    isIndian: true,
    vitaminsAndMinerals: ['Vitamin E', 'Magnesium', 'Calcium', 'Zinc'],
    suitableConditions: ['diabetes', 'high_cholesterol', 'thyroid', 'heart_health', 'pcos'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-23',
    name: 'Walnuts',
    category: 'nuts',
    servingSize: '4 halves (14g)',
    calories: 90,
    protein: 2.1,
    carbs: 2.0,
    fat: 9.0,
    fiber: 1.0,
    isIndian: true,
    vitaminsAndMinerals: ['ALA Omega-3', 'Antioxidants', 'Copper'],
    suitableConditions: ['high_cholesterol', 'heart_health', 'fatty_liver', 'diabetes'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-24',
    name: 'Flaxseeds (Ground)',
    category: 'seeds',
    servingSize: '1 tbsp (10g)',
    calories: 55,
    protein: 1.9,
    carbs: 3.0,
    fat: 4.2,
    fiber: 2.8,
    isIndian: true,
    vitaminsAndMinerals: ['ALA Omega-3', 'Lignans', 'Magnesium'],
    suitableConditions: ['pcos', 'high_cholesterol', 'heart_health', 'diabetes'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  },
  {
    id: 'f-25',
    name: 'Brazil Nuts',
    category: 'nuts',
    servingSize: '2 nuts (10g)',
    calories: 65,
    protein: 1.4,
    carbs: 1.2,
    fat: 6.5,
    fiber: 0.8,
    isIndian: false,
    vitaminsAndMinerals: ['Selenium (Very High)', 'Magnesium'],
    suitableConditions: ['thyroid'],
    moderationConditions: [],
    dietaryCategory: 'vegan'
  }
];

export const DAILY_NUTRIENT_TARGETS = [
  { name: 'Protein', target: '50 - 75 g', unit: 'g', icon: 'Drumstick', desc: 'Essential for cellular repair, immune enzymes, and muscle mass maintenance.' },
  { name: 'Fiber', target: '25 - 38 g', unit: 'g', icon: 'Wheat', desc: 'Promotes gut motility, slows glucose absorption, and lowers LDL cholesterol.' },
  { name: 'Carbohydrates', target: '130 - 225 g', unit: 'g', icon: 'Flame', desc: 'Primary cellular energy substrate; prioritize complex low-GI sources.' },
  { name: 'Healthy Fats', target: '44 - 70 g', unit: 'g', icon: 'Shield', desc: 'Supports hormone precursor synthesis, cell membranes, and fat-soluble vitamin absorption.' },
  { name: 'Calcium', target: '1,000 - 1,200 mg', unit: 'mg', icon: 'Bone', desc: 'Maintains skeletal mineralization, muscle contraction, and cardiac conduction.' },
  { name: 'Iron', target: '18 - 27 mg', unit: 'mg', icon: 'Droplet', desc: 'Core constituent of red blood cell hemoglobin and oxygen transport.' },
  { name: 'Vitamin D3', target: '600 - 2,000 IU', unit: 'IU', icon: 'Sun', desc: 'Facilitates intestinal calcium absorption and systemic immune homeostasis.' },
  { name: 'Vitamin B12', target: '2.4 - 4.0 mcg', unit: 'mcg', icon: 'Zap', desc: 'Co-factor for nerve myelin sheath synthesis and red blood cell DNA replication.' },
  { name: 'Vitamin C', target: '75 - 90 mg', unit: 'mg', icon: 'Citrus', desc: 'Potent collagen co-factor, immune defense, and non-heme iron absorption enhancer.' },
  { name: 'Folate (B9)', target: '400 mcg', unit: 'mcg', icon: 'HeartPulse', desc: 'Required for nucleic acid synthesis and megaloblastic anemia prevention.' },
  { name: 'Potassium', target: '2,600 - 3,400 mg', unit: 'mg', icon: 'Activity', desc: 'Maintains vascular tone, osmotic balance, and counteracts excess sodium.' },
  { name: 'Sodium', target: '< 2,000 mg', unit: 'mg', icon: 'AlertTriangle', desc: 'Essential electrolyte; keep under 2,000 mg/day for optimal arterial pressure.' },
  { name: 'Hydration (Water)', target: '2.5 - 3.5 Liters', unit: 'L', icon: 'Droplets', desc: 'Supports renal filtration, joint lubrication, and cellular thermoregulation.' }
];

export const INITIAL_HEALTH_PROFILE: UserHealthProfile = {
  age: 32,
  sex: 'female',
  heightCm: 165,
  weightKg: 64,
  activityLevel: 'moderate',
  goal: 'maintain',
  healthConditions: ['thyroid'],
  hasKidneyDisease: false,
  dietaryPreference: 'vegetarian',
  allergies: [],
  dislikedFoods: [],
  dailyWaterTargetMl: 3000,
  loggedWaterMl: 1750,
  dailyProteinTargetG: 65,
  loggedProteinG: 48,
  targetSteps: 8000,
  loggedSteps: 5420,
  targetSleepHours: 8,
  loggedSleepHours: 7.5
};

export const INITIAL_NUTRITION_LOGS: NutritionLogEntry[] = [
  { id: 'l-1', date: '01 Oct', weightKg: 65.2, bmi: 23.95, waterMl: 2500, proteinG: 58, steps: 7200, sleepHours: 7.0, adherenceScore: 85 },
  { id: 'l-2', date: '02 Oct', weightKg: 65.0, bmi: 23.88, waterMl: 2750, proteinG: 62, steps: 8100, sleepHours: 7.5, adherenceScore: 90 },
  { id: 'l-3', date: '03 Oct', weightKg: 64.8, bmi: 23.80, waterMl: 3000, proteinG: 65, steps: 8500, sleepHours: 8.0, adherenceScore: 95 },
  { id: 'l-4', date: '04 Oct', weightKg: 64.5, bmi: 23.69, waterMl: 2200, proteinG: 52, steps: 6100, sleepHours: 6.5, adherenceScore: 78 },
  { id: 'l-5', date: '05 Oct', weightKg: 64.3, bmi: 23.62, waterMl: 2800, proteinG: 64, steps: 7900, sleepHours: 7.5, adherenceScore: 92 },
  { id: 'l-6', date: '06 Oct', weightKg: 64.1, bmi: 23.54, waterMl: 3000, proteinG: 66, steps: 9100, sleepHours: 8.0, adherenceScore: 98 },
  { id: 'l-7', date: '07 Oct', weightKg: 64.0, bmi: 23.51, waterMl: 2500, proteinG: 60, steps: 8000, sleepHours: 7.5, adherenceScore: 90 }
];
