import { CONFIG } from '../config/app-config.js';
import { HeroRenderer } from '../renderers/hero-renderer.js';
import { CardRenderer } from '../renderers/card-renderer.js';
import { CommitmentsRenderer } from '../renderers/commitments-renderer.js';
import { StateManager } from '../managers/state-manager.js';

/**
 * Controlador Principal (SRP - Single Responsibility Principle)
 * Responsable únicamente de coordinar la inicialización de la aplicación
 */
export class AppController {
  /**
   * Inicializa la aplicación
   */
  static initialize() {
    this.setupAccessibility();
    this.render();
    this.bindEvents();
  }

  /**
   * Configura la accesibilidad
   */
  static setupAccessibility() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  /**
   * Renderiza todos los componentes
   */
  static render() {
    HeroRenderer.render(CONFIG);
    CardRenderer.render(CONFIG.cards);
    CommitmentsRenderer.render(CONFIG.commitments, CONFIG.ctaText, CONFIG.ctaAlert);
  }

  /**
   * Vincula los eventos de la aplicación
   */
  static bindEvents() {
    StateManager.loadState();
    StateManager.bindCommitments();
  }
}
