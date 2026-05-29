const navToggleClose = document.getElementById("navToggleClose");
const navToggleOpen = document.getElementById("navToggleOpen");

if (navToggleClose && navToggleOpen) {
  navToggleClose.addEventListener("click", () => {
    document.body.classList.add("nav-collapsed");
  });

  navToggleOpen.addEventListener("click", () => {
    document.body.classList.remove("nav-collapsed");
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
  });
});

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
