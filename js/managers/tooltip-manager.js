import { DOM } from '../utils/dom-utils.js';
import { DeviceUtils } from '../utils/device-utils.js';
import { TIMING } from '../config/constants.js';

/**
 * Manages tooltip positioning, show/hide timing, and input modes.
 * Handles both mouse hover (desktop) and long-press (touch) patterns.
 * Global listeners for scroll, resize, and modal clicks auto-hide the
 * tooltip to prevent it from floating off-target.
 */
export class TooltipManager {
  static activeTooltip = null;
  static tooltipTimeout = null;
  static _globalListenersBound = false;

  static createTooltip(text, targetElement) {
    const tooltip = DOM.createElement('div', 'tooltip');
    tooltip.textContent = text;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('aria-hidden', 'true');
    this.positionTooltip(tooltip, targetElement);
    return tooltip;
  }

  /** Position above the target by default; flip below when too close to viewport top. */
  static positionTooltip(tooltip, targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let top = rect.top - TOOLTIP.ESTIMATED_HEIGHT - 10;
    let left = rect.left + (rect.width / 2);

    if (left - TOOLTIP.ESTIMATED_WIDTH / 2 < TOOLTIP.VIEWPORT_MARGIN) {
      left = TOOLTIP.VIEWPORT_MARGIN + TOOLTIP.ESTIMATED_WIDTH / 2;
    } else if (left + TOOLTIP.ESTIMATED_WIDTH / 2 > viewport.width - TOOLTIP.VIEWPORT_MARGIN) {
      left = viewport.width - TOOLTIP.VIEWPORT_MARGIN - TOOLTIP.ESTIMATED_WIDTH / 2;
    }

    if (top < TOOLTIP.VIEWPORT_MARGIN) {
      top = rect.bottom + 10;
      tooltip.classList.add('tooltip-below');
    }

    tooltip.style.position = 'fixed';
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.transform = 'translateX(-50%)';
  }

  static showTooltip(text, targetElement) {
    if (this.hasActiveModals()) return null;
    this.hideTooltip();

    const tooltip = this.createTooltip(text, targetElement);
    document.body.appendChild(tooltip);
    this.activeTooltip = tooltip;

    const delay = DeviceUtils.isMobile ? TIMING.TOOLTIP.MOBILE_DELAY : TIMING.TOOLTIP.DESKTOP_DELAY;
    this.tooltipTimeout = setTimeout(() => {
      if (tooltip.parentNode && !this.hasActiveModals()) {
        tooltip.classList.add('active');
        tooltip.setAttribute('aria-hidden', 'false');
      }
    }, delay);

    return tooltip;
  }

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

  static hasActiveModals() {
    return !!(DOM.qs('.video-modal-overlay.active') || DOM.qs('.modal-overlay.active'));
  }

  /** Bind hover, touch, and focus tooltip events to an element.
   *  On desktop: mouseenter/mouseleave with a delay.
   *  On touch: long-press shows, auto-hides after a duration.
   *  Focus/blur works on both input modes for keyboard accessibility. */
  static bindTooltipEvents(element, text) {
    if (element._tooltipBound) return;
    element._tooltipBound = true;

    let showTimeout;
    let hideTimeout;
    let touchStartTime;
    let isLongPress = false;

    if (!DeviceUtils.isTouchDevice) {
      const handleMouseEnter = () => {
        showTimeout = setTimeout(() => {
          this.showTooltip(text, element);
        }, TIMING.TOOLTIP.DESKTOP_DELAY);
      };
      const handleMouseLeave = () => {
        clearTimeout(showTimeout);
        this.hideTooltip();
      };
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    if (DeviceUtils.isTouchDevice) {
      const handleTouchStart = (e) => {
        touchStartTime = Date.now();
        isLongPress = false;
        showTimeout = setTimeout(() => {
          isLongPress = true;
          element.classList.add('long-press');
          this.showTooltip(text, element);
          hideTimeout = setTimeout(() => {
            this.hideTooltip();
            element.classList.remove('long-press');
          }, TIMING.TOOLTIP.AUTO_HIDE_DURATION);
        }, TIMING.TOOLTIP.LONG_PRESS_THRESHOLD);
      };
      const handleTouchEnd = (e) => {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < TIMING.TOOLTIP.LONG_PRESS_THRESHOLD && !isLongPress) {
          clearTimeout(showTimeout);
          return;
        }
        if (isLongPress) {
          e.preventDefault();
        }
      };
      const handleTouchCancel = () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
        isLongPress = false;
        element.classList.remove('long-press');
      };
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchend', handleTouchEnd);
      element.addEventListener('touchcancel', handleTouchCancel);
    }

    const handleFocus = () => { this.showTooltip(text, element); };
    const handleBlur = () => { this.hideTooltip(); };
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    if (!this._globalListenersBound) {
      this._globalListenersBound = true;
      const handleScroll = () => this.hideTooltip();
      const handleResize = () => this.hideTooltip();
      const handleDocClick = (e) => {
        if (e.target.closest('.modal-overlay, .video-modal-overlay')) {
          this.hideTooltip();
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      document.addEventListener('click', handleDocClick);
    }
  }
}