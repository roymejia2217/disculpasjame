import { DOM } from '../utils/dom-utils.js';
import { WhatsAppManager } from '../managers/whatsapp-manager.js';
import { EventManager } from '../utils/event-manager.js';

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
   * @param {Object} config - Configuración de compromisos
   */
  static render(config) {
    const list = DOM.qs('#ckList');
    const progress = DOM.qs('#prog');
    const progressText = DOM.qs('#progText');
    const ctaButton = DOM.qs('#cta');
    const title = DOM.qs('#commitTitle');
    
    // Actualizar título
    title.textContent = config.title;
    
    // Limpiar y renderizar lista
    list.innerHTML = '';
    config.items.forEach((text, i) => {
      list.appendChild(this.createCommitmentItem(text, i));
    });
    
    // Configurar progreso
    progress.max = config.items.length;
    progress.setAttribute('aria-label', config.progressAriaLabel);
    progressText.textContent = `0/${config.items.length}`;
    
    // Configurar CTA - Limpiar listeners anteriores y agregar nuevo
    this.setupCTAButton(ctaButton, config);
  }

  /**
   * Configura el botón CTA con manejo de eventos limpio (SRP)
   * @param {Element} button - Elemento del botón
   * @param {Object} config - Configuración de compromisos
   */
  static setupCTAButton(button, config) {
    // Reemplazar elemento y limpiar listeners anteriores
    const newButton = EventManager.replaceElement(button);
    
    // Configurar contenido
    newButton.textContent = config.ctaText;
    
    // Agregar nuevo event listener con clave única
    EventManager.addCleanEventListener(
      newButton, 
      'click', 
      () => {
        alert(config.ctaAlert);
        WhatsAppManager.redirectToWhatsApp();
      },
      'cta-button-click'
    );
  }
}
