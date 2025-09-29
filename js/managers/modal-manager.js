import { DOM } from '../utils/dom-utils.js';

/**
 * Gestor de Modales (SRP - Single Responsibility Principle)
 * Responsable únicamente de manejar los modales de la aplicación
 */
export class ModalManager {
  /**
   * Crea un modal básico
   * @returns {Element}
   */
  static createModal() {
    const modal = DOM.createElement('div', 'modal-overlay');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button class="modal-close" aria-label="Cerrar">&times;</button>
        </div>
        <div class="modal-body">
          <p class="modal-message"></p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn modal-btn-primary">Entendido</button>
        </div>
      </div>
    `;
    
    return modal;
  }

  /**
   * Muestra un modal con título y mensaje
   * @param {string} title - Título del modal
   * @param {string} message - Mensaje del modal
   */
  static show(title, message) {
    // Crear modal si no existe
    let modal = DOM.qs('.modal-overlay');
    if (!modal) {
      modal = this.createModal();
      document.body.appendChild(modal);
    }
    
    // Configurar contenido
    DOM.qs('.modal-title', modal).textContent = title;
    DOM.qs('.modal-message', modal).textContent = message;
    
    // Mostrar modal
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Enfocar el botón de cerrar
    DOM.qs('.modal-close', modal).focus();
    
    // Eventos de cierre
    this.bindCloseEvents(modal);
  }

  /**
   * Oculta un modal
   * @param {Element} modal - Elemento del modal
   */
  static hide(modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  /**
   * Vincula los eventos de cierre del modal
   * @param {Element} modal - Elemento del modal
   */
  static bindCloseEvents(modal) {
    const closeBtn = DOM.qs('.modal-close', modal);
    const primaryBtn = DOM.qs('.modal-btn-primary', modal);
    const overlay = modal;
    
    const closeModal = () => this.hide(modal);
    
    closeBtn.addEventListener('click', closeModal);
    primaryBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    
    // Cerrar con Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }
}
