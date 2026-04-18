import { DOM } from '../utils/dom-utils.js';
import { I18nManager } from '../i18n/i18n-manager.js';

/**
 * Language dropdown that allows switching between available languages.
 * Listens to I18nManager.onLanguageChange so it stays in sync
 * when the language is changed externally (e.g. from another tab).
 */
export class LanguageSwitcher {
  static element = null;

  static render(containerSelector = '.language-switcher') {
    const container = DOM.qs(containerSelector);
    if (!container) return;

    this.element = this.createSwitcher();
    container.appendChild(this.element);
    this.bindEvents();
    this.updateDisplay();
  }

  static createSwitcher() {
    const switcher = DOM.createElement('div', 'language-switcher');
    switcher.setAttribute('role', 'combobox');
    switcher.setAttribute('aria-label', I18nManager.t('language.selector'));

    switcher.innerHTML = `
      <button class="language-btn" type="button" aria-expanded="false">
        <span class="language-flag"></span>
        <span class="language-name"></span>
        <span class="language-arrow">&#9660;</span>
      </button>
      <ul class="language-menu" role="listbox" aria-hidden="true">
      </ul>
    `;

    return switcher;
  }

  static bindEvents() {
    const button = DOM.qs('.language-btn', this.element);
    const menu = DOM.qs('.language-menu', this.element);

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target)) {
        this.closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });

    I18nManager.onLanguageChange(() => {
      this.updateDisplay();
    });
  }

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

  static async selectLanguage(languageCode) {
    if (languageCode === I18nManager.getCurrentLanguage()) {
      this.closeMenu();
      return;
    }

    try {
      await I18nManager.changeLanguage(languageCode);
      this.closeMenu();
    } catch (error) {
      console.error('Language change error:', error);
    }
  }

  static toggleMenu() {
    const isOpen = this.element.classList.contains('open');
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  static openMenu() {
    this.element.classList.add('open');
    DOM.qs('.language-btn', this.element).setAttribute('aria-expanded', 'true');
    DOM.qs('.language-menu', this.element).setAttribute('aria-hidden', 'false');
  }

  static closeMenu() {
    this.element.classList.remove('open');
    DOM.qs('.language-btn', this.element).setAttribute('aria-expanded', 'false');
    DOM.qs('.language-menu', this.element).setAttribute('aria-hidden', 'true');
  }
}