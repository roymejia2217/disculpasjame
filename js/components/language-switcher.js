import { DOM } from '../utils/dom-utils.js';
import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Selector de Idioma (SRP - Single Responsibility Principle)
 * Responsable únicamente de renderizar y manejar el selector de idioma
 */
export class LanguageSwitcher {
  static element = null;

  /**
   * Renderiza el selector de idioma
   * @param {string} containerSelector - Selector del contenedor
   */
  static render(containerSelector = '.language-switcher') {
    const container = DOM.qs(containerSelector);
    if (!container) return;

    this.element = this.createSwitcher();
    container.appendChild(this.element);
    this.bindEvents();
    this.updateDisplay();
  }

  /**
   * Crea el elemento del selector
   * @returns {Element} Elemento del selector
   */
  static createSwitcher() {
    const switcher = DOM.createElement('div', 'language-switcher');
    switcher.setAttribute('role', 'combobox');
    switcher.setAttribute('aria-label', 'Selector de idioma');
    
    switcher.innerHTML = `
      <button class="language-btn" type="button" aria-expanded="false">
        <span class="language-flag"></span>
        <span class="language-name"></span>
        <span class="language-arrow">▼</span>
      </button>
      <ul class="language-menu" role="listbox" aria-hidden="true">
        <!-- Los idiomas se cargarán dinámicamente -->
      </ul>
    `;

    return switcher;
  }

  /**
   * Vincula los eventos del selector
   */
  static bindEvents() {
    const button = DOM.qs('.language-btn', this.element);
    const menu = DOM.qs('.language-menu', this.element);

    // Toggle del menú
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Cerrar menú con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });

    // Escuchar cambios de idioma
    I18nManager.onLanguageChange(() => {
      this.updateDisplay();
    });
  }

  /**
   * Actualiza la visualización del selector
   */
  static updateDisplay() {
    const currentLang = I18nManager.getCurrentLanguage();
    const availableLanguages = I18nManager.getAvailableLanguages();
    const currentLanguageInfo = availableLanguages.find(lang => lang.code === currentLang);

    if (currentLanguageInfo) {
      const flag = DOM.qs('.language-flag', this.element);
      const name = DOM.qs('.language-name', this.element);
      
      flag.textContent = currentLanguageInfo.flag;
      name.textContent = currentLanguageInfo.name;
    }

    this.updateMenu();
  }

  /**
   * Actualiza el menú de idiomas
   */
  static updateMenu() {
    const menu = DOM.qs('.language-menu', this.element);
    const availableLanguages = I18nManager.getAvailableLanguages();
    const currentLang = I18nManager.getCurrentLanguage();

    menu.innerHTML = '';

    availableLanguages.forEach(language => {
      const item = DOM.createElement('li', 'language-item');
      item.setAttribute('role', 'option');
      item.setAttribute('data-language', language.code);
      
      if (language.code === currentLang) {
        item.setAttribute('aria-selected', 'true');
        item.classList.add('selected');
      }

      item.innerHTML = `
        <span class="language-flag">${language.flag}</span>
        <span class="language-name">${language.name}</span>
      `;

      item.addEventListener('click', () => {
        this.selectLanguage(language.code);
      });

      menu.appendChild(item);
    });
  }

  /**
   * Selecciona un idioma
   * @param {string} languageCode - Código del idioma
   */
  static async selectLanguage(languageCode) {
    if (languageCode === I18nManager.getCurrentLanguage()) {
      this.closeMenu();
      return;
    }

    try {
      await I18nManager.changeLanguage(languageCode);
      this.closeMenu();
    } catch (error) {
      console.error('Error al cambiar idioma:', error);
    }
  }

  /**
   * Abre/cierra el menú
   */
  static toggleMenu() {
    const isOpen = this.element.classList.contains('open');
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Abre el menú
   */
  static openMenu() {
    this.element.classList.add('open');
    DOM.qs('.language-btn', this.element).setAttribute('aria-expanded', 'true');
    DOM.qs('.language-menu', this.element).setAttribute('aria-hidden', 'false');
  }

  /**
   * Cierra el menú
   */
  static closeMenu() {
    this.element.classList.remove('open');
    DOM.qs('.language-btn', this.element).setAttribute('aria-expanded', 'false');
    DOM.qs('.language-menu', this.element).setAttribute('aria-hidden', 'true');
  }
}
