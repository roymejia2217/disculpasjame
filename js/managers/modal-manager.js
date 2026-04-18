import { DOM } from '../utils/dom-utils.js';
import { I18nManager } from '../i18n/i18n-manager.js';
import { ModalUtils } from '../utils/modal-utils.js';
import { SELECTORS } from '../config/constants.js';

/**
 * Card detail modal.
 * Creates and manages a single reused overlay that displays
 * a title, optional image, message, and close button.
 * show() accepts an object so callers can pass imageUrl/imageAlt
 * without breaking positional-argument signatures.
 */
export class ModalManager {
  static createModal() {
    const modal = DOM.createElement('div', 'modal-overlay');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button class="modal-close" aria-label="${I18nManager.t('modal.closeAriaLabel')}">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-image-container"></div>
          <p class="modal-message"></p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn modal-btn-primary">${I18nManager.t('modal.closeButton')}</button>
        </div>
      </div>
    `;

    return modal;
  }

  /** Open the modal. Reuses the existing DOM node or creates one on first call.
   *  When imageUrl is provided, an <img> is injected into the image container;
   *  otherwise the container stays empty and hidden via CSS :empty rule. */
  static show({ title, message, imageUrl, imageAlt } = {}) {
    let modal = DOM.qs(SELECTORS.MODAL_OVERLAY);
    if (!modal) {
      modal = this.createModal();
      document.body.appendChild(modal);
    }

    DOM.qs('.modal-title', modal).textContent = title;
    DOM.qs('.modal-message', modal).textContent = message;

    const imageContainer = DOM.qs('.modal-image-container', modal);
    imageContainer.innerHTML = '';

    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = imageAlt || '';
      img.className = 'modal-image';
      img.setAttribute('loading', 'lazy');
      imageContainer.appendChild(img);
    }

    modal._previouslyFocused = document.activeElement;
    ModalUtils.open(modal, SELECTORS.MODAL_OPEN_CLASS);
    ModalUtils.bindCloseEvents(modal, SELECTORS.MODAL_OPEN_CLASS);
    ModalUtils.trapFocus(modal);
  }

  static hide(modal) {
    const previouslyFocused = modal._previouslyFocused || null;
    ModalUtils.close(modal, SELECTORS.MODAL_OPEN_CLASS, previouslyFocused);
    ModalUtils.removeFocusTrap(modal);
  }
}