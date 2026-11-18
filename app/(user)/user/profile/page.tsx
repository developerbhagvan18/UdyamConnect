'use client';

import { useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────

type ActiveTab = 'profile' | 'security' | 'notifications';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  state: string;
  institution: string;
  dob: string;
}

interface NotificationSettings {
  emailResults: boolean;
  emailCompetitions: boolean;
  smsReminders: boolean;
  whatsappUpdates: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

// ── Password Strength Utility ──────────────────────────────────────────────────

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  if (!password) return { label: '', color: '', width: 'w-0' };
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const score = [hasLower, hasUpper, hasNumber, hasSpecial, password.length >= 8].filter(Boolean).length;
  if (score <= 2) return { label: 'Weak',   color: 'bg-red-500',    width: 'w-1/3' };
  if (score <= 3) return { label: 'Fair',   color: 'bg-amber-400',  width: 'w-2/3' };
  return               { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
}

// ── Eye Toggle Button ──────────────────────────────────────────────────────────

function EyeButton({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
    >
      {visible ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );
}

// ── Toggle Switch ──────────────────────────────────────────────────────────────

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    bio: 'Passionate about science olympiads and mathematics competitions. Currently preparing for national-level contests.',
    state: 'Maharashtra',
    institution: 'Delhi Public School, Mumbai',
    dob: '2007-04-15',
  });

  // Security
  const [currentPassword, setCurrentPassword]       = useState('');
  const [newPassword, setNewPassword]               = useState('');
  const [confirmPassword, setConfirmPassword]       = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword]       = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled]             = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailResults:      true,
    emailCompetitions: true,
    smsReminders:      false,
    whatsappUpdates:   true,
  });

  // Delete account
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      // In production this would call an API
      alert('Account deletion requested. (Demo only)');
      setShowDeleteDialog(false);
    }
  };

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'profile',       label: 'Profile'       },
    { id: 'security',      label: 'Security'      },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md select-none">
            PS
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
            Change Photo
          </button>
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Priya Sharma</h1>
          <p className="text-slate-500 text-sm mt-0.5">priya@example.com</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
            <div className="text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Member Since</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">January 2024</p>
            </div>
            <div className="w-px bg-slate-200 hidden sm:block" />
            <div className="text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Competitions</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">8</p>
            </div>
            <div className="w-px bg-slate-200 hidden sm:block" />
            <div className="text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Rank</p>
              <p className="text-sm font-semibold text-indigo-600 mt-0.5">Expert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3.5 text-sm font-medium transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Profile ─────────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="p-6 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={profileData.email}
                  readOnly
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-500 bg-slate-50 cursor-not-allowed pr-24"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Verified
                </span>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={e => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={profileData.dob}
                onChange={e => setProfileData(prev => ({ ...prev, dob: e.target.value }))}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
              <select
                value={profileData.state}
                onChange={e => setProfileData(prev => ({ ...prev, state: e.target.value }))}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Institution / School Name</label>
              <input
                type="text"
                value={profileData.institution}
                onChange={e => setProfileData(prev => ({ ...prev, institution: e.target.value }))}
                placeholder="Enter your school or college name"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Bio */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-slate-700">Bio / About Yourself</label>
                <span className={`text-xs font-medium ${profileData.bio.length > 180 ? 'text-red-500' : 'text-slate-400'}`}>
                  {profileData.bio.length}/200
                </span>
              </div>
              <textarea
                value={profileData.bio}
                onChange={e => {
                  if (e.target.value.length <= 200) {
                    setProfileData(prev => ({ ...prev, bio: e.target.value }));
                  }
                }}
                rows={3}
                placeholder="Tell us a bit about yourself..."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors duration-150"
              >
                {isSaving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </>
                ) : 'Save Changes'}
              </button>
              <button
                onClick={() => {}}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Tab: Security ─────────────────────────────────────────────────── */}
        {activeTab === 'security' && (
          <div className="p-6 space-y-8">

            {/* Change Password */}
            <section>
              <h3 className="text-base font-semibold text-slate-900 mb-4">Change Password</h3>
              <div className="space-y-4">

                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    <EyeButton visible={showCurrentPassword} onToggle={() => setShowCurrentPassword(v => !v)} />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3.5 py-2.5 pr-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                    <EyeButton visible={showNewPassword} onToggle={() => setShowNewPassword(v => !v)} />
                  </div>
                  {newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`} />
                      </div>
                      <p className={`text-xs font-medium ${
                        passwordStrength.label === 'Strong' ? 'text-emerald-600' :
                        passwordStrength.label === 'Fair'   ? 'text-amber-600'   : 'text-red-500'
                      }`}>
                        {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className={`w-full px-3.5 py-2.5 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                        confirmPassword && confirmPassword !== newPassword
                          ? 'border-red-300 bg-red-50'
                          : 'border-slate-200'
                      }`}
                    />
                    <EyeButton visible={showConfirmPassword} onToggle={() => setShowConfirmPassword(v => !v)} />
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>
                  )}
                </div>

                <button
                  disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors duration-150"
                >
                  Update Password
                </button>
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* Two-Factor Authentication */}
            <section>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {twoFAEnabled
                      ? 'Two-factor authentication is currently enabled.'
                      : 'Enable 2FA for extra security on your account.'}
                  </p>
                </div>
                <Toggle enabled={twoFAEnabled} onToggle={() => setTwoFAEnabled(v => !v)} />
              </div>
              {twoFAEnabled && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-700 font-medium">✅ 2FA is active. Your account is more secure.</p>
                </div>
              )}
            </section>

            <div className="border-t border-slate-100" />

            {/* Active Sessions */}
            <section>
              <h3 className="text-base font-semibold text-slate-900 mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  {
                    icon: '💻',
                    device: 'Chrome on Windows',
                    location: 'Mumbai, MH',
                    time: 'Current Session',
                    isCurrent: true,
                  },
                  {
                    icon: '📱',
                    device: 'Safari on iPhone',
                    location: 'Delhi',
                    time: '2 days ago',
                    isCurrent: false,
                  },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{session.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{session.device}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{session.location} · {session.time}</p>
                      </div>
                    </div>
                    {session.isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                        Current
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors duration-150">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out All Devices
              </button>
            </section>
          </div>
        )}

        {/* ── Tab: Notifications ────────────────────────────────────────────── */}
        {activeTab === 'notifications' && (
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-500">Choose how you&apos;d like to receive updates from CompeteHub.</p>
            {(
              [
                {
                  key: 'emailResults' as const,
                  icon: '📊',
                  label: 'Email Results',
                  desc: 'Get notified when competition results are published.',
                },
                {
                  key: 'emailCompetitions' as const,
                  icon: '🏆',
                  label: 'Email Competitions',
                  desc: 'New competition announcements and reminders.',
                },
                {
                  key: 'smsReminders' as const,
                  icon: '📱',
                  label: 'SMS Reminders',
                  desc: 'Competition reminders via SMS 1 hour before.',
                },
                {
                  key: 'whatsappUpdates' as const,
                  icon: '💬',
                  label: 'WhatsApp Updates',
                  desc: 'Important updates via WhatsApp.',
                },
              ] as { key: keyof NotificationSettings; icon: string; label: string; desc: string }[]
            ).map(({ key, icon, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100/60 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </div>
                <Toggle
                  enabled={notifications[key]}
                  onToggle={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Danger Zone ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-red-50 border-b border-red-100">
          <h2 className="text-base font-semibold text-red-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Danger Zone
          </h2>
        </div>
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Delete Account</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="shrink-0 px-4 py-2 text-sm font-semibold text-red-600 border border-red-300 hover:bg-red-50 rounded-lg transition-colors duration-150"
          >
            Delete My Account
          </button>
        </div>
      </div>

      {/* ── Delete Confirmation Dialog ───────────────────────────────────────── */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => { setShowDeleteDialog(false); setDeleteConfirmText(''); }}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Account</h3>
                <p className="text-xs text-slate-500">This action is irreversible</p>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              All your data, competition history, and earnings will be permanently removed. To confirm, type{' '}
              <span className="font-mono font-bold text-red-600 bg-red-50 px-1 rounded">DELETE</span>{' '}
              in the box below.
            </p>

            <input
              type="text"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { setShowDeleteDialog(false); setDeleteConfirmText(''); }}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== 'DELETE'}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
