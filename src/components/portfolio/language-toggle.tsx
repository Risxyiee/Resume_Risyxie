"use client";

import { useLanguageStore } from "@/stores/language-store";

export function LanguageToggle() {
  const { locale, toggle } = useLanguageStore();

  return (
    <button
      className="lang-toggle"
      onClick={toggle}
      aria-label={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
    >
      <span className={locale === "en" ? "lang-active" : ""}>ID</span>
      <span className="lang-sep" />
      <span className={locale === "en" ? "" : "lang-active"}>EN</span>
    </button>
  );
}
