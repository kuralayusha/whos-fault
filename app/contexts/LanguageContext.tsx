"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "../i18n/locales/en";
import tr from "../i18n/locales/tr";

type Translations = typeof en;

const translations = { en, tr };

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string | string[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// HTML entities'leri gerçek karakterlere dönüştüren yardımcı fonksiyon
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
  const [language, setLanguage] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setLanguage(savedLang);
    setMounted(true);
  }, []);

  const t = (key: string) => {
    if (!mounted) {
      return "";
    }

    const keys = key.split(".");
    let value: any = translations[language as keyof typeof translations];

    for (const k of keys) {
      value = value?.[k];
    }

    // Eğer değer array ise direkt döndür
    if (Array.isArray(value)) {
      return value;
    }

    // String ise decode et
    return decodeHtmlEntities(value || key);
  };

  const handleSetLanguage = (newLang: string) => {
    setLanguage(newLang);
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
