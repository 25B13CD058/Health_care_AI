import React, { useState } from 'react';
import { 
  HeartPulse, Bot, Stethoscope, Building2, Pill, Ambulance, 
  FileText, Calendar, User, Bell, ShoppingBag, Globe, ShieldAlert,
  ChevronDown, Menu, X, Users, Activity, Eye, Siren, Sparkles, LogIn, Utensils
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole, Language } from '../types';

export const Navbar: React.FC<{ onOpenNotifs: () => void }> = ({ onOpenNotifs }) => {
  const { 
    authUser, setAuthModalOpen,
    role, setRole, 
    language, setLanguage, 
    activeTab, navigateTo, 
    notifications, cart,
    setEmergencyInfoCardOpen,
    isHighContrast, setIsHighContrast,
    isLargeText, setIsLargeText,
    familyMembers, activeFamilyMemberId, setActiveFamilyMemberId, activeFamilyMember
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [familyDropdownOpen, setFamilyDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: HeartPulse },
    { id: 'assistant', label: 'AI Health Assistant', icon: Bot, badge: 'AI' },
    { id: 'nutrition', label: 'Health & Nutrition', icon: Utensils, badge: 'NEW' },
    { id: 'specialties', label: 'Specialties', icon: Stethoscope },
    { id: 'hospitals', label: 'Hospitals & ER', icon: Building2 },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'emergency', label: 'Emergency Mode', icon: Siren, isEmergency: true },
    { id: 'timeline', label: 'Timeline', icon: Activity },
    { id: 'family', label: 'My Family', icon: Users },
    { id: 'records', label: 'Health Records', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];


  const roles: { id: UserRole; label: string; icon: string }[] = [
    { id: 'patient', label: 'Patient View', icon: '👤' },
    { id: 'doctor', label: 'Doctor Portal', icon: '🩺' },
    { id: 'pharmacy', label: 'Pharmacy Desk', icon: '💊' },
    { id: 'delivery', label: 'Delivery Partner', icon: '🛵' },
    { id: 'ambulance', label: 'Ambulance Driver', icon: '🚑' },
    { id: 'admin', label: 'Admin Dashboard', icon: '⚙️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-white border-b border-navy-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Subtitle */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">Care<span className="text-teal-400">AI</span></span>
                <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-1.5 py-0.2 rounded">SUPABASE</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Healthcare Navigation & Persistent Cloud Sync
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition relative ${
                    isActive 
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.isEmergency ? 'text-rose-400 animate-pulse' : (isActive ? 'text-teal-400' : 'text-slate-400')}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-gradient-to-r from-teal-500 to-emerald-500 text-navy-950 font-black px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Auth, Family Switcher, Accessibility, Role Switcher, Language, Notifications */}
          <div className="flex items-center gap-2">
            
            {/* Account / Auth Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                authUser 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30'
              }`}
              title="Account & Supabase Auth"
            >
              <User className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">{authUser ? authUser.email?.split('@')[0] : 'Sign In'}</span>
            </button>

            {/* Family Profile Switcher Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setFamilyDropdownOpen(!familyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-600 rounded-lg text-xs font-semibold text-slate-200 transition"
              >
                <span>{activeFamilyMember.avatar}</span>
                <span className="truncate max-w-[90px]">{activeFamilyMember.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {familyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-navy-800 text-[10px] font-bold text-slate-400 uppercase">
                    Select Active Family Profile
                  </div>
                  {familyMembers.map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setActiveFamilyMemberId(m.id);
                        setFamilyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left transition ${
                        activeFamilyMemberId === m.id ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300 hover:bg-navy-800'
                      }`}
                    >
                      <span className="text-base">{m.avatar}</span>
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessibility Menu Toggle */}
            <div className="relative">
              <button
                onClick={() => setA11yOpen(!a11yOpen)}
                className={`p-2 rounded-lg transition border ${
                  isHighContrast || isLargeText ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'text-slate-300 hover:bg-navy-800 border-navy-700'
                }`}
                title="Accessibility Options"
              >
                <Eye className="w-4 h-4" />
              </button>

              {a11yOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl p-3 z-50 text-xs space-y-2">
                  <div className="font-bold text-white border-b border-navy-800 pb-1.5 text-[11px] uppercase tracking-wider">
                    Accessibility Options
                  </div>
                  
                  <label className="flex items-center justify-between cursor-pointer text-slate-200">
                    <span>High Contrast Mode</span>
                    <input
                      type="checkbox"
                      checked={isHighContrast}
                      onChange={(e) => setIsHighContrast(e.target.checked)}
                      className="w-4 h-4 rounded text-teal-500"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer text-slate-200">
                    <span>Larger Text Mode</span>
                    <input
                      type="checkbox"
                      checked={isLargeText}
                      onChange={(e) => setIsLargeText(e.target.checked)}
                      className="w-4 h-4 rounded text-teal-500"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Emergency ID Card Button */}
            <button
              onClick={() => setEmergencyInfoCardOpen(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 rounded-lg text-xs font-bold transition shadow-xs"
              title="Show Emergency ID Card"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Emergency Card</span>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center bg-navy-800 border border-navy-700 rounded-lg p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="en" className="bg-navy-900 text-white">EN</option>
                <option value="hi" className="bg-navy-900 text-white">HI</option>
                <option value="te" className="bg-navy-900 text-white">TE</option>
              </select>
            </div>

            {/* Pharmacy Cart Icon */}
            <button
              onClick={() => navigateTo('medicines')}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition"
              title="View Pharmacy Cart"
            >
              <ShoppingBag className="w-5 h-5 text-teal-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-500 text-navy-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifs}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-navy-800 rounded-lg transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-600 rounded-lg text-xs font-semibold text-teal-300 transition"
              >
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span className="capitalize">{roles.find(r => r.id === role)?.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl py-1 z-50">
                  <div className="px-3 py-1.5 border-b border-navy-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Demo Portal Role
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition ${
                        role === r.id ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300 hover:bg-navy-800'
                      }`}
                    >
                      <span className="text-base">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden p-2 text-slate-300 hover:text-white rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-navy-950 border-b border-navy-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-left transition ${
                  isActive ? 'bg-teal-500/20 text-teal-300' : 'text-slate-300 hover:bg-navy-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
