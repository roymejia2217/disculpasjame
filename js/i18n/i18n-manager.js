import { DEFAULT_LANGUAGE, STORAGE_KEYS, LANGUAGES } from '../config/constants.js';

/**
 * Internationalization manager.
 * Loads translation modules on demand, resolves dot-notation keys,
 * supports interpolation ({{param}}), caches results, and notifies
 * listeners when the active language changes. A cross-tab sync
 * mechanism via the storage event keeps multiple tabs in sync.
 */
export class I18nManager {
  static currentLanguage = DEFAULT_LANGUAGE;
  static fallbackLanguage = DEFAULT_LANGUAGE;
  static translations = {};
  static listeners = new Set();
  static _moduleCache = new Map();
  static _translationCache = new Map();

  static async initialize(defaultLanguage = DEFAULT_LANGUAGE) {
    this.currentLanguage = defaultLanguage;
    await this.loadTranslations();
    this.setupLanguageChangeListener();
  }

  /** Dynamically import the translation module for the current language.
   *  Results are cached in _moduleCache so subsequent switches are instant. */
  static async loadTranslations() {
    try {
      if (this._moduleCache.has(this.currentLanguage)) {
        this.translations = this._moduleCache.get(this.currentLanguage);
        this._translationCache.clear();
        return;
      }
      const module = await import(`./translations/${this.currentLanguage}.js`);
      const data = module.default || module;
      this._moduleCache.set(this.currentLanguage, data);
      this.translations = data;
      this._translationCache.clear();
    } catch (error) {
      console.warn(`Failed to load language ${this.currentLanguage}, falling back`);
      if (this.currentLanguage !== this.fallbackLanguage) {
        this.currentLanguage = this.fallbackLanguage;
        return this.loadTranslations();
      }
    }
  }

  /** Resolve a dot-notation key against the loaded translations,
   *  interpolate {{param}} placeholders, and cache the result. */
  static t(key, params = {}) {
    const cacheKey = `${key}:${JSON.stringify(params)}`;
    if (this._translationCache.has(cacheKey)) {
      return this._translationCache.get(cacheKey);
    }

    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing: ${key}`);
        return key;
      }
    }

    const result = typeof value === 'string' ? this.interpolate(value, params) : value;
    this._translationCache.set(cacheKey, result);
    return result;
  }

  static interpolate(text, params) {
    if (typeof text !== 'string') return text;
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  static async changeLanguage(language) {
    if (this.currentLanguage === language) return;

    this.currentLanguage = language;
    await this.loadTranslations();
    this.notifyListeners();
    this.saveLanguagePreference();
  }

  static getCurrentLanguage() {
    return this.currentLanguage;
  }

  static getAvailableLanguages() {
    return LANGUAGES;
  }

  static onLanguageChange(callback) {
    this.listeners.add(callback);
  }

  static offLanguageChange(callback) {
    this.listeners.delete(callback);
  }

  static notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentLanguage);
      } catch (error) {
        console.error('Language change listener error:', error);
      }
    });
  }

  /** Sync language across tabs via localStorage storage events. */
  static setupLanguageChangeListener() {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEYS.LANGUAGE && e.newValue !== this.currentLanguage) {
        this.changeLanguage(e.newValue);
      }
    });
  }

  static saveLanguagePreference() {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, this.currentLanguage);
  }

  static loadLanguagePreference() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  }
}
