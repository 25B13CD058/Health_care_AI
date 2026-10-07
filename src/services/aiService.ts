import { 
  SymptomAnalysisResult, Doctor, Hospital, SymptomInputForm, 
  DoctorVisitPrep, ReportAnalysisResult, ReportTestItem, UrgencyLevel 
} from '../types';
import { DOCTORS, HOSPITALS, SPECIALTIES } from '../data/mockData';

// Red Flag Emergency Keywords & Patterns
const EMERGENCY_PATTERNS = [
  { keywords: ['chest pain', 'chest discomfort', 'heart attack', 'tightness in chest', 'crushing chest', 'sweating and chest'], term: 'Chest Pain / Potential Cardiac Crisis' },
  { keywords: ['difficulty breathing', 'shortness of breath', 'gasping', 'cannot breathe', 'breathless', 'struggling for air'], term: 'Severe Respiratory Distress' },
  { keywords: ['sudden weakness', 'paralysis', 'face drooping', 'slurred speech', 'arm weakness', 'numbness on one side'], term: 'Suspected Stroke Symptoms' },
  { keywords: ['unconscious', 'passed out', 'fainted', 'unresponsive', 'fainting'], term: 'Sudden Loss of Consciousness' },
  { keywords: ['uncontrolled bleeding', 'profuse bleeding', 'heavy arterial blood', 'severe bleeding'], term: 'Severe Bleeding' },
  { keywords: ['anaphylaxis', 'swelling of lips', 'swelling of tongue', 'throat closing', 'severe allergic reaction'], term: 'Severe Allergic Reaction' },
  { keywords: ['seizure', 'convulsions', 'fits', 'epileptic seizure'], term: 'Seizure Event' },
  { keywords: ['suicidal', 'kill myself', 'self-harm', 'extreme crisis'], term: 'Emergency Mental Health Crisis' },
  { keywords: ['severe burn', 'trauma', 'car accident', 'head injury', 'deep laceration'], term: 'Major Trauma / Injury' }
];

