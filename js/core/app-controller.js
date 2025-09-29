import { AppConfig } from '../config/app-config.js';
import { I18nManager } from '../i18n/i18n-manager.js';
import { LanguageDetector } from '../i18n/language-detector.js';
import { HeroRenderer } from '../renderers/hero-renderer.js';
import { CardRenderer } from '../renderers/card-renderer.js';
import { CommitmentsRenderer } from '../renderers/commitments-renderer.js';
import { StateManager } from '../managers/state-manager.js';
import { LanguageSwitcher } from '../components/language-switcher.js';

/**
 * Controlador Principal (SRP - Single Responsibility Principle)
 * Responsable únicamente de coordinar la inicialización de la aplicación
 */
export class AppController {
  /**
   * Inicializa la aplicación
   */
  static async initialize() {
    await this.setupI18n();
    this.setupAccessibility();
    this.render();
    this.bindEvents();
    this.setupLanguageSwitcher();
  }

  /**
   * Configura el sistema de internacionalización
   */
  static async setupI18n() {
    const detectedLanguage = LanguageDetector.detectLanguage();
    await I18nManager.initialize(detectedLanguage);
    
    // Escuchar cambios de idioma para re-renderizar
    I18nManager.onLanguageChange(() => {
      this.updateDocumentLanguage();
      this.render();
    });
    
    this.updateDocumentLanguage();
  }

  /**
   * Actualiza el idioma del documento HTML
   */
  static updateDocumentLanguage() {
    const currentLang = I18nManager.getCurrentLanguage();
    document.documentElement.lang = currentLang;
    
    // Actualizar meta tags
    const config = AppConfig.getConfig();
    document.title = config.meta.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = config.meta.description;
    }
  }

  /**
   * Configura la accesibilidad
   */
  static setupAccessibility() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  /**
   * Renderiza todos los componentes
   */
  static render() {
    const config = AppConfig.getConfig();
    HeroRenderer.render(config.hero);
    CardRenderer.render(config.cards);
    CommitmentsRenderer.render(config.commitments);
  }

  /**
   * Configura el selector de idioma
   */
  static setupLanguageSwitcher() {
    LanguageSwitcher.render();
  }

  /**
   * Vincula los eventos de la aplicación
   */
  static bindEvents() {
    StateManager.loadState();
    StateManager.bindCommitments();
  }
}
