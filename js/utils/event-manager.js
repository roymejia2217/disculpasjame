/**
 * Event listener registry with automatic cleanup.
 * Tracks listeners by key so they can be removed without
 * keeping explicit handler references throughout the codebase.
 */
export class EventManager {
  static eventListeners = new Map();

  /**
   * Add an event listener, replacing any previous listener
   * registered under the same key.
   */
  static addCleanEventListener(element, event, handler, key) {
    this.removeEventListener(element, key);
    element.addEventListener(event, handler);
    this.eventListeners.set(key, {
      element,
      event,
      handler
    });
  }

  /**
   * Remove a listener previously registered under the given key,
   * but only if the DOM element still matches.
   */
  static removeEventListener(element, key) {
    const listener = this.eventListeners.get(key);
    if (listener && listener.element === element) {
      element.removeEventListener(listener.event, listener.handler);
      this.eventListeners.delete(key);
    }
  }

  /**
   * Remove all tracked listeners bound to the given element.
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
   * Replace an element with a clone that carries no listeners.
   * Used when the only way to remove handlers is replacing the node.
   */
  static replaceElement(oldElement) {
    this.clearElementListeners(oldElement);
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    return newElement;
  }
}
