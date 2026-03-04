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
  // Previne restauração de scroll do browser
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  initIntroAnimation();
  initHeaderScroll();
  initHorizontalScroll();
  initScrollReveal();
}

/* ========================================
   INTRO ANIMATION — Estilo Mercado Pago

   Timeline (−35% total):
   0.00s — Tela amarela, nada visível
   0.16s — Phase 1: Texto fade-in centralizado
   1.20s — Phase 2: Cartão sobe do fundo → centro (por cima do texto)
   2.07s — Phase 3a: Cartão sai para CIMA + texto some
   2.56s — Phase 3b: Imagem BG sobe do fundo
   3.43s — Phase 4: Menu desce do topo (colapsado) + liberar scroll
   3.70s — Phase 5: Hero — imagem escurece, texto + CTA aparecem
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

  // Bloquear scroll durante a intro — forçar posição no topo
  let introComplete = false;
  function lockScroll() {
    if (!introComplete) {
      window.scrollTo(0, 0);
    }
  }
  window.addEventListener('scroll', lockScroll);

  // Phase 1: Texto fade-in (sem menu)
  setTimeout(() => {
    overlay.classList.add('phase-text');
  }, 163);

  // Phase 2: Cartão sobe do fundo → centro (por cima do texto)
  setTimeout(() => {
    overlay.classList.add('phase-card');
  }, 1197);

  // Phase 3a: Cartão sai para CIMA + texto some
  setTimeout(() => {
    overlay.classList.add('phase-card-exit');
  }, 2067);

  // Phase 3b: Imagem BG sobe do fundo (após cartão sair)
  setTimeout(() => {
    overlay.classList.add('phase-image');
  }, 2557);

  // Phase 4: Menu desce do topo (colapsado) + liberar scroll
  setTimeout(() => {
    body.classList.remove('intro-active');
    const header = document.getElementById('site-header');
    if (header) {
      header.classList.add('is-visible');
      header.classList.add('is-collapsed');
    }
  }, 3427);

  // Phase 5: Hero — imagem escurece 70%, texto + CTA aparecem + liberar scroll
  setTimeout(() => {
    overlay.classList.add('phase-hero');
    introComplete = true;
    window.removeEventListener('scroll', lockScroll);
  }, 3699);
}

/* ========================================
   HEADER SCROLL — Comportamento do projeto Negócios
   Collapse on scroll down, expand on scroll up
   ======================================== */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const section = document.getElementById('horizontal-section');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function isInHorizontalSection() {
    if (!section) return false;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionBottom = sectionTop + section.offsetHeight;
    const scrollY = window.scrollY;
    return scrollY >= sectionTop && scrollY <= sectionBottom;
  }

  function updateHeader() {
    const currentScrollY = window.scrollY;

    // Dentro da seção horizontal → sempre colapsado
    if (isInHorizontalSection()) {
      header.classList.add('is-collapsed');
      header.classList.remove('is-expanded');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

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

  // Número de painéis e cálculo do translateX máximo
  const panelCount = 4;
  const maxTranslate = ((panelCount - 1) / panelCount) * 100; // 75%

  let ticking = false;
  let cachedTop = null;
  let cachedRange = null;

  function recalcLayout() {
    cachedTop = section.getBoundingClientRect().top + window.scrollY;
    cachedRange = section.offsetHeight - window.innerHeight;
  }

  function update() {
    if (cachedTop === null) recalcLayout();

    const scrollY = window.scrollY;
    const rawProgress = (scrollY - cachedTop) / cachedRange;
    const progress = Math.max(0, Math.min(1, rawProgress));

    track.style.transform = 'translateX(' + (-progress * maxTranslate) + '%)';
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  // Recalcular posições no resize (mudança de URL bar mobile, etc.)
  window.addEventListener('resize', () => { cachedTop = null; }, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // Inicializar posição correta
  recalcLayout();
  update();
}

/* ========================================
   SCROLL REVEAL — Animar elementos ao entrar na viewport
   ======================================== */
function initScrollReveal() {
  const targets = document.querySelectorAll('.module-6');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  targets.forEach((el) => observer.observe(el));
}
