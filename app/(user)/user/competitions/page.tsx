'use client';

import { useState } from 'react';

const COMPETITIONS = [
  { id: '1', title: 'National Math Olympiad 2026', category: 'Mathematics', status: 'active', prizePool: '₹2,00,000', entryFee: 299, deadline: '10 Dec 2026', startDate: '15 Dec 2026', participants: 4820, maxParticipants: 10000, gradient: 'from-blue-500 to-indigo-600', registered: true },
  { id: '2', title: 'Science Quiz Championship', category: 'Science', status: 'active', prizePool: '₹1,50,000', entryFee: 199, deadline: '18 Dec 2026', startDate: '20 Dec 2026', participants: 1240, maxParticipants: 5000, gradient: 'from-emerald-500 to-teal-600', registered: true },
  { id: '3', title: 'CodeBattle Winter Edition', category: 'Programming', status: 'upcoming', prizePool: '₹5,00,000', entryFee: 499, deadline: '1 Jan 2027', startDate: '5 Jan 2027', participants: 3100, maxParticipants: 8000, gradient: 'from-violet-500 to-purple-600', registered: false },
  { id: '4', title: 'GK Challenge Series 6', category: 'General Knowledge', status: 'upcoming', prizePool: '₹50,000', entryFee: 99, deadline: '20 Dec 2026', startDate: '25 Dec 2026', participants: 540, maxParticipants: 10000, gradient: 'from-amber-500 to-orange-600', registered: false },
  { id: '5', title: 'Technology Innovators Challenge', category: 'Technology', status: 'upcoming', prizePool: '₹3,00,000', entryFee: 399, deadline: '5 Jan 2027', startDate: '10 Jan 2027', participants: 320, maxParticipants: 2000, gradient: 'from-cyan-500 to-blue-600', registered: false },
  { id: '6', title: 'English Language Olympiad', category: 'Languages', status: 'upcoming', prizePool: '₹75,000', entryFee: 149, deadline: '25 Jan 2027', startDate: '1 Feb 2027', participants: 180, maxParticipants: 3000, gradient: 'from-pink-500 to-rose-600', registered: false },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
  upcoming: { label: 'Upcoming', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', color: 'bg-slate-100 text-slate-700' },
};

export default function UserCompetitionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [registerModal, setRegisterModal] = useState<typeof COMPETITIONS[number] | null>(null);
  const [registeredIds, setRegisteredIds] = useState(new Set(COMPETITIONS.filter(c => c.registered).map(c => c.id)));
  const [paymentStep, setPaymentStep] = useState<'confirm' | 'payment' | 'success'>('confirm');

  const filtered = COMPETITIONS.filter((c) => {
    const ms = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'all' || c.status === statusFilter;
    return ms && mst;
  });

  const openRegister = (comp: typeof COMPETITIONS[number]) => { setRegisterModal(comp); setPaymentStep('confirm'); };
  const handleRegister = () => {
    if (paymentStep === 'confirm') setPaymentStep('payment');
    else if (paymentStep === 'payment') {
      setRegisteredIds((prev) => new Set([...prev, registerModal!.id]));
      setPaymentStep('success');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Browse Competitions</h2>
        <p className="text-slate-500 text-sm mt-0.5">Find and register for competitions in your area of interest</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search competitions..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((comp) => {
          const st = statusConfig[comp.status] ?? { label: comp.status, color: 'bg-slate-100 text-slate-700' };
          const isRegistered = registeredIds.has(comp.id);
          const pct = Math.round((comp.participants / comp.maxParticipants) * 100);
          return (
            <div key={comp.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-28 bg-gradient-to-br ${comp.gradient} flex items-end px-4 pb-3 relative`}>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
                {isRegistered && (
                  <span className="absolute top-3 right-3 bg-white/90 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">✓ Registered</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-indigo-600 font-medium">{comp.category}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5 mb-3 leading-tight">{comp.title}</h3>
                <div className="flex justify-between text-sm mb-3">
                  <div><p className="text-xs text-slate-400">Prize Pool</p><p className="font-bold text-emerald-600">{comp.prizePool}</p></div>
                  <div className="text-right"><p className="text-xs text-slate-400">Entry Fee</p><p className="font-bold text-slate-900">₹{comp.entryFee}</p></div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{comp.participants.toLocaleString()} joined</span>
                    <span>{pct}% full</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="text-xs text-slate-400 mb-4">
                  <span>📅 Starts {comp.startDate}</span>
                  <span className="ml-3">⏰ Deadline {comp.deadline}</span>
                </div>
                {isRegistered ? (
                  <button className="w-full px-4 py-2.5 bg-emerald-50 text-emerald-700 font-semibold text-sm rounded-xl border border-emerald-200">
                    ✓ Registered — View Progress
                  </button>
                ) : (
                  <button onClick={() => openRegister(comp)} className="w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-colors">
                    Register Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {registerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
            {paymentStep === 'success' ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Registration Successful!</h3>
                <p className="text-slate-500 text-sm mb-6">You are now registered for <strong>{registerModal.title}</strong>. Good luck!</p>
                <button onClick={() => setRegisterModal(null)} className="w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">Done</button>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-lg">{paymentStep === 'confirm' ? 'Confirm Registration' : 'Complete Payment'}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {paymentStep === 'confirm' ? (
                    <>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm font-semibold text-slate-900">{registerModal.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{registerModal.category} · Starts {registerModal.startDate}</p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Entry Fee</span>
                        <span className="font-bold text-slate-900">₹{registerModal.entryFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Prize Pool</span>
                        <span className="font-semibold text-emerald-600">{registerModal.prizePool}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-slate-600">Select payment method:</p>
                      {['UPI (Google Pay, PhonePe)', 'Credit / Debit Card', 'Net Banking'].map((m) => (
                        <label key={m} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                          <input type="radio" name="method" className="text-indigo-600" defaultChecked={m.includes('UPI')} />
                          <span className="text-sm font-medium text-slate-700">{m}</span>
                        </label>
                      ))}
                      <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100">
                        <span>Total</span>
                        <span>₹{registerModal.entryFee}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6 border-t border-slate-100 flex gap-3">
                  <button onClick={() => setRegisterModal(null)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium">Cancel</button>
                  <button onClick={handleRegister} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                    {paymentStep === 'confirm' ? 'Proceed to Pay' : 'Pay ₹' + registerModal.entryFee}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

