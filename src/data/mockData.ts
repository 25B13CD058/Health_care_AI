import { MedicalSpecialty, Doctor, Hospital, Medicine, PatientProfile, Appointment, HealthRecord, HealthReminder, AppNotification, FamilyMember, TimelineItem, DiagnosticCenter, MedicineInfo, DemoDoctor } from '../types';

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-me',
    name: 'Rahul Verma (Me)',
    relation: 'Self',
    avatar: '👩',
    age: 34,
    gender: 'Male',
    bloodGroup: 'B Positive (B+)',
    allergies: ['Penicillin Antibiotics', 'Dust Mites'],
    currentMedications: ['Metformin SR 500mg (Daily)', 'Vitamin D3 60k IU'],
    medicalHistory: ['Type 2 Diabetes Mellitus', 'Mild Rhinitis']
  },
  {
    id: 'fam-father',
    name: 'Ramesh Verma',
    relation: 'Father',
    avatar: '👨',
    age: 64,
    gender: 'Male',
    bloodGroup: 'O Positive (O+)',
    allergies: ['Sulfa Drugs'],
    currentMedications: ['Amlodipine 5mg (BP)', 'Atorvastatin 10mg'],
    medicalHistory: ['Hypertension', 'Mild Osteoarthritis']
  },
  {
    id: 'fam-mother',
    name: 'Kavita Verma',
    relation: 'Mother',
    avatar: '👩',
    age: 60,
    gender: 'Female',
    bloodGroup: 'A Positive (A+)',
    allergies: ['None Reported'],
    currentMedications: ['Thyronorm 50mcg (Thyroid)'],
    medicalHistory: ['Hypothyroidism']
  },
  {
    id: 'fam-child',
    name: 'Ananya Verma',
    relation: 'Daughter (Child)',
    avatar: '👧',
    age: 6,
    gender: 'Female',
    bloodGroup: 'B Positive (B+)',
    allergies: ['Peanuts'],
    currentMedications: ['Multivitamin Syrup'],
    medicalHistory: ['Pediatric Asthma (Mild)']
  },
  {
    id: 'fam-grandparent',
    name: 'Suryanarayana Verma',
    relation: 'Grandfather',
    avatar: '👴',
    age: 84,
    gender: 'Male',
    bloodGroup: 'AB Positive (AB+)',
    allergies: ['NSAIDs / Aspirin'],
    currentMedications: ['Ecosprin 75mg', 'Telmisartan 40mg'],
    medicalHistory: ['Coronary Stent (2020)', 'Cataract Surgery']
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'tl-1',
    date: '15 Jan 2026',
    month: 'Jan',
    year: '2026',
    title: 'Comprehensive Lipid & Fasting Blood Panel',
    category: 'report',
    details: 'Total Cholesterol 215 mg/dL, Fasting Sugar 118 mg/dL. Pre-diabetic review.',
    doctorName: 'Dr. Mohammed Farooq'
  },
  {
    id: 'tl-2',
    date: '28 Feb 2026',
    month: 'Feb',
    year: '2026',
    title: 'Cardiology OPD Consultation',
    category: 'consultation',
    details: 'Routine ECG & Echo evaluation. LVEF 62% normal sinus rhythm.',
    doctorName: 'Dr. Ananya Rao'
  },
  {
    id: 'tl-3',
    date: '10 May 2026',
    month: 'May',
    year: '2026',
    title: 'Dermatology Skin Rash Consultation',
    category: 'appointment',
    details: 'Prescribed Tacrolimus ointment for localized allergic dermatitis.',
    doctorName: 'Dr. Priya Sharma'
  },
  {
    id: 'tl-4',
    date: '18 Jul 2026',
    month: 'Jul',
    year: '2026',
    title: 'Pharmacy Express Order #CA-9021',
    category: 'prescription',
    details: 'Metformin SR 500mg strip & Vitamin D3 60k capsules delivered.',
  },
  {
    id: 'tl-5',
    date: '12 Sep 2026',
    month: 'Sep',
    year: '2026',
    title: 'Thyroid Function & TSH Lab Panel',
    category: 'lab',
    details: 'TSH 2.8 uIU/mL within normal reference limits.',
    doctorName: 'Dr. Sneha Mukherjee'
  },
  {
    id: 'tl-6',
    date: '02 Oct 2026',
    month: 'Oct',
    year: '2026',
    title: 'CareAI Symptom Navigator & Follow-up',
    category: 'consultation',
    details: 'Current active consultation schedule with Dr. Ananya Rao.',
    doctorName: 'Dr. Ananya Rao'
  }
];

