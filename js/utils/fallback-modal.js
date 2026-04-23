import { ModalManager } from '../managers/modal-manager.js';
import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Fallback UI shown when WhatsApp cannot be launched.
 * Reuses the existing ModalManager to display the pre-formatted
 * message so the user can copy it manually.
 */
export const FallbackModal = {
  /**
   * Display the fallback modal with the message ready to copy.
   * @param {string} message - The plain-text message to display.
   */
  show(message) {
    const title = I18nManager.t('whatsapp.fallbackTitle');
    const bodyPrefix = I18nManager.t('whatsapp.fallbackBody');
    const fullBody = `${bodyPrefix}\n\n${message}`;

    ModalManager.show({
      title,
      message: fullBody
    });
  }
};
