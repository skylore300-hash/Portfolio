const navToggleClose = document.getElementById("navToggleClose");
const navToggleOpen = document.getElementById("navToggleOpen");
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
    projectOneTitle: "Site responsive",
    projectOneText: "Site performant avec layout flexible, animation fluide et accessibilité soignée.",
    projectTwoTitle: "Application de livraison",
    projectTwoText: "Interface claire, expérience de commande rapide et navigation intuitive.",
    projectThreeTitle: "Site portfolio",
    projectThreeText: "Design moderne, typographie forte et mise en valeur du travail.",
    projectViewButton: "Voir projet",
    moreProjectsButton: "Plus de projets",
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
    aboutKicker: "Développeur backend & web",
    aboutHeading: "Je crée des expériences web claires et modernes.",
    aboutText: "J’aime construire des interfaces élégantes, rapides et faciles à utiliser. Mon objectif est de transformer une idée en un produit concret, soigné et utile.",
    contactTitle: "Contactez-moi",
    contactLead: "Contactez-moi pour discuter de votre projet — je vous répondrai rapidement et avec plaisir.",
    followTitle: "Réseaux sociaux",
    formName: "Nom",
    formEmail: "Email",
    formPhone: "Téléphone",
    formSubject: "Sujet",
    formMessage: "Message",
    sendMessageButton: "Envoyer le message",
    footerDescription: "Ce site présente mes projets et compétences. Le contenu est protégé et appartient à son auteur. Merci de votre visite et à bientôt.",
    footerBrand: "Sierra Kaluba",
    footerMeta: "France | €",
    projectsPageTitle: "Plus de projets",
    projectsLoadingTitle: "Chargement des projets GitHub...",
    projectsLoadingText: "Les cartes sont récupérées automatiquement depuis ton compte GitHub.",
    projectsStatus: "Connexion à GitHub en cours.",
    backToProjects: "Retour aux projets",
    selectProjectTitle: "Sélectionne un projet",
    selectProjectCode: "// Cliquez sur un projet pour voir un extrait de code ici."
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
    projectOneTitle: "Responsive website",
    projectOneText: "High-performance site with flexible layout, smooth animation, and careful accessibility.",
    projectTwoTitle: "Food delivery app",
    projectTwoText: "Clear interface, fast ordering experience, and intuitive navigation.",
    projectThreeTitle: "Portfolio website",
    projectThreeText: "Modern design, strong typography, and polished presentation.",
    projectViewButton: "View project",
    moreProjectsButton: "More projects",
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
    aboutKicker: "Backend & Web Developer",
    aboutHeading: "I create clear and modern web experiences.",
    aboutText: "I like building elegant, fast, and easy-to-use interfaces. My goal is to turn an idea into a concrete, polished, and useful product.",
    contactTitle: "Contact me",
    contactLead: "Reach out to discuss your project — I’ll reply quickly and with pleasure.",
    followTitle: "Social links",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone",
    formSubject: "Subject",
    formMessage: "Message",
    sendMessageButton: "Send message",
    footerDescription: "This site presents my projects and skills. The content is protected and belongs to its author. Thanks for visiting and see you soon.",
    footerBrand: "Sierra Kaluba",
    footerMeta: "France | €",
    projectsPageTitle: "More projects",
    projectsLoadingTitle: "Loading GitHub projects...",
    projectsLoadingText: "Cards are fetched automatically from your GitHub account.",
    projectsStatus: "Connecting to GitHub.",
    backToProjects: "Back to projects",
    selectProjectTitle: "Select a project",
    selectProjectCode: "// Click a project to see a code excerpt here."
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
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.classList.remove("nav-collapsed");
    }
  });
}

const links = document.querySelectorAll("a[href^='#']");
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }
    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (document.body.classList.contains("nav-collapsed")) {
      document.body.classList.remove("nav-collapsed");
    }
    if (document.body.classList.contains("mobile-nav-open")) {
      document.body.classList.remove("mobile-nav-open");
    }
  });
});

// Toggle expanded side panel on desktop when clicking the logo
const sideLogo = document.querySelector('.side-nav-logo');
if (sideLogo) {
  sideLogo.style.cursor = 'pointer';
  sideLogo.addEventListener('click', (e) => {
    if (window.innerWidth >= 769) {
      document.body.classList.toggle('side-expanded');
      // ensure not collapsed when expanded
      document.body.classList.remove('nav-collapsed');
    } else {
      document.body.classList.toggle('mobile-nav-open');
    }
  });
}

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    contactStatus.textContent = "Envoi en cours...";
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

      contactStatus.textContent = result.message || "Votre message a bien été envoyé.";
      contactStatus.classList.add("is-success");
      contactForm.reset();
    } catch (error) {
      contactStatus.textContent = error.message || "Impossible d'envoyer le message.";
      contactStatus.classList.add("is-error");
    }
  });
}

// Project code viewer (used on projects.html)
const fallbackProjects = [
  {
    id: "dashboard",
    name: "Dashboard Analytics",
    description: "Tableau de bord clair avec visualisation et filtres rapides.",
    language: "React",
    html_url: "#",
    stargazers_count: 0,
    updated_at: new Date().toISOString()
  },
  {
    id: "landing",
    name: "Landing Page SaaS",
    description: "Hero impactant, sections rythmes, et conversion optimise.",
    language: "HTML/CSS",
    html_url: "#",
    stargazers_count: 0,
    updated_at: new Date().toISOString()
  },
  {
    id: "ecommerce",
    name: "E-Commerce UI",
    description: "Grilles de produits, panier fluide, et micro-interactions.",
    language: "Vanilla JS",
    html_url: "#",
    stargazers_count: 0,
    updated_at: new Date().toISOString()
  },
  {
    id: "motion",
    name: "Portfolio Motion",
    description: "Animations subtiles et navigation plein ecran.",
    language: "CSS",
    html_url: "#",
    stargazers_count: 0,
    updated_at: new Date().toISOString()
  }
];

