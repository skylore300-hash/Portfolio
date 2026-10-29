const navToggleClose = document.getElementById("navToggleClose");
const navToggleOpen = document.getElementById("navToggleOpen");
const navMenuToggle = document.getElementById("navMenuToggle");
const langToggle = document.getElementById("langToggle");

const translations = {
  fr: {
    homeTitle: "Portfolio - Sierra Kaluba",
    projectsTitle: "Portfolio - Sierra Kaluba | Projets",
    navHome: "Accueil",
    navProjects: "Projets",
    navSkills: "Compétences",
    navAbout: "À propos",
    navContact: "Contact",
    menuButton: "Menu",
    openNavAria: "Ouvrir la navigation",
    closeNavAria: "Fermer la navigation",
    langToggleToEn: "English",
    langToggleToFr: "Français",
    heroRole: "Développeur backend & web",
    heroSubtitle: "Je crée des expériences web modernes, rapides et propres.",
    heroCtaProjects: "Voir mes projets",
    heroCtaContact: "Contact",
    heroRightSubtitle: "Introuvable.",
    projectsSectionTitle: "Mes projets",
    skillsSectionTitle: "Technologies",
    skillHtmlText: "Structure sémantique et accessibilité.",
    skillCssText: "Design responsive et utilities Tailwind.",
    skillJsText: "Interactions, animations et logique client.",
    skillNodeText: "APIs rapides et écosystème npm.",
    skillPythonText: "Backend, data et scripts.",
    skillPhpText: "Langage serveur et écosystème PHP.",
    skillLaravelText: "Framework PHP pour applications web.",
    skillTailwindText: "Framework CSS utility-first.",
    skillGitText: "Versioning et collaboration.",
    skillCppText: "Bases du langage et syntaxe.",
    aboutKicker: "MON APPROCHE",
    aboutHeading: "Je transforme les idées en expériences web utiles.",
    aboutText: "Je suis développeur backend et web. J’aime relier un code solide à des interfaces claires, rapides et agréables à utiliser. Chaque projet est l’occasion de transformer une idée en quelque chose de concret.",
    aboutValueOne: "Une base technique solide",
    aboutValueTwo: "Une interface pensée pour les gens",
    aboutValueThree: "Le souci du détail à chaque étape",
    aboutPhotoRole: "Backend & Web Developer",
    contactEyebrow: "ON PASSE À LA SUITE ?",
    contactTitle: "Un projet en tête ? Parlons-en.",
    contactLead: "Décris-moi ton idée, ton besoin ou l’opportunité que tu souhaites partager. Je te répondrai directement par e-mail.",
    contactEmailLabel: "M’écrire directement",
    contactGithubLabel: "Découvrir mon travail",
    contactFormStep: "UN PREMIER MESSAGE",
    contactFormTitle: "Parlons de ton projet",
    contactFormLead: "Quelques détails suffisent pour commencer.",
    contactPrivacyNote: "Tes coordonnées servent uniquement à répondre à ton message.",
    contactSending: "Envoi en cours…",
    contactSuccess: "Ton message a bien été envoyé. Merci !",
    contactSendError: "Impossible d’envoyer ton message. Réessaie ou écris-moi directement.",
    followTitle: "Réseaux sociaux",
    formName: "Ton nom",
    formEmail: "Adresse e-mail",
    formPhone: "Téléphone",
    formSubject: "Sujet du projet (facultatif)",
    formMessage: "Parle-moi de ton projet",
    sendMessageButton: "Envoyer le message",
    footerDescription: "Je conçois des expériences web utiles, soignées et pensées pour durer.",
    footerBrand: "Sierra Kaluba",
    footerMeta: "Développeur web & backend",
    footerContact: "Parlons de ton projet",
    footerHome: "Accueil",
    footerAbout: "À propos",
    footerProjects: "Projets",
    footerBackTop: "Retour en haut ↑",
    projectsPageTitle: "Retrouve tous mes projets sur GitHub.",
    projectsPageEyebrow: "MES PROJETS, MON CODE",
    viewGitHubProjects: "Voir mes projets sur GitHub"
  },
  en: {
    homeTitle: "Portfolio - Sierra Kaluba",
    projectsTitle: "Portfolio - Sierra Kaluba | Projects",
    navHome: "Home",
    navProjects: "Projects",
    navSkills: "Skills",
    navAbout: "About",
    navContact: "Contact",
    menuButton: "Menu",
    openNavAria: "Open navigation",
    closeNavAria: "Close navigation",
    langToggleToEn: "English",
    langToggleToFr: "French",
    heroRole: "Backend & Web Developer",
    heroSubtitle: "I build modern, fast, and polished web experiences.",
    heroCtaProjects: "See my projects",
    heroCtaContact: "Contact",
    heroRightSubtitle: "Not found.",
    projectsSectionTitle: "My projects",
    skillsSectionTitle: "Technologies",
    skillHtmlText: "Semantic structure and accessibility.",
    skillCssText: "Responsive design and Tailwind utilities.",
    skillJsText: "Interactions, animations, and client-side logic.",
    skillNodeText: "Fast APIs and the npm ecosystem.",
    skillPythonText: "Backend, data, and scripts.",
    skillPhpText: "Server-side language and PHP ecosystem.",
    skillLaravelText: "PHP framework for web applications.",
    skillTailwindText: "Utility-first CSS framework.",
    skillGitText: "Versioning and collaboration.",
    skillCppText: "Language basics and syntax.",
    aboutKicker: "MY APPROACH",
    aboutHeading: "I turn ideas into useful web experiences.",
    aboutText: "I’m a backend and web developer. I enjoy connecting solid code with clear, fast, and pleasant interfaces. Every project is a chance to turn an idea into something real.",
    aboutValueOne: "A solid technical foundation",
    aboutValueTwo: "Interfaces made for people",
    aboutValueThree: "Care for detail at every step",
    aboutPhotoRole: "Backend & Web Developer",
    contactEyebrow: "LET’S MAKE IT HAPPEN",
    contactTitle: "Have a project in mind? Let’s talk.",
    contactLead: "Tell me about your idea, what you need, or an opportunity you’d like to share. I’ll reply directly by email.",
    contactEmailLabel: "Email me directly",
    contactGithubLabel: "Explore my work",
    contactFormStep: "A FIRST MESSAGE",
    contactFormTitle: "Tell me about your project",
    contactFormLead: "A few details are enough to get started.",
    contactPrivacyNote: "Your details are only used to reply to your message.",
    contactSending: "Sending your message…",
    contactSuccess: "Your message has been sent. Thank you!",
    contactSendError: "Your message could not be sent. Try again or email me directly.",
    followTitle: "Social links",
    formName: "Your name",
    formEmail: "Email",
    formPhone: "Phone",
    formSubject: "Project subject (optional)",
    formMessage: "Tell me about your project",
    sendMessageButton: "Send message",
    footerDescription: "I build useful, polished web experiences designed to last.",
    footerBrand: "Sierra Kaluba",
    footerMeta: "Web & Backend Developer",
    footerContact: "Let’s talk about your project",
    footerHome: "Home",
    footerAbout: "About",
    footerProjects: "Projects",
    footerBackTop: "Back to top ↑",
    projectsPageTitle: "Find all my projects on GitHub.",
    projectsPageEyebrow: "MY PROJECTS, MY CODE",
    viewGitHubProjects: "View my projects on GitHub"
  }
};

