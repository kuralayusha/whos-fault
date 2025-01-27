"use client";

import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";
import { LanguageSelector } from "./components/LanguageSelector";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center space-y-8 sm:space-y-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {t("home.title")}
        </h1>

        <p className="text-xl sm:text-2xl text-blue-200 font-light text-center px-4">
          {t("home.subtitle")}
        </p>

        <div className="w-full flex flex-col space-y-4 text-lg sm:text-xl text-slate-300 px-4">
          <p className="italic text-center">&quot;{t("home.quote")}&quot;</p>
          <p className="text-blue-300 text-center">{t("home.description")}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4 sm:px-0">
          <Link
            href="/start"
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-center"
          >
            {t("home.buttons.getStarted")}
          </Link>
          <Link
            href="/how-it-works"
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-center"
          >
            {t("home.buttons.learnMore")}
          </Link>
        </div>
      </div>
    </main>
  );
}