const projectSnippets = {
  dashboard: {
    title: "Dashboard Analytics",
    tag: "React",
    code: `// Example React widget
function StatsCard({title, value}) {
  return (
    <div className="stats-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}`
  },
  landing: {
    title: "Landing Page SaaS",
    tag: "HTML/CSS",
    code: `<!-- Hero section -->
<section class="hero">
  <h1>Product name</h1>
  <p>Short description</p>
  <a class="cta">Start free</a>
</section>`
  },
  ecommerce: {
    title: "E-Commerce UI",
    tag: "Vanilla JS",
    code: `// Add to cart
function addToCart(productId) {
  const cart = getCart();
  cart.add(productId);
  renderCart();
}`
  },
  motion: {
    title: "Portfolio Motion",
    tag: "CSS",
    code: `/* subtle entrance */
.fade-up { animation: fadeUp .6s ease both }
@keyframes fadeUp { from {opacity:0; transform: translateY(16px)} to {opacity:1; transform:none} }`
  }
};

function formatGitHubSnippet(repo) {
  return `const project = {
  name: "${repo.name}",
  description: ${JSON.stringify(repo.description || "No description provided.")},
  language: ${JSON.stringify(repo.language || "Unknown")},
  stars: ${repo.stargazers_count || 0},
  url: ${JSON.stringify(repo.html_url)},
  updatedAt: ${JSON.stringify(new Date(repo.updated_at).toLocaleDateString("fr-FR"))}
};`;
}

function buildSnippetForProject(project) {
  const snippet = projectSnippets[project.id];
  if (snippet) {
    return snippet;
  }

  return {
    title: project.name,
    tag: project.language || "GitHub",
    code: formatGitHubSnippet(project)
  };
}

function selectProject(project, item, codeTitle, codeTag, codeContent, items) {
  const snippet = buildSnippetForProject(project);

  if (codeTitle) codeTitle.textContent = snippet.title;
  if (codeTag) codeTag.textContent = snippet.tag;
  if (codeContent) codeContent.textContent = snippet.code;

  items.forEach((currentItem) => currentItem.classList.remove("selected"));
  if (item) item.classList.add("selected");
}

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-item";
  article.dataset.projectId = project.id;
  article.tabIndex = 0;

  const title = document.createElement("div");
  title.className = "project-title";
  title.textContent = project.name;

  const description = document.createElement("p");
  description.className = "project-text";
  description.textContent = project.description || "Projet GitHub sans description.";

  const metaRow = document.createElement("div");
  metaRow.className = "flex flex-wrap items-center gap-2 text-xs text-white/70";

  const languageBadge = document.createElement("span");
  languageBadge.className = "rounded-full border border-white/10 px-3 py-1";
  languageBadge.textContent = project.language || "GitHub";

  const starsBadge = document.createElement("span");
  starsBadge.className = "rounded-full border border-white/10 px-3 py-1";
  starsBadge.textContent = `${project.stargazers_count || 0} stars`;

  const link = document.createElement("a");
  link.className = "btn btn-primary w-fit";
  link.href = project.html_url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Voir sur GitHub";

  metaRow.append(languageBadge, starsBadge);
  article.append(title, description, metaRow, link);

  return article;
}

async function fetchGitHubProjects() {
  const user = document.body?.dataset?.githubUser;
  const exclude = (document.body?.dataset?.githubExclude || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!user) {
    return fallbackProjects;
  }

  const response = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const repos = await response.json();
  return repos
    .filter((repo) => !repo.fork && !repo.archived && !exclude.includes(repo.name.toLowerCase()))
    .sort((left, right) => new Date(right.updated_at) - new Date(left.updated_at));
}

async function initProjectViewer() {
  const projectsList = document.getElementById("projectsList");
  const projectsStatus = document.getElementById("projectsStatus");
  const codeTitle = document.getElementById("codeTitle");
  const codeTag = document.getElementById("codeTag");
  const codeContent = document.getElementById("codeContent");

  if (!projectsList || !codeTitle || !codeTag || !codeContent) {
    return;
  }

  const renderProjects = (projects) => {
    projectsList.innerHTML = "";
    projectsList.setAttribute("aria-busy", "false");

    const items = [];

    projects.forEach((project) => {
      const item = createProjectCard(project);
      const activate = () => selectProject(project, item, codeTitle, codeTag, codeContent, items);

      item.addEventListener("click", activate);
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });

      projectsList.appendChild(item);
      items.push(item);
    });

    if (projects.length > 0) {
      selectProject(projects[0], items[0], codeTitle, codeTag, codeContent, items);
      if (projectsStatus) {
        projectsStatus.textContent = `${projects.length} projets chargés depuis GitHub.`;
      }
    } else {
      codeTitle.textContent = "Aucun projet trouvé";
      codeTag.textContent = "GitHub";
      codeContent.textContent = "// Aucun dépôt public disponible pour l’instant.";
      if (projectsStatus) {
        projectsStatus.textContent = "Aucun dépôt public trouvé sur GitHub.";
      }
    }
  };

  try {
    const projects = await fetchGitHubProjects();
    renderProjects(projects.length > 0 ? projects.slice(0, 8) : fallbackProjects);
  } catch (error) {
    console.error(error);
    renderProjects(fallbackProjects);
    if (projectsStatus) {
      projectsStatus.textContent = "GitHub est indisponible pour le moment, affichage des projets de secours.";
    }
  }
}

document.addEventListener("DOMContentLoaded", initProjectViewer);
