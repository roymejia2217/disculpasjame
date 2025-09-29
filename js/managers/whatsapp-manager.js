import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Gestor de WhatsApp (SRP - Single Responsibility Principle)
 * Responsable únicamente de manejar la integración con WhatsApp
 */
export class WhatsAppManager {
  static PHONE_NUMBER = '+593993686769';
  
  static getDefaultMessage() {
    return I18nManager.t('whatsapp.defaultMessage');
  }

  /**
   * Genera la URL de WhatsApp
   * @param {string} phoneNumber - Número de teléfono
   * @param {string} message - Mensaje por defecto
   * @returns {string}
   */
  static generateWhatsAppURL(phoneNumber = this.PHONE_NUMBER, message = null) {
    const defaultMessage = message || this.getDefaultMessage();
    const encodedMessage = encodeURIComponent(defaultMessage);
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
  }

  /**
   * Redirige a WhatsApp
   * @param {string} phoneNumber - Número de teléfono
   * @param {string} message - Mensaje por defecto
   */
  static redirectToWhatsApp(phoneNumber = this.PHONE_NUMBER, message = null) {
    const url = this.generateWhatsAppURL(phoneNumber, message);
    window.open(url, '_blank');
  }
}
