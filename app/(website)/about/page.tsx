import Link from 'next/link'

const teamMembers = [
  { initials: 'RK', name: 'Ravi Kumar', role: 'Co-founder & CEO', bg: 'bg-indigo-500' },
  { initials: 'MJ', name: 'Meera Joshi', role: 'Co-founder & CTO', bg: 'bg-violet-500' },
  { initials: 'AD', name: 'Aryan Das', role: 'Head of Academics', bg: 'bg-emerald-500' },
  { initials: 'SP', name: 'Sunita Patel', role: 'Head of Operations', bg: 'bg-amber-500' },
  { initials: 'KM', name: 'Kiran Mehta', role: 'Head of Marketing', bg: 'bg-rose-500' },
  { initials: 'NS', name: 'Nikhil Sharma', role: 'Lead Engineer', bg: 'bg-teal-500' },
]

const stats = [
  { value: '50,000+', label: 'Students' },
  { value: '500+', label: 'Competitions' },
  { value: '28', label: 'States' },
  { value: '150+', label: 'Partner Institutions' },
]

const values = [
  {
    icon: '⚖️',
    title: 'Fairness',
    description:
      'Every competition is conducted with transparent rules, unbiased evaluation, and equal opportunity for all participants regardless of background.',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    description:
      'We set high standards for every competition we host, pushing students to discover their true potential and celebrate their achievements.',
  },
  {
    icon: '🤝',
    title: 'Inclusivity',
    description:
      'We actively work to make competitions accessible to students from every corner of India — urban or rural, state board or CBSE.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description:
      'From AI-proctored tests to real-time scoreboards, we leverage technology to continuously improve the competition experience.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 py-24 px-6 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-indigo-200 mb-6 backdrop-blur-sm border border-white/20">
            Our Story
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">About CompeteHub</h1>
          <p className="text-xl text-indigo-200 leading-relaxed">
            We are on a mission to democratise academic competitions across India — giving every
            student a fair stage to showcase their brilliance and compete at the national level.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Mission &amp; Vision
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                🎯
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To build India's most trusted platform for academic competitions — where every
                student, from every district, can discover competitions, register effortlessly, and
                compete with confidence. We handle the complexity so educators and students can
                focus on what matters: learning and winning.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-2xl">
                🔭
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                A future where a student in a small town in Bihar competes on equal footing with
                peers in metro cities — and wins. We envision a nation where talent, not privilege,
                determines success; where competitions are gateways to scholarships, careers, and
                lifelong confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-indigo-600 py-14 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold text-white mb-1">{s.value}</p>
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
          <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
            <p>
              CompeteHub was founded in 2022 by Ravi Kumar and Meera Joshi — two IIT graduates who
              had personally experienced how fragmented and inaccessible India's competition
              ecosystem was. Ravi, a national-level mathematics olympiad finalist, spent hours
              hunting for registration forms across departmental notice boards. Meera, a coding
              champion, missed her state's premier science quiz simply because the notification
              arrived a day too late.
            </p>
            <p>
              Determined to fix this, they built the first version of CompeteHub from a shared
              apartment in Bangalore over three sleepless months. The platform launched with 12
              competitions and 800 students. Within a year, those numbers grew to 150+
              competitions and 20,000 registered students across 18 states.
            </p>
            <p>
              Today, CompeteHub is backed by leading EdTech investors and partners with over 150
              universities, state education boards, and national organisations. We have disbursed
              more than ₹2 crore in prizes and counting — and we are just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Meet the Team</h2>
          <p className="text-center text-slate-500 mb-12">
            The passionate people building CompeteHub every day.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${member.bg} text-xl font-bold text-white`}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Our Values</h2>
          <p className="text-center text-slate-500 mb-12">
            The principles that guide every decision we make.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3 text-3xl">{v.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-slate-900 py-20 px-6 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-slate-400 text-lg mb-8">
            Have a question, partnership enquiry, or just want to say hello? We would love to hear
            from you.
          </p>
          <Link
            href="mailto:contact@competehub.in"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700 transition-colors text-lg"
          >
            ✉️ contact@competehub.in
          </Link>
        </div>
      </section>
    </main>
  )
}
