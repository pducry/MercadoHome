/* ========================================
   MercadoHome — Intro Animation
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordGate();
});

/* ========================================
   PASSWORD GATE — Proteção por senha
   Hash SHA-256 para não expor a senha em texto puro
   ======================================== */
function initPasswordGate() {
  const gate = document.getElementById('password-gate');
  const form = document.getElementById('password-gate-form');
  const input = document.getElementById('password-gate-input');
  const error = document.getElementById('password-gate-error');

  // Se já autenticou nesta sessão, libera direto
  if (sessionStorage.getItem('mh_auth') === '1') {
    gate.classList.add('is-hidden');
    startSite();
    return;
  }

  // Bloqueia scroll enquanto o gate está ativo
  document.body.style.overflow = 'hidden';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = input.value;

    const hash = await sha256(password);
    const HASH = '75958ec2eb11ce16ec884316ef3a05aaed2da74417524863a38dc2457b3d768c';

    if (hash === HASH) {
      sessionStorage.setItem('mh_auth', '1');
      gate.classList.add('is-hidden');
      document.body.style.overflow = '';
      startSite();
    } else {
      input.classList.add('is-error');
      error.classList.add('is-visible');
      setTimeout(() => {
        input.classList.remove('is-error');
      }, 400);
    }
  });
}

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function startSite() {
  initIntroAnimation();
  initHeaderScroll();
  initHorizontalScroll();
}

/* ========================================
   INTRO ANIMATION — Estilo Mercado Pago

   Timeline (−35% total):
   0.00s — Tela amarela, nada visível
   0.20s — Phase 1: Texto fade-in centralizado
   1.50s — Phase 2: Cartão sobe do fundo → centro (por cima do texto)
   2.58s — Phase 3a: Cartão sai para CIMA + texto some
   3.20s — Phase 3b: Imagem BG sobe do fundo
   4.28s — Phase 4: Menu desce do topo (colapsado) + liberar scroll
   4.62s — Phase 5: Hero — imagem escurece, texto + CTA aparecem
   ======================================== */
function initIntroAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.remove('intro-active');
    return;
  }

  const body = document.body;
  const overlay = document.getElementById('intro-overlay');

  if (!overlay) {
    body.classList.remove('intro-active');
    return;
  }

  // Phase 1: Texto fade-in (sem menu)
  setTimeout(() => {
    overlay.classList.add('phase-text');
  }, 204);

  // Phase 2: Cartão sobe do fundo → centro (por cima do texto)
  setTimeout(() => {
    overlay.classList.add('phase-card');
  }, 1496);

  // Phase 3a: Cartão sai para CIMA + texto some
  setTimeout(() => {
    overlay.classList.add('phase-card-exit');
  }, 2584);

  // Phase 3b: Imagem BG sobe do fundo (após cartão sair)
  setTimeout(() => {
    overlay.classList.add('phase-image');
  }, 3196);

  // Phase 4: Menu desce do topo (colapsado) + liberar scroll
  setTimeout(() => {
    body.classList.remove('intro-active');
    const header = document.getElementById('site-header');
    if (header) {
      header.classList.add('is-visible');
      header.classList.add('is-collapsed');
    }
  }, 4284);

  // Phase 5: Hero — imagem escurece 70%, texto + CTA aparecem
  setTimeout(() => {
    overlay.classList.add('phase-hero');
  }, 4624);
}

/* ========================================
   HEADER SCROLL — Comportamento do projeto Negócios
   Collapse on scroll down, expand on scroll up
   ======================================== */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    // Scroll down → collapse nav
    if (currentScrollY > lastScrollY) {
      header.classList.add('is-collapsed');
      header.classList.remove('is-expanded');
    }
    // Scroll up → always expand nav
    else if (currentScrollY < lastScrollY) {
      header.classList.remove('is-collapsed');
      header.classList.add('is-expanded');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ========================================
   HORIZONTAL SCROLL — Module 2 → Module 3
   Scroll vertical controla translateX do track
   ======================================== */
function initHorizontalScroll() {
  const section = document.getElementById('horizontal-section');
  const track = document.getElementById('horizontal-track');

  if (!section || !track) return;

  let ticking = false;

  function update() {
    const sectionTop = section.offsetTop;
    const scrollRange = section.offsetHeight - window.innerHeight;
    const scrollY = window.scrollY;

    // Progress: 0 (Module 2) → 1 (Module 4 fully visible)
    const rawProgress = (scrollY - sectionTop) / scrollRange;
    const progress = Math.max(0, Math.min(1, rawProgress));

    // 3 panels: max translate = 66.666% of track width
    const translateX = -progress * 66.666;
    track.style.transform = 'translateX(' + translateX + '%)';

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(update);
}
