"use client";

import { useI18n } from "./i18n-provider";

export function LanguageToggle() {
  const { locale, toggle, t } = useI18n();

  return (
    <button
      className="lang-toggle"
      onClick={toggle}
      aria-label={`Switch to ${locale === "id" ? "English" : "Indonesian"}`}
    >
      <span className="lang-toggle-icon">⇄</span>
      <span className="lang-toggle-text">{t.langToggle}</span>
    </button>
  );
}
