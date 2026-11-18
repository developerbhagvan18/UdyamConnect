import Link from 'next/link'

interface Winner {
  id: number
  name: string
  initials: string
  competition: string
  rank: number
  prize: string
  score: string
  date: string
  category: string
  avatarBg: string
}

const podiumWinners = [
  {
    rank: 1,
    medal: '🥇',
    name: 'Arjun Sharma',
    initials: 'AS',
    competition: 'National Math Olympiad 2025',
    prize: '₹50,000',
    score: '98/100',
    state: 'Maharashtra',
    avatarBg: 'bg-amber-500',
  },
  {
    rank: 2,
    medal: '🥈',
    name: 'Priya Nair',
    initials: 'PN',
    competition: 'Science Quiz 2025',
    prize: '₹30,000',
    score: '95/100',
    state: 'Kerala',
    avatarBg: 'bg-slate-400',
  },
  {
    rank: 3,
    medal: '🥉',
    name: 'Rahul Verma',
    initials: 'RV',
    competition: 'CodeBattle 2025',
    prize: '₹25,000',
    score: '94/100',
    state: 'Delhi',
    avatarBg: 'bg-amber-700',
  },
]

const recentWinners: Winner[] = [
  {
    id: 1,
    name: 'Sneha Reddy',
    initials: 'SR',
    competition: 'Algebra Masters League 2024',
    rank: 1,
    prize: '₹20,000',
    score: '97/100',
    date: 'Sep 2024',
    category: 'Mathematics',
    avatarBg: 'bg-indigo-500',
  },
  {
    id: 2,
    name: 'Aditya Singh',
    initials: 'AS',
    competition: 'Python Programming Challenge 2024',
    rank: 1,
    prize: '₹18,000',
    score: '96/100',
    date: 'Aug 2024',
    category: 'Programming',
    avatarBg: 'bg-violet-500',
  },
  {
    id: 3,
    name: 'Tanvi Kulkarni',
    initials: 'TK',
    competition: 'Inter-State Science Quiz 2024',
    rank: 1,
    prize: '₹15,000',
    score: '94/100',
    date: 'Oct 2024',
    category: 'Science',
    avatarBg: 'bg-emerald-500',
  },
  {
    id: 4,
    name: 'Vivek Chaudhary',
    initials: 'VC',
    competition: 'National Math Olympiad 2024',
    rank: 2,
    prize: '₹12,000',
    score: '93/100',
    date: 'Dec 2024',
    category: 'Mathematics',
    avatarBg: 'bg-sky-500',
  },
  {
    id: 5,
    name: 'Anjali Bose',
    initials: 'AB',
    competition: 'GK Bowl 2024',
    rank: 1,
    prize: '₹10,000',
    score: '91/100',
    date: 'Nov 2024',
    category: 'General Knowledge',
    avatarBg: 'bg-amber-500',
  },
  {
    id: 6,
    name: 'Rohan Iyer',
    initials: 'RI',
    competition: 'CodeBattle India 2024',
    rank: 2,
    prize: '₹15,000',
    score: '92/100',
    date: 'Dec 2024',
    category: 'Programming',
    avatarBg: 'bg-rose-500',
  },
  {
    id: 7,
    name: 'Divya Menon',
    initials: 'DM',
    competition: 'Science Exploration 2024',
    rank: 1,
    prize: '₹14,000',
    score: '95/100',
    date: 'Jan 2025',
    category: 'Science',
    avatarBg: 'bg-teal-500',
  },
  {
    id: 8,
    name: 'Karthik Rajan',
    initials: 'KR',
    competition: 'Algebra Masters League 2024',
    rank: 2,
    prize: '₹10,000',
    score: '93/100',
    date: 'Sep 2024',
    category: 'Mathematics',
    avatarBg: 'bg-fuchsia-500',
  },
  {
    id: 9,
    name: 'Nisha Agarwal',
    initials: 'NA',
    competition: 'Hindi Sahitya 2024',
    rank: 1,
    prize: '₹8,000',
    score: '90/100',
    date: 'Mar 2024',
    category: 'Languages',
    avatarBg: 'bg-pink-500',
  },
  {
    id: 10,
    name: 'Harsh Pandey',
    initials: 'HP',
    competition: 'TechVision Cup 2024',
    rank: 1,
    prize: '₹22,000',
    score: '96/100',
    date: 'Apr 2024',
    category: 'Technology',
    avatarBg: 'bg-blue-500',
  },
  {
    id: 11,
    name: 'Latha Subramaniam',
    initials: 'LS',
    competition: 'Science Quiz 2024',
    rank: 3,
    prize: '₹7,000',
    score: '89/100',
    date: 'Oct 2024',
    category: 'Science',
    avatarBg: 'bg-lime-600',
  },
  {
    id: 12,
    name: 'Nihal Khan',
    initials: 'NK',
    competition: 'GK Bowl 2024',
    rank: 2,
    prize: '₹6,000',
    score: '88/100',
    date: 'Nov 2024',
    category: 'General Knowledge',
    avatarBg: 'bg-orange-500',
  },
]

