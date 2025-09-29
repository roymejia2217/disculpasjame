import { DOM } from '../utils/dom-utils.js';

/**
 * Gestor de Tooltip Inteligente y Responsivo (SRP - Single Responsibility Principle)
 * Responsable únicamente de manejar los tooltips de la aplicación
 */
export class TooltipManager {
  static isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  static isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  static activeTooltip = null;
  static tooltipTimeout = null;

  /**
   * Crea un tooltip
   * @param {string} text - Texto del tooltip
   * @param {Element} targetElement - Elemento objetivo
   * @returns {Element}
   */
  static createTooltip(text, targetElement) {
    const tooltip = DOM.createElement('div', 'tooltip');
    tooltip.textContent = text;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    
    // Posicionamiento inteligente y responsivo
    this.positionTooltip(tooltip, targetElement);
    
    return tooltip;
  }

  /**
   * Posiciona el tooltip de manera inteligente
   * @param {Element} tooltip - Elemento del tooltip
   * @param {Element} targetElement - Elemento objetivo
   */
  static positionTooltip(tooltip, targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const tooltipRect = { width: 200, height: 40 }; // Estimación inicial
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset
    };

    // Calcular posición ideal
    let top = rect.top - tooltipRect.height - 10;
    let left = rect.left + (rect.width / 2);

    // Ajustar si se sale del viewport horizontalmente
    if (left - tooltipRect.width / 2 < 10) {
      left = 10 + tooltipRect.width / 2;
    } else if (left + tooltipRect.width / 2 > viewport.width - 10) {
      left = viewport.width - 10 - tooltipRect.width / 2;
    }

    // Ajustar si se sale del viewport verticalmente
    if (top < 10) {
      top = rect.bottom + 10; // Mostrar abajo
      tooltip.classList.add('tooltip-below');
    }

    // Aplicar posición
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.transform = 'translateX(-50%)';
  }

  /**
   * Muestra un tooltip
   * @param {string} text - Texto del tooltip
   * @param {Element} targetElement - Elemento objetivo
   * @returns {Element|null}
   */
  static showTooltip(text, targetElement) {
    // CRÍTICO: No mostrar tooltip si hay modales activos
    if (this.hasActiveModals()) {
      return null;
    }
    
    this.hideTooltip(); // Limpiar tooltip existente
    
    const tooltip = this.createTooltip(text, targetElement);
    document.body.appendChild(tooltip);
    this.activeTooltip = tooltip;
    
    // Mostrar con delay adaptativo
    const delay = this.isMobile ? 200 : 100;
    setTimeout(() => {
      if (tooltip.parentNode && !this.hasActiveModals()) {
        tooltip.classList.add('active');
        tooltip.setAttribute('aria-hidden', 'false');
      }
    }, delay);
    
    return tooltip;
  }

  /**
   * Oculta el tooltip activo
   */
  static hideTooltip() {
    if (this.activeTooltip) {
      this.activeTooltip.remove();
      this.activeTooltip = null;
    }
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }
  }

  /**
   * Verifica si hay modales activos
   * @returns {boolean}
   */
  static hasActiveModals() {
    // Verificar si hay modales activos
    const videoModal = DOM.qs('.video-modal-overlay.active');
    const regularModal = DOM.qs('.modal-overlay.active');
    return !!(videoModal || regularModal);
  }

  /**
   * Vincula los eventos de tooltip a un elemento
   * @param {Element} element - Elemento objetivo
   * @param {string} text - Texto del tooltip
   */
  static bindTooltipEvents(element, text) {
    let showTimeout;
    let hideTimeout;
    let touchStartTime;
    let isLongPress = false;
    
    // Eventos para desktop (mouse)
    if (!this.isTouchDevice) {
      element.addEventListener('mouseenter', () => {
        showTimeout = setTimeout(() => {
          this.showTooltip(text, element);
        }, 300); // Delay reducido para mejor UX
      });
      
      element.addEventListener('mouseleave', () => {
        clearTimeout(showTimeout);
        this.hideTooltip();
      });
    }
    
    // Eventos para móviles (touch) - Lógica inteligente
    if (this.isTouchDevice) {
      element.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
        isLongPress = false;
        
        // Iniciar timer para long press (tooltip)
        showTimeout = setTimeout(() => {
          isLongPress = true;
          element.classList.add('long-press'); // Feedback visual
          this.showTooltip(text, element);
          
          // Ocultar tooltip después de 3 segundos
          hideTimeout = setTimeout(() => {
            this.hideTooltip();
            element.classList.remove('long-press');
          }, 3000);
        }, 500); // 500ms para considerar long press
      });
      
      element.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        
        // Si fue un tap corto (menos de 500ms), no mostrar tooltip
        if (touchDuration < 500 && !isLongPress) {
          clearTimeout(showTimeout);
          // No hacer preventDefault para permitir el click normal
          return;
        }
        
        // Si fue long press, prevenir el click
        if (isLongPress) {
          e.preventDefault();
        }
      });
      
      element.addEventListener('touchcancel', () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        isLongPress = false;
        element.classList.remove('long-press');
      });
    }
    
    // Eventos de teclado para accesibilidad
    element.addEventListener('focus', () => {
      this.showTooltip(text, element);
    });
    
    element.addEventListener('blur', () => {
      this.hideTooltip();
    });
    
    // Ocultar tooltip al hacer scroll o redimensionar
    window.addEventListener('scroll', () => this.hideTooltip(), { passive: true });
    window.addEventListener('resize', () => this.hideTooltip(), { passive: true });
    
    // Ocultar tooltip cuando se abren modales (medida adicional de seguridad)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.modal-overlay, .video-modal-overlay')) {
        this.hideTooltip();
      }
    });
  }
}
