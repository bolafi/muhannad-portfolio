import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

const dictionaries = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  ar: () => import("./dictionaries/ar").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
