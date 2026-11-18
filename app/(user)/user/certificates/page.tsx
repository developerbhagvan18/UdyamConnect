'use client';

import { useState } from 'react';

const CERTS = [
  { id: 'CERT-2026-H01', competition: 'Hindi Language Challenge', rank: 1, issued: '10 Jun 2026', code: 'CH-HL26-PS-001', prize: '₹20,000', category: 'Languages', color: 'from-amber-400 to-orange-500' },
  { id: 'CERT-2026-P02', competition: 'Physics Brain Bowl', rank: 2, issued: '25 Jul 2026', code: 'CH-PB26-PS-002', prize: '₹10,000', category: 'Science', color: 'from-indigo-500 to-violet-600' },
  { id: 'CERT-2026-G03', competition: 'GK Challenge Series 5', rank: 3, issued: '8 Oct 2026', code: 'CH-GK26-PS-003', prize: '₹5,000', category: 'General Knowledge', color: 'from-emerald-500 to-teal-600' },
  { id: 'CERT-2026-S04', competition: 'National Science Olympiad 2025', rank: 5, issued: '20 Nov 2025', code: 'CH-NS25-PS-005', prize: '—', category: 'Science', color: 'from-blue-500 to-cyan-600' },
  { id: 'CERT-2026-C05', competition: 'CodeBattle 2025 Finale', rank: 2, issued: '15 Dec 2025', code: 'CH-CB25-PS-002', prize: '₹25,000', category: 'Programming', color: 'from-violet-500 to-purple-600' },
];

export default function UserCertificatesPage() {
  const [shareModal, setShareModal] = useState<typeof CERTS[number] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Certificates</h2>
          <p className="text-slate-500 text-sm mt-0.5">{CERTS.length} certificates earned</p>
        </div>
      </div>

      {CERTS.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <div className="text-5xl mb-4">📜</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Certificates Yet</h3>
          <p className="text-slate-500 mb-6">Participate in competitions and rank in top positions to earn certificates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CERTS.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Certificate Visual */}
              <div className={`h-32 bg-gradient-to-br ${cert.color} flex flex-col items-center justify-center text-white relative`}>
                <div className="absolute inset-2 border-2 border-white/30 rounded-xl" />
                <div className="text-3xl mb-1">🏅</div>
                <div className="text-xs font-semibold tracking-widest text-white/80 uppercase">Certificate of Achievement</div>
                <div className="text-sm font-bold mt-0.5">
                  {cert.rank === 1 ? '🥇 1st Place' : cert.rank === 2 ? '🥈 2nd Place' : cert.rank === 3 ? '🥉 3rd Place' : `Rank #${cert.rank}`}
                </div>
              </div>

              <div className="p-4">
                <span className="text-xs font-medium text-indigo-600">{cert.category}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5 leading-tight">{cert.competition}</h3>
                <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Issued</span>
                    <span className="font-medium text-slate-700">{cert.issued}</span>
                  </div>
                  {cert.prize !== '—' && (
                    <div className="flex items-center justify-between">
                      <span>Prize Won</span>
                      <span className="font-semibold text-emerald-600">{cert.prize}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Verification</span>
                    <button onClick={() => handleCopy(cert.code)} className="font-mono font-medium text-slate-700 hover:text-indigo-600 flex items-center gap-1">
                      {cert.code.slice(0, 12)}…
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                    ⬇ Download
                  </button>
                  <button onClick={() => setShareModal(cert)} className="px-3 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Share Certificate</h3>
              <p className="text-slate-500 text-sm mt-0.5">{shareModal.competition}</p>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors">
                <span className="text-xl">💬</span> Share via WhatsApp
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                <span className="text-xl">💼</span> Share on LinkedIn
              </button>
              <button onClick={() => handleCopy(shareModal.code)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors">
                <span className="text-xl">🔗</span> {copied ? 'Copied!' : 'Copy Verification Link'}
              </button>
            </div>
            <div className="p-6 border-t border-slate-100">
              <button onClick={() => setShareModal(null)} className="w-full px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

