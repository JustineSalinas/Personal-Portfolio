import type { Metadata, Viewport } from "next";
import { Figtree, DM_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/profile/SmoothScroll";
import { portfolioData } from "@/data";

const figtree = Figtree({
  subsets: ["latin"],
  variable: '--font-figtree',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ["latin"],
  variable: '--font-dm-mono'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ajsalinas.vercel.app"),
  title: {
    default: "Adrian Salinas | AI & Data Engineer",
    template: "%s | Adrian Salinas",
  },
  description:
    "Full-stack developer and technical founder in Iloilo. 20+ projects shipped, including a QR attendance platform serving 700+ students, a 2nd-place national AI hackathon build, and Cascade Development Group.",
  keywords: [
    "Adrian Salinas", "software engineer", "AI engineer", "Next.js", "TypeScript", "Supabase",
    "Iloilo", "Philippines", "Cascade Development Group",
  ],
  authors: [{ name: "Adrian Salinas", url: "https://github.com/JustineSalinas" }],
  creator: "Adrian Salinas",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://ajsalinas.vercel.app",
    siteName: "Adrian Salinas",
    title: "Adrian Salinas | AI & Data Engineer",
    description:
      "20+ projects shipped. QR attendance for 700+ students, a 2nd-place national AI hackathon build, and an IT startup in Iloilo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrian Salinas | AI & Data Engineer",
    description:
      "20+ projects shipped. QR attendance for 700+ students, a 2nd-place national AI hackathon build, and an IT startup in Iloilo.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolioData.personal.name,
  url: 'https://ajsalinas.vercel.app',
  jobTitle: portfolioData.personal.title,
  address: {
    '@type': 'PostalAddress',
    addressLocality: portfolioData.personal.location,
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Cascade Development Group',
    url: 'https://cdg-official.vercel.app',
  },
  sameAs: [
    portfolioData.personal.contact.github,
    portfolioData.personal.contact.linkedin,
  ],
  knowsAbout: portfolioData.personal.tags,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${figtree.variable} ${dmMono.variable} font-sans`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

