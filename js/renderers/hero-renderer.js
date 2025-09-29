import { DOM } from '../utils/dom-utils.js';
import { TooltipManager } from '../managers/tooltip-manager.js';
import { VideoManager } from '../managers/video-manager.js';

/**
 * Renderizador del Hero (SRP - Single Responsibility Principle)
 * Responsable únicamente de renderizar y configurar la sección hero
 */
export class HeroRenderer {
  /**
   * Renderiza la sección hero con la configuración proporcionada
   * @param {Object} config - Configuración del hero
   */
  static render(config) {
    const heroLine = DOM.qs('#heroLine');
    const heroSub = DOM.qs('#heroSub');
    const heart = DOM.qs('.heart');
    
    heroLine.textContent = config.heroLine;
    heroLine.style.setProperty('--steps', String(config.heroLine.length || 30));
    heroLine.style.setProperty('--typing-duration', `${config.typingDurationMs || 3000}ms`);
    heroSub.textContent = config.heroSub;
    
    // Configurar corazón interactivo
    this.setupHeartInteraction(heart);
  }

  /**
   * Configura la interacción del corazón
   * @param {Element} heartElement - Elemento del corazón
   */
  static setupHeartInteraction(heartElement) {
    // Hacer el corazón clickeable
    heartElement.style.cursor = 'pointer';
    heartElement.setAttribute('role', 'button');
    heartElement.setAttribute('tabindex', '0');
    heartElement.setAttribute('aria-label', 'Toca para ver una sorpresa');
    
    // Evento de click (funciona para desktop y tap corto en móviles)
    heartElement.addEventListener('click', (e) => {
      // CRÍTICO: Limpiar tooltip antes de cualquier acción
      TooltipManager.hideTooltip();
      
      // En móviles, solo ejecutar si no fue un long press
      if (TooltipManager.isTouchDevice) {
        // Verificar si el tooltip estaba activo (indica long press)
        if (TooltipManager.activeTooltip) {
          e.preventDefault();
          return;
        }
      }
      
      // Pequeño delay para asegurar que el tooltip se haya limpiado
      setTimeout(() => {
        VideoManager.showVideo();
      }, 50);
    });
    
    // Evento de teclado
    heartElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        TooltipManager.hideTooltip();
        VideoManager.showVideo();
      }
    });
    
    // Tooltip con lógica inteligente
    TooltipManager.bindTooltipEvents(heartElement, 'Toca para ver una sorpresa ❤️');
  }
}
