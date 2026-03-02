# 🌐 Guia de Criação de Website Moderno
### HTML · CSS · JavaScript — Boas Práticas 2024/2025

---

## 📋 Índice

1. [Estrutura de Pastas](#estrutura-de-pastas)
2. [HTML Semântico](#html-semântico)
3. [CSS Moderno](#css-moderno)
4. [JavaScript Moderno](#javascript-moderno)
5. [Performance](#performance)
6. [Acessibilidade (a11y)](#acessibilidade-a11y)
7. [SEO](#seo)
8. [Segurança](#segurança)
9. [Responsividade](#responsividade)
10. [Ferramentas Recomendadas](#ferramentas-recomendadas)

---

## 📁 Estrutura de Pastas

Organize o projeto de forma clara e escalável:

```
meu-site/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos principais
│   │   ├── reset.css         # Reset/Normalize
│   │   └── components/       # Estilos por componente
│   ├── js/
│   │   ├── main.js           # Script principal
│   │   └── modules/          # Módulos ES6
│   ├── images/
│   │   ├── icons/
│   │   └── photos/
│   └── fonts/
├── pages/                    # Páginas adicionais
└── components/               # Snippets HTML reutilizáveis
```

---

## 🏗️ HTML Semântico

### Template Base (`index.html`)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Descrição do seu site (até 160 caracteres)" />
  <meta name="theme-color" content="#ffffff" />

  <!-- Open Graph / Social -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Nome do Site" />
  <meta property="og:description" content="Descrição do site" />
  <meta property="og:image" content="/assets/images/og-image.jpg" />

  <!-- Favicon moderno -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />

  <!-- Preload de recursos críticos -->
  <link rel="preload" href="/assets/fonts/MinhaFonte.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/css/main.css" as="style" />

  <link rel="stylesheet" href="/assets/css/reset.css" />
  <link rel="stylesheet" href="/assets/css/main.css" />

  <title>Nome do Site | Tagline</title>
</head>
<body>

  <!-- Acessibilidade: pular para conteúdo principal -->
  <a class="skip-link" href="#main-content">Pular para o conteúdo</a>

  <header role="banner">
    <nav aria-label="Navegação principal">
      <ul>
        <li><a href="/">Início</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <section aria-labelledby="hero-title">
      <h1 id="hero-title">Título Principal</h1>
      <p>Subtítulo ou descrição.</p>
    </section>
  </main>

  <footer role="contentinfo">
    <p>&copy; <span id="year"></span> Nome. Todos os direitos reservados.</p>
  </footer>

  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
```

### ✅ Regras de HTML Semântico

- Use `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<aside>`, `<nav>`
- Hierarquia de headings: apenas **um `<h1>`** por página
- Imagens sempre com `alt` descritivo (`alt=""` para decorativas)
- Botões com `type="button"` quando não submetem formulários
- Use `<button>` para ações e `<a>` para navegação

---

## 🎨 CSS Moderno

### Reset Mínimo (`reset.css`)

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

img, video, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
```

### Variáveis CSS (Design Tokens)

```css
/* main.css */
:root {
  /* Cores */
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;

  /* Tipografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  --text-sm: clamp(0.75rem, 1vw, 0.875rem);
  --text-base: clamp(1rem, 1.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 2vw, 1.5rem);
  --text-xl: clamp(1.5rem, 3vw, 2.25rem);
  --text-2xl: clamp(2rem, 5vw, 3.5rem);

  /* Espaçamento */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;

  /* Layout */
  --max-width: 1200px;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);

  /* Transições */
  --transition: 200ms ease;
}

/* Dark mode automático */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f1f5f9;
    --color-border: #1e293b;
  }
}
```

### Layout com CSS Grid e Container Queries

```css
/* Container central */
.container {
  width: min(var(--max-width), 100% - var(--space-8));
  margin-inline: auto;
}

/* Grid responsivo sem media queries */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: var(--space-8);
}

/* Flexbox utilitário */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Stack vertical */
.stack > * + * {
  margin-top: var(--space-4);
}
```

### Animações Respeitosas

```css
/* Só anima se o usuário não preferir movimento reduzido */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 0.4s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

---

## ⚡ JavaScript Moderno

### Módulo principal (`main.js`)

```js
// Sempre use módulos ES6
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';

// Inicializa após DOM pronto
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();

  // Ano dinâmico no footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
```

### Módulo de exemplo (`modules/navigation.js`)

```js
export function initNavigation() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Menu mobile acessível
  const toggle = nav.querySelector('[data-menu-toggle]');
  const menu = nav.querySelector('[data-menu]');

  toggle?.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      menu?.setAttribute('aria-expanded', 'false');
    }
  });
}
```

### Intersection Observer para animações

```js
export function initAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}
```

### ✅ Boas Práticas de JS

- Use `const` e `let` (nunca `var`)
- Prefira `async/await` sobre callbacks
- Trate erros com `try/catch`
- Evite manipular DOM em loop — use `DocumentFragment`
- Nunca use `innerHTML` com dados do usuário (XSS)
- Separe responsabilidades em módulos

---

## 🚀 Performance

### Checklist de Performance

- [ ] **Imagens modernas**: use `.webp` ou `.avif`
- [ ] **Lazy loading**: `<img loading="lazy" />`
- [ ] **Fontes**: `font-display: swap` + subsets
- [ ] **CSS crítico**: inline no `<head>` para above-the-fold
- [ ] **Scripts**: `defer` ou `type="module"` (carrega assíncrono)
- [ ] **Minificação**: CSS e JS minificados em produção
- [ ] **Cache**: headers de cache para assets estáticos
- [ ] **Compressão**: Gzip ou Brotli no servidor

```html
<!-- Imagem responsiva otimizada -->
<picture>
  <source srcset="imagem.avif" type="image/avif" />
  <source srcset="imagem.webp" type="image/webp" />
  <img
    src="imagem.jpg"
    alt="Descrição da imagem"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
  />
</picture>
```

---

## ♿ Acessibilidade (a11y)

### Princípios WCAG 2.2

| Princípio | Exemplos práticos |
|-----------|------------------|
| **Perceptível** | `alt` em imagens, contraste ≥ 4.5:1, legendas em vídeos |
| **Operável** | Navegação por teclado, sem armadilhas de foco |
| **Compreensível** | Labels em formulários, mensagens de erro claras |
| **Robusto** | HTML válido, ARIA correto |

```html
<!-- Formulário acessível -->
<form>
  <label for="email">E-mail</label>
  <input
    type="email"
    id="email"
    name="email"
    autocomplete="email"
    required
    aria-describedby="email-hint"
  />
  <span id="email-hint">Ex: nome@exemplo.com</span>
</form>

<!-- Ícone decorativo -->
<button type="button" aria-label="Fechar menu">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

```css
/* Foco visível para navegação por teclado */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* Skip link */
.skip-link {
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.2s;
}
.skip-link:focus {
  transform: translateY(0);
}
```

---

## 🔍 SEO

### Meta tags essenciais

```html
<!-- Básico -->
<meta name="description" content="Descrição de 150-160 caracteres" />
<link rel="canonical" href="https://seusite.com/pagina" />

<!-- Open Graph -->
<meta property="og:title" content="Título | Site" />
<meta property="og:description" content="Descrição" />
<meta property="og:image" content="https://seusite.com/og.jpg" />
<meta property="og:url" content="https://seusite.com" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

### Dados Estruturados (Schema.org)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nome do Site",
  "url": "https://seusite.com",
  "description": "Descrição do site"
}
</script>
```

---

## 🔒 Segurança

### Headers HTTP recomendados

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Boas práticas

- **Nunca** exponha chaves de API no frontend
- Sanitize inputs do usuário antes de inserir no DOM
- Use `rel="noopener noreferrer"` em links externos
- Valide dados tanto no frontend quanto no backend

```js
// ✅ Correto — texto puro
element.textContent = userInput;

// ❌ Perigoso — executa scripts maliciosos
element.innerHTML = userInput;
```

---

## 📱 Responsividade

### Mobile-First com `clamp()`

```css
/* Abordagem mobile-first */
.hero {
  padding: var(--space-8) var(--space-4);
  font-size: var(--text-base);
}

/* Ajuste progressivo */
@media (min-width: 768px) {
  .hero {
    padding: var(--space-16) var(--space-8);
  }
}

/* Tipografia fluida sem media queries */
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
}
```

### Breakpoints Recomendados

| Nome | Valor | Uso |
|------|-------|-----|
| `sm` | `640px` | Smartphones grandes |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops |
| `xl` | `1280px` | Desktops |
| `2xl` | `1536px` | Telas grandes |

---

## 🛠️ Ferramentas Recomendadas

### Desenvolvimento

| Ferramenta | Uso |
|-----------|-----|
| **VS Code** | Editor com extensões HTML/CSS/JS |
| **Prettier** | Formatação automática de código |
| **ESLint** | Linting de JavaScript |
| **Stylelint** | Linting de CSS |
| **Live Server** | Servidor local com hot reload |

### Validação e Qualidade

| Ferramenta | Uso |
|-----------|-----|
| [Lighthouse](https://developer.chrome.com/docs/lighthouse) | Auditoria de performance, a11y e SEO |
| [W3C Validator](https://validator.w3.org/) | Validação de HTML |
| [Wave](https://wave.webaim.org/) | Acessibilidade |
| [PageSpeed Insights](https://pagespeed.web.dev/) | Performance real |
| [WebAIM Contrast](https://webaim.org/resources/contrastchecker/) | Contraste de cores |

### Build e Deploy

| Ferramenta | Uso |
|-----------|-----|
| **Vite** | Build tool ultrarrápido |
| **GitHub Pages** | Hospedagem gratuita |
| **Netlify / Vercel** | Deploy com CI/CD |
| **Cloudflare Pages** | CDN global gratuito |

---

## ✅ Checklist Final antes do Deploy

- [ ] HTML validado no W3C
- [ ] Lighthouse score ≥ 90 em todas as categorias
- [ ] Testado em Chrome, Firefox, Safari e Edge
- [ ] Testado em mobile (iOS e Android)
- [ ] Navegação funciona 100% por teclado
- [ ] Contraste de texto ≥ 4.5:1
- [ ] Todas as imagens têm `alt`
- [ ] Sem erros no console do navegador
- [ ] Meta tags e OG configurados
- [ ] Favicon e manifest.json presentes
- [ ] HTTPS ativo
- [ ] Sitemap.xml e robots.txt configurados

---

## 📚 Referências

- [MDN Web Docs](https://developer.mozilla.org/pt-BR/)
- [web.dev](https://web.dev) — Google
- [CSS Tricks](https://css-tricks.com)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [HTML Living Standard](https://html.spec.whatwg.org/)

---

*Documentação criada seguindo as melhores práticas de desenvolvimento web — 2024/2025*
