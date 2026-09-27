/**
 * CÉLIA DECOR — ATELIER DE ALTA DECORAÇÃO
 * Master Engine & Scroll-Driven Immersive Experience
 * Severino & Ricardo Standard
 */

document.addEventListener('DOMContentLoaded', () => {
  initLuxuryHeader();
  initCurtainScrollReveal();
  initFrameExpandScroll();
  initFabricStudio();
  initBusinessHoursStatus();
  initMobileMenu();
});

/* ==========================================================================
   1. HEADER FLUTUANTE DE LUXO
   Controle de transparência, logo dinâmica e espaçamento aéreo
   ========================================================================== */
function initLuxuryHeader() {
  const header = document.querySelector('.luxury-header');
  if (!header) return;

  const isHeroTransparent = header.classList.contains('hero-transparent');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
      if (isHeroTransparent) {
        header.classList.remove('hero-transparent');
      }
    } else {
      header.classList.remove('scrolled');
      if (isHeroTransparent) {
        header.classList.add('hero-transparent');
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   2. SCROLL REVEAL: ABERTURA EM CORTINA ("AS IMAGENS VÃO SE ABRINDO")
   Conforme o usuário desce com o mouse, as cortinas se afastam suavemente
   ========================================================================== */
function initCurtainScrollReveal() {
  const section = document.querySelector('.curtain-reveal-section');
  const panelLeft = document.querySelector('.curtain-panel-left');
  const panelRight = document.querySelector('.curtain-panel-right');
  const backdrop = document.querySelector('.curtain-revealed-backdrop');
  const unveiledContent = document.querySelector('.curtain-unveiled-content');
  const teaser = document.querySelector('.curtain-initial-teaser');

  if (!section || !panelLeft || !panelRight) return;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrolledDistance = -rect.top;
    const scrollableDistance = sectionHeight - windowHeight;

    if (scrollableDistance <= 0) return;

    let progress = scrolledDistance / scrollableDistance;
    progress = Math.max(0, Math.min(1, progress));

    const openPercent = progress * 102;
    panelLeft.style.transform = `translateX(-${openPercent}%)`;
    panelRight.style.transform = `translateX(${openPercent}%)`;

    if (backdrop) {
      const scale = 1.15 - (progress * 0.15);
      backdrop.style.transform = `scale(${scale})`;
    }

    if (teaser) {
      teaser.style.opacity = Math.max(0, 1 - (progress * 5));
    }

    if (unveiledContent) {
      if (progress > 0.45) {
        unveiledContent.classList.add('active');
      } else {
        unveiledContent.classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. SCROLL REVEAL: MOLDURA QUE SE EXPANDE EM TELA CHEIA
   Responsividade inteligente: não comprime em telas de smartphone
   ========================================================================== */
function initFrameExpandScroll() {
  const section = document.querySelector('.expand-frame-section');
  const visualBox = document.querySelector('.expand-visual-box');
  const introHeader = document.querySelector('.expand-header-intro');

  if (!section || !visualBox) return;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrolledDistance = -rect.top;
    const scrollableDistance = sectionHeight - windowHeight;

    if (scrollableDistance <= 0) return;

    let progress = scrolledDistance / scrollableDistance;
    progress = Math.max(0, Math.min(1, progress));

    const isMobile = window.innerWidth <= 768;
    const baseW = isMobile ? 88 : 65;
    const addW = isMobile ? 12 : 35;
    const baseH = isMobile ? 38 : 55;
    const addH = isMobile ? 22 : 45;

    const currentWidth = baseW + (progress * addW);
    const currentHeight = baseH + (progress * addH);
    const currentRadius = 28 * (1 - progress);

    visualBox.style.width = `${currentWidth}vw`;
    visualBox.style.height = `${currentHeight}vh`;
    visualBox.style.borderRadius = `${currentRadius}px`;

    if (introHeader) {
      introHeader.style.opacity = Math.max(0, 1 - (progress * 2.5));
      introHeader.style.transform = `translateY(-${progress * 40}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   4. ESTÚDIO INTERATIVO DE TECIDOS & INCIDÊNCIA DE LUZ
   ========================================================================== */
function initFabricStudio() {
  const canvasImg = document.getElementById('studioCanvasImg');
  const sunFilter = document.getElementById('studioSunFilter');
  const specTitle = document.getElementById('studioSpecTitle');
  const specDesc = document.getElementById('studioSpecDesc');
  const lightSlider = document.getElementById('studioLightSlider');

  if (!canvasImg || !specTitle) return;

  const pleatSpecs = {
    wave: {
      name: "Prega Wave (Ondulação Suave Contínua)",
      desc: "Caimento fluido com ondas simétricas desenhadas milimetricamente. A preferida dos arquitetos para salas amplas e cortineiros com iluminação em fita LED."
    },
    femea: {
      name: "Prega Fêmea (Elegância Discreta e Embutida)",
      desc: "Volume nobre voltado para dentro. Cria um aspecto sóbrio e limpo, excelente para dormitórios e salas de jantar que buscam aconchego atemporal."
    },
    suico: {
      name: "Trilho Suíço Integrado com Blackout",
      desc: "Deslizamento suave em roldanas silenciosas com forro 100% corta-luz para conforto térmico e bloqueio solar absoluto."
    }
  };

  const fabricFilters = {
    linho: {
      filter: "contrast(102%) brightness(98%) sepia(8%)",
      label: "Linho Puro Rústico"
    },
    voil: {
      filter: "contrast(96%) brightness(115%) opacity(0.9)",
      label: "Voil Suíço Translúcido"
    },
    blackout: {
      filter: "contrast(115%) brightness(84%)",
      label: "Blackout Acetinado Térmico"
    }
  };

  let activePleat = 'wave';
  let activeFabric = 'linho';

  // Botões de Pregas
  document.querySelectorAll('.btn-pleat-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-pleat-opt').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activePleat = e.target.dataset.pleat;
      renderStudio();
    });
  });

  // Botões de Tecidos
  document.querySelectorAll('.btn-fabric-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-fabric-opt').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      activeFabric = e.target.dataset.fabric;
      renderStudio();
    });
  });

  // Slider de Luz Solar
  if (lightSlider) {
    lightSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (!sunFilter) return;

      if (val < 33) {
        sunFilter.style.background = 'radial-gradient(circle at 50% 30%, rgba(255, 230, 200, 0.08) 0%, rgba(10, 12, 16, 0.65) 100%)';
      } else if (val < 66) {
        sunFilter.style.background = 'radial-gradient(circle at 50% 30%, rgba(255, 210, 160, 0.25) 0%, rgba(30, 25, 20, 0.35) 100%)';
      } else {
        sunFilter.style.background = 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.15) 100%)';
      }
    });
  }

  function renderStudio() {
    if (pleatSpecs[activePleat]) {
      specTitle.textContent = `${pleatSpecs[activePleat].name} • ${fabricFilters[activeFabric].label}`;
      specDesc.textContent = pleatSpecs[activePleat].desc;
    }
    if (canvasImg) {
      canvasImg.style.filter = fabricFilters[activeFabric].filter;
    }
  }
}

/* ==========================================================================
   5. SINCRONIZAÇÃO EM TEMPO REAL COM HORÁRIOS DO GOOGLE
   Segunda a Sexta: 08:30 às 17:30
   Sábado: 09:00 às 13:00
   Domingo / Fora de Expediente: Fechado com acolhimento para mensagens
   ========================================================================== */
function getGoogleBusinessStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const current = now.getHours() + (now.getMinutes() / 60);

  let isOnline = false;
  let fullBadgeText = "Estamos Online Agora";
  let shortBadgeText = "Online Agora";
  let waStatusText = "Online agora • Consultoria VIP";
  let drawerText = "🟢 Estamos Online Agora (Showroom Aberto)";
  let tooltip = "Showroom Aberto na Rua Edu Chaves, 15";
  let greeting = "Olá! Gostaria de agendar uma consultoria exclusiva com a Célia Decor em Santo André.";

  // Segunda a Sexta: 08:30 às 17:30
  if (day >= 1 && day <= 5) {
    if (current >= 8.5 && current < 17.5) {
      isOnline = true;
      fullBadgeText = "Estamos Online Agora";
      shortBadgeText = "Online";
      waStatusText = "Online agora • Showroom Aberto";
      drawerText = "🟢 Estamos Online Agora (Aberto até 17:30)";
      tooltip = "Showroom Aberto hoje até as 17:30";
      greeting = "Olá! Gostaria de agendar um atendimento no showroom da Célia Decor em Santo André.";
    } else {
      isOnline = false;
      fullBadgeText = "Fora de Expediente";
      shortBadgeText = "Fechado";
      waStatusText = "Fora de Expediente • Deixe recado";
      drawerText = "🌙 Showroom Fechado (Reabre às 08:30)";
      tooltip = current < 8.5 ? "Showroom abre hoje às 08:30" : "Showroom reabre amanhã às 08:30";
      greeting = "Olá! Vi o site da Célia Decor fora do expediente e gostaria de agendar uma consultoria no próximo horário comercial.";
    }
  }
  // Sábado: 09:00 às 13:00
  else if (day === 6) {
    if (current >= 9.0 && current < 13.0) {
      isOnline = true;
      fullBadgeText = "Showroom Aberto";
      shortBadgeText = "Aberto";
      waStatusText = "Showroom Aberto • Até 13h";
      drawerText = "🟢 Showroom Aberto Hoje (Até as 13h)";
      tooltip = "Showroom Aberto hoje até as 13:00";
      greeting = "Olá! Gostaria de falar com um especialista da Célia Decor neste sábado.";
    } else {
      isOnline = false;
      fullBadgeText = "Fora de Expediente";
      shortBadgeText = "Fechado";
      waStatusText = "Fechado • Reabre Segunda 08:30";
      drawerText = "🌙 Fechado • Reabre Segunda-feira 08:30";
      tooltip = "Showroom fechado no momento. Reabrimos segunda às 08:30";
      greeting = "Olá! Vi o site no final de semana e gostaria de agendar uma visita para o início da próxima semana.";
    }
  }
  // Domingo: Fechado
  else {
    isOnline = false;
    fullBadgeText = "Fechado aos Domingos";
    shortBadgeText = "Fechado";
    waStatusText = "Fechado • Reabre Segunda 08:30";
    drawerText = "🌙 Fechado aos Domingos (Reabre Segunda 08:30)";
    tooltip = "Domingo fechado. Atendimento reabre na segunda-feira às 08:30";
    greeting = "Olá! Vi o site no domingo e gostaria de receber contato da Célia Decor na segunda-feira.";
  }

  return { isOnline, fullBadgeText, shortBadgeText, waStatusText, drawerText, tooltip, greeting };
}

function initBusinessHoursStatus() {
  function updateAllStatuses() {
    const status = getGoogleBusinessStatus();

    // 1. Atualiza Badge no Cabeçalho
    const headerBadges = document.querySelectorAll('.header-live-badge');
    headerBadges.forEach(badge => {
      badge.classList.remove('is-online', 'is-offline');
      badge.classList.add(status.isOnline ? 'is-online' : 'is-offline');
      badge.setAttribute('title', status.tooltip);

      const fullText = badge.querySelector('.badge-full-text');
      const shortText = badge.querySelector('.badge-short-text');
      if (fullText) fullText.textContent = status.fullBadgeText;
      if (shortText) shortText.textContent = status.shortBadgeText;
    });

    // 2. Atualiza Status no Drawer Mobile
    const mobileDrawerStatus = document.getElementById('mobileDrawerStatus');
    if (mobileDrawerStatus) {
      mobileDrawerStatus.classList.remove('is-offline');
      if (!status.isOnline) mobileDrawerStatus.classList.add('is-offline');
      const textSpan = mobileDrawerStatus.querySelector('.mobile-status-text');
      if (textSpan) textSpan.textContent = status.drawerText;
    }

    // 3. Atualiza Botão Inteligente WhatsApp 2.0 (Regra Severino & Ricardo)
    const waContainer = document.querySelector('.smart-wa-bubble');
    if (waContainer) {
      const phone = "5511963188104";
      const link = `https://wa.me/${phone}?text=${encodeURIComponent(status.greeting)}`;

      waContainer.innerHTML = `
        <a href="${link}" target="_blank" rel="noopener noreferrer" class="wa-pill-link ${status.isOnline ? 'online' : 'offline'}" aria-label="WhatsApp Célia Decor">
          <svg class="wa-icon-svg" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.066-2.124-.528-1.503-.623-2.485-2.148-2.56-2.247-.074-.099-.607-.808-.607-1.543s.385-1.101.521-1.251c.137-.15.299-.187.399-.187.1 0 .2.001.288.006.096.004.225-.036.35.267.136.326.467 1.139.508 1.222.041.083.069.18.014.288-.056.108-.084.175-.167.272-.083.097-.175.217-.25.291-.083.082-.17.172-.073.339.097.167.433.714.928 1.155.637.568 1.175.743 1.342.826.167.083.264.069.362-.042.097-.111.417-.485.528-.652.111-.166.222-.139.375-.083.153.055.972.458 1.139.541.167.084.278.125.319.195.042.069.042.405-.102.81zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.176L2 22l4.954-1.399C8.423 21.536 10.156 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
          <div class="wa-text-group">
            <span class="wa-brand-name">Célia Decor</span>
            <span class="wa-dynamic-status">
              <span class="wa-pulse-dot"></span>
              ${status.waStatusText}
            </span>
          </div>
        </a>
      `;
    }

    // 4. Atualiza Indicador de Showroom na Página (se houver)
    const showroomStatusEls = document.querySelectorAll('.showroom-live-status');
    showroomStatusEls.forEach(el => {
      el.className = `showroom-live-status ${status.isOnline ? 'is-open' : 'is-closed'}`;
      el.textContent = status.isOnline ? `🟢 Aberto Agora (${status.tooltip})` : `🌙 ${status.tooltip}`;
    });
  }

  updateAllStatuses();
  // Atualiza automaticamente a cada 60 segundos
  setInterval(updateAllStatuses, 60000);
}

/* ==========================================================================
   6. MENU MOBILE MODERNO EM DRAWER
   Abertura suave, bloqueio de scroll de fundo e fácil navegação
   ========================================================================== */
function initMobileMenu() {
  const burger = document.querySelector('.menu-burger');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');

  if (!burger) return;

  function openDrawer() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Fecha o drawer ao clicar em links internos
  document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}
