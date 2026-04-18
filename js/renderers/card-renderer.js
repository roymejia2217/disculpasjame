import { DOM } from '../utils/dom-utils.js';
import { ModalManager } from '../managers/modal-manager.js';
import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Renders the cards grid. Each card opens the detail modal
 * on click/keypress, forwarding optional imageUrl/imageAlt so
 * the modal can display a per-card image.
 */
export class CardRenderer {
  static createCard({ front, back, imageUrl, imageAlt }, index) {
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
    
    card.addEventListener('click', () => {
      ModalManager.show({ title: front, message: back, imageUrl, imageAlt });
    });
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    
    return card;
  }

  static render(cards) {
    const container = DOM.qs('#cards');
    container.setAttribute('aria-label', I18nManager.t('cards.ariaLabel'));
    container.innerHTML = '';
    cards.forEach((card, index) => container.appendChild(this.createCard(card, index)));
  }
}