import { de } from "./dictionaries/de";
import { en } from "./dictionaries/en";

export type Locale = "de" | "en";
export type Dictionary = typeof de;

export function getDictionary(locale: Locale = "de"): Dictionary {
  return locale === "en" ? en : de;
}
