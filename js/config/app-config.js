import { I18nManager } from '../i18n/i18n-manager.js';
import { TIMING, VIDEO, WHATSAPP, CARD_IMAGES } from './constants.js';

/**
 * Aggregate config built from translations and constants.
 * Merges i18n data with static values (timing, paths, images)
 * so renderers receive a single, ready-to-use config object.
 */
export class AppConfig {
  static getConfig() {
    return {
      meta: {
        title: I18nManager.t('meta.title'),
        description: I18nManager.t('meta.description'),
        lang: I18nManager.getCurrentLanguage()
      },

      hero: {
        title: I18nManager.t('hero.title'),
        line: I18nManager.t('hero.line'),
        subtitle: I18nManager.t('hero.subtitle'),
        heartTooltip: I18nManager.t('hero.heartTooltip'),
        heartAriaLabel: I18nManager.t('hero.heartAriaLabel'),
        typingDurationMs: TIMING.TYPING_DURATION_MS
      },

      cards: I18nManager.t('cards.items').map((item, index) => {
        const image = CARD_IMAGES[index];
        return {
          ...item,
          imageUrl: image?.src,
          imageAlt: image?.alt
        };
      }),

      commitments: {
        title: I18nManager.t('commitments.title'),
        items: I18nManager.t('commitments.items'),
        ctaText: I18nManager.t('commitments.ctaText'),
        ctaAlert: I18nManager.t('commitments.ctaAlert'),
        progressAriaLabel: I18nManager.t('commitments.progressAriaLabel')
      },

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
          notSupported: I18nManager.t('video.notSupported'),
          path: VIDEO.PATH,
          type: VIDEO.TYPE
        },
        whatsapp: {
          defaultMessage: I18nManager.t('whatsapp.defaultMessage'),
          phoneNumber: WHATSAPP.PHONE_NUMBER
        }
      }
    };
  }

  static t(key, params = {}) {
    return I18nManager.t(key, params);
  }
}
