'use client';

import { useState } from 'react';
import Link from 'next/link';

const competitions = [
  { id: '1', title: 'National Mathematics Olympiad 2026', category: 'Mathematics', status: 'active', participants: 4820, maxParticipants: 10000, prizePool: '₹2,00,000', entryFee: '₹299', startDate: '15 Dec 2026' },
  { id: '2', title: 'All India Science Quiz Championship', category: 'Science', status: 'upcoming', participants: 1240, maxParticipants: 5000, prizePool: '₹1,50,000', entryFee: '₹199', startDate: '20 Dec 2026' },
  { id: '3', title: 'CodeBattle: Programming Contest Winter', category: 'Programming', status: 'active', participants: 3100, maxParticipants: 8000, prizePool: '₹5,00,000', entryFee: '₹499', startDate: '5 Jan 2027' },
  { id: '4', title: 'GK Challenge Series 5', category: 'General Knowledge', status: 'completed', participants: 8900, maxParticipants: 10000, prizePool: '₹50,000', entryFee: '₹99', startDate: '1 Oct 2026' },
  { id: '5', title: 'English Language Olympiad', category: 'Languages', status: 'draft', participants: 0, maxParticipants: 3000, prizePool: '₹75,000', entryFee: '₹149', startDate: '1 Feb 2027' },
  { id: '6', title: 'Technology Innovators Challenge', category: 'Technology', status: 'upcoming', participants: 540, maxParticipants: 2000, prizePool: '₹3,00,000', entryFee: '₹399', startDate: '10 Jan 2027' },
  { id: '7', title: 'National Arts Competition', category: 'Arts', status: 'completed', participants: 2200, maxParticipants: 3000, prizePool: '₹30,000', entryFee: '₹99', startDate: '15 Sep 2026' },
  { id: '8', title: 'Physics Brain Bowl 2026', category: 'Science', status: 'active', participants: 980, maxParticipants: 2000, prizePool: '₹1,00,000', entryFee: '₹249', startDate: '1 Nov 2026' },
  { id: '9', title: 'Cyber Security Challenge', category: 'Technology', status: 'draft', participants: 0, maxParticipants: 1000, prizePool: '₹2,00,000', entryFee: '₹699', startDate: '15 Mar 2027' },
  { id: '10', title: 'Sports Trivia Cup', category: 'Sports', status: 'upcoming', participants: 320, maxParticipants: 5000, prizePool: '₹25,000', entryFee: '₹49', startDate: '25 Dec 2026' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
  upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', color: 'bg-slate-100 text-slate-700' },
  draft: { label: 'Draft', color: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Cancelled', color: 'bg-rose-100 text-rose-700' },
};

export default function AdminCompetitions() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [data, setData] = useState(competitions);

  const filtered = data.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((c) => c.id !== id));
    setDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Competitions</h2>
          <p className="text-slate-500 text-sm mt-0.5">{data.length} competitions total</p>
        </div>
        <Link href="/admin/competitions/create" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create Competition
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text" placeholder="Search competitions..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Statuses</option>
          {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Title', 'Category', 'Status', 'Participants', 'Prize Pool', 'Entry Fee', 'Start Date', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-400">No competitions found</td></tr>
              ) : (
                filtered.map((c) => {
                  const st = statusConfig[c.status] ?? { label: c.status, color: 'bg-slate-100 text-slate-700' };
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3.5 text-sm font-medium text-slate-900 max-w-xs">
                        <div className="truncate">{c.title}</div>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{c.category}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-slate-600 whitespace-nowrap">{c.participants.toLocaleString()} / {c.maxParticipants.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-emerald-600 whitespace-nowrap">{c.prizePool}</td>
                      <td className="px-4 py-3.5 text-sm text-slate-600 whitespace-nowrap">{c.entryFee}</td>
                      <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{c.startDate}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Link href={`/admin/competitions/${c.id}`} className="text-indigo-600 text-xs font-medium hover:underline">View</Link>
                          <Link href={`/admin/competitions/${c.id}`} className="text-slate-500 text-xs font-medium hover:underline">Edit</Link>
                          <button onClick={() => setDeleteModal(c.id)} className="text-rose-500 text-xs font-medium hover:underline">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Competition?</h3>
              <p className="text-slate-500 text-sm mb-6">This action cannot be undone. All associated data will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal(null)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Cancel</button>
                <button onClick={() => handleDelete(deleteModal)} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

