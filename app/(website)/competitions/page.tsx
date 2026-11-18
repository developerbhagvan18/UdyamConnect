'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

type CompetitionStatus = 'active' | 'upcoming' | 'completed'

interface Competition {
  id: number
  title: string
  category: string
  status: CompetitionStatus
  prizePool: string
  entryFee: string
  registrationDeadline: string
  competitionDate: string
  participants: number
  maxParticipants: number
  description: string
  categoryColor: string
  gradient: string
}

const competitions: Competition[] = [
  {
    id: 1,
    title: 'National Mathematics Olympiad 2025',
    category: 'Mathematics',
    status: 'active',
    prizePool: '₹1,00,000',
    entryFee: '₹200',
    registrationDeadline: '20 Nov 2025',
    competitionDate: '10 Dec 2025',
    participants: 3240,
    maxParticipants: 5000,
    description:
      'India\'s premier mathematics competition testing algebra, geometry, number theory, and combinatorics for students in grades 9–12.',
    categoryColor: 'bg-indigo-100 text-indigo-700',
    gradient: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 2,
    title: 'Science Exploration Challenge',
    category: 'Science',
    status: 'active',
    prizePool: '₹75,000',
    entryFee: '₹150',
    registrationDeadline: '25 Nov 2025',
    competitionDate: '15 Dec 2025',
    participants: 2100,
    maxParticipants: 3000,
    description:
      'An inter-school science competition covering Physics, Chemistry, and Biology with practical problem-solving rounds.',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 3,
    title: 'CodeBattle India 2025',
    category: 'Programming',
    status: 'active',
    prizePool: '₹2,00,000',
    entryFee: '₹300',
    registrationDeadline: '30 Nov 2025',
    competitionDate: '20 Dec 2025',
    participants: 4800,
    maxParticipants: 6000,
    description:
      'A competitive programming contest with algorithmic challenges spanning data structures, dynamic programming, and graph theory.',
    categoryColor: 'bg-violet-100 text-violet-700',
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 4,
    title: 'TechVision Innovation Cup',
    category: 'Technology',
    status: 'upcoming',
    prizePool: '₹1,50,000',
    entryFee: '₹250',
    registrationDeadline: '5 Dec 2025',
    competitionDate: '25 Jan 2026',
    participants: 820,
    maxParticipants: 2000,
    description:
      'A technology design challenge where teams build solutions for real-world problems using modern tech stacks.',
    categoryColor: 'bg-sky-100 text-sky-700',
    gradient: 'from-sky-500 to-blue-700',
  },
  {
    id: 5,
    title: 'All-India General Knowledge Bowl',
    category: 'General Knowledge',
    status: 'upcoming',
    prizePool: '₹50,000',
    entryFee: '₹100',
    registrationDeadline: '10 Dec 2025',
    competitionDate: '5 Feb 2026',
    participants: 1500,
    maxParticipants: 8000,
    description:
      'A fast-paced quiz covering current affairs, history, geography, sports, and culture — open to all age groups.',
    categoryColor: 'bg-amber-100 text-amber-700',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 6,
    title: 'Hindi Sahitya Pratiyogita',
    category: 'Languages',
    status: 'upcoming',
    prizePool: '₹40,000',
    entryFee: '₹100',
    registrationDeadline: '15 Dec 2025',
    competitionDate: '12 Feb 2026',
    participants: 630,
    maxParticipants: 1500,
    description:
      'A literary competition featuring essay writing, poetry composition, and elocution in Hindi for school students.',
    categoryColor: 'bg-rose-100 text-rose-700',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 7,
    title: 'Inter-State Science Quiz 2024',
    category: 'Science',
    status: 'completed',
    prizePool: '₹60,000',
    entryFee: '₹150',
    registrationDeadline: '1 Sep 2024',
    competitionDate: '15 Oct 2024',
    participants: 2800,
    maxParticipants: 3000,
    description:
      'A completed national science quiz that drew thousands of participants from 22 states, testing core science concepts.',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-slate-400 to-slate-600',
  },
  {
    id: 8,
    title: 'Algebra Masters League 2024',
    category: 'Mathematics',
    status: 'completed',
    prizePool: '₹80,000',
    entryFee: '₹200',
    registrationDeadline: '20 Aug 2024',
    competitionDate: '10 Sep 2024',
    participants: 4200,
    maxParticipants: 5000,
    description:
      'A concluded algebra-focused competition with elimination rounds and a live grand finale held in New Delhi.',
    categoryColor: 'bg-indigo-100 text-indigo-700',
    gradient: 'from-slate-400 to-slate-600',
  },
  {
    id: 9,
    title: 'Python Programming Challenge 2024',
    category: 'Programming',
    status: 'completed',
    prizePool: '₹90,000',
    entryFee: '₹250',
    registrationDeadline: '5 Jul 2024',
    competitionDate: '1 Aug 2024',
    participants: 3600,
    maxParticipants: 4000,
    description:
      'A Python-only competitive programming event with real-world problem sets designed by industry engineers.',
    categoryColor: 'bg-violet-100 text-violet-700',
    gradient: 'from-slate-400 to-slate-600',
  },
]

