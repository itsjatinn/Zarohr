// src/app/comingsoon/page.tsx
import type { Metadata } from "next";
import ComingSoonPage from "../../component/comingsoon"; // adjust path if different

export const metadata: Metadata = {
  title: "Coming Soon | ZaroHR",
  description: "We are polishing a new ZaroHR experience that blends HR tech, analytics, and managed services.",
  alternates: {
    canonical: "/comingsoon",
  },
  openGraph: {
    url: "/comingsoon",
    title: "Coming Soon | ZaroHR",
    description: "We are polishing a new ZaroHR experience that blends HR tech, analytics, and managed services.",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "ZaroHR brand lockup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming Soon | ZaroHR",
    description: "We are polishing a new ZaroHR experience that blends HR tech, analytics, and managed services.",
    images: ["/images/logo.png"],
  },
};

export default function Page() {
  return <ComingSoonPage />;
}
