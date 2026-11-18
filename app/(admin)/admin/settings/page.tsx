'use client';

import { useState } from 'react';

const TABS = ['General', 'Payments', 'Notifications', 'Security', 'Referral'] as const;

export default function SettingsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>('General');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm mt-0.5">Configure platform settings and preferences</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Settings saved successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* General */}
      {tab === 'General' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-slate-900">General Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Application Name</label>
              <input defaultValue="CompeteHub" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tagline</label>
              <input defaultValue="Where Champions Are Made" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Email</label>
              <input defaultValue="admin@competehub.in" type="email" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Support Phone</label>
              <input defaultValue="+91 98765 43210" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform Description</label>
            <textarea rows={3} defaultValue="India's premier academic competition platform connecting students with knowledge challenges." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Logo Upload</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-indigo-300 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📁</div>
              <p className="text-sm text-slate-500">Click to upload logo or drag and drop</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>
          <div className="flex justify-end"><button onClick={handleSave} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button></div>
        </div>
      )}

      {/* Payments */}
      {tab === 'Payments' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-slate-900">Payment Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Gateway</label>
              <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Razorpay</option>
                <option>Stripe</option>
                <option>PayU</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform Fee (%)</label>
              <input defaultValue="10" type="number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Razorpay Key ID</label>
              <input defaultValue="rzp_live_••••••••••••" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Razorpay Secret</label>
              <input defaultValue="••••••••••••••••" type="password" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="flex justify-end"><button onClick={handleSave} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button></div>
        </div>
      )}

      {/* Notifications */}
      {tab === 'Notifications' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-slate-900">Notification Templates</h3>
          {[
            { label: 'Welcome Email', desc: 'Sent when a new user registers', enabled: true },
            { label: 'Registration Confirmation', desc: 'Sent when user registers for a competition', enabled: true },
            { label: 'Payment Confirmation', desc: 'Sent after successful payment', enabled: true },
            { label: 'Result Announcement', desc: 'Sent when results are published', enabled: true },
            { label: 'Certificate Issued', desc: 'Sent when a certificate is issued', enabled: false },
            { label: 'Referral Credited', desc: 'Sent when referral earnings are credited', enabled: true },
            { label: 'Competition Reminder', desc: 'Sent 24h before competition starts', enabled: false },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-900">{n.label}</p>
                <p className="text-xs text-slate-400">{n.desc}</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${n.enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${n.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-2"><button onClick={handleSave} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button></div>
        </div>
      )}

      {/* Security */}
      {tab === 'Security' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-slate-900">Security Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Session Timeout (minutes)</label>
              <input defaultValue="30" type="number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Login Attempts</label>
              <input defaultValue="5" type="number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          {[
            { label: 'Two-Factor Authentication (Admin)', enabled: true },
            { label: 'Force 2FA for All Users', enabled: false },
            { label: 'IP Whitelist for Admin Access', enabled: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <p className="text-sm font-medium text-slate-900">{s.label}</p>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${s.enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${s.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          ))}
          <div className="flex justify-end"><button onClick={handleSave} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button></div>
        </div>
      )}

      {/* Referral */}
      {tab === 'Referral' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-slate-900">Referral Program Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Referral Percentage (%)</label>
              <input defaultValue="10" type="number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <p className="text-xs text-slate-400 mt-1">% of referred user's entry fee credited to referrer</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Earnings per User (₹)</label>
              <input defaultValue="5000" type="number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Min Withdrawal Amount (₹)</label>
              <input defaultValue="200" type="number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Credit After (days)</label>
              <input defaultValue="7" type="number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="flex justify-end"><button onClick={handleSave} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Save Changes</button></div>
        </div>
      )}
    </div>
  );
}

