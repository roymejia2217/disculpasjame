import { DEFAULT_LANGUAGE, LANGUAGES, STORAGE_KEYS } from '../config/constants.js';

/**
 * Language detection strategy: saved preference > browser language > default.
 * Extracts the primary language subtag (e.g. "en" from "en-US") for matching.
 */
export class LanguageDetector {
  static availableLanguages = LANGUAGES.map(lang => lang.code);
  static defaultLanguage = DEFAULT_LANGUAGE;

  static detectLanguage() {
    const savedLanguage = this.getSavedLanguage();
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      return savedLanguage;
    }

    const browserLanguage = this.getBrowserLanguage();
    if (browserLanguage && this.isLanguageSupported(browserLanguage)) {
      return browserLanguage;
    }

    return this.defaultLanguage;
  }

  static getSavedLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  }

  static getBrowserLanguage() {
    const language = navigator.language || navigator.userLanguage;
    if (!language) return null;
    return language.split('-')[0].toLowerCase();
  }

  static isLanguageSupported(language) {
    return this.availableLanguages.includes(language);
  }
}
