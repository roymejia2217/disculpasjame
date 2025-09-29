/**
 * Traductions en Français
 * Structure hiérarchique pour une organisation logique
 */
export default {
  // Métadonnées
  meta: {
    title: "Je suis vraiment désolé",
    description: "Une nouvelle façon de demander pardon à ma petite amie Jessica.",
    lang: "fr"
  },

  // Section Hero
  hero: {
    title: "Je suis vraiment désolé",
    line: "Pourrais-tu me donner une autre chance ?",
    subtitle: "Du plus profond de mon cœur, je veux réparer complètement chaque erreur que j'ai commise, et te donner joie, paix et sécurité comme cela aurait toujours dû être, et devrait être.",
    heartTooltip: "Appuie pour voir une surprise ❤️",
    heartAriaLabel: "Appuie pour voir une surprise"
  },

  // Cartes
  cards: {
    ariaLabel: "Raisons et engagements",
    cardHint: "Appuie pour voir plus",
    cardAriaLabel: "{{title}}. Clique pour voir plus d'informations",
    items: [
      {
        front: "Transparence totale",
        back: "Vérité complète et en temps voulu, rien ne sera caché ou réduit au silence, tout sera toujours clair pour éviter les conflits."
      },
      {
        front: "Écouter et calme",
        back: "Pause, réfléchir, il n'y aura pas de place pour la colère, la rage ou les conclusions hâtives."
      },
      {
        front: "Foi et famille",
        back: "Se souvenir et honorer ce que nous avons appris : corriger à temps et marcher dans ce qui est juste, ensemble."
      }
    ]
  },

  // Engagements
  commitments: {
    title: "Mes engagements",
    progressAriaLabel: "Progrès des engagements",
    progressText: "{{completed}}/{{total}}",
    items: [
      "Remplir chaque condition que tu établis, sans excuses ni raccourcis.",
      "Être transparent à tout moment, sans exceptions.",
      "Écouter vraiment, baisser l'intensité et parler calmement.",
      "Chercher ton aide et ton opinion pour éviter de répéter les erreurs.",
      "Utiliser chaque jour et la force que Dieu me donne pour te montrer des changements réalistes et sincères."
    ],
    ctaText: "J'espère que tu peux comprendre mes aspirations avec toi :'(",
    ctaAlert: "Merci d'avoir pris le temps de le réviser. Pourrais-tu considérer ma proposition ? :'("
  },

  // Modales
  modal: {
    closeAriaLabel: "Fermer",
    closeButton: "Compris"
  },

  // Vidéo
  video: {
    ariaLabel: "Lecteur vidéo surprise",
    title: "Une surprise pour toi ❤️",
    closeAriaLabel: "Fermer la vidéo",
    playerAriaLabel: "Vidéo surprise",
    notSupported: "Votre navigateur ne prend pas en charge la lecture vidéo."
  },

  // WhatsApp
  whatsapp: {
    defaultMessage: "Je ne cesserai jamais de t'aimer ❤"
  },

  // Sélecteur de langue
  language: {
    selector: "Langue",
    current: "Français",
    available: [
      { code: "es", name: "Español", flag: "🇪🇸" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "fr", name: "Français", flag: "🇫🇷" }
    ]
  },

  // Configuration
  config: {
    typingDurationMs: 3400
  }
};