// Symptom to Specialty Mapping Rules
const SPECIALTY_MAP: { 
  keywords: string[]; 
  primaryId: string; 
  secondaryId?: string; 
  explanation: string;
  categories: string[];
  warningSigns: string[];
  doctorQuestions: string[];
}[] = [
  {
    keywords: ['chest pain', 'chest discomfort', 'heart', 'palpitations', 'high blood pressure', 'bp', 'cardiac', 'pulse', 'sweating'],
    primaryId: 'cardiology',
    secondaryId: 'emergency-medicine',
    explanation: 'Your description indicates cardiovascular symptoms such as chest tightness or heart palpitations, which are best evaluated by a Cardiologist.',
    categories: ['Cardiovascular Health', 'Hypertension / Blood Pressure', 'Ischemic Heart Screening'],
    warningSigns: ['Pain radiating to neck, jaw, or left arm', 'Profuse cold sweating', 'Sudden breathlessness or lightheadedness'],
    doctorQuestions: [
      'Are these cardiac symptoms related to hypertension or arterial blockage?',
      'Should an ECG or Echocardiogram be performed immediately?',
      'What lifestyle or dietary modifications should I initiate?'
    ]
  },
  {
    keywords: ['headache', 'migraine', 'dizziness', 'numbness', 'seizure', 'memory', 'tremor', 'nerve', 'paralysis', 'vision blur'],
    primaryId: 'neurology',
    secondaryId: 'general-medicine',
    explanation: 'Symptoms involving persistent headache, nerve tingling, or neurological coordination fall under the expertise of a Neurologist.',
    categories: ['Neurovascular Health', 'Migraine & Headache Disorders', 'Peripheral Nerve Screening'],
    warningSigns: ['Sudden worst headache of your life', 'Facial drooping or slurred speech', 'Loss of balance or sudden vision loss'],
    doctorQuestions: [
      'Is an MRI or CT brain scan recommended for this headache pattern?',
      'Are there specific neurological triggers I should avoid?',
      'Is preventive migraine therapy suitable for my symptoms?'
    ]
  },
  {
    keywords: ['skin', 'rash', 'acne', 'itching', 'itchy', 'eczema', 'hair fall', 'scalp', 'pimples', 'pigmentation', 'blisters'],
    primaryId: 'dermatology',
    explanation: 'Dermal issues like skin rashes, persistent itching, or acne flare-ups are evaluated by a Dermatologist.',
    categories: ['Dermatological & Allergic Skin Conditions', 'Eczema / Contact Dermatitis', 'Epidermal Rash Screening'],
    warningSigns: ['Rapidly spreading rash accompanied by high fever', 'Blistering or skin peeling', 'Severe pus-filled skin lesions'],
    doctorQuestions: [
      'Is this rash caused by an allergic reaction or fungal/bacterial infection?',
      'Should topical corticosteroids or antihistamines be prescribed?',
      'What skin care routine should I follow while healing?'
    ]
  },
  {
    keywords: ['child', 'kid', 'baby', 'infant', 'toddler', 'vaccination', 'pediatric'],
    primaryId: 'pediatrics',
    explanation: 'Medical symptoms in infants, children, or young teenagers are best managed by a Pediatric specialist.',
    categories: ['Pediatric General Health', 'Childhood Viral Infections', 'Growth & Immunization'],
    warningSigns: ['Child lethargic or unresponsive', 'High fever unresponsive to medication', 'Stridor or severe breathing struggle'],
    doctorQuestions: [
      'What is the appropriate pediatric dosage for fever reduction?',
      'Are there signs of pediatric dehydration to monitor?',
      'Are all immunizations up to date?'
    ]
  },
  {
    keywords: ['joint', 'bone', 'knee', 'fracture', 'back pain', 'spine', 'shoulder', 'ligament', 'stiffness'],
    primaryId: 'orthopaedics',
    secondaryId: 'rheumatology',
    explanation: 'Bone fractures, joint degeneration, or spinal disc discomfort require specialized evaluation by an Orthopaedic surgeon.',
    categories: ['Musculoskeletal & Joint Care', 'Spinal Disc & Back Care', 'Arthritis & Degeneration'],
    warningSigns: ['Inability to bear weight on leg or joint', 'Visible bone deformity', 'Numbness radiating down leg or arm'],
    doctorQuestions: [
      'Is an X-Ray or MRI scan needed to check joint degeneration?',
      'Would physical therapy or targeted exercise alleviate this joint pain?',
      'Are anti-inflammatory medications recommended for temporary relief?'
    ]
  },
  {
    keywords: ['ear', 'nose', 'throat', 'sinus', 'hearing', 'tinnitus', 'sore throat', 'tonsils', 'blocked nose'],
    primaryId: 'ent',
    explanation: 'Symptoms involving ear pain, sinus pressure, or persistent throat discomfort are examined by an ENT (Otolaryngologist) specialist.',
    categories: ['Ear, Nose & Throat Care', 'Sinusitis & Allergy', 'Upper Airway Health'],
    warningSigns: ['Severe difficulty swallowing liquids', 'High fever with severe ear discharge', 'Sudden hearing loss'],
    doctorQuestions: [
      'Is this throat infection viral or bacterial requiring antibiotics?',
      'Should a sinus CT scan be performed for chronic blockage?',
      'How can I prevent recurrent nasal allergies?'
    ]
  },
  {
    keywords: ['stomach', 'abdomen', 'acidity', 'reflux', 'bloating', 'diarrhea', 'constipation', 'vomiting', 'gut', 'ulcer'],
    primaryId: 'gastroenterology',
    secondaryId: 'general-medicine',
    explanation: 'Abdominal cramping, chronic acid reflux, or intestinal symptoms are managed by a Gastroenterologist.',
    categories: ['Gastrointestinal Health', 'Acid Peptic & Ulcer Disease', 'Hepatic & Intestinal Care'],
    warningSigns: ['Severe unremitting abdominal pain', 'Vomiting blood or dark coffee-ground material', 'Black tarry stools'],
    doctorQuestions: [
      'Is an endoscopy or abdominal ultrasound recommended?',
      'Could acid reflux be managed with dietary adjustments or PPIs?',
      'What foods should I temporarily eliminate to reduce stomach irritation?'
    ]
  },
  {
    keywords: ['cough', 'asthma', 'breath', 'wheezing', 'lungs', 'phlegm', 'bronchitis'],
    primaryId: 'pulmonology',
    secondaryId: 'general-medicine',
    explanation: 'Persistent cough, bronchial wheezing, or lung airway congestion are specialized under Pulmonology.',
    categories: ['Respiratory & Pulmonary Care', 'Asthma & Bronchitis Management', 'Airway Congestion'],
    warningSigns: ['Coughing up blood', 'Severe chest tightness during breathing', 'Bluish tint on lips or fingernails'],
    doctorQuestions: [
      'Is a Chest X-Ray or spirometry lung function test needed?',
      'Should a rescue or maintenance inhaler be prescribed?',
      'Are there environmental triggers exacerbating my breathing?'
    ]
  },
  {
    keywords: ['fever', 'chills', 'weakness', 'fatigue', 'body ache', 'viral', 'flu', 'cold'],
    primaryId: 'general-medicine',
    explanation: 'Acute febrile symptoms, viral illnesses, or general body aches are best diagnosed by a General Physician.',
    categories: ['General Internal Medicine', 'Acute Febrile & Viral Care', 'Primary Preventive Health'],
    warningSigns: ['High fever above 103°F lasting more than 3 days', 'Severe neck stiffness or confusion', 'Unexplained extreme weakness'],
    doctorQuestions: [
      'Should a blood CBC or Dengue/Malaria screening be performed?',
      'What hydration regimen is recommended while recovering?',
      'When should I return for a follow-up if symptoms persist?'
    ]
  }
];

