import { DOM } from '../utils/dom-utils.js';
import { ModalManager } from '../managers/modal-manager.js';
import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Renderizador de Cards (SRP - Single Responsibility Principle)
 * Responsable únicamente de renderizar las tarjetas
 */
export class CardRenderer {
  /**
   * Crea una tarjeta individual
   * @param {Object} cardData - Datos de la tarjeta {front, back}
   * @param {number} index - Índice de la tarjeta
   * @returns {Element}
   */
  static createCard({ front, back }, index) {
    const card = DOM.createElement('div', 'card');
    card.tabIndex = 0;
    card.setAttribute('aria-label', I18nManager.t('cards.cardAriaLabel', { title: front }));
    card.setAttribute('role', 'button');
    
    card.innerHTML = `
      <div class="card-content">
        <h3>${front}</h3>
        <div class="card-hint">${I18nManager.t('cards.cardHint')}</div>
      </div>
    `;
    
    // Evento de click/touch
    card.addEventListener('click', () => {
      ModalManager.show(front, back);
    });
    
    // Evento de teclado para accesibilidad
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    
    return card;
  }

  /**
   * Renderiza todas las tarjetas
   * @param {Array} cards - Array de objetos con front y back
   */
  static render(cards) {
    const container = DOM.qs('#cards');
    container.setAttribute('aria-label', I18nManager.t('cards.ariaLabel'));
    container.innerHTML = '';
    cards.forEach((card, index) => container.appendChild(this.createCard(card, index)));
  }
}
