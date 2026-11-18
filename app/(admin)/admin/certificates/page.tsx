'use client';

import { useState } from 'react';

const CERTS = [
  { id: 'CERT-2026-001', participant: 'Meera Joshi', competition: 'Math Olympiad 2026', rank: 1, issued: '20 Nov 2026', code: 'CH-MO26-MJ-001', status: 'issued' },
  { id: 'CERT-2026-002', participant: 'Priya Sharma', competition: 'Math Olympiad 2026', rank: 2, issued: '20 Nov 2026', code: 'CH-MO26-PS-002', status: 'issued' },
  { id: 'CERT-2026-003', participant: 'Ravi Sharma', competition: 'Math Olympiad 2026', rank: 3, issued: '20 Nov 2026', code: 'CH-MO26-RS-003', status: 'issued' },
  { id: 'CERT-2026-004', participant: 'Pooja Nair', competition: 'Science Quiz', rank: 1, issued: '15 Nov 2026', code: 'CH-SQ26-PN-001', status: 'issued' },
  { id: 'CERT-2026-005', participant: 'Kiran Patel', competition: 'Science Quiz', rank: 2, issued: '15 Nov 2026', code: 'CH-SQ26-KP-002', status: 'issued' },
  { id: 'CERT-2026-006', participant: 'Rahul Verma', competition: 'CodeBattle Winter', rank: 1, issued: '—', code: '—', status: 'pending' },
  { id: 'CERT-2026-007', participant: 'Anjali Singh', competition: 'GK Challenge', rank: 1, issued: '10 Nov 2026', code: 'CH-GK26-AS-001', status: 'revoked' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  issued: { label: 'Issued', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  revoked: { label: 'Revoked', color: 'bg-rose-100 text-rose-700' },
};

export default function CertificatesPage() {
  const [issueModal, setIssueModal] = useState(false);
  const [revokeId, setRevokeId] = useState<string | null>(null);

  const stats = [
    { label: 'Issued', value: CERTS.filter(c => c.status === 'issued').length, color: 'text-emerald-600' },
    { label: 'Pending', value: CERTS.filter(c => c.status === 'pending').length, color: 'text-amber-600' },
    { label: 'Revoked', value: CERTS.filter(c => c.status === 'revoked').length, color: 'text-rose-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Certificates</h2>
          <p className="text-slate-500 text-sm mt-0.5">Issue and manage digital certificates</p>
        </div>
        <button onClick={() => setIssueModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Issue Certificates
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-500 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Certificate ID', 'Participant', 'Competition', 'Rank', 'Issued Date', 'Verification Code', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CERTS.map((c) => {
                const st = statusConfig[c.status] ?? { label: c.status, color: 'bg-slate-100 text-slate-700' };
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5 text-xs font-mono text-slate-500">{c.id}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-slate-900 whitespace-nowrap">{c.participant}</td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 whitespace-nowrap">{c.competition}</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-indigo-600">
                      {c.rank === 1 ? '🥇 1st' : c.rank === 2 ? '🥈 2nd' : c.rank === 3 ? '🥉 3rd' : `#${c.rank}`}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-400 whitespace-nowrap">{c.issued}</td>
                    <td className="px-4 py-3.5 text-xs font-mono text-slate-500">{c.code}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex gap-2">
                        {c.status === 'issued' && <button className="text-indigo-600 text-xs font-medium hover:underline">Download</button>}
                        {c.status === 'issued' && <button onClick={() => setRevokeId(c.id)} className="text-rose-500 text-xs font-medium hover:underline">Revoke</button>}
                        {c.status === 'pending' && <button className="text-emerald-600 text-xs font-medium hover:underline">Issue Now</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Modal */}
      {issueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Issue Certificates</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Competition</label>
                <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Math Olympiad 2026</option>
                  <option>CodeBattle Winter</option>
                  <option>Science Quiz</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Issue For</label>
                <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Top 3 participants</option>
                  <option>Top 10 participants</option>
                  <option>All participants</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <button onClick={() => setIssueModal(false)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium">Cancel</button>
              <button onClick={() => setIssueModal(false)} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">Issue</button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Modal */}
      {revokeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Revoke Certificate?</h3>
            <p className="text-slate-500 text-sm mb-6">This certificate will be invalidated and the participant will be notified.</p>
            <div className="flex gap-3">
              <button onClick={() => setRevokeId(null)} className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium">Cancel</button>
              <button onClick={() => setRevokeId(null)} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700">Revoke</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