export async function analyzeSymptoms(input: string | SymptomInputForm): Promise<SymptomAnalysisResult> {
  let userInput = '';
  let duration = '';
  let age = '';
  let gender = '';
  let existingConditions = '';
  let medications = '';
  let severity: 'mild' | 'moderate' | 'severe' = 'moderate';

  if (typeof input === 'string') {
    userInput = input;
  } else {
    userInput = input.symptoms || '';
    duration = input.duration || '';
    age = input.age || '';
    gender = input.gender || '';
    existingConditions = input.existingConditions || '';
    medications = input.medications || '';
    severity = input.severity || 'moderate';
  }

  const lower = userInput.toLowerCase();

  // 1. Detect Red Flags
  const detectedRedFlags: string[] = [];
  EMERGENCY_PATTERNS.forEach(pat => {
    if (pat.keywords.some(kw => lower.includes(kw))) {
      detectedRedFlags.push(pat.term);
    }
  });

  const isEmergency = detectedRedFlags.length > 0 || severity === 'severe' && (lower.includes('chest') || lower.includes('breath'));

  // 2. Determine Primary Specialty
  let matchedRule = SPECIALTY_MAP.find(rule => rule.keywords.some(kw => lower.includes(kw)));

  if (!matchedRule && isEmergency) {
    matchedRule = {
      keywords: [],
      primaryId: 'emergency-medicine',
      secondaryId: 'cardiology',
      explanation: 'Your description contains acute emergency red flags requiring immediate trauma or emergency medical evaluation.',
      categories: ['Acute Emergency Medicine', 'Critical Care Evaluation'],
      warningSigns: ['Severe chest pain', 'Loss of consciousness', 'Uncontrolled bleeding'],
      doctorQuestions: ['Immediate emergency triage evaluation required.']
    };
  }

  const primarySpecialtyId = matchedRule ? matchedRule.primaryId : 'general-medicine';
  const primarySpecObj = SPECIALTIES.find(s => s.id === primarySpecialtyId) || SPECIALTIES[0];
  const secondarySpecObj = matchedRule?.secondaryId ? SPECIALTIES.find(s => s.id === matchedRule.secondaryId) : undefined;

  // 3. Determine 4-Level Urgency
  let urgencyLevel: UrgencyLevel = 'routine';
  if (isEmergency) {
    urgencyLevel = 'urgent';
  } else if (severity === 'severe' || lower.includes('severe') || lower.includes('high fever')) {
    urgencyLevel = 'priority';
  } else if (duration.includes('3') || duration.includes('2') || lower.includes('persistent') || severity === 'moderate') {
    urgencyLevel = 'soon';
  } else {
    urgencyLevel = 'routine';
  }

  // 4. Action Plan & Recommendations
  const actionPlan: string[] = [];
  if (urgencyLevel === 'urgent') {
    actionPlan.push('🚨 SEEK URGENT MEDICAL ATTENTION: Visit the nearest emergency department immediately or call emergency services (108).');
    actionPlan.push('🏥 Select an emergency-equipped hospital with 24x7 Level-1 trauma & ICU facilities.');
    actionPlan.push('📞 Notify your emergency contact with your live location.');
  } else if (urgencyLevel === 'priority') {
    actionPlan.push(`⚡ Schedule a priority consultation with a ${primarySpecObj.name} specialist within 24 hours.`);
    actionPlan.push('📋 Prepare a symptom timeline and list of current medications.');
  } else if (urgencyLevel === 'soon') {
    actionPlan.push(`📅 Schedule a consultation with a ${primarySpecObj.name} specialist in the next 1-2 days.`);
    actionPlan.push('📋 Note down any triggers or changes in symptom intensity.');
  } else {
    actionPlan.push(`🩺 Consider scheduling a routine consultation with a ${primarySpecObj.name} specialist.`);
    actionPlan.push('📋 Monitor symptoms and maintain adequate rest and hydration.');
  }

  const explanationText = matchedRule
    ? matchedRule.explanation
    : `Based on the symptoms entered, a consultation with ${primarySpecObj.name} is a suggested specialty to consider for preliminary evaluation.`;

  // Doctors & Hospitals
  const recommendedDoctors = DOCTORS.filter(doc => 
    doc.specialtyId === primarySpecialtyId || (matchedRule?.secondaryId && doc.specialtyId === matchedRule.secondaryId)
  );
  const doctorsToShow = recommendedDoctors.length > 0 ? recommendedDoctors : DOCTORS.slice(0, 3);

  const recommendedHospitals = HOSPITALS.filter(hosp => 
    urgencyLevel === 'urgent' ? hosp.emergencyAvailable : hosp.specialties.includes(primarySpecObj.name)
  );
  const hospitalsToShow = recommendedHospitals.length > 0 ? recommendedHospitals : HOSPITALS.slice(0, 3);

  // Build Doctor Visit Preparation Object
  const prepSummary: DoctorVisitPrep = {
    mainConcern: userInput,
    symptoms: matchedRule ? matchedRule.keywords.filter(kw => lower.includes(kw)) : [userInput],
    duration: duration || '3 days (estimated)',
    severity: severity.toUpperCase(),
    relevantInfo: `Age: ${age || '34'}, Gender: ${gender || 'Male'}${existingConditions ? `, History: ${existingConditions}` : ''}${medications ? `, Current Meds: ${medications}` : ''}`,
    questionsToAsk: matchedRule?.doctorQuestions || [
      'What could be causing these symptoms?',
      'Are diagnostic tests or lab panels recommended?',
      'What treatment options or lifestyle adjustments do you suggest?'
    ],
    infoToBring: [
      'Previous lab reports & diagnostic scan results',
      'List of current prescription & OTC medications',
      'Health insurance card & personal medical ID'
    ],
    suggestedSpecialty: primarySpecObj.name
  };

  return {
    userInput,
    detectedSymptoms: matchedRule ? matchedRule.keywords.filter(kw => lower.includes(kw)) : [userInput],
    primarySpecialty: primarySpecObj.name,
    primarySpecialtyId: primarySpecObj.id,
    secondarySpecialty: secondarySpecObj?.name,
    urgencyLevel,
    isEmergency: urgencyLevel === 'urgent',
    explanation: explanationText,
    actionPlan,
    redFlags: detectedRedFlags,
    possibleCategories: matchedRule?.categories || ['General Healthcare Consultation'],
    warningSigns: matchedRule?.warningSigns || ['Sudden worsening of symptoms', 'High fever unresponsive to medication'],
    doctorQuestions: matchedRule?.doctorQuestions || prepSummary.questionsToAsk,
    recommendedDoctors: doctorsToShow,
    recommendedHospitals: hospitalsToShow,
    prepSummary
  };
}

