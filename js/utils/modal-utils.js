/**
 * Shared modal logic: open, close, focus trap, and Escape handling.
 * Used by both ModalManager and VideoManager to avoid duplication.
 */
export const ModalUtils = {
  _escapeHandlers: new WeakMap(),

  open(modal, bodyClass) {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
    document.body.classList.add(bodyClass);
  },

  close(modal, bodyClass, focusTarget = null) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
    document.body.classList.remove(bodyClass);
    this.removeEscapeHandler(modal);
    if (focusTarget) focusTarget.focus();
  },

  bindCloseEvents(modal, bodyClass, onClose = null) {
    const closeBtns = modal.querySelectorAll('.modal-close, .video-modal-close, .modal-btn-primary');
    const handleOverlayClick = (e) => {
      if (e.target === modal) this.doClose(modal, bodyClass, onClose);
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') this.doClose(modal, bodyClass, onClose);
    };

    closeBtns.forEach(btn => btn.addEventListener('click', () => this.doClose(modal, bodyClass, onClose)));
    modal.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscape);

    this._escapeHandlers.set(modal, { handleEscape, handleOverlayClick });
  },

  doClose(modal, bodyClass, onClose = null) {
    const previouslyFocused = modal._previouslyFocused || null;
    this.close(modal, bodyClass, previouslyFocused);
    this.removeFocusTrap(modal);
    if (onClose) onClose();
  },

  removeEscapeHandler(modal) {
    const handlers = this._escapeHandlers.get(modal);
    if (handlers) {
      document.removeEventListener('keydown', handlers.handleEscape);
      modal.removeEventListener('click', handlers.handleOverlayClick);
      this._escapeHandlers.delete(modal);
    }
  },

  trapFocus(modal) {
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    modal._focusTrapHandler = handleTab;
    document.addEventListener('keydown', handleTab);
    first.focus();
  },

  removeFocusTrap(modal) {
    if (modal._focusTrapHandler) {
      document.removeEventListener('keydown', modal._focusTrapHandler);
      delete modal._focusTrapHandler;
    }
  }
};
