/**
 * Gestor de Eventos (SRP - Single Responsibility Principle)
 * Responsable únicamente de manejar la limpieza y gestión de eventos
 */
export class EventManager {
  static eventListeners = new Map();

  /**
   * Agrega un event listener con limpieza automática
   * @param {Element} element - Elemento DOM
   * @param {string} event - Tipo de evento
   * @param {Function} handler - Función manejadora
   * @param {string} key - Clave única para identificar el listener
   */
  static addCleanEventListener(element, event, handler, key) {
    // Remover listener anterior si existe
    this.removeEventListener(element, key);
    
    // Agregar nuevo listener
    element.addEventListener(event, handler);
    
    // Guardar referencia para limpieza futura
    this.eventListeners.set(key, {
      element,
      event,
      handler
    });
  }

  /**
   * Remueve un event listener específico
   * @param {Element} element - Elemento DOM
   * @param {string} key - Clave del listener
   */
  static removeEventListener(element, key) {
    const listener = this.eventListeners.get(key);
    if (listener && listener.element === element) {
      element.removeEventListener(listener.event, listener.handler);
      this.eventListeners.delete(key);
    }
  }

  /**
   * Limpia todos los event listeners de un elemento
   * @param {Element} element - Elemento DOM
   */
  static clearElementListeners(element) {
    for (const [key, listener] of this.eventListeners.entries()) {
      if (listener.element === element) {
        element.removeEventListener(listener.event, listener.handler);
        this.eventListeners.delete(key);
      }
    }
  }

  /**
   * Reemplaza un elemento y limpia sus listeners
   * @param {Element} oldElement - Elemento a reemplazar
   * @returns {Element} Nuevo elemento sin listeners
   */
  static replaceElement(oldElement) {
    // Limpiar listeners del elemento anterior
    this.clearElementListeners(oldElement);
    
    // Crear nuevo elemento
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    
    return newElement;
  }
}
