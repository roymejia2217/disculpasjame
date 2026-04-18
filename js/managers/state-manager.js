import { DOM } from '../utils/dom-utils.js';
import { I18nManager } from '../i18n/i18n-manager.js';
import { STORAGE_KEYS } from '../config/constants.js';

/**
 * Persists commitment checkbox state to localStorage and
 * updates the progress bar/text on every change.
 * Keys use the STORAGE_KEYS.COMMITMENT_PREFIX + checkbox data-key
 * so they survive language switches without losing state.
 */
export class StateManager {
  static loadState() {
    DOM.qsa('.ck-list input[type="checkbox"]').forEach(checkbox => {
      const value = localStorage.getItem(STORAGE_KEYS.COMMITMENT_PREFIX + checkbox.dataset.key);
      if (value === '1') checkbox.checked = true;
    });
    this.updateProgress();
  }

  static updateProgress() {
    const checkboxes = DOM.qsa('.ck-list input[type="checkbox"]');
    const completed = checkboxes.filter(cb => cb.checked).length;

    DOM.qs('#prog').value = completed;
    DOM.qs('#progText').textContent = I18nManager.t('commitments.progressText', {
      completed: completed,
      total: checkboxes.length
    });
  }

  static bindCommitments() {
    DOM.qsa('.ck-list input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const key = STORAGE_KEYS.COMMITMENT_PREFIX + checkbox.dataset.key;
        localStorage.setItem(key, checkbox.checked ? '1' : '0');
        this.updateProgress();
      });
    });
  }
}