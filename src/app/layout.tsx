import "./globals.css";
import type { ReactNode } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export const metadata = {
  title: "ZaroHR",
  description: "cutting through clutter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cc-bg text-slate-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
