import type { Metadata } from "next";
import Hero from "../component/Hero";
import FeatureGrid from "../component/FeatureGrid";

const siteUrl = "https://zarohr.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ZaroHR | Fractional HR Partner for Fast-Scaling Teams",
  description:
    "ZaroHR streamlines onboarding, payroll, compliance trainings, and analytics so founders and HR leaders can focus on growth instead of manual work.",
  keywords: [
    "ZaroHR",
    "fractional HR",
    "HR software",
    "HR managed services",
    "startup HR platform",
    "payroll automation",
    "compliance training",
    "people analytics",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: siteUrl,
    title: "ZaroHR | Fractional HR Partner for Fast-Scaling Teams",
    description:
      "Automate HR workflows, payroll, compliance, and analytics with ZaroHR’s mix of software and managed services.",
    siteName: "ZaroHR",
    images: [
      {
        url: `${siteUrl}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: "ZaroHR brand lockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZaroHR | Fractional HR Partner for Fast-Scaling Teams",
    description:
      "Automate HR workflows, payroll, compliance, and analytics with ZaroHR’s mix of software and managed services.",
    images: [`${siteUrl}/images/logo.png`],
  },
};

export default function Page() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZaroHR",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description:
      "ZaroHR delivers fractional HR leadership, automation, and compliance workflows for modern, fast-scaling companies.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <section className="max-w-9xl mx-auto">
        <FeatureGrid />
        <div className="mx-auto mt-16 max-w-5xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
          <article className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Why ZaroHR</p>
            <h2 className="text-3xl font-semibold text-slate-900">Own every moment of the employee lifecycle</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              ZaroHR combines modern software with embedded HR partners so high-growth teams can standardize onboarding,
              automate payroll and benefits, and stay audit-ready in every state. Our fractional leaders configure the
              platform for your policies, then stay close to the data to proactively remove friction for managers and
              employees.
            </p>
            <ul className="grid gap-4 text-base text-slate-700 md:grid-cols-2">
              <li className="rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4">
                <span className="font-semibold text-slate-900">Fractional HR leadership:</span> plug in senior HR pros
                without the full-time headcount.
              </li>
              <li className="rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4">
                <span className="font-semibold text-slate-900">Automation-first platform:</span> workflows for offer
                letters, onboarding packets, compliance checks, and payroll approvals.
              </li>
              <li className="rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4">
                <span className="font-semibold text-slate-900">People analytics that matter:</span> visibility into
                hiring funnels, retention risks, DEI metrics, and total rewards.
              </li>
              <li className="rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4">
                <span className="font-semibold text-slate-900">Compliance and training handled:</span> ZaroHR monitors
                expirations, pushes mandatory learning, and stores documentation for audits.
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-slate-900 px-8 py-10 text-slate-50 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">FAQ</p>
            <h2 className="text-3xl font-semibold text-white">ZaroHR answers your most common questions</h2>
            <dl className="mt-8 space-y-6 divide-y divide-white/10">
              <div className="pt-4 first:pt-0">
                <dt className="text-lg font-semibold text-white">What makes ZaroHR different from traditional PEOs?</dt>
                <dd className="mt-2 text-base text-slate-200">
                  We operate as an embedded HR team powered by automation, so you keep your employer record while still
                  benefitting from senior practitioners who configure compliant policies, cadences, and analytics for
                  your environment.
                </dd>
              </div>
              <div className="pt-4">
                <dt className="text-lg font-semibold text-white">Does ZaroHR work for remote or global teams?</dt>
                <dd className="mt-2 text-base text-slate-200">
                  Yes. ZaroHR centralizes contractor management, state registrations, and localized training so remote
                  and hybrid orgs stay aligned without multiplying tools or payroll processors.
                </dd>
              </div>
              <div className="pt-4">
                <dt className="text-lg font-semibold text-white">How fast can we get value?</dt>
                <dd className="mt-2 text-base text-slate-200">
                  Most startups launch ZaroHR in under 30 days thanks to pre-built workflow templates and onboarding
                  runbooks. From there, we iterate on leadership scorecards, engagement signals, and compensation data in
                  one place.
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
    </>
  );
}
