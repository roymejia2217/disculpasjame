import { I18nManager } from '../i18n/i18n-manager.js';
import { WHATSAPP } from '../config/constants.js';

/**
 * WhatsApp deep-link generator.
 * Builds a wa.me URL with the default localized message
 * and opens it in a new tab.
 */
export class WhatsAppManager {
  static getDefaultMessage() {
    return I18nManager.t('whatsapp.defaultMessage');
  }

  static generateWhatsAppURL(phoneNumber = WHATSAPP.PHONE_NUMBER, message = null) {
    const defaultMessage = message || this.getDefaultMessage();
    const encodedMessage = encodeURIComponent(defaultMessage);
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
  }

  static redirectToWhatsApp(phoneNumber = WHATSAPP.PHONE_NUMBER, message = null) {
    const url = this.generateWhatsAppURL(phoneNumber, message);
    window.open(url, '_blank');
  }
}