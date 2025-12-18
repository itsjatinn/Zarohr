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
      </section>
    </>
  );
}
