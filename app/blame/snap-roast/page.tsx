"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import Link from "next/link";
import { LanguageSelector } from "@/app/components/LanguageSelector";
import {
  saveSnapRoastResult,
  analyzeImageAction,
  uploadImageAction,
} from "@/app/lib/actions";

export default function SnapRoast() {
  const { t, language } = useLanguage();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("file: ", file);

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);

        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyze = async () => {
    if (!image || !userName || isAnalyzing || hasAnalyzed) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Dosya boyutu kontrolü
      //   if (image.size > 4 * 1024 * 1024) {
      //     // 4MB
      //     throw new Error("Fotoğraf boyutu çok büyük (max 4MB)");
      //   }

      const uploadFormData = new FormData();
      uploadFormData.append("file", image);
      uploadFormData.append("userName", userName);

      const imageUrl = await uploadImageAction(uploadFormData);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("userName", userName);
      formData.append("language", language);

      const aiResult = await analyzeImageAction(formData);
      setResult(aiResult.text);
      setHasAnalyzed(true);

      await saveSnapRoastResult({
        userName,
        imageUrl,
        roastText: aiResult.text,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu";
      setResult(`${t("snapRoast.errors.analysisFailed")}: ${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isValid = userName.trim() !== "" && image !== null;

  return (
    <main className="h-[100dvh] w-full bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <LanguageSelector />
        <Link
          href="/start"
          className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t("common.backToMethods") as string}
        </Link>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-3xl font-bold text-white">
            {t("snapRoast.title") as string}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            {t("snapRoast.description") as string}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 space-y-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={t("snapRoast.form.userName") as string}
            className="w-full p-2 bg-slate-700 text-white rounded-lg text-sm placeholder-slate-400"
          />

          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
            >
              {t("snapRoast.form.selectImage") as string}
            </button>

            {imagePreview && !result && (
              <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {hasAnalyzed ? (
            <Link
              href="/start"
              className="block w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-center transition-colors text-sm"
            >
              {t("snapRoast.form.goHome") as string}
            </Link>
          ) : (
            <button
              onClick={analyze}
              disabled={!isValid || isAnalyzing}
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-bold transition-colors text-sm"
            >
              {isAnalyzing
                ? (t("snapRoast.form.analyzing") as string)
                : (t("snapRoast.form.analyzeButton") as string)}
            </button>
          )}

          {result && imagePreview && (
            <div className="flex items-center gap-3 bg-slate-700 p-2 rounded-lg">
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-white flex-grow">{result}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
