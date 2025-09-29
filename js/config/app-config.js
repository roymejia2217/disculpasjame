import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Configuración central de la aplicación con soporte multilenguaje
 * Ahora usa el sistema de internacionalización para obtener los textos
 */
export class AppConfig {
  /**
   * Obtiene la configuración actual basada en el idioma seleccionado
   * @returns {Object} Configuración de la aplicación
   */
  static getConfig() {
    return {
      // Metadatos
      meta: {
        title: I18nManager.t('meta.title'),
        description: I18nManager.t('meta.description'),
        lang: I18nManager.getCurrentLanguage()
      },

      // Hero
      hero: {
        title: I18nManager.t('hero.title'),
        line: I18nManager.t('hero.line'),
        subtitle: I18nManager.t('hero.subtitle'),
        heartTooltip: I18nManager.t('hero.heartTooltip'),
        heartAriaLabel: I18nManager.t('hero.heartAriaLabel')
      },

      // Tarjetas
      cards: I18nManager.t('cards.items'),

      // Compromisos
      commitments: {
        title: I18nManager.t('commitments.title'),
        items: I18nManager.t('commitments.items'),
        ctaText: I18nManager.t('commitments.ctaText'),
        ctaAlert: I18nManager.t('commitments.ctaAlert'),
        progressAriaLabel: I18nManager.t('commitments.progressAriaLabel')
      },

      // UI
      ui: {
        modal: {
          closeAriaLabel: I18nManager.t('modal.closeAriaLabel'),
          closeButton: I18nManager.t('modal.closeButton')
        },
        video: {
          ariaLabel: I18nManager.t('video.ariaLabel'),
          title: I18nManager.t('video.title'),
          closeAriaLabel: I18nManager.t('video.closeAriaLabel'),
          playerAriaLabel: I18nManager.t('video.playerAriaLabel'),
          notSupported: I18nManager.t('video.notSupported')
        },
        whatsapp: {
          defaultMessage: I18nManager.t('whatsapp.defaultMessage')
        }
      },

      // Configuración técnica
      config: {
        typingDurationMs: I18nManager.t('config.typingDurationMs')
      }
    };
  }

  /**
   * Obtiene un texto específico por clave
   * @param {string} key - Clave del texto
   * @param {Object} params - Parámetros para interpolación
   * @returns {string} Texto traducido
   */
  static t(key, params = {}) {
    return I18nManager.t(key, params);
  }
}
