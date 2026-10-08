export type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'delivery' | 'ambulance' | 'admin';

export type Language = 'en' | 'hi' | 'te';

export type FacilityType = 'hospital' | 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance' | 'emergency';

export type CarePathStep = 'symptoms' | 'analysis' | 'urgency' | 'specialist' | 'hospital' | 'preparation';

export type UrgencyLevel = 'routine' | 'soon' | 'priority' | 'urgent';

export interface SymptomInputForm {
  symptoms: string;
  duration?: string;
  age?: string;
  gender?: string;
  existingConditions?: string;
  medications?: string;
  severity?: 'mild' | 'moderate' | 'severe';
}

export interface DoctorVisitPrep {
  mainConcern: string;
  symptoms: string[];
  duration: string;
  severity: string;
  relevantInfo: string;
  questionsToAsk: string[];
  infoToBring: string[];
  suggestedSpecialty: string;
}

export interface ReportTestItem {
  testName: string;
  value: string;
  unit?: string;
  refRange: string;
  status: 'within' | 'below' | 'above';
  explanation: string;
}

export interface ReportAnalysisResult {
  reportTitle: string;
  reportType: string;
  summaryText: string;
  testItems: ReportTestItem[];
  questionsForDoctor: string[];
  suggestedSpecialty: string;
  disclaimer: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  currentMedications: string[];
  medicalHistory: string[];
}

export interface MedicalSpecialty {
  id: string;
  name: string;
  iconName: string;
  description: string;
  doctorCount: number;
  hospitalCount: number;
  commonSymptoms: string[];
}

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  specialtyId: string;
  qualifications: string;
  experience: number;
  hospital: string;
  hospitalId: string;
  fee: number;
  languages: string[];
  rating: number;
  reviewCount: number;
  distance: string;
  distanceKm: number;
  availability: 'Available Today' | 'Available Tomorrow' | 'Next Available';
  availableSlots: string[];
  verified: boolean;
  outcomeMetric?: string;
  clinicTimings: string;
  location: string;
  consultationTypes: ('In-person' | 'Video Consultation')[];
}

