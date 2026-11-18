'use client';

import { useState } from 'react';

const REPORT_TYPES = [
  { icon: '💰', title: 'Revenue Report', description: 'Monthly and competition-wise revenue breakdown with trends', color: 'bg-emerald-50 border-emerald-100 text-emerald-600' },
  { icon: '👥', title: 'Participant Report', description: 'Registration stats, demographics, and engagement analysis', color: 'bg-indigo-50 border-indigo-100 text-indigo-600' },
  { icon: '🏆', title: 'Competition Performance', description: 'Completion rates, scores distribution, and difficulty analysis', color: 'bg-violet-50 border-violet-100 text-violet-600' },
  { icon: '🔗', title: 'Referral Report', description: 'Referral conversion rates and top referrers leaderboard', color: 'bg-amber-50 border-amber-100 text-amber-600' },
  { icon: '📜', title: 'Certificate Report', description: 'Certificates issued, pending, and verification statistics', color: 'bg-rose-50 border-rose-100 text-rose-600' },
  { icon: '📈', title: 'Growth Report', description: 'Platform growth metrics, user acquisition, and retention', color: 'bg-cyan-50 border-cyan-100 text-cyan-600' },
];

const RECENT_REPORTS = [
  { name: 'Revenue Report — October 2026', generated: '1 Nov 2026', status: 'ready', size: '2.4 MB' },
  { name: 'Participant Report — Q3 2026', generated: '15 Oct 2026', status: 'ready', size: '5.1 MB' },
  { name: 'Math Olympiad Performance Report', generated: '22 Oct 2026', status: 'ready', size: '1.8 MB' },
  { name: 'Referral Report — October 2026', generated: '1 Nov 2026', status: 'processing', size: '—' },
  { name: 'Growth Report — October 2026', generated: '1 Nov 2026', status: 'ready', size: '3.2 MB' },
];

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [format, setFormat] = useState('pdf');
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = (title: string) => {
    setGenerating(title);
    setTimeout(() => { setGenerating(null); setGenerated(true); setTimeout(() => setGenerated(false), 3000); }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
        <p className="text-slate-500 text-sm mt-0.5">Generate and download platform analytics reports</p>
      </div>

      {generated && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Report generated successfully! Check your email or download below.
        </div>
      )}

      {/* Custom Report Builder */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Custom Date Range Report</h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">From Date</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">To Date</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          <button onClick={() => handleGenerate('Custom Report')} className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Type Cards */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Report Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORT_TYPES.map((r) => (
            <div key={r.title} className={`bg-white rounded-xl border ${r.color.split(' ')[1]} shadow-sm p-5`}>
              <div className={`w-10 h-10 ${r.color.split(' ')[0]} rounded-lg flex items-center justify-center text-xl mb-3`}>{r.icon}</div>
              <h4 className="font-semibold text-slate-900 mb-1">{r.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{r.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleGenerate(r.title)} disabled={generating === r.title}
                  className="flex-1 px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                  {generating === r.title ? 'Generating...' : 'Generate'}
                </button>
                <button className="px-3 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50">Schedule</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {RECENT_REPORTS.map((r, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.generated} · {r.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.status === 'ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {r.status === 'ready' ? 'Ready' : 'Processing...'}
                </span>
                {r.status === 'ready' && (
                  <button className="text-indigo-600 text-xs font-medium hover:underline flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

