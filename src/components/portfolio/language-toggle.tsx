"use client";

import { useI18n } from "./i18n-provider";

export function LanguageToggle() {
  const { locale, toggle, t } = useI18n();

  return (
    <button
      className="lang-toggle-btn"
      onClick={toggle}
      aria-label={`Switch to ${locale === "id" ? "English" : "Indonesian"}`}
    >
      ⇄ {t.langToggle}
    </button>
  );
}
