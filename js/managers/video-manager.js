import { DOM } from '../utils/dom-utils.js';
import { TooltipManager } from './tooltip-manager.js';
import { I18nManager } from '../i18n/i18n-manager.js';
import { ModalUtils } from '../utils/modal-utils.js';
import { VIDEO, SELECTORS } from '../config/constants.js';

/**
 * Surprise video modal.
 * Lazy-created on first open. Pauses and resets playback on close.
 * Delegates overlay, focus-trap, and escape handling to ModalUtils.
 */
export class VideoManager {
  static createVideoModal() {
    const modal = DOM.createElement('div', 'video-modal-overlay');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-label', I18nManager.t('video.ariaLabel'));

    modal.innerHTML = `
      <div class="video-modal-content">
        <div class="video-modal-header">
          <h2 class="video-modal-title">${I18nManager.t('video.title')}</h2>
          <button class="video-modal-close" aria-label="${I18nManager.t('video.closeAriaLabel')}">&times;</button>
        </div>
        <div class="video-modal-body">
          <video class="video-player" controls preload="metadata" aria-label="${I18nManager.t('video.playerAriaLabel')}">
            <source src="${VIDEO.PATH}" type="${VIDEO.TYPE}">
            ${I18nManager.t('video.notSupported')}
          </video>
        </div>
        <div class="video-modal-footer"></div>
      </div>
    `;

    return modal;
  }

  static showVideo() {
    TooltipManager.hideTooltip();

    let modal = DOM.qs(SELECTORS.VIDEO_MODAL_OVERLAY);
    if (!modal) {
      modal = this.createVideoModal();
      document.body.appendChild(modal);
    }

    modal._previouslyFocused = document.activeElement;
    ModalUtils.open(modal, SELECTORS.VIDEO_MODAL_OPEN_CLASS);
    ModalUtils.bindCloseEvents(modal, SELECTORS.VIDEO_MODAL_OPEN_CLASS, () => {
      const video = DOM.qs('.video-player', modal);
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    ModalUtils.trapFocus(modal);
  }

  static hideVideo(modal) {
    const video = DOM.qs('.video-player', modal);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    const previouslyFocused = modal._previouslyFocused || null;
    ModalUtils.close(modal, SELECTORS.VIDEO_MODAL_OPEN_CLASS, previouslyFocused);
    ModalUtils.removeFocusTrap(modal);
  }
}