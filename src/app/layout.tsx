import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: '--font-fraunces'
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
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
  title: "Adrian Salinas | Developer & Tinkerer",
  description: "Personal portfolio of Adrian Salinas, a 19yo developer from Iloilo building fast, accessible web tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${fraunces.variable} ${dmMono.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          <CustomCursor />
          {children}
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}

