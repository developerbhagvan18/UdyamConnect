'use client';

const RESULTS = [
  { competition: 'Hindi Language Challenge', category: 'Languages', date: '5 Jun 2026', score: 88, rank: 1, totalParticipants: 1500, prize: '₹20,000', accuracy: 92 },
  { competition: 'Physics Brain Bowl', category: 'Science', date: '20 Jul 2026', score: 90, rank: 2, totalParticipants: 980, prize: '₹10,000', accuracy: 95 },
  { competition: 'GK Challenge Series 5', category: 'General Knowledge', date: '1 Oct 2026', score: 85, rank: 3, totalParticipants: 8900, prize: '₹5,000', accuracy: 89 },
  { competition: 'CodeBattle Spring Edition', category: 'Programming', date: '15 Aug 2026', score: 72, rank: 7, totalParticipants: 3200, prize: '—', accuracy: 76 },
  { competition: 'National Science Olympiad', category: 'Science', date: '10 Apr 2026', score: 76, rank: 12, totalParticipants: 12000, prize: '—', accuracy: 80 },
];

const scoreHistory = [65, 72, 76, 85, 88, 90];
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct'];
const maxScore = Math.max(...scoreHistory);

export default function UserResultsPage() {
  const avgScore = Math.round(scoreHistory.reduce((s, v) => s + v, 0) / scoreHistory.length);
  const bestRank = Math.min(...RESULTS.map(r => r.rank));
  const totalPoints = RESULTS.reduce((s, r) => s + r.score, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Results</h2>
        <p className="text-slate-500 text-sm mt-0.5">Track your performance across all competitions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Average Score', value: `${avgScore}%`, icon: '📊', color: 'text-indigo-600 border-indigo-100' },
          { label: 'Best Rank', value: `#${bestRank}`, icon: '🏆', color: 'text-amber-600 border-amber-100' },
          { label: 'Total Points', value: totalPoints.toLocaleString(), icon: '⭐', color: 'text-emerald-600 border-emerald-100' },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border ${s.color.split(' ')[1]} shadow-sm p-4 text-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-bold ${s.color.split(' ')[0]}`}>{s.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Score Trend Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-semibold text-slate-900 mb-5">Score Trend</h3>
        <div className="flex items-end gap-4 h-28">
          {scoreHistory.map((score, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-slate-500 font-medium">{score}</span>
              <div
                className="w-full bg-indigo-500 rounded-t-lg hover:bg-indigo-600 transition-colors"
                style={{ height: `${(score / maxScore) * 100}px` }}
                title={`${months[i]}: ${score}`}
              />
              <span className="text-xs text-slate-400">{months[i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          Improving trend over last 6 competitions
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Competition Results</h3>
        {RESULTS.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-400">{r.category}</span>
                  <span className="text-slate-200">·</span>
                  <span className="text-xs text-slate-400">{r.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{r.competition}</h4>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${r.score}%` }} />
                      </div>
                      <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{r.score}/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Accuracy</p>
                    <p className="text-sm font-bold text-slate-900">{r.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Rank</p>
                    <p className="text-sm font-bold text-indigo-600">
                      {r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : ''} #{r.rank}
                      <span className="text-xs text-slate-400 font-normal"> / {r.totalParticipants.toLocaleString()}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Prize</p>
                    <p className={`text-sm font-bold ${r.prize !== '—' ? 'text-emerald-600' : 'text-slate-400'}`}>{r.prize}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button className="text-xs font-medium text-indigo-600 hover:underline whitespace-nowrap">View Details</button>
                {r.rank <= 3 && <button className="text-xs font-medium text-slate-500 hover:underline whitespace-nowrap">Certificate</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