export interface Hospital {
  id: string;
  name: string;
  image: string;
  address: string;
  lat: number;
  lng: number;
  distance: string;
  distanceKm: number;
  emergencyAvailable: boolean;
  edOvercrowding: 'Low' | 'Moderate' | 'High';
  edWaitTime: string;
  rating: number;
  doctorsAvailable: number;
  openStatus: string;
  contact: string;
  availableBeds: {
    icu: number;
    general: number;
    emergency: number;
  };
  ambulanceAvailable: boolean;
  specialties: string[];
  departments: string[];
  facilities: string[];
  facilityType: FacilityType;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  prescriptionRequired: boolean;
  usage: string;
  sideEffects: string[];
  precautions: string[];
  image: string;
  stock: number;
  unit: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface DeliveryPartner {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  photo: string;
  currentLat: number;
  currentLng: number;
}

export interface MedicineOrder {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Prescription Verified' | 'Order Confirmed' | 'Preparing' | 'Assigned to Delivery Partner' | 'Out for Delivery' | 'Delivered';
  deliveryAddress: string;
  deliveryPartner: DeliveryPartner;
  estimatedDeliveryMinutes: number;
  createdAt: string;
}

export interface AmbulanceRequest {
  id: string;
  patientName: string;
  patientPhone: string;
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  destinationHospital: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  ambulanceType: 'Basic Life Support (BLS)' | 'Advanced Life Support (ALS)' | 'Patient Transport';
  etaMinutes: number;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  driverLat: number;
  driverLng: number;
  status: 'Dispatched' | 'En Route to Patient' | 'Patient Onboard' | 'Arrived at Hospital' | 'Completed';
}

export interface AISummary {
  reportType: string;
  keyInformation: string[];
  simpleExplanation: string;
  potentialSpecialty: string;
  questionsForDoctor: string[];
  abnormalValues: string[];
  disclaimer: string;
  testItems?: ReportTestItem[];
}

export interface HealthRecord {
  id: string;
  title: string;
  type: 'Blood Test' | 'Prescription' | 'X-Ray' | 'MRI' | 'CT Scan' | 'Lab Report';
  uploadedDate: string;
  fileSize: string;
  doctorName?: string;
  summary?: AISummary;
  memberId?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  consultationType: 'In-person' | 'Video Consultation';
  fee: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  memberId?: string;
  doctorNotes?: string;
  prescriptionSummary?: string;
}

export interface HealthReminder {
  id: string;
  title: string;
  time: string;
  category: 'medicine' | 'appointment' | 'followup' | 'lab';
  completed: boolean;
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  location: string;
  allergies: string[];
  currentMedications: string[];
  medicalHistory: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'appointment' | 'medicine' | 'emergency' | 'report';
}

export interface SymptomAnalysisResult {
  userInput: string;
  detectedSymptoms: string[];
  primarySpecialty: string;
  primarySpecialtyId: string;
  secondarySpecialty?: string;
  urgencyLevel: UrgencyLevel;
  isEmergency: boolean;
  explanation: string;
  actionPlan: string[];
  redFlags: string[];
  possibleCategories: string[];
  warningSigns: string[];
  doctorQuestions: string[];
  recommendedDoctors: Doctor[];
  recommendedHospitals: Hospital[];
  prepSummary?: DoctorVisitPrep;
}

export interface TimelineItem {
  id: string;
  date: string;
  month: string;
  year: string;
  title: string;
  category: 'report' | 'appointment' | 'prescription' | 'lab' | 'consultation' | 'symptom_analysis' | 'doctor_prep';
  details: string;
  doctorName?: string;
}

export type HealthConditionType = 
  | 'thyroid' 
  | 'diabetes' 
  | 'pcos' 
  | 'high_bp' 
  | 'high_cholesterol' 
  | 'anemia' 
  | 'fatty_liver' 
  | 'heart_health' 
  | 'obesity' 
  | 'underweight' 
  | 'vitamin_d' 
  | 'vitamin_b12';

export type DietaryPreference = 'vegetarian' | 'non_vegetarian' | 'vegan' | 'eggetarian';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active';

export type HealthGoal = 'maintain' | 'gain' | 'lose';

export interface HealthConditionGuide {
  id: HealthConditionType;
  title: string;
  iconName: string;
  shortDescription: string;
  recommendedFoods: { name: string; why: string }[];
  foodsToLimit: { name: string; why: string }[];
  medicalGuidanceFoods: { name: string; why: string }[];
  nutrientsOfInterest: { name: string; role: string; sources: string }[];
  mealIdeas: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
  medicalNotes: string[];
  subTypesNotes?: string;
  medicationInteractionNotice?: string;
}

export type FoodCategory = 
  | 'fruits' 
  | 'vegetables' 
  | 'grains' 
  | 'pulses' 
  | 'eggs' 
  | 'meat' 
  | 'fish' 
  | 'dairy' 
  | 'nuts' 
  | 'seeds' 
  | 'fats' 
  | 'beverages';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  isIndian: boolean;
  vitaminsAndMinerals: string[];
  suitableConditions: HealthConditionType[];
  moderationConditions: HealthConditionType[];
  dietaryCategory: DietaryPreference;
  allergens?: string[];
  image?: string;
}

export interface UserHealthProfile {
  age: number;
  sex: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: HealthGoal;
  healthConditions: HealthConditionType[];
  hasKidneyDisease: boolean;
  dietaryPreference: DietaryPreference;
  allergies: string[];
  dislikedFoods: string[];
  dailyWaterTargetMl: number;
  loggedWaterMl: number;
  dailyProteinTargetG: number;
  loggedProteinG: number;
  targetSteps: number;
  loggedSteps: number;
  targetSleepHours: number;
  loggedSleepHours: number;
}

export interface NutritionLogEntry {
  id: string;
  date: string;
  weightKg?: number;
  bmi?: number;
  waterMl?: number;
  proteinG?: number;
  steps?: number;
  sleepHours?: number;
  adherenceScore?: number;
}

export interface DiagnosticCenter {
  id: string;
  name: string;
  address: string;
  area: string;
  city: string;
  distanceKm: number;
  lat: number;
  lng: number;
  phone: string;
  rating: number;
  reviewCount: number;
  services: ('CT Scan' | 'MRI' | 'X-Ray' | 'Ultrasound' | 'PET Scan' | 'Diagnostic Lab')[];
  operatingHours: string;
  accreditation: string;
  image?: string;
}

export interface MedicineInfo {
  id: string;
  name: string;
  genericName: string;
  category: string;
  form: string;
  otcOrPrescription: 'Over-The-Counter (OTC)' | 'Prescription Only';
  commonUses: string[];
  generalPrecautions: string[];
  sideEffects: string[];
  warnings: string[];
  interactions?: string[];
  symptomsSupported: string[];
}

export interface DemoDoctor {
  id: string;
  email: string;
  name: string;
  specialty: string;
  specialtyId: string;
  hospital: string;
  photo: string;
  fee: number;
  experienceYears: number;
  qualification: string;
  rating: number;
  availability: string;
}


