"use client";

import { useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Link from "next/link";
import { saveAIAnalysisResult, analyzeStoriesAction } from "@/app/lib/actions";
import { LanguageSelector } from "@/app/components/LanguageSelector";

export default function AIAnalysis() {
  const { t, language } = useLanguage();
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [story1, setStory1] = useState("");
  const [story2, setStory2] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleNameChange = (value: string, setter: (value: string) => void) => {
    const sanitizedValue = value.replace(/\s+/g, "").slice(0, 20);
    setter(sanitizedValue);
  };

  const analyze = async () => {
    if (isAnalyzing || hasAnalyzed) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const aiResult = await analyzeStoriesAction(
        person1,
        person2,
        story1,
        story2,
        language
      );

      setResult(aiResult.text);
      setHasAnalyzed(true);

      await saveAIAnalysisResult({
        user1: person1,
        user2: person2,
        story1,
        story2,
        loser: aiResult.loser,
        text: aiResult.text,
      });
    } catch (error) {
      console.error("Error analyzing stories:", error);
      setResult("An error occurred while analyzing the stories.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isValid =
    person1 &&
    person2 &&
    story1.length >= 10 &&
    story2.length >= 10 &&
    !isAnalyzing &&
    !hasAnalyzed;

  return (
    <main className="h-[100dvh] w-full bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <LanguageSelector />
        <Link
          href="/start"
          className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t("common.backToMethods") as string}
        </Link>
      </div>

      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {t("aiAnalysis.title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            {t("aiAnalysis.description")}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            value={person1}
            onChange={(e) => handleNameChange(e.target.value, setPerson1)}
            placeholder={t("aiAnalysis.form.firstPerson") as string}
            disabled={isAnalyzing || hasAnalyzed}
            maxLength={20}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <textarea
            value={story1}
            onChange={(e) => setStory1(e.target.value)}
            placeholder={t("aiAnalysis.form.firstStory") as string}
            disabled={isAnalyzing || hasAnalyzed}
            maxLength={1000}
            rows={4}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />

          <input
            type="text"
            value={person2}
            onChange={(e) => handleNameChange(e.target.value, setPerson2)}
            placeholder={t("aiAnalysis.form.secondPerson") as string}
            disabled={isAnalyzing || hasAnalyzed}
            maxLength={20}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <textarea
            value={story2}
            onChange={(e) => setStory2(e.target.value)}
            placeholder={t("aiAnalysis.form.secondStory") as string}
            disabled={isAnalyzing || hasAnalyzed}
            maxLength={1000}
            rows={4}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>

        {hasAnalyzed ? (
          <Link
            href="/start"
            className="block w-full p-3 sm:p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-center transition-colors text-sm sm:text-base"
          >
            {t("aiAnalysis.form.goHome") as string}
          </Link>
        ) : (
          <button
            onClick={analyze}
            disabled={!isValid}
            className="w-full p-3 sm:p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-bold transition-colors text-sm sm:text-base"
          >
            {isAnalyzing
              ? (t("aiAnalysis.form.analyzing") as string)
              : (t("aiAnalysis.form.analyzeButton") as string)}
          </button>
        )}

        {result && (
          <div className="text-center text-base sm:text-xl text-white font-semibold animate-fade-in">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
