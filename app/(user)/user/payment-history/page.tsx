'use client';

const PAYMENTS = [
  { id: 'TXN001', competition: 'National Math Olympiad 2026', amount: 299, method: 'UPI', status: 'completed', date: '10 Nov 2026', txnRef: 'UPI123456789' },
  { id: 'TXN002', competition: 'Science Quiz Championship', amount: 199, method: 'UPI', status: 'completed', date: '8 Nov 2026', txnRef: 'UPI987654321' },
  { id: 'TXN003', competition: 'Technology Innovators Challenge', amount: 399, method: 'Card', status: 'completed', date: '5 Nov 2026', txnRef: 'CARD123456' },
  { id: 'TXN004', competition: 'English Language Olympiad', amount: 149, method: 'UPI', status: 'pending', date: '15 Nov 2026', txnRef: '—' },
  { id: 'TXN005', competition: 'GK Challenge Series 5', amount: 99, method: 'Net Banking', status: 'completed', date: '20 Sep 2026', txnRef: 'NB789012' },
  { id: 'TXN006', competition: 'Physics Brain Bowl', amount: 249, method: 'Card', status: 'completed', date: '10 Jul 2026', txnRef: 'CARD654321' },
  { id: 'TXN007', competition: 'CodeBattle Spring Edition', amount: 499, method: 'UPI', status: 'completed', date: '5 Aug 2026', txnRef: 'UPI456789' },
  { id: 'TXN008', competition: 'Hindi Language Challenge', amount: 149, method: 'UPI', status: 'completed', date: '25 May 2026', txnRef: 'UPI321654' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  failed: { label: 'Failed', color: 'bg-rose-100 text-rose-700' },
};

export default function PaymentHistoryPage() {
  const totalPaid = PAYMENTS.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
  const completed = PAYMENTS.filter(p => p.status === 'completed').length;
  const pending = PAYMENTS.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Payment History</h2>
        <p className="text-slate-500 text-sm mt-0.5">All your competition registration payments</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Paid', value: `₹${totalPaid}`, icon: '💳', color: 'border-indigo-100 text-indigo-600' },
          { label: 'Successful', value: completed, icon: '✅', color: 'border-emerald-100 text-emerald-600' },
          { label: 'Pending', value: pending, icon: '⏳', color: 'border-amber-100 text-amber-600' },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border ${s.color.split(' ')[0]} shadow-sm p-4 text-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-bold ${s.color.split(' ')[1]}`}>{s.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">All Transactions</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {PAYMENTS.map((p) => {
            const st = statusConfig[p.status] ?? { label: p.status, color: 'bg-slate-100 text-slate-700' };
            return (
              <div key={p.id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{p.competition}</p>
                      <p className="text-xs text-slate-400">{p.date} · {p.method} · Ref: {p.txnRef}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
                    <span className="font-bold text-slate-900 text-sm">₹{p.amount}</span>
                    {p.status === 'completed' && (
                      <button className="text-indigo-600 text-xs font-medium hover:underline">Receipt</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

