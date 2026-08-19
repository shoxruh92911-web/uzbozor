/* =========================================================
   UzBozor — site behavior
   No build step required. Vanilla JS, works straight from
   static hosting (GitHub Pages / Vercel / Netlify / Railway).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  wireProductFilter();
  wireMobileNav();
  wireAuthModals();
  wireContactForm();
  wireScrollReveal();
});

/* ---------- DATA ---------- */

const CATEGORIES = [
  { icon: "📱", name: "Telefon va gadjetlar", desc: "Xiaomi, Redmi, aksessuarlar" },
  { icon: "👗", name: "Kiyim-kechak", desc: "Shein, mavsumiy kolleksiyalar" },
  { icon: "⌚", name: "Soatlar", desc: "Smart va klassik modellar" },
  { icon: "🎧", name: "Audio texnika", desc: "Quloqchinlar, kolonkalar" },
  { icon: "🛋", name: "Uy va maishiy", desc: "Yorug'lik, saqlash, mayda texnika" },
  { icon: "👟", name: "Poyabzal", desc: "Sport va kundalik" },
];

const PRODUCTS = [
  { name: "Simsiz quloqchin", platform: "Temu", price: 129000, icon: "🎧" },
  { name: "Yozgi ko'ylak", platform: "Shein", price: 89000, icon: "👗" },
  { name: "Smart soat", platform: "Temu", price: 349000, icon: "⌚" },
  { name: "LED stol lampasi", platform: "Alibaba", price: 159000, icon: "💡" },
  { name: "Sport krossovka", platform: "Shein", price: 279000, icon: "👟" },
  { name: "Kichik texnika to'plami", platform: "Alibaba", price: 410000, icon: "🍳" },
];

const currency = new Intl.NumberFormat("uz-UZ");

/* ---------- RENDER: categories ---------- */

function renderCategories(){
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="category-card" data-reveal>
      <span class="cat-icon">${c.icon}</span>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
    </div>
  `).join("");
}

/* ---------- RENDER: products ---------- */

function renderProducts(platform = "all"){
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const items = platform === "all" ? PRODUCTS : PRODUCTS.filter(p => p.platform === platform);

  grid.innerHTML = items.map(p => `
    <div class="product-card" data-reveal>
      <div class="product-image">
        <span class="product-platform-tag">${p.platform}</span>
        <span class="product-icon-badge">${p.icon}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-price">${currency.format(p.price)} so'm</p>
        <button class="btn btn-outline" type="button">Savatga qo'shish</button>
      </div>
    </div>
  `).join("");

  wireScrollReveal(); // re-observe newly injected cards
}

function wireProductFilter(){
  const filterRow = document.getElementById("platformFilter");
  if (!filterRow) return;
  filterRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    filterRow.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderProducts(btn.dataset.platform);
  });
}

/* ---------- MOBILE NAV ---------- */

function wireMobileNav(){
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- AUTH MODALS ----------
   UI only. To connect real accounts, wire loginForm / registerForm
   submit handlers and the Google buttons below to your auth
   provider (e.g. Firebase Authentication, or your own API).
   No credentials are stored or sent from this file as-is. */

function wireAuthModals(){
  const backdrop = document.getElementById("modalBackdrop");
  const modals = { login: document.getElementById("loginModal"), register: document.getElementById("registerModal") };
  if (!backdrop) return;

  function openModal(name){
    Object.values(modals).forEach(m => m && (m.hidden = true));
    if (modals[name]) modals[name].hidden = false;
    backdrop.hidden = false;
  }
  function closeModal(){
    backdrop.hidden = true;
  }

  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.openModal));
  });
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: replace with a real auth call.
    loginError.hidden = true;
    setSignedInState(loginForm.identifier.value || "Foydalanuvchi");
    closeModal();
  });

  const registerForm = document.getElementById("registerForm");
  const registerError = document.getElementById("registerError");
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: replace with a real auth call.
    registerError.hidden = true;
    setSignedInState(registerForm.name.value || "Foydalanuvchi");
    closeModal();
  });

  document.getElementById("googleLoginBtn")?.addEventListener("click", () => {
    // TODO: trigger your Google sign-in provider here.
    alert("Google orqali kirish hali ulanmagan — auth provayderingizni shu tugmaga bog'lang.");
  });
  document.getElementById("googleRegisterBtn")?.addEventListener("click", () => {
    // TODO: trigger your Google sign-in provider here.
    alert("Google orqali ro'yxatdan o'tish hali ulanmagan — auth provayderingizni shu tugmaga bog'lang.");
  });

  document.getElementById("logoutBtn")?.addEventListener("click", setSignedOutState);
}

function setSignedInState(name){
  document.getElementById("authButtons").hidden = true;
  const chip = document.getElementById("userChip");
  chip.hidden = false;
  document.getElementById("userChipName").textContent = name;
}
function setSignedOutState(){
  document.getElementById("authButtons").hidden = false;
  document.getElementById("userChip").hidden = true;
}

/* ---------- CONTACT FORM ---------- */

function wireContactForm(){
  const form = document.getElementById("contactForm");
  const note = document.getElementById("contactNote");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: send to your backend or a form service (e.g. Formspree).
    note.hidden = false;
    form.reset();
  });
}

/* ---------- SCROLL REVEAL ---------- */

let revealObserver;
function wireScrollReveal(){
  const targets = document.querySelectorAll("[data-reveal]:not(.is-visible)");
  if (!targets.length) return;

  if (!revealObserver){
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  }
  targets.forEach(t => revealObserver.observe(t));
}
