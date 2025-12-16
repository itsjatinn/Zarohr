import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Get Started With ZaroHR",
  description:
    "Share your organisation’s priorities so we can recommend the right mix of HR tech products and managed services from ZaroHR.",
  keywords: ["HR discovery form", "HR implementation survey", "ZaroHR onboarding"],
  alternates: {
    canonical: "/getstarted",
  },
  openGraph: {
    url: "/getstarted",
    title: "Get Started With ZaroHR",
    description:
      "Tell us about your goals around HR tech, payroll, and compliance so we can craft an implementation plan.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "ZaroHR brand lockup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started With ZaroHR",
    description:
      "Tell us about your goals around HR tech, payroll, and compliance so we can craft an implementation plan.",
    images: ["/images/logo.png"],
  },
};

export default function GetStartedLayout({ children }: { children: ReactNode }) {
  return children;
}
