'use client';

import { useState } from 'react';

const COMPETITIONS = ['Math Olympiad 2026', 'Science Quiz Championship', 'CodeBattle Winter', 'GK Challenge Series 5'];

const RESULTS = [
  { rank: 1, name: 'Meera Joshi', initials: 'MJ', score: 95, timeTaken: '42:18', prize: '₹1,00,000', certified: false },
  { rank: 2, name: 'Priya Sharma', initials: 'PS', score: 92, timeTaken: '44:55', prize: '₹60,000', certified: false },
  { rank: 3, name: 'Ravi Sharma', initials: 'RS', score: 88, timeTaken: '45:12', prize: '₹40,000', certified: false },
  { rank: 4, name: 'Pooja Nair', initials: 'PN', score: 85, timeTaken: '47:30', prize: '₹10,000', certified: false },
  { rank: 5, name: 'Kiran Patel', initials: 'KP', score: 78, timeTaken: '49:05', prize: '₹5,000', certified: false },
  { rank: 6, name: 'Vikram Singh', initials: 'VS', score: 72, timeTaken: '50:22', prize: '—', certified: false },
  { rank: 7, name: 'Nisha Gupta', initials: 'NG', score: 68, timeTaken: '52:11', prize: '—', certified: false },
  { rank: 8, name: 'Arjun Reddy', initials: 'AR', score: 65, timeTaken: '53:44', prize: '—', certified: false },
];

const avatarColors = ['bg-amber-400', 'bg-indigo-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-cyan-500', 'bg-pink-500', 'bg-teal-500'];

export default function ResultsPage() {
  const [selectedComp, setSelectedComp] = useState(COMPETITIONS[0]);
  const [published, setPublished] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Results</h2>
          <p className="text-slate-500 text-sm mt-0.5">View and publish competition results</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Export CSV</button>
          <button onClick={() => setPublished(true)} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${published ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            {published ? '✓ Published' : 'Publish Results'}
          </button>
        </div>
      </div>

      {published && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Results published! Participants have been notified via email.
        </div>
      )}

      {/* Competition Selector */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Select Competition</label>
        <select value={selectedComp} onChange={(e) => setSelectedComp(e.target.value)}
          className="w-full max-w-sm px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {COMPETITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-6 text-center">🏆 Top Performers — {selectedComp}</h3>
        <div className="flex items-end justify-center gap-4">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold mb-2">MJ</div>
            <div className="text-sm font-medium text-slate-700">Meera J.</div>
            <div className="text-xs text-slate-500">Score: 95</div>
            <div className="mt-2 w-20 h-16 bg-slate-200 rounded-t-lg flex items-center justify-center text-2xl">🥈</div>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">PS</div>
            <div className="text-sm font-bold text-slate-900">Priya S.</div>
            <div className="text-xs text-slate-500">Score: 92</div>
            <div className="mt-2 w-20 h-24 bg-amber-200 rounded-t-lg flex items-center justify-center text-2xl">🥇</div>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold mb-2">RS</div>
            <div className="text-sm font-medium text-slate-700">Ravi S.</div>
            <div className="text-xs text-slate-500">Score: 88</div>
            <div className="mt-2 w-20 h-10 bg-amber-100 rounded-t-lg flex items-center justify-center text-2xl">🥉</div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Full Leaderboard — {selectedComp}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Rank', 'Participant', 'Score', 'Time Taken', 'Prize Won', 'Certificate', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {RESULTS.map((r) => (
                <tr key={r.rank} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3.5">
                    <span className="text-lg">{r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `#${r.rank}`}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 ${avatarColors[r.rank - 1]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>{r.initials}</div>
                      <span className="text-sm font-medium text-slate-900">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold text-slate-900">{r.score}/100</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{r.timeTaken}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-emerald-600">{r.prize}</td>
                  <td className="px-4 py-3.5">
                    {r.certified
                      ? <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Issued</span>
                      : <span className="text-xs text-slate-400">Pending</span>}
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="text-indigo-600 text-xs font-medium hover:underline">Issue Certificate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

