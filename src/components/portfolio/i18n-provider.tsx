"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type Locale, type TranslationKey, t as getT } from "@/lib/i18n";

interface I18nContextValue {
  locale: Locale;
  t: TranslationKey;
  toggle: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");

  const toggle = useCallback(() => {
    setLocale((prev) => (prev === "id" ? "en" : "id"));
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t: getT(locale), toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
