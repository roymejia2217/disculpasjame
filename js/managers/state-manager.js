import { DOM } from '../utils/dom-utils.js';
import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Gestor de Estado (SRP - Single Responsibility Principle)
 * Responsable únicamente de manejar el estado de la aplicación
 */
export class StateManager {
  static STORAGE_PREFIX = 'apology_';

  /**
   * Carga el estado guardado desde localStorage
   */
  static loadState() {
    DOM.qsa('.ck-list input[type="checkbox"]').forEach(checkbox => {
      const value = localStorage.getItem(this.STORAGE_PREFIX + checkbox.dataset.key);
      if (value === '1') checkbox.checked = true;
    });
    this.updateProgress();
  }

  /**
   * Actualiza la barra de progreso
   */
  static updateProgress() {
    const checkboxes = DOM.qsa('.ck-list input[type="checkbox"]');
    const completed = checkboxes.filter(cb => cb.checked).length;
    
    DOM.qs('#prog').value = completed;
    DOM.qs('#progText').textContent = I18nManager.t('commitments.progressText', {
      completed: completed,
      total: checkboxes.length
    });
  }

  /**
   * Vincula los eventos de los checkboxes de compromisos
   */
  static bindCommitments() {
    DOM.qsa('.ck-list input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const key = this.STORAGE_PREFIX + checkbox.dataset.key;
        localStorage.setItem(key, checkbox.checked ? '1' : '0');
        this.updateProgress();
      });
    });
  }
}
