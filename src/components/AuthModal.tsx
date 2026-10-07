import React, { useState } from 'react';
import { 
  X, User, Lock, Mail, LogIn, UserPlus, LogOut, CheckCircle2, ShieldAlert, Sparkles, AlertCircle 
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useApp } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { authUser, setAuthUser } = useApp();
  
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
      <div className="bg-navy-900 border border-teal-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative my-8">
        
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
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">
              {authUser ? 'CareAI Account Settings' : (isSignUp ? 'Create CareAI Account' : 'Sign In to CareAI')}
            </h2>
            <p className="text-xs text-slate-300">
              {authUser ? `Signed in as ${authUser.email}` : 'Sync healthcare history persistently across devices'}
            </p>
          </div>
        </div>

        {/* Configuration Alert Warning if credentials missing */}
        {!isConfigured && (
          <div className="bg-amber-950/70 border border-amber-500/40 p-3.5 rounded-2xl text-xs text-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Supabase Not Configured Yet</span>
            </div>
            <p className="text-[11px] text-slate-300">
              To enable live cloud authentication & DB sync, add your <code className="text-teal-300">VITE_SUPABASE_URL</code> and <code className="text-teal-300">VITE_SUPABASE_ANON_KEY</code> to your <code className="text-white">.env</code> file.
            </p>
          </div>
        )}

        {/* Signed In View */}
        {authUser ? (
          <div className="space-y-4">
            <div className="bg-navy-950 p-4 rounded-2xl border border-navy-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active Cloud Session</span>
              </div>
              <p className="text-xs text-slate-300">
                Email: <strong className="text-white">{authUser.email}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Row Level Security (RLS) is active. Only you can view or modify your appointments, medical records, and symptom logs.
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
          /* Form View */
          <form onSubmit={handleAuth} className="space-y-4">
            
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
                    className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
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
                  className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
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
                  className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isConfigured}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-navy-950 font-black text-xs rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Connecting...</span>
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 transition"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
