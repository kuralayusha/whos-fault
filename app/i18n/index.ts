import en from "./locales/en";
import tr from "./locales/tr";
import de from "./locales/de";
import fr from "./locales/fr";
import es from "./locales/es";
import zh from "./locales/zh";
import ko from "./locales/ko";
import ja from "./locales/ja";
import ar from "./locales/ar";
import ru from "./locales/ru";

export type Language =
  | "en"
  | "tr"
  | "de"
  | "fr"
  | "es"
  | "zh"
  | "ko"
  | "ja"
  | "ar"
  | "ru";

export const translations = {
  en,
  tr,
  de,
  fr,
  es,
  zh,
  ko,
  ja,
  ar,
  ru,
};

export type TranslationKey = keyof typeof en;
