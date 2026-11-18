import React from 'react';
import Link from 'next/link';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const featuredCompetitions = [
  {
    id: '1',
    title: 'National Mathematics Olympiad 2026',
    category: 'Mathematics',
    categoryColor: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-500 to-indigo-600',
    prizePool: '₹2,00,000',
    entryFee: '₹299',
    date: 'Dec 15, 2026',
    participants: 4820,
  },
  {
    id: '2',
    title: 'All India Science Quiz Championship',
    category: 'Science',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-500 to-teal-600',
    prizePool: '₹1,50,000',
    entryFee: '₹199',
    date: 'Dec 20, 2026',
    participants: 3240,
  },
  {
    id: '3',
    title: 'CodeBattle: Programming Contest',
    category: 'Programming',
    categoryColor: 'bg-violet-100 text-violet-700',
    gradient: 'from-violet-500 to-purple-600',
    prizePool: '₹5,00,000',
    entryFee: '₹499',
    date: 'Jan 5, 2027',
    participants: 6100,
  },
];

const steps = [
  {
    step: '01',
    icon: '📝',
    title: 'Register',
    description: 'Create your free account in under 2 minutes. No credit card required to get started.',
  },
  {
    step: '02',
    icon: '🔍',
    title: 'Browse Competitions',
    description: 'Explore hundreds of competitions across mathematics, science, programming, and more.',
  },
  {
    step: '03',
    icon: '🏆',
    title: 'Compete & Win',
    description: 'Participate in timed challenges, showcase your knowledge, and climb the leaderboard.',
  },
  {
    step: '04',
    icon: '🎓',
    title: 'Get Certified',
    description: 'Receive verifiable digital certificates and cash prizes for your achievements.',
  },
];

const categories = [
  { emoji: '➕', name: 'Mathematics', count: 48 },
  { emoji: '🔬', name: 'Science', count: 36 },
  { emoji: '💻', name: 'Technology', count: 29 },
  { emoji: '🖥️', name: 'Programming', count: 54 },
  { emoji: '🌍', name: 'General Knowledge', count: 41 },
  { emoji: '📖', name: 'Languages', count: 22 },
  { emoji: '🎨', name: 'Arts', count: 18 },
  { emoji: '⚽', name: 'Sports', count: 15 },
];

const features = [
  {
    icon: '⚖️',
    title: 'Fair Evaluation',
    description: 'Our AI-powered grading system ensures every answer is evaluated objectively and consistently.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: '🧠',
    title: 'Expert Questions',
    description: 'All questions are crafted and reviewed by subject matter experts and academic professionals.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'Get your scores, rankings, and performance analysis immediately after the competition ends.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: '📜',
    title: 'Digital Certificates',
    description: 'Earn blockchain-verified digital certificates that you can share on LinkedIn and portfolios.',
    color: 'bg-violet-50 text-violet-600',
  },
];

const winners = [
  {
    name: 'Arjun Sharma',
    initials: 'AS',
    competition: 'National Mathematics Olympiad 2025',
    prize: '₹50,000',
    color: 'bg-amber-400',
    rank: 1,
  },
  {
    name: 'Priya Nair',
    initials: 'PN',
    competition: 'All India Science Quiz 2025',
    prize: '₹30,000',
    color: 'bg-indigo-500',
    rank: 2,
  },
  {
    name: 'Rahul Verma',
    initials: 'RV',
    competition: 'CodeBattle Programming Contest',
    prize: '₹1,00,000',
    color: 'bg-emerald-500',
    rank: 1,
  },
];

const stats = [
  { label: 'Participants', value: '50,000+', icon: '👥' },
  { label: 'Competitions', value: '500+', icon: '🏆' },
  { label: 'Prize Pool', value: '₹50L+', icon: '💰' },
  { label: 'Satisfaction', value: '98%', icon: '⭐' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="text-amber-400">🏆</span>
              <span className="text-white text-sm font-medium">India's #1 Academic Competition Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Compete, Learn,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                and Excel
              </span>
            </h1>

            <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students competing in India's premier academic competition platform. Test your skills, win prizes, and earn certified recognition.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/competitions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40 text-lg"
              >
                Browse Competitions
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm text-lg"
              >
                Get Started Free
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center"
                >
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-indigo-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Competitions ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Competitions</h2>
              <p className="text-slate-500">Join the most popular competitions happening right now</p>
            </div>
            <Link
              href="/competitions"
              className="hidden sm:inline-flex items-center gap-1 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompetitions.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
              >
                {/* Gradient header */}
                <div className={`h-40 bg-gradient-to-br ${comp.gradient} flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <div className="text-5xl mb-2">🏆</div>
                  </div>
                </div>

                <div className="p-6">
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${comp.categoryColor} mb-3`}>
                    {comp.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg mb-4 group-hover:text-indigo-600 transition-colors">
                    {comp.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-0.5">Prize Pool</p>
                      <p className="font-bold text-slate-900">{comp.prizePool}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-0.5">Entry Fee</p>
                      <p className="font-bold text-slate-900">{comp.entryFee}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-5 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {comp.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {comp.participants.toLocaleString()} joined
                    </span>
                  </div>

                  <Link
                    href={`/competitions/${comp.id}`}
                    className="block w-full text-center px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/competitions" className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
              View All Competitions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Getting started with CompeteHub is simple. Follow these four steps to begin your competitive journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-200 to-indigo-100 z-0" />
                )}

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-sm">
                    {step.icon}
                  </div>
                  <div className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full mb-3">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Browse by Category</h2>
            <p className="text-slate-500">Find competitions in your area of expertise</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/competitions?category=${encodeURIComponent(cat.name)}`}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all border border-slate-100 group"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-400">{cat.count} competitions</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CompeteHub ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Why CompeteHub?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We've built every feature with students and educators in mind, ensuring a fair and rewarding experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="rounded-2xl border border-slate-100 p-7 hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 ${feat.color}`}>
                  {feat.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Winners Showcase ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">🏆 Recent Winners</h2>
            <p className="text-slate-400">Celebrating our top performers from recent competitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {winners.map((winner) => (
              <div key={winner.name} className="bg-slate-800 rounded-2xl p-7 border border-slate-700 text-center">
                <div
                  className={`w-16 h-16 ${winner.color} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}
                >
                  {winner.initials}
                </div>

                <div className="inline-flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {winner.rank === 1 ? '🥇' : winner.rank === 2 ? '🥈' : '🥉'} Rank #{winner.rank}
                </div>

                <h3 className="font-bold text-white text-xl mb-1">{winner.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{winner.competition}</p>

                <div className="bg-slate-700/50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-0.5">Prize Won</p>
                  <p className="text-2xl font-bold text-amber-400">{winner.prize}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/winners"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors"
            >
              View Hall of Fame
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Compete?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
            Join over 50,000 students already competing on CompeteHub. Your first competition could be the start of something amazing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-lg"
            >
              Create Free Account
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/competitions"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Explore Competitions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