const rankBadge: Record<number, string> = {
  1: 'bg-amber-100 text-amber-700',
  2: 'bg-slate-100 text-slate-600',
  3: 'bg-orange-100 text-orange-700',
}

const podiumOrder = [podiumWinners[1], podiumWinners[0], podiumWinners[2]]

export default function WinnersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 py-24 px-6 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-6xl mb-6">🏆</div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Hall of Fame</h1>
          <p className="text-xl text-indigo-300 leading-relaxed">
            Celebrating the brightest minds who competed, persevered, and triumphed on CompeteHub.
            Their achievements inspire the next generation of champions.
          </p>
        </div>
      </section>

      {/* Podium */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">
            Top Champions 2025
          </h2>
          <p className="text-center text-slate-500 mb-14">
            Our highest scorers from the latest national competitions.
          </p>

          {/* Podium layout: 2nd | 1st | 3rd */}
          <div className="flex items-end justify-center gap-4 md:gap-8">
            {podiumOrder.map((winner) => {
              const isFirst = winner.rank === 1
              return (
                <div
                  key={winner.rank}
                  className={`flex flex-col items-center rounded-2xl bg-white border border-slate-100 shadow-sm px-6 py-8 text-center transition-transform hover:-translate-y-1 ${
                    isFirst
                      ? 'w-56 shadow-xl border-amber-200 ring-2 ring-amber-300/50'
                      : 'w-44'
                  }`}
                >
                  <div className="text-4xl mb-3">{winner.medal}</div>
                  <div
                    className={`mx-auto mb-4 flex ${isFirst ? 'h-20 w-20 text-2xl' : 'h-16 w-16 text-xl'} items-center justify-center rounded-full ${winner.avatarBg} font-bold text-white`}
                  >
                    {winner.initials}
                  </div>
                  <h3 className={`font-bold text-slate-900 ${isFirst ? 'text-xl' : 'text-lg'} mb-1`}>
                    {winner.name}
                  </h3>
                  <p className="text-slate-500 text-xs mb-3">{winner.state}</p>
                  <p className="text-slate-600 text-sm font-medium mb-4 leading-tight">
                    {winner.competition}
                  </p>
                  <div className="border-t border-slate-100 w-full pt-4 space-y-2">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Score</p>
                      <p className="font-bold text-indigo-600 text-lg">{winner.score}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Prize</p>
                      <p className="font-bold text-emerald-600 text-lg">{winner.prize}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Winners Grid */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Recent Winners</h2>
          <p className="text-center text-slate-500 mb-12">
            Winners from competitions held across the past year.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentWinners.map((winner) => (
              <div
                key={winner.id}
                className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 h-12 w-12 rounded-full ${winner.avatarBg} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {winner.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 truncate">{winner.name}</h3>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${rankBadge[winner.rank] ?? 'bg-indigo-100 text-indigo-700'}`}
                    >
                      #{winner.rank}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mb-2 leading-snug">{winner.competition}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-emerald-600 font-semibold">{winner.prize}</span>
                    <span className="text-indigo-600 font-semibold">{winner.score}</span>
                    <span className="text-slate-400 ml-auto">{winner.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-indigo-600 py-14 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { value: '5,000+', label: 'Winners' },
              { value: '₹2 Crore+', label: 'Distributed' },
              { value: '100+', label: 'Competitions' },
              { value: 'Since 2022', label: 'Celebrating Excellence' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="mx-auto max-w-2xl">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Want to be on this list?</h2>
          <p className="text-slate-500 text-lg mb-8">
            Join thousands of students competing every month. Register for an upcoming competition
            and start your journey to the Hall of Fame.
          </p>
          <Link
            href="/competitions"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            🏆 Join a Competition
          </Link>
        </div>
      </section>
    </main>
  )
}
