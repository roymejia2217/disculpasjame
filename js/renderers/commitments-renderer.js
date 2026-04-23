import { DOM } from '../utils/dom-utils.js';
import { WhatsAppManager } from '../managers/whatsapp-manager.js';
import { EventManager } from '../utils/event-manager.js';
import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Renders the commitments checklist and progress bar.
 * EventManager.replaceElement is used for the CTA button
 * to avoid stacking duplicate click listeners on re-render.
 */
export class CommitmentsRenderer {
  static createCommitmentItem(text, index) {
    const id = `c_${index + 1}`;
    const label = DOM.createElement('label', 'ck-item');

    label.innerHTML = `
      <input type="checkbox" id="${id}" data-key="${id}" />
      <span>${text}</span>
    `;

    return label;
  }

  static render(config) {
    const list = DOM.qs('#ckList');
    const progress = DOM.qs('#prog');
    const progressText = DOM.qs('#progText');
    const ctaButton = DOM.qs('#cta');
    const title = DOM.qs('#commitTitle');

    title.textContent = config.title;

    list.innerHTML = '';
    config.items.forEach((text, i) => {
      list.appendChild(this.createCommitmentItem(text, i));
    });

    progress.max = config.items.length;
    progress.setAttribute('aria-label', config.progressAriaLabel);
    progressText.textContent = I18nManager.t('commitments.progressText', {
      completed: 0,
      total: config.items.length
    });

    this.setupCTAButton(ctaButton, config);
  }

  static setupCTAButton(button, config) {
    const newButton = EventManager.replaceElement(button);
    newButton.textContent = config.ctaText;

    EventManager.addCleanEventListener(
      newButton,
      'click',
      () => {
        alert(config.ctaAlert);
        const checkboxes = DOM.qsa('.ck-list input[type="checkbox"]');
        const completed = checkboxes.filter(cb => cb.checked).length;
        const total = checkboxes.length;
        WhatsAppManager.redirectToWhatsApp(completed, total);
      },
      'cta-button-click'
    );
  }
}