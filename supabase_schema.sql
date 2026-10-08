-- ====================================================================
-- CAREAI SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) SETUP
-- Paste this entire script into your Supabase SQL Editor and click RUN
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create User Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT DEFAULT 'Patient User',
  avatar_url TEXT DEFAULT '👤',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'CareAI Patient')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  doctor_photo TEXT,
  specialty TEXT NOT NULL,
  hospital TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  consultation_type TEXT NOT NULL DEFAULT 'In-person',
  fee NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Upcoming',
  member_id TEXT DEFAULT 'fam-me',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own appointments"
  ON public.appointments FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 4. Health Records Table
CREATE TABLE IF NOT EXISTS public.health_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  uploaded_date TEXT NOT NULL,
  file_size TEXT DEFAULT '1.2 MB',
  doctor_name TEXT,
  summary JSONB,
  member_id TEXT DEFAULT 'fam-me',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own health records"
  ON public.health_records FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 5. Symptom Analyses History Table
CREATE TABLE IF NOT EXISTS public.symptom_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_input TEXT NOT NULL,
  detected_symptoms JSONB,
  primary_specialty TEXT NOT NULL,
  primary_specialty_id TEXT,
  secondary_specialty TEXT,
  urgency_level TEXT NOT NULL,
  is_emergency BOOLEAN DEFAULT FALSE,
  explanation TEXT,
  action_plan JSONB,
  red_flags JSONB,
  doctor_questions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.symptom_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own symptom analyses"
  ON public.symptom_analyses FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 6. Medicine Orders Table
CREATE TABLE IF NOT EXISTS public.medicine_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Order Confirmed',
  delivery_address TEXT NOT NULL,
  delivery_partner JSONB,
  estimated_delivery_minutes INT DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.medicine_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own medicine orders"
  ON public.medicine_orders FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 7. Health Timeline Items Table
CREATE TABLE IF NOT EXISTS public.timeline_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  month TEXT NOT NULL,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  details TEXT NOT NULL,
  doctor_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.timeline_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own timeline items"
  ON public.timeline_items FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 8. Family Members Table
CREATE TABLE IF NOT EXISTS public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  avatar TEXT DEFAULT '👤',
  age INT NOT NULL,
  gender TEXT NOT NULL,
  blood_group TEXT,
  allergies JSONB DEFAULT '[]'::jsonb,
  current_medications JSONB DEFAULT '[]'::jsonb,
  medical_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own family members"
  ON public.family_members FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 9. User Health & Nutrition Profiles Table
CREATE TABLE IF NOT EXISTS public.user_health_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  age INT DEFAULT 30,
  sex TEXT DEFAULT 'female',
  height_cm NUMERIC DEFAULT 165,
  weight_kg NUMERIC DEFAULT 64,
  activity_level TEXT DEFAULT 'moderate',
  goal TEXT DEFAULT 'maintain',
  health_conditions JSONB DEFAULT '[]'::jsonb,
  has_kidney_disease BOOLEAN DEFAULT FALSE,
  dietary_preference TEXT DEFAULT 'vegetarian',
  allergies JSONB DEFAULT '[]'::jsonb,
  disliked_foods JSONB DEFAULT '[]'::jsonb,
  daily_water_target_ml INT DEFAULT 3000,
  logged_water_ml INT DEFAULT 0,
  daily_protein_target_g INT DEFAULT 65,
  logged_protein_g INT DEFAULT 0,
  target_steps INT DEFAULT 8000,
  logged_steps INT DEFAULT 0,
  target_sleep_hours NUMERIC DEFAULT 8,
  logged_sleep_hours NUMERIC DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_health_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own health profile"
  ON public.user_health_profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 10. Nutrition & Progress Logs Table
CREATE TABLE IF NOT EXISTS public.nutrition_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  weight_kg NUMERIC,
  bmi NUMERIC,
  water_ml INT,
  protein_g INT,
  steps INT,
  sleep_hours NUMERIC,
  adherence_score INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.nutrition_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own nutrition logs"
  ON public.nutrition_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ====================================================================
-- END OF SUPABASE SCHEMA & RLS SETUP
-- ====================================================================

