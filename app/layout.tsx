import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CursorTrail from "@/components/CursorTrail";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Yash Chavda | Software Engineer",
  description: "Portfolio of Yash Chavda - Aspiring Software Engineer specializing in Full Stack Development, AI/ML, and innovative solutions.",
  keywords: ["Software Engineer", "Full Stack", "AI/ML", "Next.js", "React", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <CursorTrail />
        <ScrollProgress />
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <footer className="bg-navy-950 py-8 text-center text-navy-700 border-t border-navy-800">
          <p className="text-sm">
            Designed & Built by <span className="text-teal-400">Yash Chavda</span> © {new Date().getFullYear()}
          </p>
        </footer>
      </body>
    </html>
  );
}
