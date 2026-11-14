"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import { HeroGlow } from "@/components/HeroGlow";
import SpotlightSearch from "@/components/SpotlightSearch";
import DevConsole from "@/components/DevConsole";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import SiteSettingsPanel from "@/components/SiteSettingsPanel";
import { ConfigProvider } from "@/components/ConfigProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <SmoothScroll>
        <PageLoader />
        <HeroGlow />
        <Navigation />
        <SpotlightSearch />
        <DevConsole />
        <SiteSettingsPanel />
        <main className="relative">{children}</main>
        <Footer />
      </SmoothScroll>
    </ConfigProvider>
  );
}
