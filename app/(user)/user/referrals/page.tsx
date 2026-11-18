'use client';

import { useState } from 'react';

// ── Mock Data ──────────────────────────────────────────────────────────────────

const REFERRAL_CODE = 'PRIYA2025';
const REFERRAL_URL = `https://competehub.in/register?ref=${REFERRAL_CODE}`;

interface ReferralEntry {
  id: number;
  name: string;
  email: string;
  date: string;
  status: 'completed' | 'pending' | 'registered';
  earned: number;
}

const referralActivity: ReferralEntry[] = [
  { id: 1, name: 'Anjali Singh',   email: 'anjali@gmail.com',  date: 'Nov 1, 2026',  status: 'completed',  earned: 150 },
  { id: 2, name: 'Deepak Kumar',   email: 'deepak@gmail.com',  date: 'Oct 28, 2026', status: 'completed',  earned: 150 },
  { id: 3, name: 'Ritu Sharma',    email: 'ritu@gmail.com',    date: 'Oct 25, 2026', status: 'registered', earned: 0   },
  { id: 4, name: 'Mohit Verma',    email: 'mohit@gmail.com',   date: 'Oct 20, 2026', status: 'completed',  earned: 150 },
  { id: 5, name: 'Sneha Patel',    email: 'sneha@gmail.com',   date: 'Oct 15, 2026', status: 'completed',  earned: 150 },
  { id: 6, name: 'Arjun Mehra',    email: 'arjun@gmail.com',   date: 'Oct 10, 2026', status: 'pending',    earned: 0   },
  { id: 7, name: 'Kavya Reddy',    email: 'kavya@gmail.com',   date: 'Oct 5, 2026',  status: 'completed',  earned: 150 },
  { id: 8, name: 'Rahul Joshi',    email: 'rahul@gmail.com',   date: 'Sep 28, 2026', status: 'completed',  earned: 150 },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  colorClass,
}: {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

const statusConfig: Record<ReferralEntry['status'], { label: string; classes: string }> = {
  completed:  { label: 'Completed',  classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  registered: { label: 'Registered', classes: 'bg-blue-50 text-blue-700 border border-blue-200'         },
  pending:    { label: 'Pending',     classes: 'bg-amber-50 text-amber-700 border border-amber-200'      },
};

// ── Page Component ─────────────────────────────────────────────────────────────

export default function ReferralsPage() {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyToClipboard = async (text: string, type: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'code') {
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
      } else {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  };

  const whatsappText = encodeURIComponent(
    `Join CompeteHub with my referral code ${REFERRAL_CODE} and get a discount! ${REFERRAL_URL}`
  );
  const mailtoLink = `mailto:?subject=Join%20CompeteHub&body=Use%20my%20code%20${REFERRAL_CODE}%20to%20get%20a%20discount%20when%20you%20sign%20up%20at%20${encodeURIComponent(REFERRAL_URL)}`;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Referral Program</h1>
        <p className="text-slate-500 mt-1">Invite friends and earn ₹150 for every successful registration.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Referrals"   value="12"      icon="👥" colorClass="bg-blue-50"    />
        <StatCard label="Successful"        value="9"       icon="✅" colorClass="bg-emerald-50" />
        <StatCard label="Total Earned"      value="₹1,350"  icon="💰" colorClass="bg-amber-50"   />
        <StatCard label="Pending Earnings"  value="₹450"    icon="⏳" colorClass="bg-orange-50"  />
      </div>

      {/* Referral Code Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Your Referral Code</h2>

        {/* Code Display */}
        <div className="bg-indigo-600 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-indigo-200 text-sm font-medium mb-1">Your unique code</p>
            <p className="font-mono text-3xl font-bold text-white tracking-widest">{REFERRAL_CODE}</p>
          </div>
          <button
            onClick={() => copyToClipboard(REFERRAL_CODE, 'code')}
            className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors duration-150 whitespace-nowrap"
          >
            {codeCopied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Code
              </>
            )}
          </button>
        </div>

        {/* Share Section */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-3">Share via</p>
          <div className="flex flex-wrap gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-150 text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            {/* Email */}
            <a
              href={mailtoLink}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-150 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>

            {/* Copy Link */}
            <button
              onClick={() => copyToClipboard(REFERRAL_URL, 'link')}
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium px-4 py-2 rounded-lg transition-colors duration-150 text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {linkCopied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-5">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: 1, icon: '📤', title: 'Share Your Code', desc: 'Share your unique referral code with friends and classmates.' },
            { step: 2, icon: '👤', title: 'Friend Registers', desc: 'Your friend signs up on CompeteHub using your referral code.' },
            { step: 3, icon: '💰', title: 'You Earn ₹150', desc: 'Earn ₹150 credited to your wallet for each successful registration.' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl mb-3">
                {icon}
              </div>
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                {step}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Activity Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Referral Activity</h2>
          <p className="text-sm text-slate-500 mt-0.5">{referralActivity.length} referrals tracked</p>
        </div>

        {referralActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No referrals yet</h3>
            <p className="text-slate-500 text-sm max-w-sm">
              Start sharing your code and your referral activity will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Friend Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Joined</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {referralActivity.map((entry) => {
                  const { label, classes } = statusConfig[entry.status];
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50 transition-colors duration-100">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                            {entry.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-slate-900 text-sm">{entry.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{entry.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{entry.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
                          {label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-right">
                        {entry.earned > 0 ? (
                          <span className="text-emerald-600">₹{entry.earned}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Terms Note */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <span className="text-amber-500 mt-0.5 text-lg shrink-0">ℹ️</span>
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Terms:</span> Earnings are credited within 7 days of your friend&apos;s first competition registration. Minimum withdrawal threshold: ₹500.
        </p>
      </div>
    </div>
  );
}
