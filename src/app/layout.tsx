import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const siteUrl = "https://www.zarohr.com";
const ogImage = "/images/logo.png";
const siteDescription =
  "ZaroHR blends HR tech products with managed people operations so high-growth teams can automate onboarding, payroll, compliance, and analytics without adding headcount.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZaroHR | Modern HR Tech & Managed People Operations",
    template: "%s | ZaroHR",
  },
  description: siteDescription,
  keywords: [
    "HR tech",
    "people operations",
    "payroll outsourcing",
    "HR automation",
    "HR operations partner",
    "POSH training",
    "HR analytics",
  ],
  applicationName: "ZaroHR",
  authors: [{ name: "ZaroHR" }],
  creator: "ZaroHR",
  publisher: "ZaroHR",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ZaroHR",
    title: "ZaroHR | Modern HR Tech & Managed People Operations",
    description: siteDescription,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "ZaroHR brand lockup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZaroHR | Modern HR Tech & Managed People Operations",
    description: siteDescription,
    images: [ogImage],
  },
  category: "business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZaroHR",
  url: siteUrl,
  logo: `${siteUrl}${ogImage}`,
  description: siteDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: "OneDegree Co-Working, 2nd Floor, Jainam Compound, Bhandup (W)",
    addressLocality: "Mumbai",
    postalCode: "400078",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@zarohr.com",
      telephone: "+91 98335 76742",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
  ],
} as const;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cc-bg text-slate-900">
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
