"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n";
import type { Language } from "../i18n";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const decodeHtmlEntities = (str: string | unknown): string => {
  if (typeof str !== "string") return "";

  const entities = {
    "&apos;": "'",
    "&quot;": '"',
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
  };

  return str.replace(
    /&[^;]+;/g,
    (entity) => entities[entity as keyof typeof entities] || entity
  );
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setLanguage(savedLang as Language);
    setMounted(true);
  }, []);

  const t = (key: string) => {
    if (!mounted) return "";

    const keys = key.split(".");
    let value: any = translations[language as keyof typeof translations];

    for (const k of keys) {
      value = value?.[k];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return decodeHtmlEntities(value || key);
  };

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
