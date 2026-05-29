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

function initProjectViewer() {
  const items = document.querySelectorAll('.project-item[data-id]');
  if (!items || items.length === 0) return;
  const codeTitle = document.getElementById('codeTitle');
  const codeTag = document.getElementById('codeTag');
  const codeContent = document.getElementById('codeContent');

  items.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      const snippet = projectSnippets[id];
      if (!snippet) return;
      if (codeTitle) codeTitle.textContent = snippet.title;
      if (codeTag) codeTag.textContent = snippet.tag;
      if (codeContent) codeContent.textContent = snippet.code;
      items.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
    });
  });
}

document.addEventListener('DOMContentLoaded', initProjectViewer);
