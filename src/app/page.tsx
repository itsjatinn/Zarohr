import type { Metadata } from "next";
import Hero from "../component/Hero";
import FeatureGrid from "../component/FeatureGrid";

export const metadata: Metadata = {
  title: "ZaroHR",
  description:
    "ZaroHR streamlines onboarding, payroll, compliance trainings, and analytics so founders and HR leaders can focus on growth instead of manual work.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Fractional HR Partner for Fast-Scaling Teams",
    description:
      "Automate HR workflows, payroll, compliance, and analytics with ZaroHR’s mix of software and managed services.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "ZaroHR brand lockup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional HR Partner for Fast-Scaling Teams",
    description:
      "Automate HR workflows, payroll, compliance, and analytics with ZaroHR’s mix of software and managed services.",
    images: ["/images/logo.png"],
  },
};

export default function Page() {
  return (
    <>
      <Hero />
      <section className="max-w-9xl mx-auto">
        <FeatureGrid />
        
      </section>
    </>
  );
}