function getStoredLanguage() {
  return localStorage.getItem("site-lang") || "fr";
}

function syncToggleLabels(language) {
  if (langToggle) {
    const langLabel = language === "fr" ? "langToggleToEn" : "langToggleToFr";
    const langSpan = langToggle.querySelector(".side-control-label");
    const langIcon = langToggle.querySelector(".side-nav-icon");
    if (langSpan) {
      langSpan.textContent = translations[language][langLabel];
    }
    if (langIcon) {
      langIcon.textContent = language === "fr" ? "FR" : "EN";
    }
    langToggle.dataset.lang = language;
    langToggle.setAttribute("aria-pressed", language === "en" ? "true" : "false");
  }
}

function applyLanguage(language, persist = true) {
  const nextLanguage = language === "en" ? "en" : "fr";

  document.documentElement.lang = nextLanguage;
  document.body.dataset.lang = nextLanguage;
  if (persist) {
    localStorage.setItem("site-lang", nextLanguage);
  }

  const pageKey = document.body.dataset.page === "projects" ? "projectsTitle" : "homeTitle";
  const translatedTitle = translations[nextLanguage][pageKey];
  if (translatedTitle) {
    document.title = translatedTitle;
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translatedText = translations[nextLanguage][key];
    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    const translatedLabel = translations[nextLanguage][key];
    if (translatedLabel) {
      element.setAttribute("aria-label", translatedLabel);
    }
  });

    syncToggleLabels(nextLanguage);
}

