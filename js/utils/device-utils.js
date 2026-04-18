/**
 * Device capability detection.
 * Single source for touch, mobile, motion, and connectivity checks.
 */
export const DeviceUtils = {
  isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  isOnline() {
    return navigator.onLine;
  }
};