export function generateDoctorVisitPrep(form: SymptomInputForm, analysis: SymptomAnalysisResult): DoctorVisitPrep {
  return analysis.prepSummary || {
    mainConcern: form.symptoms,
    symptoms: [form.symptoms],
    duration: form.duration || '3 days',
    severity: (form.severity || 'moderate').toUpperCase(),
    relevantInfo: `Age: ${form.age || '34'}, Gender: ${form.gender || 'Male'}`,
    questionsToAsk: analysis.doctorQuestions,
    infoToBring: [
      'Previous lab reports & diagnostic scan results',
      'List of current prescription & OTC medications',
      'Health insurance card & personal medical ID'
    ],
    suggestedSpecialty: analysis.primarySpecialty
  };
}

export function analyzeMedicalReport(reportTitle: string, reportType: string): ReportAnalysisResult {
  const isBlood = reportTitle.toLowerCase().includes('blood') || reportType === 'Blood Test';
  const isThyroid = reportTitle.toLowerCase().includes('thyroid');
  const isECG = reportTitle.toLowerCase().includes('ecg') || reportTitle.toLowerCase().includes('echo');

  let testItems: ReportTestItem[] = [];

  if (isThyroid) {
    testItems = [
      { testName: 'Serum TSH', value: '2.80', unit: 'uIU/mL', refRange: '0.40 - 4.20', status: 'within', explanation: 'Thyroid stimulating hormone level is within healthy physiological limits.' },
      { testName: 'Free T3', value: '3.10', unit: 'pg/mL', refRange: '2.00 - 4.40', status: 'within', explanation: 'Triiodothyronine hormone level is within normal range.' },
      { testName: 'Free T4', value: '1.25', unit: 'ng/dL', refRange: '0.80 - 1.80', status: 'within', explanation: 'Thyroxine hormone level indicates stable thyroid metabolism.' }
    ];
  } else if (isECG) {
    testItems = [
      { testName: 'Heart Rate (ECG)', value: '72', unit: 'bpm', refRange: '60 - 100', status: 'within', explanation: 'Normal sinus rhythm with stable heart rate.' },
      { testName: 'PR Interval', value: '154', unit: 'ms', refRange: '120 - 200', status: 'within', explanation: 'Normal AV conduction velocity.' },
      { testName: 'Ejection Fraction (LVEF)', value: '62', unit: '%', refRange: '55 - 75', status: 'within', explanation: 'Preserved left ventricular systolic pumping capacity.' }
    ];
  } else {
    testItems = [
      { testName: 'Hemoglobin (Hb)', value: '13.8', unit: 'g/dL', refRange: '13.0 - 17.0', status: 'within', explanation: 'Hemoglobin concentration is within healthy oxygen-carrying range.' },
      { testName: 'Total WBC Count', value: '8,400', unit: '/uL', refRange: '4,000 - 11,000', status: 'within', explanation: 'White blood cell count indicates normal immune defense.' },
      { testName: 'Fasting Blood Glucose', value: '124', unit: 'mg/dL', refRange: '70 - 99', status: 'above', explanation: 'Fasting glucose is slightly above standard reference limits (pre-diabetic range).' },
      { testName: 'Total Cholesterol', value: '215', unit: 'mg/dL', refRange: '< 200', status: 'above', explanation: 'Total cholesterol is mildly elevated above ideal reference limits.' },
      { testName: 'Serum Creatinine', value: '0.90', unit: 'mg/dL', refRange: '0.70 - 1.30', status: 'within', explanation: 'Normal renal filtration capacity.' }
    ];
  }

  return {
    reportTitle,
    reportType,
    summaryText: `Analysis of ${reportTitle} shows mostly normal reference parameters with ${testItems.filter(t => t.status !== 'within').length} parameters slightly outside reference limits.`,
    testItems,
    questionsForDoctor: [
      'Do the reported values require medication adjustment or dietary changes?',
      'When should a follow-up lab test be repeated to monitor trends?',
      'Are there specific lifestyle habits recommended based on these results?'
    ],
    suggestedSpecialty: isECG ? 'Cardiology' : (isThyroid ? 'Endocrinology' : 'General Medicine'),
    disclaimer: 'Reference ranges vary by laboratory and patient context. This explanation is informational and should be reviewed with a healthcare professional.'
  };
}

export function generateReportSummary(reportTitle: string, reportType: string = 'Blood Test') {
  const analysis = analyzeMedicalReport(reportTitle, reportType);
  return {
    summary: {
      reportType: analysis.reportType,
      keyInformation: analysis.testItems.map(t => `${t.testName}: ${t.value} ${t.unit || ''} (${t.status})`),
      simpleExplanation: analysis.summaryText,
      potentialSpecialty: analysis.suggestedSpecialty,
      questionsForDoctor: analysis.questionsForDoctor,
      abnormalValues: analysis.testItems.filter(t => t.status !== 'within').map(t => `${t.testName} (${t.value})`),
      disclaimer: analysis.disclaimer,
      testItems: analysis.testItems
    },
    analysis
  };
}

