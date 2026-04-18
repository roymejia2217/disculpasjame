/**
 * Centralized application constants.
 * Single source of truth for all configuration values.
 */

/** localStorage key prefixes for persisted state. */
export const STORAGE_KEYS = {
  LANGUAGE: 'app_language',
  COMMITMENT_PREFIX: 'apology_'
};

/** Animation and interaction timing values in milliseconds. */
export const TIMING = {
  TOOLTIP: {
    DESKTOP_DELAY: 300,
    MOBILE_DELAY: 200,
    LONG_PRESS_THRESHOLD: 500,
    AUTO_HIDE_DURATION: 3000,
    VIDEO_SHOW_DELAY: 50
  },
  TYPING_DURATION_MS: 3400,
  ANIMATION: {
    CARD_TRANSITION: 300,
    MODAL_TRANSITION: 300,
    TOOLTIP_TRANSITION: 200
  }
};

/** Tooltip dimension estimates used for viewport-aware positioning. */
export const TOOLTIP = {
  ESTIMATED_WIDTH: 200,
  ESTIMATED_HEIGHT: 40,
  VIEWPORT_MARGIN: 10,
  ARROW_SIZE: 5
};

/** Video asset path and MIME type. */
export const VIDEO = {
  PATH: 'files/video.mp4',
  TYPE: 'video/mp4'
};

/** WhatsApp deeplink configuration. */
export const WHATSAPP = {
  PHONE_NUMBER: '+593993686769'
};

/** Supported languages with display metadata. */
export const LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export const DEFAULT_LANGUAGE = 'es';

/** Per-card images mapped positionally to cards.items in translations. */
export const CARD_IMAGES = [
  { src: 'files/photo1.webp', alt: 'Photo' },
  { src: 'files/photo2.webp', alt: 'Photo' },
  { src: 'files/photo3.webp', alt: 'Photo' }
];

/** CSS selectors and class names used for DOM queries. */
export const SELECTORS = {
  APP: '#app',
  HERO_LINE: '#heroLine',
  HERO_SUB: '#heroSub',
  HEART: '.heart',
  CARDS: '#cards',
  COMMITMENTS_SECTION: '#commitmentsSection',
  COMMIT_TITLE: '#commitTitle',
  CK_LIST: '#ckList',
  PROGRESS: '#prog',
  PROG_TEXT: '#progText',
  CTA: '#cta',
  LANGUAGE_SWITCHER: '.language-switcher',
  MODAL_OVERLAY: '.modal-overlay',
  VIDEO_MODAL_OVERLAY: '.video-modal-overlay',
  MODAL_OPEN_CLASS: 'modal-open',
  VIDEO_MODAL_OPEN_CLASS: 'video-modal-open'
};