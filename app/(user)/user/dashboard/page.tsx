'use client';

import Link from 'next/link';

const stats = [
  { label: 'Competitions Joined', value: '8', icon: '🏆', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { label: 'My Best Rank', value: '#3', icon: '🥉', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { label: 'Total Winnings', value: '₹12,500', icon: '💰', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { label: 'Certificates Earned', value: '5', icon: '📜', color: 'bg-violet-50 text-violet-600 border-violet-100' },
];

const activeCompetitions = [
  { id: '1', title: 'National Math Olympiad 2026', category: 'Mathematics', daysLeft: 10, progress: 65, gradient: 'from-blue-500 to-indigo-600' },
  { id: '2', title: 'Science Quiz Championship', category: 'Science', daysLeft: 15, progress: 30, gradient: 'from-emerald-500 to-teal-600' },
];

const recentResults = [
  { competition: 'GK Challenge Series 5', date: '1 Oct 2026', rank: 3, score: 85, prize: '₹5,000', total: 8900 },
  { competition: 'CodeBattle Spring Edition', date: '15 Aug 2026', rank: 7, score: 72, prize: '—', total: 3200 },
  { competition: 'Physics Brain Bowl', date: '20 Jul 2026', rank: 2, score: 90, prize: '₹10,000', total: 980 },
];

const upcomingRegistered = [
  { title: 'Technology Innovators Challenge', date: '10 Jan 2027', fee: '₹399', category: 'Technology' },
  { title: 'English Language Olympiad', date: '1 Feb 2027', fee: '₹149', category: 'Languages' },
];

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, Priya! 👋</h2>
            <p className="text-indigo-200 text-sm">You have 2 active competitions. Keep up the great work!</p>
          </div>
          <div className="hidden sm:flex w-12 h-12 bg-white/20 rounded-full items-center justify-center text-2xl">PS</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border ${s.color.split(' ')[2]} shadow-sm p-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <div className={`text-2xl font-bold ${s.color.split(' ')[1]}`}>{s.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Competitions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Active Competitions</h3>
          <Link href="/user/participation" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCompetitions.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className={`h-20 bg-gradient-to-br ${c.gradient} flex items-center px-5`}>
                <div>
                  <span className="text-white/70 text-xs font-medium">{c.category}</span>
                  <h4 className="text-white font-bold text-sm leading-tight">{c.title}</h4>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-slate-500">Your progress</span>
                  <span className="font-semibold text-slate-900">{c.progress}% complete</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-rose-500 font-medium">⏳ {c.daysLeft} days left</span>
                  <Link href={`/user/participation`} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Continue →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Results */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Recent Results</h3>
            <Link href="/user/results" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentResults.map((r, i) => (
              <div key={i} className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900 leading-tight">{r.competition}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{r.date} · {r.total.toLocaleString()} participants</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">{r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `#${r.rank}`}</div>
                    <div className="text-xs text-slate-500">Score: {r.score}</div>
                  </div>
                </div>
                {r.prize !== '—' && (
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    🏆 Won {r.prize}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Upcoming Registrations</h3>
            <Link href="/user/competitions" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">Browse More</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {upcomingRegistered.map((u, i) => (
              <div key={i} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{u.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{u.category} · Starts {u.date}</p>
                </div>
                <span className="text-sm font-semibold text-indigo-600">{u.fee}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100">
            <Link href="/user/competitions" className="block w-full text-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              Browse Competitions
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/user/competitions" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">🔍 Browse Competitions</Link>
          <Link href="/user/certificates" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">📜 View Certificates</Link>
          <Link href="/user/referrals" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">🔗 Invite Friends</Link>
        </div>
      </div>
    </div>
  );
}