const categories = [
  'All',
  'Mathematics',
  'Science',
  'Programming',
  'Technology',
  'General Knowledge',
  'Languages',
]

const statusOptions: { label: string; value: 'all' | CompetitionStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
]

const statusBadge: Record<CompetitionStatus, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  upcoming: 'bg-blue-100 text-blue-700',
  completed: 'bg-slate-100 text-slate-600',
}

export default function CompetitionsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState<'all' | CompetitionStatus>('all')

  const filtered = useMemo(() => {
    return competitions.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || c.category === category
      const matchStatus = status === 'all' || c.status === status
      return matchSearch && matchCat && matchStatus
    })
  }, [search, category, status])

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-14 px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Competitions</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Discover and register for academic competitions across mathematics, science,
            programming, and more. Compete with the best minds across India.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-slate-200 px-6 py-5 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-6xl flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative max-w-sm w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search competitions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Status Tabs */}
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  status === opt.value
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Count */}
          <p className="text-sm text-slate-500 mb-6">
            Showing{' '}
            <span className="font-semibold text-slate-700">{filtered.length}</span> of{' '}
            <span className="font-semibold text-slate-700">{competitions.length}</span> competitions
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((comp) => (
                <div
                  key={comp.id}
                  className="rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Card Header */}
                  <div
                    className={`bg-gradient-to-br ${comp.gradient} px-5 pt-6 pb-8 text-white relative`}
                  >
                    <div className="text-4xl mb-3">🏆</div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold mb-2 ${comp.categoryColor} bg-white/90`}
                    >
                      {comp.category}
                    </span>
                    <h3 className="font-bold text-lg leading-snug">{comp.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 gap-4">
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {comp.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-0.5">
                          Prize Pool
                        </p>
                        <p className="font-bold text-slate-900">{comp.prizePool}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-0.5">
                          Entry Fee
                        </p>
                        <p className="font-semibold text-slate-700">{comp.entryFee}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-0.5">
                          Date
                        </p>
                        <p className="font-semibold text-slate-700">{comp.competitionDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wide font-medium mb-0.5">
                          Participants
                        </p>
                        <p className="font-semibold text-slate-700">
                          {comp.participants.toLocaleString('en-IN')}{' '}
                          <span className="text-slate-400 font-normal">
                            / {comp.maxParticipants.toLocaleString('en-IN')}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Participation Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Registrations</span>
                        <span>
                          {Math.round((comp.participants / comp.maxParticipants) * 100)}% filled
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-indigo-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round((comp.participants / comp.maxParticipants) * 100),
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusBadge[comp.status]}`}
                      >
                        {comp.status}
                      </span>
                      {comp.status === 'completed' ? (
                        <Link
                          href="/winners"
                          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          View Results
                        </Link>
                      ) : (
                        <Link
                          href="/register"
                          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                        >
                          Register Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-4">🔎</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No competitions found</h3>
              <p className="text-slate-500 max-w-sm mb-6">
                Try adjusting your search term, category, or status filter to find what you are
                looking for.
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setCategory('All')
                  setStatus('all')
                }}
                className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 transition-colors">
                ← Prev
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    page === 1
                      ? 'bg-indigo-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 transition-colors">
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
