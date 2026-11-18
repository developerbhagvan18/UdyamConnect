'use client';

const REFERRALS = [
  { referrer: 'Priya Sharma', referred: 'Rahul Kumar', competition: 'Math Olympiad 2026', earnings: 150, status: 'credited', date: '10 Nov 2026' },
  { referrer: 'Priya Sharma', referred: 'Anjali Nair', competition: 'Science Quiz', earnings: 100, status: 'credited', date: '8 Nov 2026' },
  { referrer: 'Rahul Verma', referred: 'Kiran Singh', competition: 'CodeBattle Winter', earnings: 250, status: 'pending', date: '12 Nov 2026' },
  { referrer: 'Meera Joshi', referred: 'Suresh Patel', competition: 'GK Challenge', earnings: 50, status: 'credited', date: '5 Nov 2026' },
  { referrer: 'Arjun Reddy', referred: 'Deepa Menon', competition: 'Math Olympiad 2026', earnings: 150, status: 'credited', date: '7 Nov 2026' },
  { referrer: 'Pooja Nair', referred: 'Vikram Sharma', competition: 'Science Quiz', earnings: 100, status: 'pending', date: '14 Nov 2026' },
  { referrer: 'Priya Sharma', referred: 'Ravi Kumar', competition: 'CodeBattle Winter', earnings: 250, status: 'credited', date: '3 Nov 2026' },
  { referrer: 'Meera Joshi', referred: 'Nisha Reddy', competition: 'Math Olympiad 2026', earnings: 150, status: 'pending', date: '15 Nov 2026' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  credited: { label: 'Credited', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
};

export default function ReferralsPage() {
  const totalEarnings = REFERRALS.filter(r => r.status === 'credited').reduce((s, r) => s + r.earnings, 0);
  const uniqueReferrers = new Set(REFERRALS.map(r => r.referrer)).size;

  const summaryCards = [
    { label: 'Total Referrals', value: REFERRALS.length, icon: '🔗', color: 'border-indigo-100' },
    { label: 'Active Referrers', value: uniqueReferrers, icon: '👥', color: 'border-emerald-100' },
    { label: 'Earnings Paid', value: `₹${totalEarnings}`, icon: '💰', color: 'border-amber-100' },
    { label: 'Pending', value: REFERRALS.filter(r => r.status === 'pending').length, icon: '⏳', color: 'border-rose-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Referrals</h2>
        <p className="text-slate-500 text-sm mt-0.5">Track referral activity and earnings</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className={`bg-white rounded-xl border ${c.color} shadow-sm p-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{c.icon}</span>
            </div>
            <div className="text-xl font-bold text-slate-900">{c.value}</div>
            <div className="text-slate-500 text-sm mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Referral Activity</h3>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Referrer', 'Referred User', 'Competition', 'Earnings', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {REFERRALS.map((r, i) => {
                const st = statusConfig[r.status] ?? { label: r.status, color: 'bg-slate-100 text-slate-700' };
                return (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5 text-sm font-medium text-slate-900 whitespace-nowrap">{r.referrer}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 whitespace-nowrap">{r.referred}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-500 whitespace-nowrap">{r.competition}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-emerald-600 whitespace-nowrap">₹{r.earnings}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 whitespace-nowrap">{r.date}</td>
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

