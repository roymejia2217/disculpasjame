import { WHATSAPP } from '../config/constants.js';
import { MessageFormatter } from '../utils/message-formatter.js';
import { FallbackModal } from '../utils/fallback-modal.js';

/**
 * WhatsApp deep-link generator and redirect handler.
 * Builds a dynamic wa.me URL based on commitment progress,
 * attempts to open it, and falls back to a copyable modal
 * when WhatsApp is unavailable (desktop without app, popups blocked, etc.).
 */
export class WhatsAppManager {
  static generateDynamicURL(completed, total) {
    const message = MessageFormatter.buildWhatsAppMessage(completed, total);
    const encodedMessage = encodeURIComponent(message);
    const cleanPhoneNumber = WHATSAPP.PHONE_NUMBER.replace(/[^\d+]/g, '');
    return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
  }

  static redirectToWhatsApp(completed, total) {
    const url = this.generateDynamicURL(completed, total);
    const plainMessage = MessageFormatter.buildWhatsAppMessage(completed, total);

    let newWindow;
    try {
      newWindow = window.open(url, '_blank');
    } catch {
      FallbackModal.show(plainMessage);
      return;
    }

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      FallbackModal.show(plainMessage);
      return;
    }

    const checkBlocked = setTimeout(() => {
      try {
        if (newWindow.closed) {
          clearTimeout(checkBlocked);
          return;
        }
      } catch {
        clearTimeout(checkBlocked);
        return;
      }
    }, 800);
  }
}