applyLanguage(getStoredLanguage(), false);

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const nextLanguage = getStoredLanguage() === "fr" ? "en" : "fr";
    applyLanguage(nextLanguage);
  });
}

if (navToggleClose && navToggleOpen) {
  navToggleClose.addEventListener("click", (event) => {
    // Prevent the click from bubbling to the logo (which also toggles expansion)
    event.stopPropagation();

    // If expanded panel is open on desktop, close it first
    if (document.body.classList.contains("side-expanded")) {
      document.body.classList.remove("side-expanded");
      return;
    }

    if (window.innerWidth <= 768) {
      document.body.classList.remove("mobile-nav-open");
    } else {
      // toggle collapsed state on desktop
      document.body.classList.add("nav-collapsed");
    }
  });

  navToggleOpen.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const isOpen = document.body.classList.toggle("mobile-nav-open");
      // update button state
      navToggleOpen.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const span = navToggleOpen.querySelector('span');
      if (span) span.textContent = isOpen ? translations[getStoredLanguage()].closeNavAria || 'Fermer' : translations[getStoredLanguage()].menuButton || 'Menu';
    } else {
      document.body.classList.remove("nav-collapsed");
    }
  });
}

const links = document.querySelectorAll("a[href^='#']");
const closeNavMenu = () => {
  document.body.classList.remove("nav-menu-open");
  navMenuToggle?.setAttribute("aria-expanded", "false");
};

if (navMenuToggle) {
  navMenuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = document.body.classList.toggle("nav-menu-open");
    navMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.addEventListener("click", (event) => {
  if (document.body.classList.contains("nav-menu-open") && !event.target.closest(".side-nav")) {
    closeNavMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavMenu();
});

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#") || targetId === "#") {
      return;
    }
    const target = document.getElementById(targetId.slice(1));
    if (!target) {
      return;
    }
    event.preventDefault();
    if (link.classList.contains("side-nav-item")) {
      document.querySelectorAll(".side-nav-item").forEach((item) => item.classList.remove("is-active"));
      link.classList.add("is-active");
      closeNavMenu();
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (document.body.classList.contains("nav-collapsed")) {
      document.body.classList.remove("nav-collapsed");
    }
    if (document.body.classList.contains("mobile-nav-open")) {
      document.body.classList.remove("mobile-nav-open");
    }
  });
});

// Close mobile nav when clicking outside or pressing Escape
document.addEventListener('click', (e) => {
  if (!document.body.classList.contains('mobile-nav-open')) return;
  const clickedInside = e.target.closest('.side-nav') || e.target.closest('#navToggleOpen');
  if (!clickedInside) {
    document.body.classList.remove('mobile-nav-open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('mobile-nav-open')) {
    document.body.classList.remove('mobile-nav-open');
  }
});

// Ensure mobile state is cleared when resizing to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && document.body.classList.contains('mobile-nav-open')) {
    document.body.classList.remove('mobile-nav-open');
  }
});

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    contactStatus.textContent = translations[getStoredLanguage()].contactSending;
    contactStatus.classList.remove("is-error", "is-success");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Une erreur est survenue.");
      }

      contactStatus.textContent = translations[getStoredLanguage()].contactSuccess;
      contactStatus.classList.add("is-success");
      contactForm.reset();
    } catch (error) {
      contactStatus.textContent = error.message || translations[getStoredLanguage()].contactSendError;
      contactStatus.classList.add("is-error");
    }
  });
}
