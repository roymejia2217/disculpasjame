import { AppConfig } from '../config/app-config.js';
import { I18nManager } from '../i18n/i18n-manager.js';
import { LanguageDetector } from '../i18n/language-detector.js';
import { HeroRenderer } from '../renderers/hero-renderer.js';
import { CardRenderer } from '../renderers/card-renderer.js';
import { CommitmentsRenderer } from '../renderers/commitments-renderer.js';
import { StateManager } from '../managers/state-manager.js';
import { LanguageSwitcher } from '../components/language-switcher.js';
import { DeviceUtils } from '../utils/device-utils.js';

/**
 * Application entry point.
 * Orchestrates initialization: i18n setup, initial render,
 * event binding, and language-switcher mounting.
 * On language change it re-renders the entire UI and restores
 * persisted checkbox state so the page stays consistent.
 */
export class AppController {
  static async initialize() {
    await this.setupI18n();
    this.setupAccessibility();
    this.render();
    this.bindEvents();
    this.setupLanguageSwitcher();
  }

  static async setupI18n() {
    const detectedLanguage = LanguageDetector.detectLanguage();
    await I18nManager.initialize(detectedLanguage);

    I18nManager.onLanguageChange(() => {
      this.updateDocumentLanguage();
      this.render();
      StateManager.loadState();
      StateManager.bindCommitments();
    });

    this.updateDocumentLanguage();
  }

  /** Update <html lang>, <title>, and <meta description> to match current language. */
  static updateDocumentLanguage() {
    const currentLang = I18nManager.getCurrentLanguage();
    document.documentElement.lang = currentLang;

    const config = AppConfig.getConfig();
    document.title = config.meta.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = config.meta.description;
    }
  }

  /** Apply prefers-reduced-motion accessibility preference. */
  static setupAccessibility() {
    if (DeviceUtils.prefersReducedMotion()) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  /** Build the full UI from the current config snapshot. */
  static render() {
    const config = AppConfig.getConfig();
    HeroRenderer.render(config.hero);
    CardRenderer.render(config.cards);
    CommitmentsRenderer.render(config.commitments);
  }

  static setupLanguageSwitcher() {
    LanguageSwitcher.render();
  }

  /** Restore persisted commitment state and bind change listeners. */
  static bindEvents() {
    StateManager.loadState();
    StateManager.bindCommitments();
  }
}
