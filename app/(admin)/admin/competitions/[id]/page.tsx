'use client';

import { useState } from 'react';
import Link from 'next/link';

const competition = {
  id: '1', title: 'National Mathematics Olympiad 2026', category: 'Mathematics', status: 'active',
  description: 'India\'s premier national-level mathematics competition for students across all age groups. Test your problem-solving skills against the best minds in the country.',
  startDate: '15 Dec 2026', endDate: '20 Dec 2026', registrationDeadline: '10 Dec 2026',
  entryFee: '₹299', prizePool: '₹2,00,000', maxParticipants: 10000, currentParticipants: 4820,
  rules: ['All participants must be enrolled in an Indian educational institution', 'Age limit: 10–25 years', 'Only one submission per participant', 'No calculators or external aids', 'Results are final'],
  tags: ['national', 'mathematics', 'olympiad'],
};

const participants = [
  { name: 'Priya Sharma', email: 'priya@example.com', status: 'completed', score: 92, rank: 1 },
  { name: 'Rahul Verma', email: 'rahul@example.com', status: 'completed', score: 88, rank: 2 },
  { name: 'Anjali Singh', email: 'anjali@example.com', status: 'in_progress', score: null, rank: null },
  { name: 'Kiran Patel', email: 'kiran@example.com', status: 'registered', score: null, rank: null },
  { name: 'Suresh Kumar', email: 'suresh@example.com', status: 'completed', score: 85, rank: 3 },
];

const questions = [
  { id: 1, text: 'If f(x) = 2x² + 3x - 5, find f\'(x)', type: 'MCQ', difficulty: 'Medium', points: 5 },
  { id: 2, text: 'Prove that √2 is irrational', type: 'Short Answer', difficulty: 'Hard', points: 10 },
  { id: 3, text: 'The sum of an arithmetic series is...', type: 'MCQ', difficulty: 'Easy', points: 3 },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
  upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', color: 'bg-slate-100 text-slate-700' },
  draft: { label: 'Draft', color: 'bg-amber-100 text-amber-700' },
  registered: { label: 'Registered', color: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-700' },
};

const diffConfig: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-rose-100 text-rose-700',
};

const TABS = ['Overview', 'Participants', 'Questions', 'Results'] as const;

export default function CompetitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [tab, setTab] = useState<typeof TABS[number]>('Overview');
  const pct = Math.round((competition.currentParticipants / competition.maxParticipants) * 100);
  const st = statusConfig[competition.status] ?? { label: competition.status, color: 'bg-slate-100 text-slate-700' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link href="/admin/competitions" className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mt-0.5">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-500">{competition.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{competition.title}</h2>
          </div>
        </div>
        <div className="flex gap-2 ml-11 sm:ml-0">
          <Link href="/admin/competitions/create" className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Edit</Link>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">Publish Results</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {tab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Description</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{competition.description}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Rules</h3>
              <ul className="space-y-2">
                {competition.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Details</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Start Date', value: competition.startDate },
                  { label: 'End Date', value: competition.endDate },
                  { label: 'Registration Deadline', value: competition.registrationDeadline },
                  { label: 'Entry Fee', value: competition.entryFee },
                  { label: 'Prize Pool', value: competition.prizePool },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-medium text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Registration Progress</h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">{competition.currentParticipants.toLocaleString()} joined</span>
                <span className="font-medium text-slate-900">{pct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-2">of {competition.maxParticipants.toLocaleString()} max</p>
            </div>
          </div>
        </div>
      )}

      {/* Participants Tab */}
      {tab === 'Participants' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Participants ({participants.length})</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Export CSV</button>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Name', 'Email', 'Status', 'Score', 'Rank'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {participants.map((p, i) => {
                const s = statusConfig[p.status] ?? { label: p.status, color: 'bg-slate-100 text-slate-700' };
                return (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-5 py-3.5 font-medium text-slate-900 text-sm">{p.name}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-sm">{p.email}</td>
                    <td className="px-5 py-3.5"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span></td>
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{p.score !== null ? `${p.score}/100` : '—'}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-indigo-600">{p.rank !== null ? `#${p.rank}` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Questions Tab */}
      {tab === 'Questions' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Questions ({questions.length})</h3>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">Add Questions</button>
          </div>
          <div className="divide-y divide-slate-100">
            {questions.map((q) => (
              <div key={q.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{q.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{q.type}</span>
                    <span className="text-slate-200">•</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${diffConfig[q.difficulty] ?? 'bg-slate-100 text-slate-700'}`}>{q.difficulty}</span>
                    <span className="text-slate-200">•</span>
                    <span className="text-xs text-slate-400">{q.points} pts</span>
                  </div>
                </div>
                <button className="text-rose-500 text-xs hover:underline flex-shrink-0">Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Tab */}
      {tab === 'Results' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Leaderboard</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Export</button>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">Publish Results</button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Rank', 'Participant', 'Score', 'Time Taken', 'Prize', 'Certificate'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {participants.filter(p => p.rank !== null).sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0)).map((p) => (
                <tr key={p.name} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5">
                    <span className="text-lg">{p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : '🥉'}</span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-900 text-sm">{p.name}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-slate-900">{p.score}/100</td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">45:23</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-emerald-600">
                    {p.rank === 1 ? '₹1,00,000' : p.rank === 2 ? '₹60,000' : '₹40,000'}
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-indigo-600 text-xs font-medium hover:underline">Issue</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

