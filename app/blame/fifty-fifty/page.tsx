"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Link from "next/link";
import { saveBlameResult } from "@/app/lib/actions";
import { LanguageSelector } from "@/app/components/LanguageSelector";

export default function FiftyFifty() {
  const { t } = useLanguage();
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const getRandomAccusation = (name: string) => {
    const accusations = t("fiftyFifty.results.accusations");
    if (!Array.isArray(accusations)) return "";

    const randomIndex = Math.floor(Math.random() * accusations.length);
    const accusation = accusations[randomIndex];
    return accusation.replace("{{name}}", name);
  };

  const spinWheel = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setResult(null);

    const minSpins = 3600;
    const randomExtra = Math.random() < 0.5 ? 0 : 180;
    const totalDegrees = minSpins + randomExtra;

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${totalDegrees}deg)`;
    }

    setTimeout(async () => {
      setIsSpinning(false);
      setHasSpun(true);

      const finalPosition = totalDegrees % 360;
      const loser = finalPosition === 0 ? person1 : person2;
      const accusation = getRandomAccusation(loser);

      setResult(accusation);

      // Server action ile sonucu kaydet
      await saveBlameResult({
        user1: person1,
        user2: person2,
        loser: loser,
        text: accusation,
      });
    }, 3000);
  };

  const handleNameChange = (value: string, setter: (value: string) => void) => {
    // Boşlukları kaldır ve 20 karakterle sınırla
    const sanitizedValue = value.replace(/\s+/g, "").slice(0, 20);
    setter(sanitizedValue);
  };

  const resetGame = () => {
    setPerson1("");
    setPerson2("");
    setIsSpinning(false);
    setResult(null);
    setHasSpun(false);
    if (wheelRef.current) {
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  };

  return (
    <main className="h-[100dvh] w-full bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Üst butonlar için container */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        {/* Dil seçici sol tarafta */}
        <LanguageSelector />

        {/* Yöntemlere dön butonu sağ tarafta */}
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
            {t("fiftyFifty.title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            {t("fiftyFifty.description")}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            value={person1}
            onChange={(e) => handleNameChange(e.target.value, setPerson1)}
            placeholder={t("fiftyFifty.form.firstPerson") as string}
            disabled={isSpinning || hasSpun}
            maxLength={20}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="text"
            value={person2}
            onChange={(e) => handleNameChange(e.target.value, setPerson2)}
            placeholder={t("fiftyFifty.form.secondPerson") as string}
            disabled={isSpinning || hasSpun}
            maxLength={20}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {person1 && person2 && (
          <div className="space-y-6 sm:space-y-8">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
              <div className="relative w-full h-full">
                <div
                  ref={wheelRef}
                  className="absolute w-full h-full rounded-full transition-transform duration-[3000ms] ease-out"
                >
                  <div
                    className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                      background: "#1d4ed8",
                    }}
                  >
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center min-w-[100px] transition-transform duration-[3000ms] ease-out"
                      style={{
                        transform: wheelRef.current
                          ? `translate(-50%, -250%) rotate(${-parseFloat(
                              wheelRef.current.style.transform
                                .replace("rotate(", "")
                                .replace("deg)", "")
                            )}deg)`
                          : "translate(-50%, -250%)",
                      }}
                    >
                      {person1}
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
                    style={{
                      clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                      background: "#7e22ce",
                    }}
                  >
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center min-w-[100px] transition-transform duration-[3000ms] ease-out"
                      style={{
                        transform: wheelRef.current
                          ? `translate(-50%, 200%) rotate(${-parseFloat(
                              wheelRef.current.style.transform
                                .replace("rotate(", "")
                                .replace("deg)", "")
                            )}deg)`
                          : "translate(-50%, 200%)",
                      }}
                    >
                      {person2}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-yellow-400 pointer-events-none" />
            </div>

            {hasSpun ? (
              <button
                onClick={resetGame}
                className="block w-full p-3 sm:p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-center transition-colors text-sm sm:text-base"
              >
                {t("fiftyFifty.form.playAgain") as string}
              </button>
            ) : (
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="w-full p-3 sm:p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-bold transition-colors text-sm sm:text-base"
              >
                {isSpinning
                  ? (t("fiftyFifty.form.spinning") as string)
                  : (t("fiftyFifty.form.blameButton") as string)}
              </button>
            )}

            {result && (
              <div className="text-center text-base sm:text-xl text-white font-semibold animate-fade-in">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
