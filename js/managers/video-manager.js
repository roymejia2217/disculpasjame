import { DOM } from '../utils/dom-utils.js';
import { TooltipManager } from './tooltip-manager.js';

/**
 * Gestor de Video (SRP - Single Responsibility Principle)
 * Responsable únicamente de manejar la reproducción de video
 */
export class VideoManager {
  static VIDEO_PATH = 'files/video.mp4';
  static VIDEO_CONFIG = {
    width: 720,
    height: 720,
    duration: 38.42,
    aspectRatio: '1:1'
  };

  /**
   * Crea el modal de video
   * @returns {Element}
   */
  static createVideoModal() {
    const modal = DOM.createElement('div', 'video-modal-overlay');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-label', 'Reproductor de video sorpresa');
    
    modal.innerHTML = `
      <div class="video-modal-content">
        <div class="video-modal-header">
          <h2 class="video-modal-title">Una sorpresa para ti ❤️</h2>
          <button class="video-modal-close" aria-label="Cerrar video">&times;</button>
        </div>
        <div class="video-modal-body">
          <video class="video-player" controls preload="metadata" aria-label="Video sorpresa">
            <source src="${this.VIDEO_PATH}" type="video/mp4">
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
        <div class="video-modal-footer">
          <!-- Footer vacío - solo se usa el botón X del header -->
        </div>
      </div>
    `;
    
    return modal;
  }

  /**
   * Muestra el video
   */
  static showVideo() {
    // CRÍTICO: Limpiar tooltip antes de mostrar modal
    TooltipManager.hideTooltip();
    
    let modal = DOM.qs('.video-modal-overlay');
    if (!modal) {
      modal = this.createVideoModal();
      document.body.appendChild(modal);
    }
    
    // Mostrar modal
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
    document.body.classList.add('video-modal-open');
    
    // Enfocar el botón de cerrar
    DOM.qs('.video-modal-close', modal).focus();
    
    // Eventos de cierre
    this.bindVideoCloseEvents(modal);
  }

  /**
   * Oculta el video
   * @param {Element} modal - Elemento del modal de video
   */
  static hideVideo(modal) {
    const video = DOM.qs('.video-player', modal);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
    document.body.classList.remove('video-modal-open');
  }

  /**
   * Vincula los eventos de cierre del video
   * @param {Element} modal - Elemento del modal de video
   */
  static bindVideoCloseEvents(modal) {
    const closeBtn = DOM.qs('.video-modal-close', modal);
    const overlay = modal;
    
    const closeVideo = () => this.hideVideo(modal);
    
    closeBtn.addEventListener('click', closeVideo);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeVideo();
    });
    
    // Cerrar con Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeVideo();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }
}
