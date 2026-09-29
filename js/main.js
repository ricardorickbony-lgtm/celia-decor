/**
 * CÉLIA DECOR — ATELIER DE ALTA DECORAÇÃO
 * Padrão Oficial Ricardo & Severino
 * Minimalist Architecture inspired by Uniflex Senses
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteHeader();
  initMobileDrawer();
  initSmartWhatsAppStatus();
  initSmoothScroll();
});

/* ==========================================================================
   1. HEADER DINÂMICO NO SCROLL (Transparente -> Branco Luxuoso)
   Compatível com #siteHeader e .luxury-header
   ========================================================================== */
function initSiteHeader() {
  const header = document.getElementById('siteHeader') || document.querySelector('.luxury-header');
  if (!header) return;

  const isHeroTransparent = header.classList.contains('transparent-at-top') || header.classList.contains('hero-transparent');

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.classList.remove('transparent-at-top');
      if (isHeroTransparent) {
        header.classList.remove('hero-transparent');
      }
    } else {
      header.classList.remove('scrolled');
      if (isHeroTransparent) {
        header.classList.add('transparent-at-top');
        header.classList.add('hero-transparent');
      }
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

/* ==========================================================================
   2. MENU MOBILE DRAWER
   Compatível com ambas as estruturas de markup
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn') || document.querySelector('.menu-burger');
  const closeBtn = document.getElementById('drawerCloseBtn') || document.getElementById('mobileDrawerClose');
  const backdrop = document.getElementById('drawerBackdrop') || document.getElementById('mobileDrawerOverlay');
  const drawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .mobile-nav-link');

  if (!menuBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. BOTÃO WHATSAPP INTELIGENTE COM STATUS EM TEMPO REAL
   Regra Oficial Ricardo & Severino (Online / Fora do Expediente)
   Showroom Santo André:
   - Seg a Sex: 08:30 às 17:30
   - Sábado: 09:00 às 13:00
   - Domingo: Fechado
   ========================================================================== */
function initSmartWhatsAppStatus() {
  const config = {
    numero: "5511963188104",
    diasSemana: [1, 2, 3, 4, 5], // 1=Segunda ... 5=Sexta
    horaInicio: 8.5,            // 08:30
    horaFim: 17.5,              // 17:30
    sabadoAbre: true,
    sabadoHoraInicio: 9,        // 09:00
    sabadoHoraFim: 13           // 13:00
  };

  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda ... 6 = Sábado
  const hora = agora.getHours();
  const minutos = agora.getMinutes();
  const horaDecimal = hora + (minutos / 60);

  let isOnline = false;

  // Verificação de expediente
  if (config.diasSemana.includes(diaSemana) && horaDecimal >= config.horaInicio && horaDecimal < config.horaFim) {
    isOnline = true;
  } else if (config.sabadoAbre && diaSemana === 6 && horaDecimal >= config.sabadoHoraInicio && horaDecimal < config.sabadoHoraFim) {
    isOnline = true;
  }

  // 1. Atualiza Widget Flutuante de WhatsApp
  const waLink = document.getElementById("wa-link");
  const waDot = document.getElementById("wa-status-dot");
  const waText = document.getElementById("wa-status-text");

  if (waLink && waDot && waText) {
    if (isOnline) {
      waDot.className = "wa-status-dot online";
      waText.textContent = "Online Agora";
      const msg = encodeURIComponent("Olá! Vim pelo site da Célia Decor e gostaria de solicitar um orçamento sob medida.");
      waLink.href = `https://wa.me/${config.numero}?text=${msg}`;
      waLink.classList.remove("offline-mode");
    } else {
      waLink.classList.add("offline-mode");
      waDot.className = "wa-status-dot offline";
      waText.textContent = "Fora do Expediente";
      const msg = encodeURIComponent("Olá! Vi o site da Célia Decor fora do horário e gostaria de deixar uma mensagem para retorno.");
      waLink.href = `https://wa.me/${config.numero}?text=${msg}`;
    }
  }

  // 2. Atualiza Indicador no Header (#headerStatusPill e #headerLiveStatus)
  const headerStatusPill = document.getElementById("headerStatusPill");
  const headerStatusText = document.getElementById("headerStatusText");
  if (headerStatusPill && headerStatusText) {
    const dot = headerStatusPill.querySelector('.status-dot');
    if (isOnline) {
      headerStatusText.textContent = "Showroom Aberto";
      if (dot) dot.className = "status-dot";
      headerStatusPill.title = "Showroom Aberto • Atendimento imediato";
    } else {
      headerStatusText.textContent = "Reabre Segunda 08:30";
      if (dot) dot.className = "status-dot offline";
      headerStatusPill.title = "Showroom Fechado • Deixe sua mensagem no WhatsApp";
    }
  }

  const legacyHeaderStatus = document.getElementById("headerLiveStatus");
  if (legacyHeaderStatus) {
    const fullText = legacyHeaderStatus.querySelector('.badge-full-text');
    const shortText = legacyHeaderStatus.querySelector('.badge-short-text');
    if (isOnline) {
      legacyHeaderStatus.classList.remove('is-offline');
      legacyHeaderStatus.classList.add('is-online');
      if (fullText) fullText.textContent = "Showroom Aberto Agora";
      if (shortText) shortText.textContent = "Aberto";
    } else {
      legacyHeaderStatus.classList.remove('is-online');
      legacyHeaderStatus.classList.add('is-offline');
      if (fullText) fullText.textContent = "Reabre Segunda 08:30";
      if (shortText) shortText.textContent = "Fechado";
    }
  }

  // 3. Atualiza Indicador no Drawer Mobile
  const drawerLiveInfo = document.getElementById("drawerLiveInfo");
  const drawerStatusText = document.getElementById("drawerStatusText");
  if (drawerLiveInfo && drawerStatusText) {
    const dot = drawerLiveInfo.querySelector('.status-dot');
    if (isOnline) {
      drawerStatusText.textContent = "Showroom Aberto Agora";
      if (dot) dot.className = "status-dot";
    } else {
      drawerStatusText.textContent = "Showroom Fechado • Atendimento via WhatsApp";
      if (dot) dot.className = "status-dot offline";
    }
  }

  const legacyDrawerStatus = document.getElementById("mobileDrawerStatus");
  if (legacyDrawerStatus) {
    const statusText = legacyDrawerStatus.querySelector('.mobile-status-text');
    if (isOnline) {
      legacyDrawerStatus.classList.remove('is-offline');
      legacyDrawerStatus.classList.add('is-online');
      if (statusText) statusText.textContent = "🟢 Showroom Aberto Agora (Atendimento Imediato)";
    } else {
      legacyDrawerStatus.classList.remove('is-online');
      legacyDrawerStatus.classList.add('is-offline');
      if (statusText) statusText.textContent = "🌙 Fechado Agora (Reabre Segunda 08:30)";
    }
  }
}

/* ==========================================================================
   4. ROLAGEM SUAVE (SMOOTH SCROLL)
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

