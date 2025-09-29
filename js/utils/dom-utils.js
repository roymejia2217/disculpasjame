/**
 * Utilidades DOM (DRY - Don't Repeat Yourself)
 * Funciones reutilizables para manipulación del DOM
 */
export const DOM = {
  /**
   * Query selector con contexto opcional
   * @param {string} selector - Selector CSS
   * @param {Element} context - Contexto de búsqueda (default: document)
   * @returns {Element|null}
   */
  qs: (selector, context = document) => context.querySelector(selector),
  
  /**
   * Query selector all con contexto opcional
   * @param {string} selector - Selector CSS
   * @param {Element} context - Contexto de búsqueda (default: document)
   * @returns {Array<Element>}
   */
  qsa: (selector, context = document) => Array.from(context.querySelectorAll(selector)),
  
  /**
   * Crear elemento con clase y contenido opcionales
   * @param {string} tag - Tag del elemento
   * @param {string} className - Clase CSS (opcional)
   * @param {string} content - Contenido de texto (opcional)
   * @returns {Element}
   */
  createElement: (tag, className = '', content = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }
};
