import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatbotWidget } from "@/components/ChatbotWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adrian Justin J. Salinas | Full-Stack Developer",
  description: "Professional portfolio of Adrian Justin J. Salinas, a Full-Stack Developer and aspiring Data Engineer specializing in modern web technologies and data architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}

