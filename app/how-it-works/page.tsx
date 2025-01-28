"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import Link from "next/link";
import { LanguageSelector } from "@/app/components/LanguageSelector";

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <main className="min-h-[100dvh] w-full bg-gradient-to-b from-slate-900 to-slate-800 py-20 px-4">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <LanguageSelector />
        <Link
          href="/"
          className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
          {t("common.home") as string}
        </Link>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {t("howItWorks.title")}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/50 p-6 rounded-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-400">
              {t("howItWorks.disclaimer.title")}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t("howItWorks.disclaimer.description")}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400">
              {t("howItWorks.methods.title")}
            </h2>

            <div className="grid gap-6">
              <div className="bg-slate-800/50 p-6 rounded-xl space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                  {t("start.options.fiftyFifty.title")}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t("howItWorks.methods.fiftyFifty")}
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                  {t("start.options.numberGuess.title")}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t("howItWorks.methods.numberGuess")}
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                  {t("start.options.aiAnalysis.title")}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t("howItWorks.methods.aiAnalysis")}
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                  {t("start.options.snapRoast.title")}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {t("howItWorks.methods.snapRoast")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-400">
              {t("howItWorks.purpose.title")}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t("howItWorks.purpose.description")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
