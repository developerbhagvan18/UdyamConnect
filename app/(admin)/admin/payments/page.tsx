'use client';

import { useState } from 'react';

const PAYMENTS = [
  { id: 'TXN001', user: 'Priya Sharma', competition: 'Math Olympiad 2026', amount: 299, method: 'UPI', status: 'completed', date: '5 Nov 2026' },
  { id: 'TXN002', user: 'Rahul Verma', competition: 'CodeBattle Winter', amount: 499, method: 'Card', status: 'completed', date: '5 Nov 2026' },
  { id: 'TXN003', user: 'Anjali Singh', competition: 'Science Quiz', amount: 199, method: 'UPI', status: 'pending', date: '4 Nov 2026' },
  { id: 'TXN004', user: 'Kiran Patel', competition: 'GK Challenge', amount: 99, method: 'Net Banking', status: 'failed', date: '4 Nov 2026' },
  { id: 'TXN005', user: 'Suresh Kumar', competition: 'Math Olympiad 2026', amount: 299, method: 'UPI', status: 'completed', date: '3 Nov 2026' },
  { id: 'TXN006', user: 'Meera Joshi', competition: 'Science Quiz', amount: 199, method: 'Card', status: 'completed', date: '3 Nov 2026' },
  { id: 'TXN007', user: 'Arjun Reddy', competition: 'CodeBattle Winter', amount: 499, method: 'UPI', status: 'refunded', date: '2 Nov 2026' },
  { id: 'TXN008', user: 'Pooja Nair', competition: 'Math Olympiad 2026', amount: 299, method: 'UPI', status: 'completed', date: '2 Nov 2026' },
  { id: 'TXN009', user: 'Vikram Singh', competition: 'GK Challenge', amount: 99, method: 'Card', status: 'completed', date: '1 Nov 2026' },
  { id: 'TXN010', user: 'Nisha Gupta', competition: 'Science Quiz', amount: 199, method: 'UPI', status: 'pending', date: '1 Nov 2026' },
  { id: 'TXN011', user: 'Ravi Sharma', competition: 'CodeBattle Winter', amount: 499, method: 'Net Banking', status: 'completed', date: '31 Oct 2026' },
  { id: 'TXN012', user: 'Deepa Menon', competition: 'Math Olympiad 2026', amount: 299, method: 'UPI', status: 'completed', date: '30 Oct 2026' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  failed: { label: 'Failed', color: 'bg-rose-100 text-rose-700' },
  refunded: { label: 'Refunded', color: 'bg-slate-100 text-slate-700' },
};

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refundModal, setRefundModal] = useState<string | null>(null);

  const filtered = PAYMENTS.filter((p) => {
    const ms = p.user.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'all' || p.status === statusFilter;
    return ms && mst;
  });

  const totalRevenue = PAYMENTS.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const completed = PAYMENTS.filter(p => p.status === 'completed').length;
  const pending = PAYMENTS.filter(p => p.status === 'pending').length;
  const failed = PAYMENTS.filter(p => p.status === 'failed').length;

  const summaryCards = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: '💰', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { label: 'Completed', value: String(completed), icon: '✅', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { label: 'Pending', value: String(pending), icon: '⏳', color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { label: 'Failed', value: String(failed), icon: '❌', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Payments</h2>
        <p className="text-slate-500 text-sm mt-0.5">Track all transaction activity</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className={`bg-white rounded-xl border p-4 shadow-sm ${c.color.split(' ')[2]}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{c.label}</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{c.value}</p>
              </div>
              <span className="text-2xl">{c.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search by user or transaction ID..." value={search} onChange={(e) => setSearch(e.target.value)}
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
                {['Transaction ID', 'User', 'Competition', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => {
                const st = statusConfig[p.status] ?? { label: p.status, color: 'bg-slate-100 text-slate-700' };
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5 text-sm font-mono text-slate-500">{p.id}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-slate-900 whitespace-nowrap">{p.user}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 whitespace-nowrap">{p.competition}</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-slate-900 whitespace-nowrap">₹{p.amount}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{p.method}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span></td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 whitespace-nowrap">{p.date}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-indigo-600 text-xs font-medium hover:underline">Receipt</button>
                        {p.status === 'completed' && <button onClick={() => setRefundModal(p.id)} className="text-amber-600 text-xs font-medium hover:underline">Refund</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {refundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Process Refund?</h3>
            <p className="text-slate-500 text-sm mb-6">The payment amount will be refunded to the original payment method. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setRefundModal(null)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium">Cancel</button>
              <button onClick={() => setRefundModal(null)} className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700">Refund</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

