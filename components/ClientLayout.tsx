"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ConfigProvider } from "@/components/ConfigProvider";
import Navigation from "@/components/Navigation";
import CursorTrail from "@/components/CursorTrail";
import ScrollProgress from "@/components/ScrollProgress";
import EasterEggTerminal from "@/components/EasterEggTerminal";
import CommandPalette from "@/components/CommandPalette";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <CursorTrail />
        <ScrollProgress />
        <Navigation />
        <CommandPalette />
        <EasterEggTerminal />
        <main className="relative">{children}</main>
        <footer className="py-8 text-center text-neutral-600 border-t border-white/[0.05]">
          <p className="text-sm">
            Designed & Built by{" "}
            <span style={{ color: "var(--color-primary)" }}>Yash Chavda</span> ©{" "}
            {new Date().getFullYear()}
          </p>
          <p className="text-xs text-neutral-700 mt-2">
            Press <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/[0.05] border border-white/[0.08] font-mono">` ` `</kbd> for a surprise
          </p>
        </footer>
      </ThemeProvider>
    </ConfigProvider>
  );
}
