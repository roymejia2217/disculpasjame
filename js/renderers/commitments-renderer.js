import { DOM } from '../utils/dom-utils.js';
import { WhatsAppManager } from '../managers/whatsapp-manager.js';

/**
 * Renderizador de Compromisos (SRP - Single Responsibility Principle)
 * Responsable únicamente de renderizar la sección de compromisos
 */
export class CommitmentsRenderer {
  /**
   * Crea un elemento de compromiso individual
   * @param {string} text - Texto del compromiso
   * @param {number} index - Índice del compromiso
   * @returns {Element}
   */
  static createCommitmentItem(text, index) {
    const id = `c_${index + 1}`;
    const label = DOM.createElement('label', 'ck-item');
    
    label.innerHTML = `
      <input type="checkbox" id="${id}" data-key="${id}" />
      <span>${text}</span>
    `;
    
    return label;
  }

  /**
   * Renderiza la sección de compromisos
   * @param {Array} commitments - Array de textos de compromisos
   * @param {string} ctaText - Texto del botón CTA
   * @param {string} ctaAlert - Mensaje de alerta del CTA
   */
  static render(commitments, ctaText, ctaAlert) {
    const list = DOM.qs('#ckList');
    const progress = DOM.qs('#prog');
    const progressText = DOM.qs('#progText');
    const ctaButton = DOM.qs('#cta');
    
    // Limpiar y renderizar lista
    list.innerHTML = '';
    commitments.forEach((text, i) => {
      list.appendChild(this.createCommitmentItem(text, i));
    });
    
    // Configurar progreso
    progress.max = commitments.length;
    progressText.textContent = `0/${commitments.length}`;
    
    // Configurar CTA
    ctaButton.textContent = ctaText;
    ctaButton.addEventListener('click', () => {
      alert(ctaAlert);
      WhatsAppManager.redirectToWhatsApp();
    });
  }
}
