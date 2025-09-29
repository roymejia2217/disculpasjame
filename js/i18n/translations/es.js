/**
 * Traducciones en Español (idioma base)
 * Estructura jerárquica para organización lógica
 */
export default {
  // Metadatos
  meta: {
    title: "Lo siento mucho",
    description: "Una nueva forma de pedir perdón a mi novia Jessica.",
    lang: "es"
  },

  // Sección Hero
  hero: {
    title: "Lo siento mucho",
    line: "¿Podrías darme otra oportunidad?",
    subtitle: "Desde lo más sincero de mi corazón, quiero reparar cada error que he cometido por completo, y darte alegría, paz y seguridad como siempre debió, y debe ser.",
    heartTooltip: "Toca para ver una sorpresa ❤️",
    heartAriaLabel: "Toca para ver una sorpresa"
  },

  // Tarjetas
  cards: {
    ariaLabel: "Razones y compromisos",
    cardHint: "Toca para ver más",
    cardAriaLabel: "{{title}}. Click para ver más información",
    items: [
      {
        front: "Transparencia total",
        back: "Verdad completa y a tiempo, nada quedará oculto o silenciado, todo estará siempre claro para evitar conflictos."
      },
      {
        front: "Escuchar y calma",
        back: "Pausar, pensar, no habrá lugar para rabia, enojos o conclusiones apuradas."
      },
      {
        front: "Fe y familia",
        back: "Recordar y honrar lo aprendido: corregir a tiempo y caminar en lo correcto, juntos."
      }
    ]
  },

  // Compromisos
  commitments: {
    title: "Mis compromisos",
    progressAriaLabel: "Progreso compromisos",
    progressText: "{{completed}}/{{total}}",
    items: [
      "Cumplir cada condición que establezcas, sin excusas ni atajos.",
      "Ser transparente en todo momento, sin excepciones.",
      "Escuchar de verdad, bajar la intensidad y hablar con calma.",
      "Buscar tu ayuda y tu opinión para no repetir errores.",
      "Usar cada día y la fuerza que Dios me da para demostrarte cambios realistas y sinceros."
    ],
    ctaText: "Espero que puedas comprender mis aspiraciones contigo :'(",
    ctaAlert: "Gracias por tomarte el tiempo de revisarlo. ¿Podrias considerar mi propuesta? :'("
  },

  // Modales
  modal: {
    closeAriaLabel: "Cerrar",
    closeButton: "Entendido"
  },

  // Video
  video: {
    ariaLabel: "Reproductor de video sorpresa",
    title: "Una sorpresa para ti ❤️",
    closeAriaLabel: "Cerrar video",
    playerAriaLabel: "Video sorpresa",
    notSupported: "Tu navegador no soporta la reproducción de video."
  },

  // WhatsApp
  whatsapp: {
    defaultMessage: "No dejaré de amarte jamás ❤"
  },

  // Selector de idioma
  language: {
    selector: "Idioma",
    current: "Español",
    available: [
      { code: "es", name: "Español", flag: "🇪🇸" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "fr", name: "Français", flag: "🇫🇷" }
    ]
  },

  // Configuración
  config: {
    typingDurationMs: 3400
  }
};
