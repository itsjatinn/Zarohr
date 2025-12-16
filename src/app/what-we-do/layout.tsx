import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "What We Do | HR Tech, Payroll, Analytics & Compliance",
  description:
    "Explore ZaroHR services across HR technology implementations, managed operations, payroll, analytics, ESOP advisory, and mandatory trainings.",
  keywords: [
    "HR services India",
    "managed HR operations",
    "payroll partner",
    "HR analytics firm",
    "POSH training provider",
  ],
  alternates: {
    canonical: "/what-we-do",
  },
  openGraph: {
    url: "/what-we-do",
    title: "What We Do | HR Tech, Payroll, Analytics & Compliance",
    description:
      "See how ZaroHR combines software and services for HR tech, operations, payroll, analytics, ESOPs, and trainings.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "ZaroHR brand lockup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Do | HR Tech, Payroll, Analytics & Compliance",
    description:
      "See how ZaroHR combines software and services for HR tech, operations, payroll, analytics, ESOPs, and trainings.",
    images: ["/images/logo.png"],
  },
};

export default function WhatWeDoLayout({ children }: { children: ReactNode }) {
  return children;
}
