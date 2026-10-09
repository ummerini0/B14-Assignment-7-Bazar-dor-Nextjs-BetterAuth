import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import "./globals.css";

const bangla = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "অনলাইন গ্রোসারি শপ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="light">
      <body className={bangla.className}>
        <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
        <PriceTicker />
        </div>
        {children}
      </body>
    </html>
  );
}
