"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Lang } from "./translations";

type I18nContextType = {
  lang: Lang;
  t: (key: string) => string;
  toggle: () => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");

  const t = useCallback(
    (key: string) => {
      return translations[lang][key] ?? key;
    },
    [lang]
  );

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}