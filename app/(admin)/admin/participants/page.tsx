'use client';

import { useState } from 'react';

const PARTICIPANTS = [
  { id: '1', name: 'Priya Sharma', email: 'priya@example.com', competition: 'Math Olympiad 2026', status: 'completed', score: 92, rank: 1, registered: '10 Nov 2026' },
  { id: '2', name: 'Rahul Verma', email: 'rahul@example.com', competition: 'CodeBattle Winter', status: 'in_progress', score: null, rank: null, registered: '12 Nov 2026' },
  { id: '3', name: 'Anjali Singh', email: 'anjali@example.com', competition: 'Science Quiz', status: 'registered', score: null, rank: null, registered: '14 Nov 2026' },
  { id: '4', name: 'Kiran Patel', email: 'kiran@example.com', competition: 'GK Challenge', status: 'completed', score: 78, rank: 5, registered: '8 Nov 2026' },
  { id: '5', name: 'Suresh Kumar', email: 'suresh@example.com', competition: 'Math Olympiad 2026', status: 'disqualified', score: null, rank: null, registered: '9 Nov 2026' },
  { id: '6', name: 'Meera Joshi', email: 'meera@example.com', competition: 'Science Quiz', status: 'completed', score: 95, rank: 1, registered: '11 Nov 2026' },
  { id: '7', name: 'Arjun Reddy', email: 'arjun@example.com', competition: 'CodeBattle Winter', status: 'registered', score: null, rank: null, registered: '13 Nov 2026' },
  { id: '8', name: 'Pooja Nair', email: 'pooja@example.com', competition: 'Math Olympiad 2026', status: 'completed', score: 85, rank: 3, registered: '7 Nov 2026' },
  { id: '9', name: 'Vikram Singh', email: 'vikram@example.com', competition: 'GK Challenge', status: 'completed', score: 72, rank: 8, registered: '6 Nov 2026' },
  { id: '10', name: 'Nisha Gupta', email: 'nisha@example.com', competition: 'Science Quiz', status: 'in_progress', score: null, rank: null, registered: '15 Nov 2026' },
  { id: '11', name: 'Ravi Sharma', email: 'ravi@example.com', competition: 'CodeBattle Winter', status: 'completed', score: 88, rank: 2, registered: '5 Nov 2026' },
  { id: '12', name: 'Deepa Menon', email: 'deepa@example.com', competition: 'Math Olympiad 2026', status: 'registered', score: null, rank: null, registered: '16 Nov 2026' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  registered: { label: 'Registered', color: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700' },
  disqualified: { label: 'Disqualified', color: 'bg-rose-100 text-rose-700' },
};

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}
const avatarColors = ['bg-indigo-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];

export default function ParticipantsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = PARTICIPANTS.filter((p) => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'all' || p.status === statusFilter;
    return ms && mst;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Participants</h2>
        <p className="text-slate-500 text-sm mt-0.5">{PARTICIPANTS.length} total participants</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Statuses</option>
          {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <button className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Export CSV</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Participant', 'Competition', 'Status', 'Score', 'Rank', 'Registered', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p, i) => {
                const st = statusConfig[p.status] ?? { label: p.status, color: 'bg-slate-100 text-slate-700' };
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {getInitials(p.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 whitespace-nowrap">{p.competition}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span></td>
                    <td className="px-4 py-3.5 text-sm font-medium text-slate-900 whitespace-nowrap">{p.score !== null ? `${p.score}/100` : '—'}</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-indigo-600 whitespace-nowrap">{p.rank !== null ? `#${p.rank}` : '—'}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 whitespace-nowrap">{p.registered}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-indigo-600 text-xs font-medium hover:underline">View</button>
                        {p.status !== 'disqualified' && <button className="text-rose-500 text-xs font-medium hover:underline">Disqualify</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

