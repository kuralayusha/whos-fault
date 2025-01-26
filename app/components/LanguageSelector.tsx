"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";
import type { Language } from "@/app/i18n";

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "tr" as Language, name: "Türkçe", flag: "🇹🇷" },
  { code: "de" as Language, name: "Deutsch", flag: "🇩🇪" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  { code: "ko" as Language, name: "한국어", flag: "🇰🇷" },
  { code: "ja" as Language, name: "日本語", flag: "🇯🇵" },
  { code: "ar" as Language, name: "العربية", flag: "🇸🇦" },
  { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="max-h-[300px] overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${
                  language === lang.code ? "bg-slate-700" : ""
                }`}
              >
                <span>{lang.flag}</span>
                <span className="text-white">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
