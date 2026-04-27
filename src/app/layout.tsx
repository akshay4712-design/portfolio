import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundParticles from "@/components/layout/BackgroundParticles";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mangeshux.in"),
  title: "Mangesh Shinde — Product & UX Designer | Portfolio",
  description:
    "Mangesh Shinde is a Product & UX Designer based in Pune, India — specialising in enterprise SaaS, healthcare, and AI-driven products. 3+ years turning complex workflows into intuitive experiences.",
  keywords: ["UX Designer", "Product Designer", "Portfolio", "Mangesh Shinde", "MangeshUX", "B2B SaaS", "Enterprise UX", "Pune", "India"],
  authors: [{ name: "Mangesh Shinde", url: "https://www.linkedin.com/in/mangeshux/" }],
  alternates: {
    canonical: "https://www.mangeshux.in",
  },
  openGraph: {
    title: "Mangesh Shinde — Product & UX Designer | Portfolio",
    description:
      "Mangesh Shinde is a Product & UX Designer based in Pune, India — specialising in enterprise SaaS, healthcare, and AI-driven products. 3+ years turning complex workflows into intuitive experiences.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mangeshux.in",
    siteName: "Mangesh Shinde",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mangesh Shinde — Product & UX Designer | Portfolio",
    description:
      "Mangesh Shinde is a Product & UX Designer based in Pune, India — specialising in enterprise SaaS, healthcare, and AI-driven products. 3+ years turning complex workflows into intuitive experiences.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mangesh Shinde",
  url: "https://www.mangeshux.in",
  jobTitle: "Product & UX Designer",
  description:
    "Product & UX Designer with 3+ years of experience designing enterprise SaaS, healthcare, and AI-driven products.",
  sameAs: [
    "https://www.linkedin.com/in/mangeshux/",
    "https://www.mangeshux.in",
  ],
  knowsAbout: ["UX Design", "Product Design", "Enterprise SaaS", "Healthcare UX", "AI Products"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FPZ7MBT2ZS" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-FPZ7MBT2ZS');`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#0A0A0A] text-white antialiased flex flex-col">
        <BackgroundParticles />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
