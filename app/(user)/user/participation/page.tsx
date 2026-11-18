'use client';

import { useState } from 'react';

const ACTIVE = [
  { id: '1', title: 'National Math Olympiad 2026', category: 'Mathematics', status: 'in_progress', deadline: '20 Dec 2026', progress: 65, gradient: 'from-blue-500 to-indigo-600' },
  { id: '2', title: 'Science Quiz Championship', category: 'Science', status: 'registered', deadline: '18 Dec 2026', progress: 0, gradient: 'from-emerald-500 to-teal-600' },
];

const COMPLETED = [
  { id: '3', title: 'GK Challenge Series 5', category: 'General Knowledge', date: '1 Oct 2026', score: 85, rank: 3, totalParticipants: 8900, prize: '₹5,000' },
  { id: '4', title: 'Physics Brain Bowl', category: 'Science', date: '20 Jul 2026', score: 90, rank: 2, totalParticipants: 980, prize: '₹10,000' },
  { id: '5', title: 'CodeBattle Spring Edition', category: 'Programming', date: '15 Aug 2026', score: 72, rank: 7, totalParticipants: 3200, prize: '—' },
  { id: '6', title: 'Hindi Language Challenge', category: 'Languages', date: '5 Jun 2026', score: 88, rank: 1, totalParticipants: 1500, prize: '₹20,000' },
  { id: '7', title: 'National Science Olympiad', category: 'Science', date: '10 Apr 2026', score: 76, rank: 12, totalParticipants: 12000, prize: '—' },
];

const UPCOMING = [
  { id: '8', title: 'Technology Innovators Challenge', category: 'Technology', startDate: '10 Jan 2027', fee: '₹399' },
  { id: '9', title: 'English Language Olympiad', category: 'Languages', startDate: '1 Feb 2027', fee: '₹149' },
];

const TABS = ['Active', 'Completed', 'Upcoming'] as const;

export default function ParticipationPage() {
  const [tab, setTab] = useState<typeof TABS[number]>('Active');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Participation</h2>
        <p className="text-slate-500 text-sm mt-0.5">Track all your competition activities</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1">
          {TABS.map((t) => {
            const count = t === 'Active' ? ACTIVE.length : t === 'Completed' ? COMPLETED.length : UPCOMING.length;
            return (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                {t}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active */}
      {tab === 'Active' && (
        <div className="space-y-4">
          {ACTIVE.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className={`h-16 bg-gradient-to-r ${c.gradient} flex items-center px-5`}>
                <div>
                  <span className="text-white/70 text-xs">{c.category}</span>
                  <h3 className="text-white font-bold">{c.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {c.status === 'in_progress' ? 'In Progress' : 'Registered'}
                  </span>
                  <span className="text-xs text-slate-400">Deadline: {c.deadline}</span>
                </div>
                {c.status === 'in_progress' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-medium text-slate-900">{c.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                )}
                <button className="w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-colors">
                  {c.status === 'in_progress' ? '▶ Continue Competition' : '📋 View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed */}
      {tab === 'Completed' && (
        <div className="space-y-4">
          {COMPLETED.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-400">{c.category}</span>
                    <span className="text-slate-200">·</span>
                    <span className="text-xs text-slate-400">{c.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900">{c.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div>
                      <p className="text-xs text-slate-400">Your Score</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-2 w-20 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${c.score}%` }} />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{c.score}/100</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Rank</p>
                      <p className="text-sm font-bold text-indigo-600 mt-0.5">
                        {c.rank === 1 ? '🥇' : c.rank === 2 ? '🥈' : c.rank === 3 ? '🥉' : ''} #{c.rank} of {c.totalParticipants.toLocaleString()}
                      </p>
                    </div>
                    {c.prize !== '—' && (
                      <div>
                        <p className="text-xs text-slate-400">Prize Won</p>
                        <p className="text-sm font-bold text-emerald-600 mt-0.5">{c.prize}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="text-xs font-medium text-indigo-600 hover:underline whitespace-nowrap">View Result</button>
                  <button className="text-xs font-medium text-slate-500 hover:underline whitespace-nowrap">Download Certificate</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming */}
      {tab === 'Upcoming' && (
        <div className="space-y-4">
          {UPCOMING.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-slate-400">{c.category}</span>
                <h3 className="font-bold text-slate-900">{c.title}</h3>
                <p className="text-sm text-slate-500 mt-1">📅 Starts {c.startDate} · Entry: {c.fee}</p>
              </div>
              <span className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full">Upcoming</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

