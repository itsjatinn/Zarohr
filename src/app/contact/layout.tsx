import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact ZaroHR | Book a Consultation",
  description:
    "Talk to ZaroHR about HR tech, payroll, compliance trainings, and analytics. Email info@zarohr.com or call +91 98335 76742 to start.",
  keywords: ["contact ZaroHR", "HR consultation", "HR outsourcing India", "HR tech demo"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "/contact",
    title: "Contact ZaroHR | Book a Consultation",
    description:
      "Email info@zarohr.com or call +91 98335 76742 to discuss HR technology, payroll, POSH training, and analytics projects.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "ZaroHR brand lockup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ZaroHR | Book a Consultation",
    description:
      "Reach the ZaroHR team to plan your next HR technology, payroll, or compliance initiative.",
    images: ["/images/logo.png"],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
