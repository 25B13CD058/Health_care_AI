import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  UserRole, Language, Doctor, Hospital, Medicine, CartItem, MedicineOrder, 
  AmbulanceRequest, HealthRecord, Appointment, HealthReminder, PatientProfile, 
  AppNotification, FamilyMember, TimelineItem, SymptomAnalysisResult,
  UserHealthProfile, NutritionLogEntry
} from '../types';
import { 
  HOSPITALS, DOCTORS, MEDICINES, PATIENT_PROFILE, INITIAL_APPOINTMENTS, 
  INITIAL_RECORDS, INITIAL_REMINDERS, INITIAL_NOTIFICATIONS, FAMILY_MEMBERS, TIMELINE_ITEMS 
} from '../data/mockData';
import {
  INITIAL_HEALTH_PROFILE, INITIAL_NUTRITION_LOGS
} from '../data/nutritionData';


interface AppContextType {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;

  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSpecialtyId: string | null;
  setSelectedSpecialtyId: (id: string | null) => void;
  
  // Accessibility & Emergency Mode
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean) => void;
  isLargeText: boolean;
  setIsLargeText: (val: boolean) => void;
  activeMode: 'normal' | 'emergency';
  setActiveMode: (mode: 'normal' | 'emergency') => void;

  // Family Profiles
  familyMembers: FamilyMember[];
  activeFamilyMemberId: string;
  setActiveFamilyMemberId: (id: string) => void;
  activeFamilyMember: FamilyMember;
  
  // Timeline Data
  timelineItems: TimelineItem[];

  // Data State
  doctors: Doctor[];
  hospitals: Hospital[];
  medicines: Medicine[];
  patientProfile: PatientProfile;
  appointments: Appointment[];
  healthRecords: HealthRecord[];
  healthReminders: HealthReminder[];
  notifications: AppNotification[];
  cart: CartItem[];
  medicineOrders: MedicineOrder[];
  activeAmbulance: AmbulanceRequest | null;

  // Health & Nutrition Profile State & Actions
  userHealthProfile: UserHealthProfile;
  updateHealthProfile: (profile: Partial<UserHealthProfile>) => Promise<void>;
  nutritionLogs: NutritionLogEntry[];
  logWaterIntake: (amountMl: number) => Promise<void>;
  logNutritionProgress: (entry: Partial<NutritionLogEntry>) => Promise<void>;
  
  // Modals & Focus states
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doc: Doctor | null) => void;
  selectedHospital: Hospital | null;
  setSelectedHospital: (hosp: Hospital | null) => void;
  activeVideoConsult: Appointment | null;
  setActiveVideoConsult: (apt: Appointment | null) => void;
  activeDeliveryTracker: MedicineOrder | null;
  setActiveDeliveryTracker: (order: MedicineOrder | null) => void;
  reportSummaryModal: HealthRecord | null;
  setReportSummaryModal: (record: HealthRecord | null) => void;
  emergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
  emergencyInfoCardOpen: boolean;
  setEmergencyInfoCardOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Actions
  navigateTo: (tab: string, options?: { specialtyId?: string; doctor?: Doctor; hospital?: Hospital }) => void;
  bookAppointment: (doctor: Doctor, date: string, time: string, consultationType: 'In-person' | 'Video Consultation') => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  addToCart: (medicine: Medicine, qty?: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateCartQty: (medicineId: string, qty: number) => void;
  clearCart: () => void;
  placeMedicineOrder: (address: string) => Promise<MedicineOrder>;
  requestAmbulance: (hospital: Hospital, ambulanceType: 'Basic Life Support (BLS)' | 'Advanced Life Support (ALS)' | 'Patient Transport') => AmbulanceRequest;
  cancelAmbulance: () => void;
  addHealthRecord: (title: string, type: HealthRecord['type'], summary?: HealthRecord['summary']) => Promise<void>;
  addSymptomAnalysis: (res: SymptomAnalysisResult) => Promise<void>;
  toggleReminder: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, message: string, category: AppNotification['category']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  const [role, setRole] = useState<UserRole>('patient');
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | null>(null);

  // Accessibility & Emergency Mode
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'normal' | 'emergency'>('normal');

  // Family Members
  const [familyMembers] = useState<FamilyMember[]>(FAMILY_MEMBERS);
  const [activeFamilyMemberId, setActiveFamilyMemberId] = useState<string>('fam-me');

  // Timeline Items
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(TIMELINE_ITEMS);

  const [doctors] = useState<Doctor[]>(DOCTORS);
  const [hospitals] = useState<Hospital[]>(HOSPITALS);
  const [medicines] = useState<Medicine[]>(MEDICINES);
  const [patientProfile] = useState<PatientProfile>(PATIENT_PROFILE);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(INITIAL_RECORDS);
  const [healthReminders, setHealthReminders] = useState<HealthReminder[]>(INITIAL_REMINDERS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Health & Nutrition Profile & Logs
  const [userHealthProfile, setUserHealthProfile] = useState<UserHealthProfile>(INITIAL_HEALTH_PROFILE);
  const [nutritionLogs, setNutritionLogs] = useState<NutritionLogEntry[]>(INITIAL_NUTRITION_LOGS);

  // Cart & Orders
  const [cart, setCart] = useState<CartItem[]>([]);
  const [medicineOrders, setMedicineOrders] = useState<MedicineOrder[]>([]);
  const [activeAmbulance, setActiveAmbulance] = useState<AmbulanceRequest | null>(null);

  // Modals
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [activeVideoConsult, setActiveVideoConsult] = useState<Appointment | null>(null);
  const [activeDeliveryTracker, setActiveDeliveryTracker] = useState<MedicineOrder | null>(null);
  const [reportSummaryModal, setReportSummaryModal] = useState<HealthRecord | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [emergencyInfoCardOpen, setEmergencyInfoCardOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const activeFamilyMember = familyMembers.find(f => f.id === activeFamilyMemberId) || familyMembers[0];

  // -------------------------------------------------------------
  // Supabase Auth & Data Sync Listener
  // -------------------------------------------------------------
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured() || !client) return;

    // Fetch initial session
    client.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user ?? null);
    });

    // Listen to Auth State Changes
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync Data when Auth User changes
  useEffect(() => {
    const client = supabase;
    if (!client || !isSupabaseConfigured()) return;

    if (!authUser) {
      // Revert to demo mock state when logged out
      setAppointments(INITIAL_APPOINTMENTS);
      setHealthRecords(INITIAL_RECORDS);
      setTimelineItems(TIMELINE_ITEMS);
      setMedicineOrders([]);
      setUserHealthProfile(INITIAL_HEALTH_PROFILE);
      setNutritionLogs(INITIAL_NUTRITION_LOGS);
      return;
    }

    const fetchUserData = async () => {
      try {
        // 1. Appointments
        const { data: apts } = await client
          .from('appointments')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });

        if (apts) {
          const mappedApts: Appointment[] = apts.map(a => ({
            id: a.id,
            doctorId: a.doctor_id,
            doctorName: a.doctor_name,
            doctorPhoto: a.doctor_photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
            specialty: a.specialty,
            hospital: a.hospital,
            date: a.date,
            time: a.time,
            consultationType: a.consultation_type,
            fee: Number(a.fee),
            status: a.status,
            memberId: a.member_id
          }));
          setAppointments(mappedApts);
        }

        // 2. Health Records
        const { data: records } = await client
          .from('health_records')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });

        if (records) {
          const mappedRecs: HealthRecord[] = records.map(r => ({
            id: r.id,
            title: r.title,
            type: r.type,
            uploadedDate: r.uploaded_date,
            fileSize: r.file_size || '1.2 MB',
            doctorName: r.doctor_name,
            summary: r.summary,
            memberId: r.member_id
          }));
          setHealthRecords(mappedRecs);
        }

        // 3. Timeline Items
        const { data: tItems } = await client
          .from('timeline_items')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });

        if (tItems) {
          const mappedTimeline: TimelineItem[] = tItems.map(t => ({
            id: t.id,
            date: t.date,
            month: t.month,
            year: t.year,
            title: t.title,
            category: t.category,
            details: t.details,
            doctorName: t.doctor_name
          }));
          setTimelineItems(mappedTimeline);
        }

        // 4. Medicine Orders
        const { data: orders } = await client
          .from('medicine_orders')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });

        if (orders) {
          const mappedOrders: MedicineOrder[] = orders.map(o => ({
            id: o.id,
            items: o.items,
            totalAmount: Number(o.total_amount),
            status: o.status,
            deliveryAddress: o.delivery_address,
            deliveryPartner: o.delivery_partner || {
              name: 'Rahul K.',
              phone: '+91 98123 45678',
              vehicle: 'Hero Electric Scooter',
              rating: 4.9,
              photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              currentLat: 17.4350,
              currentLng: 78.4000
            },
            estimatedDeliveryMinutes: o.estimated_delivery_minutes,
            createdAt: new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setMedicineOrders(mappedOrders);
        }

        // 5. User Health Profile
        const { data: hp } = await client
          .from('user_health_profiles')
          .select('*')
          .eq('user_id', authUser.id)
          .maybeSingle();

        if (hp) {
          setUserHealthProfile({
            age: hp.age,
            sex: hp.sex,
            heightCm: Number(hp.height_cm),
            weightKg: Number(hp.weight_kg),
            activityLevel: hp.activity_level,
            goal: hp.goal,
            healthConditions: hp.health_conditions || [],
            hasKidneyDisease: hp.has_kidney_disease || false,
            dietaryPreference: hp.dietary_preference || 'vegetarian',
            allergies: hp.allergies || [],
            dislikedFoods: hp.disliked_foods || [],
            dailyWaterTargetMl: hp.daily_water_target_ml || 3000,
            loggedWaterMl: hp.logged_water_ml || 0,
            dailyProteinTargetG: hp.daily_protein_target_g || 65,
            loggedProteinG: hp.logged_protein_g || 0,
            targetSteps: hp.target_steps || 8000,
            loggedSteps: hp.logged_steps || 0,
            targetSleepHours: hp.target_sleep_hours || 8,
            loggedSleepHours: hp.logged_sleep_hours || 0
          });
        }

        // 6. Nutrition Logs
        const { data: nLogs } = await client
          .from('nutrition_logs')
          .select('*')
          .eq('user_id', authUser.id)
          .order('date', { ascending: true });

        if (nLogs && nLogs.length > 0) {
          setNutritionLogs(nLogs.map(l => ({
            id: l.id,
            date: l.date,
            weightKg: Number(l.weight_kg),
            bmi: Number(l.bmi),
            waterMl: l.water_ml,
            proteinG: l.protein_g,
            steps: l.steps,
            sleepHours: Number(l.sleep_hours),
            adherenceScore: l.adherence_score
          })));
        }

      } catch (e) {
        console.error('Supabase user data sync error:', e);
      }
    };

    fetchUserData();
  }, [authUser]);

  // Smooth Navigation Helper
  const navigateTo = (tab: string, options?: { specialtyId?: string; doctor?: Doctor; hospital?: Hospital }) => {
    setActiveTab(tab);
    if (options?.specialtyId !== undefined) {
      setSelectedSpecialtyId(options.specialtyId);
    }
    if (options?.doctor) {
      setSelectedDoctor(options.doctor);
    }
    if (options?.hospital) {
      setSelectedHospital(options.hospital);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Notification
  const addNotification = (title: string, message: string, category: AppNotification['category']) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      category
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Book Appointment (Persists to Supabase if authenticated)
  const bookAppointment = async (doctor: Doctor, date: string, time: string, consultationType: 'In-person' | 'Video Consultation') => {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorPhoto: doctor.photo,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      date,
      time,
      consultationType,
      fee: doctor.fee,
      status: 'Upcoming',
      memberId: activeFamilyMemberId
    };

    setAppointments(prev => [newApt, ...prev]);

    // Supabase Persistence
    const client = supabase;
    if (authUser && client && isSupabaseConfigured()) {
      try {
        await client.from('appointments').insert({
          user_id: authUser.id,
          doctor_id: doctor.id,
          doctor_name: doctor.name,
          doctor_photo: doctor.photo,
          specialty: doctor.specialty,
          hospital: doctor.hospital,
          date,
          time,
          consultation_type: consultationType,
          fee: doctor.fee,
          status: 'Upcoming',
          member_id: activeFamilyMemberId
        });
      } catch (e) {
        console.error('Error persisting appointment to Supabase:', e);
      }
    }

    addNotification(
      'Appointment Confirmed',
      `Your appointment with ${doctor.name} on ${date} at ${time} is confirmed for ${activeFamilyMember.name}.`,
      'appointment'
    );
  };

  // Cancel Appointment
  const cancelAppointment = async (id: string) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: 'Cancelled' } : apt));

    const client = supabase;
    if (authUser && client && isSupabaseConfigured()) {
      try {
        await client
          .from('appointments')
          .update({ status: 'Cancelled' })
          .eq('id', id)
          .eq('user_id', authUser.id);
      } catch (e) {
        console.error('Error updating appointment in Supabase:', e);
      }
    }

    addNotification('Appointment Cancelled', 'Your appointment has been cancelled successfully.', 'appointment');
  };

  // Cart Operations
  const addToCart = (medicine: Medicine, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map(item => item.medicine.id === medicine.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { medicine, quantity: qty }];
    });
    addNotification('Item Added to Cart', `${medicine.name} added to pharmacy cart.`, 'medicine');
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => prev.filter(item => item.medicine.id !== medicineId));
  };

  const updateCartQty = (medicineId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(medicineId);
    } else {
      setCart(prev => prev.map(item => item.medicine.id === medicineId ? { ...item, quantity: qty } : item));
    }
  };

  const clearCart = () => setCart([]);

  // Place Medicine Order (Persists to Supabase)
  const placeMedicineOrder = async (address: string): Promise<MedicineOrder> => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
    const newOrder: MedicineOrder = {
      id: `CA-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      totalAmount,
      status: 'Prescription Verified',
      deliveryAddress: address,
      deliveryPartner: {
        name: 'Rahul K.',
        phone: '+91 98123 45678',
        vehicle: 'Hero Electric Scooter (TS09 EB 4021)',
        rating: 4.9,
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        currentLat: 17.4350,
        currentLng: 78.4000
      },
      estimatedDeliveryMinutes: 25,
      createdAt: 'Just now'
    };

    setMedicineOrders(prev => [newOrder, ...prev]);
    clearCart();
    setActiveDeliveryTracker(newOrder);

    // Supabase Persistence
    const client = supabase;
    if (authUser && client && isSupabaseConfigured()) {
      try {
        await client.from('medicine_orders').insert({
          user_id: authUser.id,
          items: newOrder.items,
          total_amount: totalAmount,
          status: 'Prescription Verified',
          delivery_address: address,
          delivery_partner: newOrder.deliveryPartner,
          estimated_delivery_minutes: 25
        });
      } catch (e) {
        console.error('Error saving order to Supabase:', e);
      }
    }

    addNotification(
      'Medicine Order Placed',
      `Order #${newOrder.id} confirmed. Assigned to delivery partner Rahul K.`,
      'medicine'
    );
    return newOrder;
  };

  // Request Ambulance
  const requestAmbulance = (
    hospital: Hospital,
    ambulanceType: 'Basic Life Support (BLS)' | 'Advanced Life Support (ALS)' | 'Patient Transport'
  ): AmbulanceRequest => {
    const newReq: AmbulanceRequest = {
      id: `AMB-${Math.floor(100 + Math.random() * 900)}`,
      patientName: activeFamilyMember.name,
      patientPhone: patientProfile.emergencyContact.phone,
      pickupLocation: {
        address: patientProfile.location,
        lat: 17.4320,
        lng: 78.4050
      },
      destinationHospital: {
        name: hospital.name,
        address: hospital.address,
        lat: hospital.lat,
        lng: hospital.lng
      },
      ambulanceType,
      etaMinutes: 6,
      vehicleNumber: 'TS 09 AMB 102',
      driverName: 'Ramesh Kumar (Demo Emergency Driver)',
      driverPhone: '+91 99887 76655',
      driverLat: 17.4390,
      driverLng: 78.4120,
      status: 'Dispatched'
    };
    setActiveAmbulance(newReq);
    addNotification(
      '🚨 AMBULANCE DISPATCHED',
      `Ambulance ${newReq.vehicleNumber} dispatched. ETA 6 minutes to ${hospital.name}.`,
      'emergency'
    );
    return newReq;
  };

  const cancelAmbulance = () => {
    setActiveAmbulance(null);
    addNotification('Ambulance Dispatch Cancelled', 'Your emergency ambulance request has been cancelled.', 'emergency');
  };

  // Health Records (Persists to Supabase)
  const addHealthRecord = async (title: string, type: HealthRecord['type'], summary?: HealthRecord['summary']) => {
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newRecord: HealthRecord = {
      id: `rec-${Date.now()}`,
      title,
      type,
      uploadedDate: dateStr,
      fileSize: '1.2 MB',
      summary,
      memberId: activeFamilyMemberId
    };

    setHealthRecords(prev => [newRecord, ...prev]);

    // Supabase Persistence
    const client = supabase;
    if (authUser && client && isSupabaseConfigured()) {
      try {
        await client.from('health_records').insert({
          user_id: authUser.id,
          title,
          type,
          uploaded_date: dateStr,
          file_size: '1.2 MB',
          summary,
          member_id: activeFamilyMemberId
        });
      } catch (e) {
        console.error('Error uploading health record to Supabase:', e);
      }
    }

    addNotification('Health Record Uploaded', `New report "${title}" saved to ${activeFamilyMember.name}'s vault.`, 'report');
  };

  // Save Symptom Analysis History to Supabase
  const addSymptomAnalysis = async (res: SymptomAnalysisResult) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const monthStr = now.toLocaleDateString('en-GB', { month: 'short' });
    const yearStr = now.getFullYear().toString();

    const newTimeline: TimelineItem = {
      id: `time-${Date.now()}`,
      date: dateStr,
      month: monthStr,
      year: yearStr,
      title: `AI Triage: ${res.primarySpecialty}`,
      category: 'symptom_analysis',
      details: `Analyzed complaint: "${res.userInput}". Specialty: ${res.primarySpecialty}. Urgency: ${res.urgencyLevel.toUpperCase()}.`
    };

    setTimelineItems(prev => [newTimeline, ...prev]);

    const client = supabase;
    if (authUser && client && isSupabaseConfigured()) {
      try {
        // Save to symptom_analyses table in Supabase
        await client.from('symptom_analyses').insert({
          user_id: authUser.id,
          user_input: res.userInput,
          detected_symptoms: res.detectedSymptoms,
          primary_specialty: res.primarySpecialty,
          primary_specialty_id: res.primarySpecialtyId,
          secondary_specialty: res.secondarySpecialty,
          urgency_level: res.urgencyLevel,
          is_emergency: res.isEmergency,
          explanation: res.explanation,
          action_plan: res.actionPlan,
          red_flags: res.redFlags,
          doctor_questions: res.doctorQuestions
        });

        // Save to timeline_items table in Supabase
        await client.from('timeline_items').insert({
          user_id: authUser.id,
          date: dateStr,
          month: monthStr,
          year: yearStr,
          title: `AI Triage: ${res.primarySpecialty}`,
          category: 'symptom_analysis',
          details: `Analyzed complaint: "${res.userInput}". Specialty: ${res.primarySpecialty}. Urgency: ${res.urgencyLevel.toUpperCase()}.`
        });
      } catch (e) {
        console.error('Error saving symptom analysis to Supabase:', e);
      }
    }
  };

  const toggleReminder = (id: string) => {
    setHealthReminders(prev => prev.map(rem => rem.id === id ? { ...rem, completed: !rem.completed } : rem));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Health Profile & Nutrition Methods
  const updateHealthProfile = async (updates: Partial<UserHealthProfile>) => {
    let nextProfile: UserHealthProfile = userHealthProfile;
    setUserHealthProfile(prev => {
      nextProfile = { ...prev, ...updates };
      return nextProfile;
    });

    const client = supabase;
    if (authUser && client && isSupabaseConfigured()) {
      try {
        await client.from('user_health_profiles').upsert({
          user_id: authUser.id,
          age: nextProfile.age,
          sex: nextProfile.sex,
          height_cm: nextProfile.heightCm,
          weight_kg: nextProfile.weightKg,
          activity_level: nextProfile.activityLevel,
          goal: nextProfile.goal,
          health_conditions: nextProfile.healthConditions,
          has_kidney_disease: nextProfile.hasKidneyDisease,
          dietary_preference: nextProfile.dietaryPreference,
          allergies: nextProfile.allergies,
          disliked_foods: nextProfile.dislikedFoods,
          daily_water_target_ml: nextProfile.dailyWaterTargetMl,
          logged_water_ml: nextProfile.loggedWaterMl,
          daily_protein_target_g: nextProfile.dailyProteinTargetG,
          logged_protein_g: nextProfile.loggedProteinG,
          target_steps: nextProfile.targetSteps,
          logged_steps: nextProfile.loggedSteps,
          target_sleep_hours: nextProfile.targetSleepHours,
          logged_sleep_hours: nextProfile.loggedSleepHours,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
      } catch (e) {
        console.error('Error updating health profile in Supabase:', e);
      }
    }
  };

  const logWaterIntake = async (amountMl: number) => {
    const newLogged = Math.max(0, userHealthProfile.loggedWaterMl + amountMl);
    await updateHealthProfile({ loggedWaterMl: newLogged });
  };

  const logNutritionProgress = async (entry: Partial<NutritionLogEntry>) => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const existingIndex = nutritionLogs.findIndex(l => l.date === todayStr);

    const heightM = userHealthProfile.heightCm / 100;
    const currentWeight = entry.weightKg || userHealthProfile.weightKg;
    const computedBmi = Number((currentWeight / (heightM * heightM)).toFixed(2));

    const newLogEntry: NutritionLogEntry = {
      id: existingIndex >= 0 ? nutritionLogs[existingIndex].id : `nlog-${Date.now()}`,
      date: todayStr,
      weightKg: currentWeight,
      bmi: computedBmi,
      waterMl: entry.waterMl !== undefined ? entry.waterMl : userHealthProfile.loggedWaterMl,
      proteinG: entry.proteinG !== undefined ? entry.proteinG : userHealthProfile.loggedProteinG,
      steps: entry.steps !== undefined ? entry.steps : userHealthProfile.loggedSteps,
      sleepHours: entry.sleepHours !== undefined ? entry.sleepHours : userHealthProfile.loggedSleepHours,
      adherenceScore: entry.adherenceScore || 90
    };

    let updatedLogs: NutritionLogEntry[];
    if (existingIndex >= 0) {
      updatedLogs = [...nutritionLogs];
      updatedLogs[existingIndex] = newLogEntry;
    } else {
      updatedLogs = [...nutritionLogs, newLogEntry];
    }

    setNutritionLogs(updatedLogs);

    // Also update health profile state if relevant
    const profileUpdates: Partial<UserHealthProfile> = {};
    if (entry.weightKg !== undefined) profileUpdates.weightKg = entry.weightKg;
    if (entry.waterMl !== undefined) profileUpdates.loggedWaterMl = entry.waterMl;
    if (entry.proteinG !== undefined) profileUpdates.loggedProteinG = entry.proteinG;
    if (entry.steps !== undefined) profileUpdates.loggedSteps = entry.steps;
    if (entry.sleepHours !== undefined) profileUpdates.loggedSleepHours = entry.sleepHours;
    
    if (Object.keys(profileUpdates).length > 0) {
      await updateHealthProfile(profileUpdates);
    }

    const client = supabase;
    if (authUser && client && isSupabaseConfigured()) {
      try {
        await client.from('nutrition_logs').upsert({
          user_id: authUser.id,
          date: todayStr,
          weight_kg: newLogEntry.weightKg,
          bmi: newLogEntry.bmi,
          water_ml: newLogEntry.waterMl,
          protein_g: newLogEntry.proteinG,
          steps: newLogEntry.steps,
          sleep_hours: newLogEntry.sleepHours,
          adherence_score: newLogEntry.adherenceScore
        }, { onConflict: 'user_id,date' });
      } catch (e) {
        console.error('Error persisting nutrition log to Supabase:', e);
      }
    }
  };

  return (
    <AppContext.Provider value={{
      authUser, setAuthUser,
      role, setRole,
      language, setLanguage,
      activeTab, setActiveTab,
      selectedSpecialtyId, setSelectedSpecialtyId,
      isHighContrast, setIsHighContrast,
      isLargeText, setIsLargeText,
      activeMode, setActiveMode,
      familyMembers, activeFamilyMemberId, setActiveFamilyMemberId, activeFamilyMember,
      timelineItems,
      doctors, hospitals, medicines, patientProfile,
      appointments, healthRecords, healthReminders, notifications,
      cart, medicineOrders, activeAmbulance,
      userHealthProfile, updateHealthProfile,
      nutritionLogs, logWaterIntake, logNutritionProgress,
      selectedDoctor, setSelectedDoctor,
      selectedHospital, setSelectedHospital,
      activeVideoConsult, setActiveVideoConsult,
      activeDeliveryTracker, setActiveDeliveryTracker,
      reportSummaryModal, setReportSummaryModal,
      emergencyModalOpen, setEmergencyModalOpen,
      emergencyInfoCardOpen, setEmergencyInfoCardOpen,
      authModalOpen, setAuthModalOpen,
      navigateTo, bookAppointment, cancelAppointment,
      addToCart, removeFromCart, updateCartQty, clearCart,
      placeMedicineOrder, requestAmbulance, cancelAmbulance,
      addHealthRecord, addSymptomAnalysis, toggleReminder, markNotificationAsRead,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
