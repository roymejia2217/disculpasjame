/**
 * DOM utilities. Thin wrappers around querySelector and createElement
 * to reduce repetitive DOM boilerplate across the codebase.
 */
export const DOM = {
  /**
   * Shorthand for querySelector with optional context.
   * @param {string} selector
   * @param {Element} [context=document]
   * @returns {Element|null}
   */
  qs: (selector, context = document) => context.querySelector(selector),
  
  /**
   * Shorthand for querySelectorAll returning an Array.
   * @param {string} selector
   * @param {Element} [context=document]
   * @returns {Array<Element>}
   */
  qsa: (selector, context = document) => Array.from(context.querySelectorAll(selector)),
  
  /**
   * Shorthand for createElement with optional CSS class and text content.
   * @param {string} tag
   * @param {string} [className='']
   * @param {string} [content='']
   * @returns {Element}
   */
  createElement: (tag, className = '', content = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }
};
