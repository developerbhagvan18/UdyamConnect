import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Brand */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">CompeteHub</span>
            </div>
          </Link>
          <p className="mt-3 text-indigo-200 text-sm font-medium">Where Champions Are Made</p>
        </div>

        {/* Hero content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your journey to the top starts here
            </h2>
            <p className="mt-4 text-indigo-200 text-lg leading-relaxed">
              Join thousands of students competing in olympiads, scholarships, and national-level exams — all in one place.
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4">
            {[
              { icon: '🏆', text: '500+ active competitions across all subjects' },
              { icon: '📊', text: 'Real-time leaderboards and performance analytics' },
              { icon: '🎓', text: 'Expert-curated study materials and mock tests' },
              { icon: '🏅', text: 'Certificates and rewards for top performers' },
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{f.icon}</span>
                <span className="text-indigo-100 text-sm leading-relaxed">{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Social proof */}
          <div className="flex items-center gap-6 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">48K+</div>
              <div className="text-xs text-indigo-300 mt-1">Students</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">1.2K+</div>
              <div className="text-xs text-indigo-300 mt-1">Competitions</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">₹2Cr+</div>
              <div className="text-xs text-indigo-300 mt-1">Scholarships</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-indigo-300 text-xs">
          © 2026 CompeteHub. All rights reserved.
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-12 lg:px-16">
        {/* Mobile brand */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">CompeteHub</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
