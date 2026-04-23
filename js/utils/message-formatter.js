import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Message formatter for WhatsApp integration.
 * Assembles localized dynamic progress text with static closing message
 * and ASCII heart fallback to guarantee cross-device compatibility.
 * Avoids emojis in the actual payload to prevent encoding issues on
 * older devices or operating systems without native emoji fonts.
 */
export const MessageFormatter = {
  /**
   * Build the complete WhatsApp message body.
   * @param {number} completed - Number of checked commitments.
   * @param {number} total - Total number of commitments.
   * @returns {string} Formatted message ready for encodeURIComponent.
   */
  buildWhatsAppMessage(completed, total) {
    const progress = I18nManager.t('whatsapp.progressMessage', { completed, total });
    const closing = I18nManager.t('whatsapp.closingMessage');
    const heart = I18nManager.t('whatsapp.heartSymbol');
    return `${progress}. ${closing} ${heart}`;
  }
};
