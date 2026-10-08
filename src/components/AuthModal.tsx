import React, { useState } from 'react';
import { 
  X, User, Lock, Mail, LogIn, UserPlus, LogOut, CheckCircle2, ShieldAlert, Sparkles, AlertCircle, Stethoscope, ChevronRight, Play 
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { DEMO_DOCTORS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { authUser, setAuthUser, quickDemoLogin, role } = useApp();
  
  const [activeTab, setActiveTab] = useState<'portal' | 'credentials' | 'demo'>('demo');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isConfigured = isSupabaseConfigured();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured || !supabase) {
      setErrorMsg('Supabase is not configured yet. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY to your .env file.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName || 'CareAI Patient' }
          }
        });
        if (error) throw error;
        setSuccessMsg('Account created successfully! Check your email to confirm sign up or sign in directly.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        setAuthUser(data.user);
        setSuccessMsg('Successfully signed in!');
        setTimeout(() => onClose(), 1200);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setAuthUser(null);
    setSuccessMsg('Signed out successfully.');
    setTimeout(() => onClose(), 1000);
  };

  return (
    <div className="fixed inset-0 bg-navy-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-navy-900 border border-teal-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-navy-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-navy-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-navy-950 font-black shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              CareAI Portal Login & Presentation Mode
            </h2>
            <p className="text-xs text-slate-300">
              Choose your portal, log in with credentials, or select 1-Click Demo Accounts.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-navy-950 p-1 rounded-2xl border border-navy-800 text-xs">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'demo' ? 'bg-teal-500 text-navy-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> 1-Click Presentation Demos
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'portal' ? 'bg-teal-500 text-navy-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Choose Portal
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`flex-1 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'credentials' ? 'bg-teal-500 text-navy-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Supabase Login
          </button>
        </div>

        {/* TAB 1: 1-CLICK DEMO ACCOUNTS FOR PRESENTATIONS */}
        {activeTab === 'demo' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-200 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Demo Mode — Sample Data Only:</strong> Instantly launch any demo role for testing without needing email confirmation or passwords.
              </div>
            </div>

            {/* Patient Demo Card */}
            <div className="bg-navy-950 border border-teal-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">Patient Portal Demo Account</h4>
                    <p className="text-[11px] text-slate-400">email: <code className="text-teal-300">patient.demo@careai.demo</code> | pass: <code className="text-slate-300">Patient@123</code></p>
                  </div>
                </div>
                <button
                  onClick={() => quickDemoLogin('patient')}
                  className="py-2 px-4 bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-xs rounded-xl shadow-md transition flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-navy-950" /> Log In Patient
                </button>
              </div>
            </div>

            {/* Doctor Demo Accounts List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                6 Demo Doctor Portals (Select Specialty)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_DOCTORS.map(doc => (
                  <div
                    key={doc.id}
                    className="p-3 bg-navy-950 border border-navy-800 hover:border-purple-500/50 rounded-2xl flex items-center justify-between gap-2 transition"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={doc.photo} alt={doc.name} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                      <div className="overflow-hidden text-left">
                        <h5 className="font-bold text-white text-xs truncate">{doc.name}</h5>
                        <p className="text-[10px] text-purple-300 truncate">{doc.specialty}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => quickDemoLogin('doctor', doc.email)}
                      className="py-1.5 px-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] rounded-lg transition shrink-0 cursor-pointer"
                    >
                      Sign In
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTAL ROLE SELECTION */}
        {activeTab === 'portal' && (
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Select CareAI Portal View
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Patient Card */}
              <div
                onClick={() => quickDemoLogin('patient')}
                className="p-5 bg-navy-950 border border-navy-800 hover:border-teal-500 cursor-pointer rounded-2xl space-y-3 transition text-left group"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  👤
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Patient Portal</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Book appointments, track symptoms, manage family health records & view nutrition.
                  </p>
                </div>
                <div className="text-xs font-bold text-teal-400 flex items-center gap-1">
                  <span>Enter Patient Portal</span> <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Doctor Card */}
              <div
                onClick={() => quickDemoLogin('doctor', 'ananya.rao@careai.demo')}
                className="p-5 bg-navy-950 border border-navy-800 hover:border-purple-500 cursor-pointer rounded-2xl space-y-3 transition text-left group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  🩺
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Doctor Portal</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Manage patient appointments, review medical history, update consultation notes & prescriptions.
                  </p>
                </div>
                <div className="text-xs font-bold text-purple-400 flex items-center gap-1">
                  <span>Enter Doctor Portal</span> <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SUPABASE CREDENTIALS AUTH */}
        {activeTab === 'credentials' && (
          <div>
            {!isConfigured && (
              <div className="bg-amber-950/70 border border-amber-500/40 p-3.5 rounded-2xl text-xs text-amber-200 space-y-1.5 mb-4">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Supabase Not Configured Yet</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Add <code className="text-teal-300">VITE_SUPABASE_URL</code> and <code className="text-teal-300">VITE_SUPABASE_ANON_KEY</code> to your <code className="text-white">.env</code> file.
                </p>
              </div>
            )}

            {authUser ? (
              <div className="space-y-4">
                <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Cloud Session</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Email: <strong className="text-white">{authUser.email}</strong>
                  </p>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuth} className="space-y-4 text-left">
                {errorMsg && (
                  <div className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-xl text-xs text-rose-200 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="bg-emerald-950/80 border border-emerald-500/50 p-3 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {isSignUp && (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? <span>Connecting...</span> : isSignUp ? <><UserPlus className="w-4 h-4" /> Create Account</> : <><LogIn className="w-4 h-4" /> Sign In</>}
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-xs font-bold text-teal-400 hover:text-teal-300 transition"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