export const SPECIALTIES: MedicalSpecialty[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    iconName: 'Stethoscope',
    description: 'Comprehensive primary care, fever, viral infections, and chronic disease management.',
    doctorCount: 42,
    hospitalCount: 18,
    commonSymptoms: ['Fever', 'Fatigue', 'Body ache', 'Weakness', 'Cough', 'Chills']
  },
  {
    id: 'gynecology',
    name: 'Gynecology',
    iconName: 'UserCheck',
    description: 'Women’s reproductive health, pregnancy, hormonal health, and maternity care.',
    doctorCount: 28,
    hospitalCount: 14,
    commonSymptoms: ['Irregular periods', 'Pelvic pain', 'Pregnancy consultation', 'PCOS', 'Hormonal imbalance']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    iconName: 'Sparkles',
    description: 'Skin, hair, nail disorders, acne treatments, rashes, and cosmetic skin care.',
    doctorCount: 31,
    hospitalCount: 12,
    commonSymptoms: ['Skin rash', 'Acne', 'Hair fall', 'Itching', 'Eczema', 'Skin pigmentation']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    iconName: 'Brain',
    description: 'Brain, spinal cord, nerve disorders, severe headaches, migraines, and epilepsy.',
    doctorCount: 19,
    hospitalCount: 10,
    commonSymptoms: ['Severe headache', 'Dizziness', 'Numbness', 'Seizures', 'Memory loss', 'Tremors']
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    iconName: 'HeartPulse',
    description: 'Heart disease, chest pain evaluation, hypertension, and cardiovascular health.',
    doctorCount: 24,
    hospitalCount: 15,
    commonSymptoms: ['Chest pain', 'Shortness of breath', 'High blood pressure', 'Palpitations', 'Swollen feet']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    iconName: 'Baby',
    description: 'Medical care for infants, children, adolescents, vaccinations, and growth monitoring.',
    doctorCount: 35,
    hospitalCount: 16,
    commonSymptoms: ['Child fever', 'Child cough', 'Vomiting in kids', 'Poor appetite', 'Growth delay']
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics',
    iconName: 'Bone',
    description: 'Bones, joints, ligaments, fractures, back pain, and sports injuries.',
    doctorCount: 26,
    hospitalCount: 12,
    commonSymptoms: ['Joint pain', 'Back pain', 'Bone fracture', 'Knee stiffness', 'Shoulder pain']
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    iconName: 'Ear',
    description: 'Sinusitis, hearing issues, throat infections, tinnitus, and nasal allergies.',
    doctorCount: 22,
    hospitalCount: 11,
    commonSymptoms: ['Ear pain', 'Hearing loss', 'Sore throat', 'Blocked nose', 'Sinus pressure', 'Tinnitus']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    iconName: 'Eye',
    description: 'Eye health, vision testing, cataracts, glaucoma, and laser surgery.',
    doctorCount: 20,
    hospitalCount: 9,
    commonSymptoms: ['Blurred vision', 'Eye pain', 'Redness in eye', 'Dry eyes', 'Watering eyes']
  },
  {
    id: 'dentistry',
    name: 'Dentistry',
    iconName: 'Smile',
    description: 'Oral hygiene, toothache, root canal, dental aligners, and gum care.',
    doctorCount: 38,
    hospitalCount: 8,
    commonSymptoms: ['Toothache', 'Bleeding gums', 'Cavity', 'Sensitivity', 'Jaw pain']
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    iconName: 'Activity',
    description: 'Digestive system, stomach ulcers, acid reflux, liver, and bowel disorders.',
    doctorCount: 17,
    hospitalCount: 11,
    commonSymptoms: ['Abdominal pain', 'Acidity', 'Bloating', 'Indigestion', 'Diarrhea', 'Constipation']
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    iconName: 'Wind',
    description: 'Lungs, respiratory system, asthma, COPD, pneumonia, and chronic cough.',
    doctorCount: 15,
    hospitalCount: 10,
    commonSymptoms: ['Wheezing', 'Persistent cough', 'Breathlessness', 'Asthma attack', 'Chest congestion']
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    iconName: 'Droplet',
    description: 'Kidney function, chronic kidney disease, dialysis, and renal hypertension.',
    doctorCount: 12,
    hospitalCount: 8,
    commonSymptoms: ['Swelling in legs', 'Decreased urination', 'Foamy urine', 'Flank pain']
  },
  {
    id: 'urology',
    name: 'Urology',
    iconName: 'ShieldAlert',
    description: 'Urinary tract infections, kidney stones, prostate health, and bladder issues.',
    doctorCount: 14,
    hospitalCount: 9,
    commonSymptoms: ['Urinary pain', 'Frequent urination', 'Blood in urine', 'Kidney stone pain']
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology',
    iconName: 'Thermometer',
    description: 'Diabetes management, thyroid disorders, metabolism, and hormonal health.',
    doctorCount: 16,
    hospitalCount: 10,
    commonSymptoms: ['High blood sugar', 'Thyroid issues', 'Sudden weight loss/gain', 'Constant thirst']
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    iconName: 'BrainCircuit',
    description: 'Mental health diagnosis, depression, anxiety, insomnia, and psychiatric care.',
    doctorCount: 18,
    hospitalCount: 7,
    commonSymptoms: ['Severe anxiety', 'Depression', 'Sleep problems', 'Mood swings', 'Panic attacks']
  },
  {
    id: 'psychology',
    name: 'Psychology',
    iconName: 'HeartHandshake',
    description: 'Psychotherapy, behavioral counseling, stress management, and emotional support.',
    doctorCount: 25,
    hospitalCount: 6,
    commonSymptoms: ['Stress', 'Burnout', 'Relationship issues', 'Grief', 'Low self-esteem']
  },
  {
    id: 'oncology',
    name: 'Oncology',
    iconName: 'Crosshair',
    description: 'Cancer diagnosis, chemotherapy, radiation therapy, and surgical oncology.',
    doctorCount: 11,
    hospitalCount: 8,
    commonSymptoms: ['Unexplained lump', 'Unintentional weight loss', 'Chronic unexplained pain', 'Non-healing sore']
  },
  {
    id: 'hematology',
    name: 'Hematology',
    iconName: 'Droplets',
    description: 'Blood disorders, anemia, clotting issues, leukemia, and bone marrow care.',
    doctorCount: 9,
    hospitalCount: 6,
    commonSymptoms: ['Severe anemia', 'Easy bruising', 'Unexplained bleeding', 'Chronic fatigue']
  },
  {
    id: 'rheumatology',
    name: 'Rheumatology',
    iconName: 'Fingerprint',
    description: 'Autoimmune diseases, rheumatoid arthritis, lupus, and joint inflammation.',
    doctorCount: 10,
    hospitalCount: 7,
    commonSymptoms: ['Morning joint stiffness', 'Swollen joints', 'Unexplained fever with rash', 'Lupus symptoms']
  },
  {
    id: 'general-surgery',
    name: 'General Surgery',
    iconName: 'Scissors',
    description: 'Surgical interventions for hernia, gallbladder, appendix, and soft tissue care.',
    doctorCount: 22,
    hospitalCount: 13,
    commonSymptoms: ['Hernia pain', 'Gallstone attack', 'Appendix pain', 'Abdominal swelling']
  },
  {
    id: 'emergency-medicine',
    name: 'Emergency Medicine',
    iconName: 'Siren',
    description: 'Acute critical care, trauma, cardiac arrests, respiratory failure, and accidents.',
    doctorCount: 30,
    hospitalCount: 15,
    commonSymptoms: ['Severe chest pain', 'Trauma injury', 'Loss of consciousness', 'Severe bleeding', 'Stroke signs']
  },
  {
    id: 'radiology',
    name: 'Radiology',
    iconName: 'Scan',
    description: 'Diagnostic imaging, MRI, CT scans, ultrasound, and X-ray interpretations.',
    doctorCount: 16,
    hospitalCount: 12,
    commonSymptoms: ['Imaging consult', 'Ultrasound scan', 'MRI review', 'CT scan evaluation']
  },
  {
    id: 'anaesthesiology',
    name: 'Anaesthesiology',
    iconName: 'Syringe',
    description: 'Perioperative pain control, sedation, critical care, and chronic pain management.',
    doctorCount: 14,
    hospitalCount: 12,
    commonSymptoms: ['Pre-surgery evaluation', 'Chronic pain management', 'Epidural consult']
  },
  {
    id: 'infectious-disease',
    name: 'Infectious Disease',
    iconName: 'Bug',
    description: 'Complex viral, bacterial, fungal, tropical infections, and travel medicine.',
    doctorCount: 8,
    hospitalCount: 7,
    commonSymptoms: ['High fever with chills', 'Dengue/Malaria symptoms', 'Persistent unexplained infection']
  },
  {
    id: 'geriatrics',
    name: 'Geriatrics',
    iconName: 'Users',
    description: 'Specialized medical care for elderly patients, dementia, and age-related mobility.',
    doctorCount: 9,
    hospitalCount: 6,
    commonSymptoms: ['Elderly fall risk', 'Frailty', 'Age-related memory decline', 'Multiple medication review']
  },
  {
    id: 'plastic-surgery',
    name: 'Plastic Surgery',
    iconName: 'Sparkle',
    description: 'Reconstructive surgery, burn restoration, wound repair, and aesthetic procedures.',
    doctorCount: 12,
    hospitalCount: 8,
    commonSymptoms: ['Burn wound care', 'Scar revision', 'Reconstructive surgery', 'Laceration repair']
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Apollo Health City (Demo Facility)',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    address: 'Road No. 92, Jubilee Hills, Hyderabad, Telangana',
    lat: 17.4325,
    lng: 78.4070,
    distance: '2.4 km',
    distanceKm: 2.4,
    emergencyAvailable: true,
    edOvercrowding: 'Low',
    edWaitTime: '~15 mins',
    rating: 4.9,
    doctorsAvailable: 48,
    openStatus: 'Open 24/7',
    contact: '+91 40 2360 7777',
    availableBeds: { icu: 14, general: 42, emergency: 8 },
    ambulanceAvailable: true,
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Orthopaedics', 'Pediatrics', 'Emergency Medicine'],
    departments: ['24x7 Trauma & Emergency', 'Cardiovascular Institute', 'Neurosciences Center', 'Organ Transplant Wing'],
    facilities: ['Advanced Cath Lab', '3.0T MRI', '24x7 Blood Bank', 'Helipad Trauma Unit', 'AICU'],
    facilityType: 'hospital'
  },
  {
    id: 'hosp-2',
    name: 'KIMS Hospitals (Demo Facility)',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    address: 'Minister Road, Begumpet / Gachibowli Node, Hyderabad',
    lat: 17.4435,
    lng: 78.3772,
    distance: '4.1 km',
    distanceKm: 4.1,
    emergencyAvailable: true,
    edOvercrowding: 'Moderate',
    edWaitTime: '~25 mins',
    rating: 4.8,
    doctorsAvailable: 36,
    openStatus: 'Open 24/7',
    contact: '+91 40 4488 5000',
    availableBeds: { icu: 9, general: 30, emergency: 4 },
    ambulanceAvailable: true,
    specialties: ['Gastroenterology', 'Pulmonology', 'Nephrology', 'General Surgery', 'Cardiology'],
    departments: ['Institute of Gastric Sciences', 'Pulmonary Critical Care', 'Renal Transplant Unit'],
    facilities: ['Robotic Surgery Unit', 'Dialysis 24x7', 'ECMO Support', 'Pharmacy 24x7'],
    facilityType: 'hospital'
  },
  {
    id: 'hosp-3',
    name: 'Yashoda Super Specialty Hospital (Demo Facility)',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    address: 'Raj Bhavan Road, Somajiguda / HITECH City, Hyderabad',
    lat: 17.4260,
    lng: 78.4530,
    distance: '3.2 km',
    distanceKm: 3.2,
    emergencyAvailable: true,
    edOvercrowding: 'Low',
    edWaitTime: '~10 mins',
    rating: 4.7,
    doctorsAvailable: 40,
    openStatus: 'Open 24/7',
    contact: '+91 40 4567 4567',
    availableBeds: { icu: 18, general: 55, emergency: 12 },
    ambulanceAvailable: true,
    specialties: ['Neurology', 'Cardiology', 'Emergency Medicine', 'Orthopaedics', 'ENT'],
    departments: ['Stroke & Epilepsy Center', 'Comprehensive Heart Failure Clinic', 'Level-1 Trauma Unit'],
    facilities: ['PET-CT Scan', 'Cath Lab', 'Level-3 NICU', 'Dedicated Stroke ER'],
    facilityType: 'emergency'
  },
  {
    id: 'hosp-4',
    name: 'Care Hospitals (Demo Facility)',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80',
    address: 'Old Mumbai Highway, Gachibowli, Hyderabad',
    lat: 17.4380,
    lng: 78.3610,
    distance: '5.6 km',
    distanceKm: 5.6,
    emergencyAvailable: true,
    edOvercrowding: 'High',
    edWaitTime: '~40 mins',
    rating: 4.6,
    doctorsAvailable: 29,
    openStatus: 'Open 24/7',
    contact: '+91 40 6165 6565',
    availableBeds: { icu: 4, general: 15, emergency: 2 },
    ambulanceAvailable: true,
    specialties: ['Dermatology', 'Gynecology', 'Pediatrics', 'General Medicine', 'Endocrinology'],
    departments: ['Women & Child Institute', 'Diabetes & Endocrine Clinic', 'Cosmetic Dermatology'],
    facilities: ['Neonatal ICU', 'Labor Suites', 'Laser Dermatology Suite', 'Express OPD'],
    facilityType: 'hospital'
  },
  {
    id: 'hosp-5',
    name: 'Continental Hospitals (Demo Facility)',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    address: 'Financial District, Nanakramguda, Hyderabad',
    lat: 17.4140,
    lng: 78.3440,
    distance: '7.2 km',
    distanceKm: 7.2,
    emergencyAvailable: true,
    edOvercrowding: 'Low',
    edWaitTime: '~12 mins',
    rating: 4.9,
    doctorsAvailable: 52,
    openStatus: 'Open 24/7',
    contact: '+91 40 6700 0000',
    availableBeds: { icu: 22, general: 70, emergency: 15 },
    ambulanceAvailable: true,
    specialties: ['Oncology', 'Cardiology', 'Rheumatology', 'Nephrology', 'Urology', 'Radiology'],
    departments: ['Integrated Cancer Center', 'Comprehensive Kidney Care', 'Joint Replacement Institute'],
    facilities: ['TrueBeam LINAC Radiation', 'Modular OTs', '24x7 Emergency Cardiac Bay'],
    facilityType: 'hospital'
  },
  {
    id: 'hosp-6',
    name: 'Rainbow Children’s Hospital & BirthRight (Demo Facility)',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    address: 'Banjara Hills Road No. 2, Hyderabad',
    lat: 17.4200,
    lng: 78.4350,
    distance: '3.8 km',
    distanceKm: 3.8,
    emergencyAvailable: true,
    edOvercrowding: 'Low',
    edWaitTime: '~15 mins',
    rating: 4.9,
    doctorsAvailable: 32,
    openStatus: 'Open 24/7',
    contact: '+91 40 4488 8888',
    availableBeds: { icu: 15, general: 40, emergency: 6 },
    ambulanceAvailable: true,
    specialties: ['Pediatrics', 'Gynecology', 'Genetics', 'Pediatric Surgery'],
    departments: ['Pediatric ICU (PICU)', 'High Risk Pregnancy Unit', 'Pediatric Cardiology'],
    facilities: ['Pediatric Transport Ambulance', 'Fetal Medicine Center', 'Child Psychology Suite'],
    facilityType: 'hospital'
  },
  {
    id: 'hosp-7',
    name: 'Apollo 24x7 Express Pharmacy & Diagnostics (Demo Hub)',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    address: 'Jubilee Hills Road No. 36, Hyderabad',
    lat: 17.4350,
    lng: 78.4010,
    distance: '1.2 km',
    distanceKm: 1.2,
    emergencyAvailable: false,
    edOvercrowding: 'Low',
    edWaitTime: '0 mins',
    rating: 4.8,
    doctorsAvailable: 4,
    openStatus: 'Open 24/7',
    contact: '+91 40 2470 2470',
    availableBeds: { icu: 0, general: 0, emergency: 0 },
    ambulanceAvailable: true,
    specialties: ['General Medicine', 'Radiology', 'Pathology'],
    departments: ['Express Pharmacy Desk', 'Pathology & Blood Diagnostics'],
    facilities: ['24x7 Medicine Pickup', 'Home Blood Sample Collection', 'Cold Chain Storage'],
    facilityType: 'pharmacy'
  },
  {
    id: 'hosp-8',
    name: 'Vijaya Diagnostic Center (Demo Node)',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    address: 'Madhapur Main Road, HITECH City, Hyderabad',
    lat: 17.4480,
    lng: 78.3910,
    distance: '3.5 km',
    distanceKm: 3.5,
    emergencyAvailable: false,
    edOvercrowding: 'Low',
    edWaitTime: '0 mins',
    rating: 4.7,
    doctorsAvailable: 8,
    openStatus: 'Open 07:00 AM - 09:00 PM',
    contact: '+91 40 2340 0000',
    availableBeds: { icu: 0, general: 0, emergency: 0 },
    ambulanceAvailable: false,
    specialties: ['Radiology', 'Pathology', 'General Medicine'],
    departments: ['MRI & CT Suite', 'Ultrasound & Mammography', 'Blood Lab'],
    facilities: ['3.0T MRI', '128-Slice CT Scan', 'Fully Automated Blood Analyzer'],
    facilityType: 'diagnostic'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Rao (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    specialty: 'Cardiology',
    specialtyId: 'cardiology',
    qualifications: 'MBBS, MD (General Medicine), DM (Cardiology)',
    experience: 14,
    hospital: 'Apollo Health City (Demo Facility)',
    hospitalId: 'hosp-1',
    fee: 900,
    languages: ['English', 'Telugu', 'Hindi'],
    rating: 4.9,
    reviewCount: 1420,
    distance: '2.4 km away',
    distanceKm: 2.4,
    availability: 'Available Today',
    availableSlots: ['06:30 PM Today', '07:15 PM Today', '10:00 AM Tomorrow', '11:30 AM Tomorrow'],
    verified: true,
    outcomeMetric: 'Hospital-reported outcome metric: 98.4% successful cardiac interventions',
    clinicTimings: 'Mon - Sat: 09:00 AM - 05:30 PM',
    location: 'Jubilee Hills, Hyderabad',
    consultationTypes: ['In-person', 'Video Consultation']
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh K. Varma (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    specialty: 'Neurology',
    specialtyId: 'neurology',
    qualifications: 'MBBS, MD, DM (Neurology), Fellow (Stroke Medicine)',
    experience: 16,
    hospital: 'Yashoda Super Specialty Hospital (Demo Facility)',
    hospitalId: 'hosp-3',
    fee: 1000,
    languages: ['English', 'Hindi'],
    rating: 4.8,
    reviewCount: 980,
    distance: '3.2 km away',
    distanceKm: 3.2,
    availability: 'Available Today',
    availableSlots: ['07:00 PM Today', '08:00 PM Today', '09:30 AM Tomorrow'],
    verified: true,
    outcomeMetric: 'Verified treatment outcome data: 96.8% positive patient recovery rating',
    clinicTimings: 'Mon - Fri: 10:00 AM - 06:00 PM',
    location: 'Somajiguda, Hyderabad',
    consultationTypes: ['In-person', 'Video Consultation']
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Sharma (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1594824813571-2b533411efa0?auto=format&fit=crop&w=400&q=80',
    specialty: 'Dermatology',
    specialtyId: 'dermatology',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    experience: 9,
    hospital: 'Care Hospitals (Demo Facility)',
    hospitalId: 'hosp-4',
    fee: 700,
    languages: ['English', 'Telugu', 'Hindi'],
    rating: 4.9,
    reviewCount: 1150,
    distance: '5.6 km away',
    distanceKm: 5.6,
    availability: 'Available Today',
    availableSlots: ['06:00 PM Today', '06:45 PM Today', '11:00 AM Tomorrow'],
    verified: true,
    outcomeMetric: 'Hospital-reported outcome metric: 97.2% acne & eczema resolution rate',
    clinicTimings: 'Mon - Sat: 11:00 AM - 07:00 PM',
    location: 'Gachibowli, Hyderabad',
    consultationTypes: ['In-person', 'Video Consultation']
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikramaditya Reddy (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    specialty: 'Orthopaedics',
    specialtyId: 'orthopaedics',
    qualifications: 'MBBS, MS (Orthopaedics), M.Ch (UK), Fellowship Joint Replacement',
    experience: 18,
    hospital: 'Apollo Health City (Demo Facility)',
    hospitalId: 'hosp-1',
    fee: 1100,
    languages: ['English', 'Telugu'],
    rating: 4.9,
    reviewCount: 1680,
    distance: '2.4 km away',
    distanceKm: 2.4,
    availability: 'Available Tomorrow',
    availableSlots: ['09:00 AM Tomorrow', '10:30 AM Tomorrow', '02:00 PM Tomorrow'],
    verified: true,
    outcomeMetric: 'Verified treatment outcome data: 99.1% joint replacement mobility success',
    clinicTimings: 'Mon - Fri: 09:00 AM - 04:00 PM',
    location: 'Jubilee Hills, Hyderabad',
    consultationTypes: ['In-person']
  },
  {
    id: 'doc-5',
    name: 'Dr. Sunita Deshmukh (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80',
    specialty: 'Pediatrics',
    specialtyId: 'pediatrics',
    qualifications: 'MBBS, DCH, MD (Pediatrics), Fellowship Neonatology',
    experience: 12,
    hospital: 'Rainbow Children’s Hospital (Demo Facility)',
    hospitalId: 'hosp-6',
    fee: 800,
    languages: ['English', 'Hindi', 'Telugu'],
    rating: 4.9,
    reviewCount: 2100,
    distance: '3.8 km away',
    distanceKm: 3.8,
    availability: 'Available Today',
    availableSlots: ['06:15 PM Today', '07:30 PM Today', '10:00 AM Tomorrow'],
    verified: true,
    outcomeMetric: 'Hospital-reported outcome metric: 99.4% pediatric immunization & recovery index',
    clinicTimings: 'Mon - Sat: 09:00 AM - 08:00 PM',
    location: 'Banjara Hills, Hyderabad',
    consultationTypes: ['In-person', 'Video Consultation']
  },
  {
    id: 'doc-6',
    name: 'Dr. Karthik Sundaram (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    specialty: 'Gastroenterology',
    specialtyId: 'gastroenterology',
    qualifications: 'MBBS, MD (General Med), DM (Gastroenterology)',
    experience: 15,
    hospital: 'KIMS Hospitals (Demo Facility)',
    hospitalId: 'hosp-2',
    fee: 950,
    languages: ['English', 'Telugu', 'Hindi'],
    rating: 4.8,
    reviewCount: 840,
    distance: '4.1 km away',
    distanceKm: 4.1,
    availability: 'Available Tomorrow',
    availableSlots: ['10:00 AM Tomorrow', '12:00 PM Tomorrow', '04:00 PM Tomorrow'],
    verified: true,
    outcomeMetric: 'Outcome data unavailable',
    clinicTimings: 'Mon - Sat: 10:00 AM - 05:00 PM',
    location: 'Begumpet, Hyderabad',
    consultationTypes: ['In-person', 'Video Consultation']
  },
  {
    id: 'doc-7',
    name: 'Dr. Sneha Mukherjee (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80',
    specialty: 'Endocrinology',
    specialtyId: 'endocrinology',
    qualifications: 'MBBS, MD (Med), DM (Endocrinology - AIIMS)',
    experience: 11,
    hospital: 'Care Hospitals (Demo Facility)',
    hospitalId: 'hosp-4',
    fee: 850,
    languages: ['English', 'Hindi'],
    rating: 4.7,
    reviewCount: 620,
    distance: '5.6 km away',
    distanceKm: 5.6,
    availability: 'Available Today',
    availableSlots: ['07:00 PM Today', '08:00 PM Today', '11:00 AM Tomorrow'],
    verified: true,
    outcomeMetric: 'Verified treatment outcome data: 95.9% HbA1c target achievement rate',
    clinicTimings: 'Mon - Sat: 09:30 AM - 05:30 PM',
    location: 'Gachibowli, Hyderabad',
    consultationTypes: ['In-person', 'Video Consultation']
  },
  {
    id: 'doc-8',
    name: 'Dr. Mohammed Farooq (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    specialty: 'General Medicine',
    specialtyId: 'general-medicine',
    qualifications: 'MBBS, MD (Internal Medicine)',
    experience: 20,
    hospital: 'Apollo Health City (Demo Facility)',
    hospitalId: 'hosp-1',
    fee: 600,
    languages: ['English', 'Telugu', 'Hindi', 'Urdu'],
    rating: 4.9,
    reviewCount: 2450,
    distance: '2.4 km away',
    distanceKm: 2.4,
    availability: 'Available Today',
    availableSlots: ['06:00 PM Today', '06:30 PM Today', '07:00 PM Today'],
    verified: true,
    outcomeMetric: 'Hospital-reported outcome metric: 98.9% acute fever diagnostic accuracy',
    clinicTimings: 'Mon - Sun: 08:00 AM - 09:00 PM',
    location: 'Jubilee Hills, Hyderabad',
    consultationTypes: ['In-person', 'Video Consultation']
  },
  {
    id: 'doc-9',
    name: 'Dr. Suresh Emergency Director (Demo Doctor)',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    specialty: 'Emergency Medicine',
    specialtyId: 'emergency-medicine',
    qualifications: 'MBBS, MEM (GWU-USA), Fellowship Trauma & Resuscitation',
    experience: 15,
    hospital: 'Continental Hospitals (Demo Facility)',
    hospitalId: 'hosp-5',
    fee: 1200,
    languages: ['English', 'Telugu', 'Hindi'],
    rating: 4.9,
    reviewCount: 890,
    distance: '7.2 km away',
    distanceKm: 7.2,
    availability: 'Available Today',
    availableSlots: ['Immediate ER Consultation', '06:00 PM Today'],
    verified: true,
    outcomeMetric: 'Hospital-reported outcome metric: Level-1 trauma response time under 3 minutes',
    clinicTimings: '24x7 Emergency Duty',
    location: 'Financial District, Hyderabad',
    consultationTypes: ['In-person']
  }
];

export const MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Dolo 650mg Paracetamol',
    category: 'Fever & Pain Relief',
    price: 32,
    prescriptionRequired: false,
    usage: 'Generally used to relieve fever and mild to moderate pain (headache, body ache). Take 1 tablet after meals as advised by doctor.',
    sideEffects: ['Nausea (rare)', 'Mild skin rash (rare)'],
    precautions: ['Do not exceed 4 tablets in 24 hours', 'Consult doctor if liver condition exists', 'Avoid alcohol while taking paracetamol'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    stock: 120,
    unit: 'Strip of 15 tablets'
  },
  {
    id: 'med-2',
    name: 'Augmentin 625 Duo (Amoxicillin + Clavulanate)',
    category: 'Antibiotic',
    price: 210,
    prescriptionRequired: true,
    usage: 'Broad-spectrum antibiotic used for bacterial respiratory, sinus, or skin infections. MUST be taken ONLY under valid doctor prescription.',
    sideEffects: ['Mild diarrhea', 'Nausea', 'Abdominal discomfort'],
    precautions: ['Requires doctor prescription', 'Complete full prescribed course', 'Inform doctor of penicillin allergies'],
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80',
    stock: 45,
    unit: 'Strip of 10 tablets'
  },
  {
    id: 'med-3',
    name: 'Allegra 120mg (Fexofenadine)',
    category: 'Allergy & Cold',
    price: 185,
    prescriptionRequired: false,
    usage: 'Non-drowsy antihistamine for allergic rhinitis, sneezing, watery eyes, and skin itching.',
    sideEffects: ['Headache (mild)', 'Drowsiness (rare)'],
    precautions: ['Take with water', 'Do not take with fruit juices like grapefruit or orange'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    stock: 90,
    unit: 'Strip of 10 tablets'
  },
  {
    id: 'med-4',
    name: 'Pantocid 40mg (Pantoprazole)',
    category: 'Acid Reflux & Stomach',
    price: 140,
    prescriptionRequired: false,
    usage: 'Proton pump inhibitor used to reduce excess stomach acid, acidity, and heartburn. Take on an empty stomach in the morning.',
    sideEffects: ['Headache', 'Flatulence', 'Mild diarrhea'],
    precautions: ['Best taken 30 minutes before breakfast', 'Consult doctor for long-term use'],
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80',
    stock: 80,
    unit: 'Strip of 15 tablets'
  },
  {
    id: 'med-5',
    name: 'Glycomet SR 500mg (Metformin)',
    category: 'Diabetes Care',
    price: 55,
    prescriptionRequired: true,
    usage: 'First-line medication for Type 2 Diabetes to regulate blood glucose levels. MUST be prescribed by a licensed physician.',
    sideEffects: ['Gastrointestinal upset', 'Metallic taste'],
    precautions: ['Prescription mandatory', 'Take with meals to minimize stomach upset', 'Regular kidney function monitoring required'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    stock: 150,
    unit: 'Strip of 15 tablets'
  },
  {
    id: 'med-6',
    name: 'Asthalin HFA Inhaler (Salbutamol 100mcg)',
    category: 'Respiratory Care',
    price: 165,
    prescriptionRequired: true,
    usage: 'Quick-relief rescue bronchodilator for acute asthma wheezing and bronchospasm.',
    sideEffects: ['Mild tremors', 'Increased heart rate'],
    precautions: ['Prescription required', 'Rinse mouth after use if combined with steroids', 'Seek ER if inhaler fails to give relief'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    stock: 35,
    unit: 'Inhaler Device (200 puffs)'
  },
  {
    id: 'med-7',
    name: 'Electral ORS Oral Rehydration Powder',
    category: 'Hydration & Wellness',
    price: 22,
    prescriptionRequired: false,
    usage: 'WHO recommended oral rehydration salts formula for restoring electrolyte balance during diarrhea, vomiting, or heavy sweating.',
    sideEffects: ['None expected when reconstituted correctly'],
    precautions: ['Mix entire sachet in 1 liter of clean drinking water', 'Use within 24 hours of mixing'],
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80',
    stock: 300,
    unit: 'Sachet of 21.8g'
  },
  {
    id: 'med-8',
    name: 'Becosules Z Capsules (Vitamin B-Complex + Zinc)',
    category: 'Vitamins & Supplements',
    price: 48,
    prescriptionRequired: false,
    usage: 'Multivitamin supplement for mouth ulcers, immune health, tissue repair, and energy recovery.',
    sideEffects: ['Bright yellow urine (harmless B2 excretion)'],
    precautions: ['Take after meals with water', 'Do not exceed recommended daily dose'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    stock: 200,
    unit: 'Strip of 20 capsules'
  }
];

export const PATIENT_PROFILE: PatientProfile = {
  name: 'Rahul Verma',
  age: 34,
  gender: 'Male',
  bloodGroup: 'B Positive (B+)',
  emergencyContact: {
    name: 'Sunita Verma',
    relation: 'Wife',
    phone: '+91 98765 43210'
  },
  location: 'Jubilee Hills, Hyderabad, Telangana',
  allergies: ['Penicillin Antibiotics', 'Dust Mites'],
  currentMedications: ['Metformin SR 500mg (Daily Morning)', 'Vitamin D3 60k IU (Weekly)'],
  medicalHistory: ['Type 2 Diabetes Mellitus (Diagnosed 2022)', 'Mild Allergic Rhinitis']
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    doctorId: 'doc-1',
    doctorName: 'Dr. Ananya Rao (Demo Doctor)',
    doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    specialty: 'Cardiology',
    hospital: 'Apollo Health City (Demo Facility)',
    date: 'Tomorrow, 10:30 AM',
    time: '10:30 AM',
    consultationType: 'In-person',
    fee: 900,
    status: 'Upcoming',
    memberId: 'fam-me'
  },
  {
    id: 'apt-102',
    doctorId: 'doc-3',
    doctorName: 'Dr. Priya Sharma (Demo Doctor)',
    doctorPhoto: 'https://images.unsplash.com/photo-1594824813571-2b533411efa0?auto=format&fit=crop&w=400&q=80',
    specialty: 'Dermatology',
    hospital: 'Care Hospitals (Demo Facility)',
    date: '20 Sep 2026',
    time: '04:00 PM',
    consultationType: 'Video Consultation',
    fee: 700,
    status: 'Completed',
    memberId: 'fam-me'
  }
];

export const INITIAL_RECORDS: HealthRecord[] = [
  {
    id: 'rec-201',
    title: 'Comprehensive Lipid & Thyroid Blood Panel',
    type: 'Blood Test',
    uploadedDate: '28 Sep 2026',
    fileSize: '1.4 MB',
    doctorName: 'Dr. Mohammed Farooq',
    memberId: 'fam-me',
    summary: {
      reportType: 'Comprehensive Blood & Lipid Panel Report',
      keyInformation: [
        'Total Cholesterol: 215 mg/dL (Mildly elevated, reference < 200 mg/dL)',
        'HbA1c: 6.6% (Consistent with controlled Type 2 Diabetes)',
        'TSH Thyroid Level: 2.8 uIU/mL (Normal range 0.4 - 4.2 uIU/mL)',
        'Fasting Blood Glucose: 118 mg/dL'
      ],
      simpleExplanation: 'Your blood panel shows that your thyroid function (TSH) is normal, while your blood sugar and total cholesterol levels are slightly above standard reference limits. This indicates well-controlled diabetes with room for mild cholesterol optimization.',
      abnormalValues: [
        'Total Cholesterol (215 mg/dL)',
        'Fasting Blood Sugar (118 mg/dL)'
      ],
      potentialSpecialty: 'Endocrinology / Cardiology',
      questionsForDoctor: [
        'Should I adjust my Metformin dosage based on HbA1c 6.6%?',
        'Are dietary modifications sufficient for total cholesterol 215 mg/dL or is a statin recommended?'
      ],
      disclaimer: 'CareAI educational summary preview only. Does not replace formal clinical lab report evaluation by your treating doctor.'
    }
  },
  {
    id: 'rec-202',
    title: 'ECG & Echocardiogram Report',
    type: 'Lab Report',
    uploadedDate: '15 Aug 2026',
    fileSize: '2.8 MB',
    doctorName: 'Dr. Ananya Rao',
    memberId: 'fam-me',
    summary: {
      reportType: 'Diagnostic Echocardiography & Cardiac ECG Scan',
      keyInformation: [
        'Normal Sinus Rhythm at 72 bpm',
        'Left Ventricular Ejection Fraction (LVEF): 62% (Preserved normal systolic function)',
        'No regional wall motion abnormality observed'
      ],
      simpleExplanation: 'Your cardiac echo scan shows normal heart muscle contraction with healthy blood pumping capability (LVEF 62%) and no signs of heart muscle weakness.',
      abnormalValues: ['None detected'],
      potentialSpecialty: 'Cardiology',
      questionsForDoctor: [
        'Is routine annual screening recommended given family cardiac history?'
      ],
      disclaimer: 'CareAI educational summary preview only. Does not replace formal clinical lab report evaluation by your treating doctor.'
    }
  }
];

export const INITIAL_REMINDERS: HealthReminder[] = [
  {
    id: 'rem-1',
    title: 'Take Metformin SR 500mg after breakfast',
    time: '08:30 AM Today',
    category: 'medicine',
    completed: true
  },
  {
    id: 'rem-2',
    title: 'Cardiology Follow-up Appointment with Dr. Ananya Rao',
    time: '10:30 AM Tomorrow',
    category: 'appointment',
    completed: false
  },
  {
    id: 'rem-3',
    title: 'Fasting Lipid Profile Lab Test at Apollo Diagnostics',
    time: '07:00 AM Oct 05, 2026',
    category: 'lab',
    completed: false
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Appointment Confirmed',
    message: 'Your Cardiology consultation with Dr. Ananya Rao is scheduled for Tomorrow at 10:30 AM.',
    time: '10 mins ago',
    read: false,
    category: 'appointment'
  },
  {
    id: 'notif-2',
    title: 'Medicine Order Dispatched',
    message: 'Order #CA-10294 assigned to delivery partner Rahul K. (ETA 25 mins).',
    time: '1 hour ago',
    read: false,
    category: 'medicine'
  },
  {
    id: 'notif-3',
    title: 'AI Lab Report Analysis Ready',
    message: 'Your uploaded Blood Panel report has been parsed into an educational summary.',
    time: 'Yesterday',
    read: true,
    category: 'report'
  }
];

export const DIAGNOSTIC_CENTERS: DiagnosticCenter[] = [
  {
    id: 'diag-1',
    name: 'Apollo Diagnostics & Advanced Imaging',
    address: 'Road No. 36, Jubilee Hills, Near Metro Pillar 1655',
    area: 'Jubilee Hills',
    city: 'Hyderabad',
    distanceKm: 1.2,
    lat: 17.4320,
    lng: 78.4070,
    phone: '+91 40 2360 7777',
    rating: 4.8,
    reviewCount: 340,
    services: ['CT Scan', 'MRI', 'X-Ray', 'Ultrasound', 'PET Scan', 'Diagnostic Lab'],
    operatingHours: 'Open 24/7 for Emergencies',
    accreditation: 'NABL & NABH Accredited'
  },
  {
    id: 'diag-2',
    name: 'Vijaya Diagnostic Centre (Banjara Hills Hub)',
    address: 'Street No. 1, Banjara Hills, Opposite Care Hospital',
    area: 'Banjara Hills',
    city: 'Hyderabad',
    distanceKm: 2.8,
    lat: 17.4150,
    lng: 78.4420,
    phone: '+91 40 2342 0422',
    rating: 4.7,
    reviewCount: 512,
    services: ['CT Scan', 'MRI', 'X-Ray', 'Ultrasound', 'Diagnostic Lab'],
    operatingHours: '06:00 AM – 10:00 PM',
    accreditation: 'CAP & NABL Accredited'
  },
  {
    id: 'diag-3',
    name: 'Lucid Medical Diagnostics & CT Center',
    address: 'Financial District, Gachibowli Main Rd, Near Wipro Circle',
    area: 'Gachibowli',
    city: 'Hyderabad',
    distanceKm: 4.1,
    lat: 17.4400,
    lng: 78.3480,
    phone: '+91 40 4488 9900',
    rating: 4.6,
    reviewCount: 220,
    services: ['CT Scan', 'MRI', 'Ultrasound', 'X-Ray', 'Diagnostic Lab'],
    operatingHours: '07:00 AM – 09:30 PM',
    accreditation: 'NABL Accredited'
  },
  {
    id: 'diag-4',
    name: 'Elbit Medical Diagnostics (HITECH City)',
    address: 'Mindspace IT Park Road, HITECH City',
    area: 'HITECH City',
    city: 'Hyderabad',
    distanceKm: 3.5,
    lat: 17.4480,
    lng: 78.3810,
    phone: '+91 40 6767 8888',
    rating: 4.9,
    reviewCount: 410,
    services: ['CT Scan', 'PET Scan', 'MRI', 'X-Ray', 'Diagnostic Lab'],
    operatingHours: 'Open 24/7',
    accreditation: 'NABL & ISO 9001'
  },
  {
    id: 'diag-5',
    name: 'Tenet Diagnostics & 128-Slice CT',
    address: '100 Feet Road, Madhapur, Near Ayyappa Society',
    area: 'Madhapur',
    city: 'Hyderabad',
    distanceKm: 2.1,
    lat: 17.4485,
    lng: 78.3910,
    phone: '+91 40 4567 8900',
    rating: 4.5,
    reviewCount: 180,
    services: ['CT Scan', 'X-Ray', 'Ultrasound', 'Diagnostic Lab'],
    operatingHours: '06:30 AM – 10:00 PM',
    accreditation: 'NABL Accredited'
  },
  {
    id: 'diag-6',
    name: 'Suburban Diagnostics & Imaging Center',
    address: 'Raj Bhavan Road, Somajiguda',
    area: 'Somajiguda',
    city: 'Hyderabad',
    distanceKm: 5.4,
    lat: 17.4250,
    lng: 78.4590,
    phone: '+91 40 2331 4455',
    rating: 4.7,
    reviewCount: 290,
    services: ['CT Scan', 'MRI', 'PET Scan', 'Ultrasound', 'Diagnostic Lab'],
    operatingHours: '07:00 AM – 09:00 PM',
    accreditation: 'NABL Accredited'
  }
];

export const EXPANDED_MEDICINES: MedicineInfo[] = [
  {
    id: 'med-pcm',
    name: 'Paracetamol 500mg / 650mg',
    genericName: 'Paracetamol (Acetaminophen)',
    category: 'Pain/fever',
    form: 'Tablet',
    otcOrPrescription: 'Over-The-Counter (OTC)',
    commonUses: [
      'Temporary relief of mild-to-moderate fever',
      'Relief of headache, muscle ache, and toothache',
      'Symptomatic discomfort during cold or viral illness'
    ],
    generalPrecautions: [
      'Do not exceed 4,000 mg (4 grams) total per day in adults.',
      'Take with plain water; can be taken with or after food.',
      'Maintain an interval of at least 4 to 6 hours between doses.'
    ],
    sideEffects: [
      'Nausea or abdominal discomfort (rare at recommended doses)',
      'Allergic skin rash (infrequent)'
    ],
    warnings: [
      'LIVER SAFETY: Severe liver damage may occur if exceeding maximum daily dose or combined with heavy alcohol intake.',
      'Avoid taking concurrently with other cough/cold formulations containing acetaminophen/paracetamol.',
      'Consult a physician if fever persists beyond 3 days or pain exceeds 5 days.'
    ],
    interactions: [
      'Warfarin / blood thinners (long-term high dose PCM may enhance anticoagulant effect)',
      'Alcohol (increases hepatic toxicity risk)'
    ],
    symptomsSupported: ['fever', 'headache', 'body ache', 'pain', 'cold', 'toothache']
  },
  {
    id: 'med-cet',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Allergy',
    form: 'Tablet',
    otcOrPrescription: 'Over-The-Counter (OTC)',
    commonUses: [
      'Relief of allergic rhinitis (sneezing, runny nose, nasal itching)',
      'Relief of watery, itchy eyes caused by seasonal allergies',
      'Management of hives (urticaria) and allergic skin itching'
    ],
    generalPrecautions: [
      'Usually taken once daily, preferably in the evening due to mild sedative potential.',
      'Use caution when driving or operating machinery until individual response is known.'
    ],
    sideEffects: [
      'Mild drowsiness or tiredness',
      'Dry mouth',
      'Mild dizziness'
    ],
    warnings: [
      'KIDNEY IMPAIRMENT: Dosage adjustment required for patients with moderate-to-severe renal disease.',
      'ELDERLY USERS: Elderly patients may experience increased anticholinergic sensitivity or sedation.',
      'Avoid co-administration with alcohol or CNS depressants.'
    ],
    interactions: [
      'Sedatives, tranquilizers, and alcohol (additive drowsiness effect)'
    ],
    symptomsSupported: ['allergy', 'sneezing', 'runny nose', 'skin rash', 'itching', 'hives', 'watery eyes']
  },
  {
    id: 'med-ors',
    name: 'ORS (Oral Rehydration Salts)',
    genericName: 'WHO-Formulated Oral Rehydration Solution (Sodium, Potassium, Glucose, Citrate)',
    category: 'Oral rehydration',
    form: 'Sachet / Powder',
    otcOrPrescription: 'Over-The-Counter (OTC)',
    commonUses: [
      'Prevention and treatment of mild-to-moderate dehydration due to diarrhea or acute gastroenteritis',
      'Electrolyte restoration following heavy exertion, heat exhaustion, or vomiting'
    ],
    generalPrecautions: [
      'Dissolve 1 full sachet in exactly 1 Liter of clean drinking water.',
      'Do not boil the prepared ORS solution.',
      'Discard any unused prepared solution after 24 hours.'
    ],
    sideEffects: [
      'Puffiness around eyes if overconsumed in short duration (rare)'
    ],
    warnings: [
      'SEVERE DEHYDRATION: If patient exhibits extreme lethargy, sunken eyes, inability to drink, or continuous vomiting, seek immediate emergency IV fluid medical care.',
      'KIDNEY DISEASE: Patients with severe renal impairment or hyperkalemia must use under physician supervision.'
    ],
    interactions: ['None significant when reconstituted properly.'],
    symptomsSupported: ['dehydration', 'diarrhea', 'loose motions', 'vomiting', 'heat exhaustion', 'weakness']
  },
  {
    id: 'med-digene',
    name: 'Antacid Chewable / Syrup (Digene / Gelusil)',
    genericName: 'Magnesium Hydroxide + Aluminium Hydroxide + Simethicone',
    category: 'Acidity',
    form: 'Tablet / Liquid Syrup',
    otcOrPrescription: 'Over-The-Counter (OTC)',
    commonUses: [
      'Immediate symptomatic relief of acidity, heartburn, and hyperacidity',
      'Relief of gas bloating and flatulence (Simethicone constituent)'
    ],
    generalPrecautions: [
      'Chew tablets thoroughly before swallowing, 30–60 minutes after meals or when acid symptoms occur.',
      'Separate antacid administration by at least 2 hours from other oral prescription medications.'
    ],
    sideEffects: [
      'Mild constipation (aluminium salt) or mild laxative effect (magnesium salt)',
      'Chalky taste in mouth'
    ],
    warnings: [
      'RENAL DISEASE: Avoid prolonged high-dose use in kidney disease due to risk of aluminium or magnesium accumulation.',
      'Consult a doctor if acid symptoms persist continuously for more than 2 weeks.'
    ],
    interactions: [
      'Tetra/Fluoroquinolone antibiotics, Iron supplements, Digoxin (antacids decrease their intestinal absorption)'
    ],
    symptomsSupported: ['acidity', 'heartburn', 'indigestion', 'gas', 'bloating', 'chest burning']
  },
  {
    id: 'med-cough',
    name: 'Basic Cough & Cold Syrup (Benadryl / Dextromethorphan)',
    genericName: 'Dextromethorphan HBr + Chlorpheniramine Maleate',
    category: 'Cough/cold',
    form: 'Liquid Syrup',
    otcOrPrescription: 'Over-The-Counter (OTC)',
    commonUses: [
      'Temporary relief of dry cough caused by minor throat and bronchial irritation',
      'Reduction of nasal congestion and tickling cough'
    ],
    generalPrecautions: [
      'Use measuring cup provided; do not drink directly from bottle.',
      'May cause drowsiness—avoid night driving or hazardous activity.'
    ],
    sideEffects: [
      'Drowsiness',
      'Dizziness',
      'Mild nausea or constipation'
    ],
    warnings: [
      'NOT FOR ASTHMA / CHRONIC COUGH: Do not use for persistent productive cough accompanied by excessive phlegm without medical evaluation.',
      'CHILDREN & PREGNANCY: Consult pediatrician for children under 6 years of age.'
    ],
    interactions: [
      'MAO Inhibitor antidepressants (severe interaction risk)'
    ],
    symptomsSupported: ['cough', 'dry cough', 'cold', 'sore throat', 'throat irritation']
  },
  {
    id: 'med-ibu',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen (Non-Steroidal Anti-Inflammatory Drug - NSAID)',
    category: 'Pain/fever',
    form: 'Tablet',
    otcOrPrescription: 'Over-The-Counter (OTC)',
    commonUses: [
      'Relief of inflammatory joint pain, muscle strain, sprains, and backache',
      'Reduction of dental pain, menstrual cramps (dysmenorrhea), and fever'
    ],
    generalPrecautions: [
      'Always take with or immediately after meals or milk to minimize gastric mucosal irritation.',
      'Use the lowest effective dose for the shortest duration necessary.'
    ],
    sideEffects: [
      'Stomach upset, heartburn, or nausea',
      'Mild abdominal pain'
    ],
    warnings: [
      'STOMACH ULCER SAFETY: High risk of gastrointestinal bleeding or ulceration, especially in elderly patients or those with history of peptic ulcers.',
      'CARDIOVASCULAR & RENAL RISK: May elevate blood pressure, cause fluid retention, or impair renal function in pre-existing heart/kidney disease.',
      'AVOID IN LATE PREGNANCY (3rd Trimester).'
    ],
    interactions: [
      'Blood thinners (Aspirin, Warfarin), Antihypertensive ACE inhibitors, Corticosteroids'
    ],
    symptomsSupported: ['pain', 'joint pain', 'back pain', 'inflammation', 'swelling', 'menstrual cramps', 'sprain']
  },
  {
    id: 'med-vitd',
    name: 'Vitamin D3 60,000 IU',
    genericName: 'Cholecalciferol (Vitamin D3)',
    category: 'Vitamins/minerals',
    form: 'Capsule / Granules',
    otcOrPrescription: 'Prescription Only',
    commonUses: [
      'Treatment and correction of diagnosed Vitamin D deficiency',
      'Support for bone mineralization, osteomalacia, and calcium absorption in osteoporosis'
    ],
    generalPrecautions: [
      'Typically taken ONCE WEEKLY for 8–12 weeks as prescribed by a physician.',
      'Take with a fat-containing meal (e.g. milk, curd) for optimal fat-soluble intestinal absorption.'
    ],
    sideEffects: [
      'Hypercalcemia symptoms if over-dosed (nausea, constipation, excessive thirst)'
    ],
    warnings: [
      'REQUIRES PERIODIC BLOOD MONITORING: Monitor 25-hydroxy Vitamin D levels and serum calcium during therapy.',
      'Do not take daily high-dose 60k capsules unless specifically directed by a doctor.'
    ],
    interactions: [
      'Thiazide diuretics (increased risk of hypercalcemia), Anticonvulsants (accelerate Vit D metabolism)'
    ],
    symptomsSupported: ['vitamin deficiency', 'bone pain', 'muscle weakness', 'fatigue', 'osteoporosis']
  },
  {
    id: 'med-calamine',
    name: 'Calamine & Aloe Vera Lotion',
    genericName: 'Calamine (Zinc Oxide + Ferric Oxide) + Aloe Vera Extract',
    category: 'Skin care/topical',
    form: 'Topical Lotion',
    otcOrPrescription: 'Over-The-Counter (OTC)',
    commonUses: [
      'Symptomatic relief of mild skin itching, insect bites, prickly heat, and sun burns',
      'Soothing agent for chickenpox lesions or mild allergic contact dermatitis'
    ],
    generalPrecautions: [
      'For EXTERNAL USE ONLY. Shake well before applying to clean skin.',
      'Allow lotion to dry completely on skin surface.'
    ],
    sideEffects: [
      'Mild dry skin sensation (rare)'
    ],
    warnings: [
      'Do not apply to open wounds, deep cuts, or blistered raw skin.',
      'Avoid contact with eyes, mouth, and internal mucous membranes.'
    ],
    interactions: ['None expected with topical application.'],
    symptomsSupported: ['skin itching', 'prickly heat', 'insect bite', 'sunburn', 'rash', 'chickenpox']
  }
];

export const DEMO_DOCTORS: DemoDoctor[] = [
  {
    id: 'doc-demo-1',
    email: 'ananya.rao@careai.demo',
    name: 'Dr. Ananya Rao',
    specialty: 'General Physician',
    specialtyId: 'general-medicine',
    hospital: 'Apollo Hospitals, Jubilee Hills',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    fee: 800,
    experienceYears: 14,
    qualification: 'MBBS, MD (General Medicine)',
    rating: 4.9,
    availability: 'Mon - Sat (09:00 AM - 04:00 PM)'
  },
  {
    id: 'doc-demo-2',
    email: 'rahul.mehta@careai.demo',
    name: 'Dr. Rahul Mehta',
    specialty: 'Cardiologist',
    specialtyId: 'cardiology',
    hospital: 'Care Hospitals, Banjara Hills',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    fee: 1200,
    experienceYears: 18,
    qualification: 'MBBS, MD, DM (Cardiology), FACC',
    rating: 4.95,
    availability: 'Mon - Fri (10:00 AM - 05:00 PM)'
  },
  {
    id: 'doc-demo-3',
    email: 'priya.sharma@careai.demo',
    name: 'Dr. Priya Sharma',
    specialty: 'Endocrinologist',
    specialtyId: 'general-medicine',
    hospital: 'Yashoda Hospitals, HITECH City',
    photo: 'https://images.unsplash.com/photo-1594824813571-24a69c100d37?auto=format&fit=crop&w=300&q=80',
    fee: 1000,
    experienceYears: 12,
    qualification: 'MBBS, MD, DNB (Endocrinology)',
    rating: 4.85,
    availability: 'Tue - Sat (11:00 AM - 06:00 PM)'
  },
  {
    id: 'doc-demo-4',
    email: 'arjun.kumar@careai.demo',
    name: 'Dr. Arjun Kumar',
    specialty: 'Dermatologist',
    specialtyId: 'dermatology',
    hospital: 'Continental Hospital, Gachibowli',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
    fee: 900,
    experienceYears: 10,
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    rating: 4.8,
    availability: 'Mon - Sat (10:00 AM - 03:00 PM)'
  },
  {
    id: 'doc-demo-5',
    email: 'sneha.reddy@careai.demo',
    name: 'Dr. Sneha Reddy',
    specialty: 'Gynecologist',
    specialtyId: 'gynecology',
    hospital: 'KIMS Hospitals, Kondapur',
    photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&q=80',
    fee: 1100,
    experienceYears: 15,
    qualification: 'MBBS, MS (Obstetrics & Gynecology), DNB',
    rating: 4.9,
    availability: 'Mon - Sat (09:30 AM - 04:30 PM)'
  },
  {
    id: 'doc-demo-6',
    email: 'vikram.singh@careai.demo',
    name: 'Dr. Vikram Singh',
    specialty: 'Orthopedic Specialist',
    specialtyId: 'orthopaedics',
    hospital: 'Star Hospitals, Nanakramguda',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    fee: 1000,
    experienceYears: 16,
    qualification: 'MBBS, MS (Orthopaedics), M.Ch (UK)',
    rating: 4.88,
    availability: 'Mon - Fri (11:00 AM - 05:00 PM)'
  }
];

