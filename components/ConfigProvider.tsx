"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ConfigFlags {
  cursorTrail: boolean;
  encryptedName: boolean;
  skillConstellation: boolean;
  heroParallax: boolean;
  easterEggTerminal: boolean;
  sparkles: boolean;
}

export type ConfigKey = keyof ConfigFlags;

const defaultFlags: ConfigFlags = {
  cursorTrail: true,
  encryptedName: true,
  skillConstellation: true,
  heroParallax: true,
  easterEggTerminal: true,
  sparkles: true,
};

interface ConfigContextValue {
  flags: ConfigFlags;
  setFlag: (key: ConfigKey, value: boolean) => void;
  resetFlags: () => void;
}

const ConfigContext = createContext<ConfigContextValue>({
  flags: defaultFlags,
  setFlag: () => {},
  resetFlags: () => {},
});

export const useConfig = () => useContext(ConfigContext);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<ConfigFlags>(defaultFlags);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-config");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFlags({ ...defaultFlags, ...parsed });
      } catch {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-config", JSON.stringify(flags));
    }
  }, [flags, mounted]);

  const setFlag = (key: ConfigKey, value: boolean) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
  };

  const resetFlags = () => setFlags(defaultFlags);

  return (
    <ConfigContext.Provider value={{ flags, setFlag, resetFlags }}>
      {children}
    </ConfigContext.Provider>
  );
}
