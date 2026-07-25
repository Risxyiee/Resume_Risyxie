import { create } from "zustand";

export type Locale = "id" | "en";

interface LanguageStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  locale: "id",
  setLocale: (locale) => set({ locale }),
  toggle: () =>
    set((state) => ({ locale: state.locale === "id" ? "en" : "id" })),
}));
