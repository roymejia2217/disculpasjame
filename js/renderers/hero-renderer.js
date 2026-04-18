import { DOM } from '../utils/dom-utils.js';
import { DeviceUtils } from '../utils/device-utils.js';
import { TooltipManager } from '../managers/tooltip-manager.js';
import { VideoManager } from '../managers/video-manager.js';
import { TIMING } from '../config/constants.js';

/**
 * Renders and binds interaction on the hero section:
 * typewriter text, subtitle, and the heart element that
 * triggers the surprise video on click/keypress.
 * _heartBound prevents duplicate listener attachment on re-render.
 */
export class HeroRenderer {
  static _heartBound = false;

  static render(config) {
    const heroLine = DOM.qs('#heroLine');
    const heroSub = DOM.qs('#heroSub');
    const heart = DOM.qs('.heart');

    heroLine.textContent = config.line;
    heroLine.style.setProperty('--steps', String(config.line.length || 30));
    heroLine.style.setProperty('--typing-duration', `${config.typingDurationMs || TIMING.TYPING_DURATION_MS}ms`);
    heroSub.textContent = config.subtitle;

    this.setupHeartInteraction(heart, config);
  }

  static setupHeartInteraction(heartElement, config) {
    if (this._heartBound) return;
    this._heartBound = true;

    heartElement.style.cursor = 'pointer';
    heartElement.setAttribute('role', 'button');
    heartElement.setAttribute('tabindex', '0');
    heartElement.setAttribute('aria-label', config.heartAriaLabel);

    const handleClick = (e) => {
      TooltipManager.hideTooltip();
      if (DeviceUtils.isTouchDevice && TooltipManager.activeTooltip) {
        e.preventDefault();
        return;
      }
      setTimeout(() => {
        VideoManager.showVideo();
      }, TIMING.TOOLTIP.VIDEO_SHOW_DELAY);
    };

    const handleKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        TooltipManager.hideTooltip();
        VideoManager.showVideo();
      }
    };

    heartElement.addEventListener('click', handleClick);
    heartElement.addEventListener('keydown', handleKeydown);

    TooltipManager.bindTooltipEvents(heartElement, config.heartTooltip);
  }
}