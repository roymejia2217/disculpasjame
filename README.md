<p align="center">
  <img src="icons/favicon.ico" alt="disculpasjame" width="80" height="80" />
</p>

<h1 align="center">disculpasjame</h1>

<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img src="https://img.shields.io/badge/JS-Vanilla-yellow?style=flat&logo=javascript" alt="Vanilla JS" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
    <img src="https://img.shields.io/badge/HTML-5-orange?style=flat&logo=html5" alt="HTML5" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
    <img src="https://img.shields.io/badge/CSS-3-blue?style=flat&logo=css3" alt="CSS3" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">
    <img src="https://img.shields.io/badge/Storage-localStorage-green?style=flat" alt="localStorage" />
  </a>
  <a href="https://github.com/roymejia2217/disculpasjame/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  </a>
</p>

<p align="center">
  Multilingual apology SPA with media content, interactive commitments, and persistent state
</p>

---

## Quick Start

```bash
git clone https://github.com/roymejia2217/disculpasjame.git
cd disculpasjame
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser.

---

## Features

| Feature | Description |
|---------|-------------|
| **3-Language Support** | Dynamic switching between Spanish, English, and French with lazy-loaded translation modules |
| **Typewriter Hero** | Animated header text with CSS-driven typing effect and step count derived from content length |
| **Interactive Cards** | Three expandable cards, each opening a modal with a detail message and image |
| **Card Modal Images** | Per-card images loaded lazily inside the detail modal, with responsive layout and scrollable body |
| **Video Modal** | Heart element triggers a video overlay with MP4 playback, focus trap, and keyboard dismissal |
| **Commitments Checklist** | Eight persisted checkboxes stored in localStorage, surviving language switches and reloads |
| **Progress Bar** | Real-time completion counter with localized progress text |
| **WhatsApp CTA** | One-tap redirect to WhatsApp with a pre-filled localized message |
| **Tooltip System** | Desktop hover and mobile long-press tooltip with viewport-aware positioning and auto-hide |
| **Accessibility** | ARIA roles, focus traps on modals, keyboard navigation, reduced-motion support |
| **Modal Focus Trap** | Tab and Shift+Tab cycle within open modals; Escape closes them |
| **Language Persistence** | Selected language saved to localStorage and synced across tabs via the storage event |
| **CSS Custom Properties** | Design tokens for colors, radii, shadows, and spacing for consistent theming |

---

## Prerequisites

| Requirement | Purpose |
|--------------|---------|
| **Modern browser** | ES modules, CSS custom properties, WebP support |
| **HTTP server** | ES module imports require a server; `file://` will not work |

---

## Usage

1. **Language** - Top-right dropdown switches between Spanish, English, and French instantly
2. **Cards** - Click or press Enter on any card to see its detail message and image
3. **Heart** - Click the heart to open the surprise video modal
4. **Commitments** - Check off each promise; progress is saved automatically
5. **CTA** - The bottom button opens WhatsApp with a pre-filled message

---

## Project Structure

```
.
├── index.html                      # Single page entry point
├── styles.css                      # Global styles and CSS custom properties
├── files/
│   ├── photo1.webp                 # Card 1 image
│   ├── photo2.webp                 # Card 2 image
│   ├── photo3.webp                 # Card 3 image
│   └── video.mp4                   # Surprise video
├── icons/
│   └── favicon.ico                 # Site favicon
└── js/
    ├── app.js                      # DOMContentLoaded bootstrap
    ├── config/
    │   ├── constants.js            # Centralized configuration and selectors
    │   └── app-config.js           # Merges i18n data with constants into a single config object
    ├── core/
    │   └── app-controller.js        # Orchestrates initialization, render, and language re-render
    ├── i18n/
    │   ├── i18n-manager.js          # Translation resolution, caching, interpolation, and change notifications
    │   ├── language-detector.js     # Detects language from localStorage, browser, or default
    │   └── translations/
    │       ├── es.js                # Spanish translations
    │       ├── en.js                # English translations
    │       └── fr.js                # French translations
    ├── managers/
    │   ├── modal-manager.js         # Card detail modal with optional image
    │   ├── video-manager.js         # Video overlay modal
    │   ├── tooltip-manager.js       # Hover and long-press tooltip with viewport positioning
    │   ├── state-manager.js         # Checkbox persistence and progress updates
    │   └── whatsapp-manager.js      # WhatsApp deep-link generator
    ├── renderers/
    │   ├── hero-renderer.js         # Typewriter text, subtitle, and heart interaction
    │   ├── card-renderer.js         # Card grid with modal forwarding
    │   └── commitments-renderer.js   # Checklist rendering and CTA button binding
    ├── components/
    │   └── language-switcher.js     # Language dropdown with accessibility attributes
    └── utils/
        ├── dom-utils.js             # Shorthand wrappers for querySelector and createElement
        ├── device-utils.js          # Touch, mobile, reduced-motion, and connectivity detection
        ├── event-manager.js         # Event listener registry with keyed cleanup
        └── modal-utils.js           # Shared modal logic: open, close, focus trap, Escape handling
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.
