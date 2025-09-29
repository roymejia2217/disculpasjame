/**
 * Gestor de WhatsApp (SRP - Single Responsibility Principle)
 * Responsable únicamente de manejar la integración con WhatsApp
 */
export class WhatsAppManager {
  static PHONE_NUMBER = '+593993686769';
  static DEFAULT_MESSAGE = 'No dejaré de amarte jamás ❤';

  /**
   * Genera la URL de WhatsApp
   * @param {string} phoneNumber - Número de teléfono
   * @param {string} message - Mensaje por defecto
   * @returns {string}
   */
  static generateWhatsAppURL(phoneNumber = this.PHONE_NUMBER, message = this.DEFAULT_MESSAGE) {
    const encodedMessage = encodeURIComponent(message);
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
  }

  /**
   * Redirige a WhatsApp
   * @param {string} phoneNumber - Número de teléfono
   * @param {string} message - Mensaje por defecto
   */
  static redirectToWhatsApp(phoneNumber = this.PHONE_NUMBER, message = this.DEFAULT_MESSAGE) {
    const url = this.generateWhatsAppURL(phoneNumber, message);
    window.open(url, '_blank');
  }
}
