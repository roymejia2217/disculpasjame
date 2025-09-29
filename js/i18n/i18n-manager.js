/**
 * Gestor de Internacionalización (SRP - Single Responsibility Principle)
 * Responsable únicamente de gestionar las traducciones y el cambio de idioma
 */
export class I18nManager {
  static currentLanguage = 'es';
  static fallbackLanguage = 'es';
  static translations = {};
  static listeners = new Set();

  /**
   * Inicializa el sistema de internacionalización
   * @param {string} defaultLanguage - Idioma por defecto
   */
  static async initialize(defaultLanguage = 'es') {
    this.currentLanguage = defaultLanguage;
    await this.loadTranslations();
    this.setupLanguageChangeListener();
  }

  /**
   * Carga las traducciones del idioma actual
   */
  static async loadTranslations() {
    try {
      const module = await import(`./translations/${this.currentLanguage}.js`);
      this.translations = module.default || module;
    } catch (error) {
      console.warn(`No se pudo cargar el idioma ${this.currentLanguage}, usando fallback`);
      if (this.currentLanguage !== this.fallbackLanguage) {
        this.currentLanguage = this.fallbackLanguage;
        return this.loadTranslations();
      }
    }
  }

  /**
   * Obtiene una traducción por clave
   * @param {string} key - Clave de traducción (ej: 'hero.title')
   * @param {Object} params - Parámetros para interpolación
   * @returns {string} Texto traducido
   */
  static t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Traducción no encontrada: ${key}`);
        return key; // Fallback a la clave
      }
    }
    
    // Interpolación de parámetros
    return this.interpolate(value, params);
  }

  /**
   * Interpola parámetros en el texto
   * @param {string|Array|Object} text - Texto con placeholders
   * @param {Object} params - Parámetros
   * @returns {string|Array|Object} Texto interpolado
   */
  static interpolate(text, params) {
    // Si no es un string, devolver tal como está
    if (typeof text !== 'string') {
      return text;
    }
    
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match;
    });
  }

  /**
   * Cambia el idioma de la aplicación
   * @param {string} language - Código del idioma
   */
  static async changeLanguage(language) {
    if (this.currentLanguage === language) return;
    
    this.currentLanguage = language;
    await this.loadTranslations();
    this.notifyListeners();
    this.saveLanguagePreference();
  }

  /**
   * Obtiene el idioma actual
   * @returns {string} Código del idioma actual
   */
  static getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Obtiene la lista de idiomas disponibles
   * @returns {Array} Lista de idiomas
   */
  static getAvailableLanguages() {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' }
    ];
  }

  /**
   * Registra un listener para cambios de idioma
   * @param {Function} callback - Función a ejecutar en cambios
   */
  static onLanguageChange(callback) {
    this.listeners.add(callback);
  }

  /**
   * Desregistra un listener
   * @param {Function} callback - Función a desregistrar
   */
  static offLanguageChange(callback) {
    this.listeners.delete(callback);
  }

  /**
   * Notifica a todos los listeners del cambio de idioma
   */
  static notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentLanguage);
      } catch (error) {
        console.error('Error en listener de cambio de idioma:', error);
      }
    });
  }

  /**
   * Configura el listener para cambios de idioma
   */
  static setupLanguageChangeListener() {
    // Escuchar cambios en localStorage desde otras pestañas
    window.addEventListener('storage', (e) => {
      if (e.key === 'app_language' && e.newValue !== this.currentLanguage) {
        this.changeLanguage(e.newValue);
      }
    });
  }

  /**
   * Guarda la preferencia de idioma
   */
  static saveLanguagePreference() {
    localStorage.setItem('app_language', this.currentLanguage);
  }

  /**
   * Carga la preferencia de idioma guardada
   * @returns {string} Idioma preferido o null
   */
  static loadLanguagePreference() {
    return localStorage.getItem('app_language');
  }
}
