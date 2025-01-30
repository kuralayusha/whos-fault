"use client";

import { useLanguage } from "../contexts/LanguageContext";
import Link from "next/link";
import { LanguageSelector } from "@/app/components/LanguageSelector";
import {
  getFiftyFiftyBlameCount,
  getNumberGuessBlameCount,
  getAIAnalysisBlameCount,
  getSnapRoastBlameCount,
} from "@/app/lib/actions";
import { useEffect, useState } from "react";

type OptionButtonProps = {
  href: string;
  title: string;
  description: string;
  blameCount?: number;
  t: any;
};

const OptionButton = ({
  href,
  title,
  description,
  blameCount,
  t,
}: OptionButtonProps) => (
  <div className="flex flex-col">
    <Link
      href={href}
      className="w-full p-4 sm:p-6 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl group"
    >
      <div className="flex flex-col gap-1 sm:gap-2">
        <h3 className="text-lg sm:text-xl font-semibold text-blue-400 group-hover:text-blue-300">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">{description}</p>
      </div>
    </Link>
    {blameCount !== undefined && (
      <p className="mt-1.5 text-xs text-slate-400 italic">
        {t("start.blameStats.count").replace(
          "{{count}}",
          blameCount.toString()
        )}
      </p>
    )}
  </div>
);

export default function Start() {
  const { t } = useLanguage();
  const [fiftyFiftyCount, setFiftyFiftyCount] = useState<number>();
  const [numberGuessCount, setNumberGuessCount] = useState<number>();
  const [aiAnalysisCount, setAIAnalysisCount] = useState<number>();
  const [snapRoastCount, setSnapRoastCount] = useState<number>();

  useEffect(() => {
    const getCounts = async () => {
      const [fiftyCount, numberCount, aiCount, snapRCount] = await Promise.all([
        getFiftyFiftyBlameCount(),
        getNumberGuessBlameCount(),
        getAIAnalysisBlameCount(),
        getSnapRoastBlameCount(),
      ]);
      setFiftyFiftyCount(fiftyCount);
      setNumberGuessCount(numberCount);
      setAIAnalysisCount(aiCount);
      setSnapRoastCount(snapRCount);
    };

    getCounts();
  }, []);

  return (
    <main className="h-[100dvh] w-full bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden">
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

      <div className="w-full max-w-xl space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            {t("start.title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            {t("start.description")}
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {/* Snap Roast */}
          <OptionButton
            href="/blame/snap-roast"
            title={t("start.options.snapRoast.title") as string}
            description={t("start.options.snapRoast.description") as string}
            blameCount={snapRoastCount}
            t={t}
          />

          {/* AI Analysis */}
          <OptionButton
            href="/blame/ai-analysis"
            title={t("start.options.aiAnalysis.title") as string}
            description={t("start.options.aiAnalysis.description") as string}
            blameCount={aiAnalysisCount}
            t={t}
          />

          {/* Fifty Fifty */}
          <OptionButton
            href="/blame/fifty-fifty"
            title={t("start.options.fiftyFifty.title") as string}
            description={t("start.options.fiftyFifty.description") as string}
            blameCount={fiftyFiftyCount}
            t={t}
          />

          {/* Number Guess */}
          <OptionButton
            href="/blame/number-guess"
            title={t("start.options.numberGuess.title") as string}
            description={t("start.options.numberGuess.description") as string}
            blameCount={numberGuessCount}
            t={t}
          />
        </div>
      </div>
    </main>
  );
}
