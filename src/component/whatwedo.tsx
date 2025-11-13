import React from 'react';

// WhatWeDoPage.tsx
// Single-file React component for Next.js + Tailwind CSS
// Color scheme: amber-300 accents on black background
// Each feature card links to the provided ZingHR workforce-management page.

export default function WhatWeDoPage() {
  const externalLink = 'https://www.zinghr.com/solutions/workforce-management/';

  const features = [
    {
      id: 'hr-tech',
      title: 'HR Tech',
      subtitle: 'Automating your employee journey with tools that just work.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'hr-ops',
      title: 'HR Operations',
      subtitle: 'Fast, accurate, zero chaos — from onboarding to exits.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'payroll',
      title: 'Payroll',
      subtitle: 'Compliant, on time, and stress-free. Always.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 3v18M7 7h10M7 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'analytics',
      title: 'People Analytics',
      subtitle: 'Turning workforce data into decisions that move the needle.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M4 19V5h3v14H4zM10 19V9h3v10h-3zM16 19v-6h3v6h-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'esop',
      title: 'ESOP Services',
      subtitle: 'Build ownership cultures that drive retention and motivation.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 20c2-4 6-6 7-6s5 2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'trainings',
      title: 'Mandatory Trainings',
      subtitle: 'Launch and track compliance programs like POSH, AML — with automated reminders.',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 8h8M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              What we do
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-prose">
              HR Tech: Automating your employee journey with tools that just work. HR Operations: Fast, accurate, zero chaos — from onboarding to exits. Payroll: Compliant, on time, and stress-free. Always. People Analytics: Turning workforce data into decisions that move the needle. ESOP Services: Build ownership cultures that drive retention and motivation. Mandatory Trainings: Launch and track compliance programs like POSH, AML, and more — complete with automated reminders and completion dashboards.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-amber-300 bg-transparent hover:bg-amber-300/10 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
              >
                <span className="font-medium">Explore Workforce Management</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-amber-300/20 to-black p-6 shadow-2xl">
              <div className="p-6 rounded-2xl bg-black">
                <h3 className="text-2xl font-semibold mb-2 text-amber-300">Why choose us</h3>
                <ul className="space-y-3 text-gray-200">
                  <li>Unified platform covering the entire employee lifecycle</li>
                  <li>Automated payroll and compliance</li>
                  <li>Actionable people analytics and retention levers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID (mirror ZingHR layout) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <a
              key={f.id}
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-amber-300/20 p-6 bg-black/40 hover:bg-black/30 transition"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg p-3 bg-amber-300/10 text-amber-300 group-hover:bg-amber-300/20">
                  {/* icon with stroke using currentColor */}
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{f.title}</h4>
                  <p className="mt-1 text-sm text-gray-300 max-w-xs">{f.subtitle}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-amber-300 font-medium">Learn more</span>
                <svg className="w-4 h-4 text-amber-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* DETAILED SECTIONS - larger blocks like the referenced page */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <DetailBlock
            title="Payroll Cockpit"
            subtitle="Faster processing, assured accuracy and Better compliance"
            bullets={[
              'Salary inputs — update everything required for payroll',
              'Audit — track status and resolve discrepancies',
              'Reconciliation & MIS output — graphical snapshot and reports',
            ]}
            href={externalLink}
          />

          <DetailBlock
            title="Zero Touch Payroll"
            subtitle="With the potential to change the payroll landscape globally"
            bullets={['Real-time processing; seamless efficiency', 'Support for weekly/daily/hourly payouts', 'Facilitates gig & outcome-based payments']}
            href={externalLink}
          />

          <DetailBlock
            title="Time, Leave & Attendance"
            subtitle="Manage Workforce More Effectively"
            bullets={['Geo-fencing punches', 'Face recognition attendance', 'Real-time dashboards & reports']}
            href={externalLink}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-black to-black/90 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Start your HR transformation journey today</h3>
          <p className="mt-3 text-gray-300">Schedule a demo and see the platform in action.</p>
          <div className="mt-6">
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-xl bg-amber-300 text-black font-semibold shadow-lg hover:brightness-95"
            >
              Schedule a demo
            </a>
          </div>
        </div>
      </section>

      {/* FAQ (simple) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h4 className="text-xl font-semibold text-amber-300">FAQ</h4>
        <div className="mt-6 space-y-4 text-gray-200">
          <FaqItem
            q="How does our Workforce Management help HR and Managers?"
            a="We automate attendance, payroll, scheduling and give managers real-time insights to make data-driven decisions."
          />

          <FaqItem
            q="How does our Payroll Cockpit benefit my organization?"
            a="It centralizes payroll data, improves accuracy and ensures timely, compliant payments."
          />

          <FaqItem
            q="Is this suitable for businesses of all sizes?"
            a="Yes. The platform is designed to scale from mid-market to large enterprises."
          />
        </div>
      </section>

      <footer className="border-t border-amber-300/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">© {new Date().getFullYear()} Your Company — All rights reserved.</div>
      </footer>
    </main>
  );
}

function DetailBlock({ title, subtitle, bullets, href }: { title: string; subtitle: string; bullets: string[]; href: string }) {
  return (
    <article className="grid md:grid-cols-3 gap-6 items-start rounded-2xl p-6 border border-amber-300/10 bg-black/40">
      <div className="md:col-span-2">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-gray-300">{subtitle}</p>
        <ul className="mt-4 space-y-2 text-gray-200">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 text-amber-300">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-1 flex md:justify-end">
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-300 text-amber-300 hover:bg-amber-300/10">
          Learn more
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl p-4 border border-amber-300/10 bg-black/30">
      <h5 className="font-semibold text-white">{q}</h5>
      <p className="mt-2 text-gray-300">{a}</p>
    </div>
  );
}
