import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

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
  description:
    "Portfolio of Yash Chavda - Aspiring Software Engineer specializing in Full Stack Development, AI/ML, and innovative solutions.",
  keywords: [
    "Software Engineer",
    "Full Stack",
    "AI/ML",
    "Next.js",
    "React",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
