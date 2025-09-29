/**
 * Detector de Idioma (SRP - Single Responsibility Principle)
 * Responsable únicamente de detectar el idioma preferido del usuario
 */
export class LanguageDetector {
  static availableLanguages = ['es', 'en', 'fr'];
  static defaultLanguage = 'es';

  /**
   * Detecta el idioma preferido del usuario
   * @returns {string} Código del idioma detectado
   */
  static detectLanguage() {
    // 1. Preferencia guardada en localStorage
    const savedLanguage = this.getSavedLanguage();
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      return savedLanguage;
    }

    // 2. Idioma del navegador
    const browserLanguage = this.getBrowserLanguage();
    if (browserLanguage && this.isLanguageSupported(browserLanguage)) {
      return browserLanguage;
    }

    // 3. Idioma por defecto
    return this.defaultLanguage;
  }

  /**
   * Obtiene el idioma guardado en localStorage
   * @returns {string|null} Idioma guardado
   */
  static getSavedLanguage() {
    return localStorage.getItem('app_language');
  }

  /**
   * Obtiene el idioma del navegador
   * @returns {string|null} Idioma del navegador
   */
  static getBrowserLanguage() {
    const language = navigator.language || navigator.userLanguage;
    
    if (!language) return null;
    
    // Extraer solo el código del idioma (ej: 'es' de 'es-ES')
    const languageCode = language.split('-')[0].toLowerCase();
    
    return languageCode;
  }

  /**
   * Verifica si un idioma está soportado
   * @param {string} language - Código del idioma
   * @returns {boolean} True si está soportado
   */
  static isLanguageSupported(language) {
    return this.availableLanguages.includes(language);
  }

  /**
   * Obtiene el idioma más cercano soportado
   * @param {string} language - Idioma a verificar
   * @returns {string} Idioma soportado más cercano
   */
  static getClosestSupportedLanguage(language) {
    if (this.isLanguageSupported(language)) {
      return language;
    }

    // Mapeo de idiomas similares
    const languageMap = {
      'es-ES': 'es',
      'es-MX': 'es',
      'es-AR': 'es',
      'en-US': 'en',
      'en-GB': 'en',
      'en-CA': 'en',
      'fr-FR': 'fr',
      'fr-CA': 'fr'
    };

    return languageMap[language] || this.defaultLanguage;
  }

  /**
   * Obtiene información detallada del idioma detectado
   * @returns {Object} Información del idioma
   */
  static getLanguageInfo() {
    const detected = this.detectLanguage();
    const browser = this.getBrowserLanguage();
    const saved = this.getSavedLanguage();

    return {
      detected,
      browser,
      saved,
      isFromBrowser: detected === browser,
      isFromSaved: detected === saved,
      isDefault: detected === this.defaultLanguage
    };
  }
}
