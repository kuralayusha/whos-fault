"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const languages = [
  { code: "en", name: "English" },
  { code: "tr", name: "Türkçe" },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  if (!mounted) {
    return null;
  }

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};
