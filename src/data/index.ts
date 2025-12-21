import { contentEN, type ContentType } from "@/data/content-en";

// Add more language imports here as you create them
// import { contentAR } from "./content-ar";
// import { contentFR } from "./content-fr";

export type { ContentType };

export type Language = "en"; // | "ar" | "fr" - Add more languages here

export const content: Record<Language, ContentType> = {
  en: contentEN,
  // ar: contentAR,
  // fr: contentFR,
};

export const getContent = (language: Language = "en"): ContentType => {
  return content[language] || content.en;
};

export const availableLanguages: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  // { code: "ar", name: "العربية" },
  // { code: "fr", name: "Français" },
];
