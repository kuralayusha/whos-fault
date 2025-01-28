"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Link from "next/link";
import { saveNumberGuessResult } from "@/app/lib/actions";
import { LanguageSelector } from "@/app/components/LanguageSelector";

export default function NumberGuess() {
  const { t } = useLanguage();
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const numberRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (value: string, setter: (value: string) => void) => {
    const sanitizedValue = value.replace(/\s+/g, "").slice(0, 20);
    setter(sanitizedValue);
  };

  const handleNumberChange = (
    value: string,
    setter: (value: string) => void,
    otherNumber?: string
  ) => {
    const num = parseInt(value);
    if (isNaN(num)) {
      setter("");
      return;
    }

    // 0-100 aralığı kontrolü
    if (num < 0 || num > 100) {
      return;
    }

    // Orta sayılar yasak (50)
    if (num === 50) {
      return;
    }

    // Diğer kişinin seçtiği sayı ile aynı olamaz
    if (otherNumber && num.toString() === otherNumber) {
      return;
    }

    setter(num.toString());
  };

  // Hata mesajlarını göstermek için state'ler
  const [number1Error, setNumber1Error] = useState<string | null>(null);
  const [number2Error, setNumber2Error] = useState<string | null>(null);

  // Input değişikliklerini kontrol eden fonksiyonlar
  const handleNumber1Change = (value: string) => {
    setNumber1Error(null);

    const num = parseInt(value);
    if (num === 50) {
      setNumber1Error(t("numberGuess.form.middleNumberError") as string);
      return;
    }

    // Sadece uyarı göster, girişi engelleme
    if (value === number2 && value !== "" && num !== 0) {
      setNumber1Error(t("numberGuess.form.sameNumberError") as string);
    }

    handleNumberChange(value, setNumber1);
  };

  const handleNumber2Change = (value: string) => {
    setNumber2Error(null);

    const num = parseInt(value);
    if (num === 50) {
      setNumber2Error(t("numberGuess.form.middleNumberError") as string);
      return;
    }

    // Sadece uyarı göster, girişi engelleme
    if (value === number1 && value !== "" && num !== 0) {
      setNumber2Error(t("numberGuess.form.sameNumberError") as string);
    }

    handleNumberChange(value, setNumber2);
  };

  const getRandomAccusation = (name: string) => {
    const accusations = t("fiftyFifty.results.accusations");
    if (!Array.isArray(accusations)) return "";

    const randomIndex = Math.floor(Math.random() * accusations.length);
    const accusation = accusations[randomIndex];
    return accusation.replace("{{name}}", name);
  };

  const revealFate = async () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setResult(null);

    const target = Math.floor(Math.random() * 101);
    const diff1 = Math.abs(parseInt(number1) - target);
    const diff2 = Math.abs(parseInt(number2) - target);
    const loser = diff1 > diff2 ? person1 : person2;

    // Animasyon için sayıları hızlıca değiştir
    let current = 0;
    const interval = setInterval(() => {
      current = Math.floor(Math.random() * 101);
      setTargetNumber(current);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setTargetNumber(target);
      setIsSpinning(false);
      setHasSpun(true);

      const accusation = getRandomAccusation(loser);
      setResult(accusation);

      saveNumberGuessResult({
        user1: person1,
        user2: person2,
        number1: parseInt(number1),
        number2: parseInt(number2),
        target_number: target,
        loser,
        text: accusation,
      });
    }, 2000);
  };

  const resetGame = () => {
    setPerson1("");
    setPerson2("");
    setNumber1("");
    setNumber2("");
    setTargetNumber(null);
    setIsSpinning(false);
    setResult(null);
    setHasSpun(false);
  };

  const isValid =
    person1 &&
    person2 &&
    number1 !== "" &&
    number2 !== "" &&
    !isSpinning &&
    !hasSpun &&
    number1 !== number2; // Eşit sayılar için gönderimi engelle

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
            {t("numberGuess.title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            {t("numberGuess.description")}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            value={person1}
            onChange={(e) => handleNameChange(e.target.value, setPerson1)}
            placeholder={t("numberGuess.form.firstPerson") as string}
            disabled={isSpinning || hasSpun}
            maxLength={20}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="space-y-1">
            <input
              type="number"
              value={number1}
              onChange={(e) => handleNumber1Change(e.target.value)}
              placeholder={t("numberGuess.form.firstNumber") as string}
              disabled={isSpinning || hasSpun}
              min={0}
              max={100}
              className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {number1Error && (
              <p className="text-xs text-red-400 italic pl-1">{number1Error}</p>
            )}
          </div>
          <input
            type="text"
            value={person2}
            onChange={(e) => handleNameChange(e.target.value, setPerson2)}
            placeholder={t("numberGuess.form.secondPerson") as string}
            disabled={isSpinning || hasSpun}
            maxLength={20}
            className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="space-y-1">
            <input
              type="number"
              value={number2}
              onChange={(e) => handleNumber2Change(e.target.value)}
              placeholder={t("numberGuess.form.secondNumber") as string}
              disabled={isSpinning || hasSpun}
              min={0}
              max={100}
              className="w-full p-2.5 sm:p-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {number2Error && (
              <p className="text-xs text-red-400 italic pl-1">{number2Error}</p>
            )}
          </div>
        </div>

        {(targetNumber !== null || isSpinning) && (
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-400">
              {t("numberGuess.form.targetNumber")}
            </p>
            <div
              ref={numberRef}
              className="text-4xl sm:text-5xl font-bold text-yellow-400"
            >
              {targetNumber}
            </div>
          </div>
        )}

        {hasSpun ? (
          <button
            onClick={resetGame}
            className="block w-full p-3 sm:p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-center transition-colors text-sm sm:text-base"
          >
            {t("numberGuess.form.playAgain") as string}
          </button>
        ) : (
          <button
            onClick={revealFate}
            disabled={!isValid}
            className="w-full p-3 sm:p-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-bold transition-colors text-sm sm:text-base"
          >
            {isSpinning
              ? (t("numberGuess.form.spinning") as string)
              : (t("numberGuess.form.blameButton") as string)}
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
