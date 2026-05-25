import { ja } from './ja'
import { en } from './en'

export type Locale = 'ja' | 'en'
export type { Dictionary } from './ja'

export const dictionaries = { ja, en }

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.ja
}

export function isValidLocale(value: string): value is Locale {
  return value === 'ja' || value === 'en'
}
