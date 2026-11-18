'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Total Competitions', value: '24', change: '+3', changeType: 'up', icon: '🏆', color: 'indigo' },
  { label: 'Active Participants', value: '1,847', change: '+124', changeType: 'up', icon: '👥', color: 'emerald' },
  { label: 'Revenue This Month', value: '₹2,34,500', change: '+18%', changeType: 'up', icon: '💰', color: 'amber' },
  { label: 'Pending Payments', value: '12', change: '-3', changeType: 'down', icon: '⏳', color: 'rose' },
];

const revenueData = [
  { month: 'Jun', value: 95000, label: '₹95K' },
  { month: 'Jul', value: 142000, label: '₹1.4L' },
  { month: 'Aug', value: 128000, label: '₹1.3L' },
  { month: 'Sep', value: 189000, label: '₹1.9L' },
  { month: 'Oct', value: 215000, label: '₹2.2L' },
  { month: 'Nov', value: 234500, label: '₹2.3L' },
];

const recentCompetitions = [
  { id: '1', title: 'National Math Olympiad 2026', status: 'active', participants: 4820, revenue: '₹1,44,180', statusColor: 'bg-emerald-100 text-emerald-700' },
  { id: '2', title: 'Science Quiz Championship', status: 'upcoming', participants: 1240, revenue: '₹24,780', statusColor: 'bg-blue-100 text-blue-700' },
  { id: '3', title: 'CodeBattle Winter Edition', status: 'active', participants: 3100, revenue: '₹1,54,900', statusColor: 'bg-emerald-100 text-emerald-700' },
  { id: '4', title: 'GK Challenge Series 5', status: 'completed', participants: 8900, revenue: '₹2,67,000', statusColor: 'bg-slate-100 text-slate-700' },
  { id: '5', title: 'English Language Olympiad', status: 'draft', participants: 0, revenue: '—', statusColor: 'bg-amber-100 text-amber-700' },
];

const recentPayments = [
  { user: 'Priya Sharma', competition: 'Math Olympiad', amount: '₹299', method: 'UPI', status: 'completed', statusColor: 'bg-emerald-100 text-emerald-700', date: '5 Nov 2026' },
  { user: 'Rahul Verma', competition: 'CodeBattle', amount: '₹499', method: 'Card', status: 'completed', statusColor: 'bg-emerald-100 text-emerald-700', date: '5 Nov 2026' },
  { user: 'Anjali Singh', competition: 'Science Quiz', amount: '₹199', method: 'UPI', status: 'pending', statusColor: 'bg-amber-100 text-amber-700', date: '4 Nov 2026' },
  { user: 'Kiran Patel', competition: 'GK Challenge', amount: '₹99', method: 'Net Banking', status: 'failed', statusColor: 'bg-rose-100 text-rose-700', date: '4 Nov 2026' },
  { user: 'Suresh Kumar', competition: 'Math Olympiad', amount: '₹299', method: 'UPI', status: 'completed', statusColor: 'bg-emerald-100 text-emerald-700', date: '3 Nov 2026' },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
};

export default function AdminDashboard() {
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500 text-sm mt-0.5">{today}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/competitions/create" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Competition
          </Link>
          <Link href="/admin/reports" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            Export Report
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-white rounded-xl p-5 border ${colorMap[stat.color].split(' ')[2]} shadow-sm`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${colorMap[stat.color].split(' ').slice(0, 2).join(' ')}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <span className={`text-sm font-medium ${stat.changeType === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.changeType === 'up' ? '↑' : '↓'} {stat.change}
              </span>
              <span className="text-slate-400 text-xs">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Revenue Trend</h3>
              <p className="text-slate-400 text-xs mt-0.5">Last 6 months</p>
            </div>
            <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">+18% ↑</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {revenueData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-slate-400">{d.label}</span>
                <div
                  className="w-full bg-indigo-500 rounded-t-lg hover:bg-indigo-600 transition-colors"
                  style={{ height: `${(d.value / maxRevenue) * 100}px` }}
                  title={d.label}
                />
                <span className="text-xs text-slate-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🏆', label: 'Create Competition', href: '/admin/competitions/create', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
              { icon: '📊', label: 'View Reports', href: '/admin/reports', color: 'bg-violet-50 text-violet-600 border-violet-100' },
              { icon: '💳', label: 'Manage Payments', href: '/admin/payments', color: 'bg-amber-50 text-amber-600 border-amber-100' },
              { icon: '👥', label: 'View Participants', href: '/admin/participants', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
              { icon: '📜', label: 'Issue Certificates', href: '/admin/certificates', color: 'bg-rose-50 text-rose-600 border-rose-100' },
              { icon: '⚙️', label: 'Settings', href: '/admin/settings', color: 'bg-slate-50 text-slate-600 border-slate-100' },
            ].map((a) => (
              <Link key={a.label} href={a.href} className={`flex items-center gap-3 p-3 rounded-lg border ${a.color} hover:opacity-80 transition-opacity`}>
                <span className="text-xl">{a.icon}</span>
                <span className="text-sm font-medium">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Competitions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Recent Competitions</h3>
          <Link href="/admin/competitions" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Title', 'Status', 'Participants', 'Revenue', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentCompetitions.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{c.title}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${c.statusColor}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{c.participants.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{c.revenue}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <Link href={`/admin/competitions/${c.id}`} className="text-indigo-600 text-xs font-medium hover:underline">View</Link>
                      <Link href={`/admin/competitions/${c.id}`} className="text-slate-500 text-xs font-medium hover:underline">Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Recent Payments</h3>
          <Link href="/admin/payments" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['User', 'Competition', 'Amount', 'Method', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentPayments.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{p.user}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{p.competition}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-900">{p.amount}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{p.method}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${p.statusColor}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

