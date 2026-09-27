/**
 * CÉLIA DECOR — ATELIER DE ALTA DECORAÇÃO
 * Master Engine & Scroll-Driven Immersive Experience
 * Severino & Ricardo Standard
 */

document.addEventListener('DOMContentLoaded', () => {
  initLuxuryHeader();
  initCurtainScrollReveal();
  initTransformationScroll();
  initFabricStudio();
  initBusinessHoursStatus();
  initMobileMenu();
  initCookieConsent();
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
   3. SCROLL REVEAL: A TRANSFORMAÇÃO DO SEU ESPAÇO (5 AMBIENTES IMERSIVOS)
   Imersão sincronizada ao scroll do mouse e palm/touch no celular
   ========================================================================== */
function initTransformationScroll() {
  const section = document.querySelector('.transformation-journey-section');
  if (!section) return;

  const slides = section.querySelectorAll('.transform-slide-item');
  const pills = section.querySelectorAll('.transform-pill-btn');
  const progressFill = document.getElementById('transformProgressFill');
  const cueLabel = document.getElementById('transformCueLabel');
  const totalSlides = slides.length; // 5

  if (totalSlides === 0) return;

  const slideMeta = [
    {
      badge: 'Mídia 01 de 05 • Dormitórios & Suíte',
      title: 'Cabeceiras que Acolhem com Elegância',
      desc: 'Tecidos em tons neutros desenvolvidos sob medida para harmonizar com a marcenaria e acolher com máximo conforto.'
    },
    {
      badge: 'Mídia 02 de 05 • Enxoval de Luxo',
      title: 'Minimalismo com Toque de Aconchego',
      desc: 'Roupas de cama em tecidos nobres, toque macio e tons serenos para proporcionar um sono leve e memorável.'
    },
    {
      badge: 'Mídia 03 de 05 • Marcenaria Integrada',
      title: 'Cabeceira Personalizada & Painel Ripado',
      desc: 'Integração milimétrica da marcenaria em madeira ripada com porta oculta mimetizada para a suíte.'
    },
    {
      badge: 'Mídia 04 de 05 • Texturas & Acabamentos',
      title: 'Almofadas Nobres & Volumetria',
      desc: 'Combinações de texturas, formas e bordados exclusivos que elevam o enxoval a outro nível de sofisticação.'
    },
    {
      badge: 'Mídia 05 de 05 • Proteção & Luz Solar',
      title: 'Persiana Rolô em Tela Solar',
      desc: 'Filtragem suave dos raios solares com eficiência térmica, praticidade de manutenção e caimento leve e integrado.'
    }
  ];

  let currentActive = -1;

  function scrollToSlide(idx) {
    idx = Math.max(0, Math.min(totalSlides - 1, idx));
    const sectionTop = section.offsetTop;
    const scrollable = section.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (scrollable * (idx / (totalSlides - 1)));
    window.scrollTo({ top: targetScroll + 5, behavior: 'smooth' });
  }

  function setActiveSlide(targetIndex) {
    targetIndex = Math.max(0, Math.min(totalSlides - 1, targetIndex));
    if (targetIndex === currentActive) return;
    currentActive = targetIndex;

    slides.forEach((slide, idx) => {
      if (idx === targetIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    pills.forEach((pill, idx) => {
      if (idx === targetIndex) {
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-selected', 'false');
      }
    });

    if (progressFill) {
      const fillPercent = ((targetIndex + 1) / totalSlides) * 100;
      progressFill.style.width = `${fillPercent}%`;
    }

    const activeBadge = document.getElementById('transformActiveBadge');
    const activeTitle = document.getElementById('transformActiveTitle');
    const activeDesc = document.getElementById('transformActiveDesc');
    if (activeBadge && slideMeta[targetIndex]) activeBadge.textContent = slideMeta[targetIndex].badge;
    if (activeTitle && slideMeta[targetIndex]) activeTitle.textContent = slideMeta[targetIndex].title;
    if (activeDesc && slideMeta[targetIndex]) activeDesc.textContent = slideMeta[targetIndex].desc;

    if (cueLabel) {
      cueLabel.textContent = `▼ Role com o mouse ou deslize o dedo para vivenciar as 5 mídias (${targetIndex + 1} de 5: ${slideMeta[targetIndex].title}) ▼`;
    }
  }

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrolled = -rect.top;
    const scrollable = sectionHeight - windowHeight;

    if (scrollable <= 0) return;

    let progress = scrolled / scrollable;
    progress = Math.max(0, Math.min(0.9999, progress));

    // Determina o slide ativo proporcionalmente ao progresso de rolagem
    const stepIndex = Math.floor(progress * totalSlides);
    setActiveSlide(stepIndex);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // Clique direto nas pílulas para saltar com transição suave
  pills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSlide(idx);
    });
  });

  // Botões de seta anterior e próximo
  const prevBtn = document.getElementById('transformPrevBtn');
  const nextBtn = document.getElementById('transformNextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSlide(currentActive - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSlide(currentActive + 1);
    });
  }

  // Suporte a gesto de palm/touch swipe no celular
  const stack = document.getElementById('transformSlidesStack');
  if (stack) {
    let touchStartY = 0;
    let touchStartX = 0;

    stack.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    stack.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        const deltaX = e.changedTouches[0].clientX - touchStartX;

        // Se for um deslize horizontal marcante
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            // Swipe esquerda -> Avançar
            scrollToSlide(currentActive + 1);
          } else if (deltaX > 0) {
            // Swipe direita -> Voltar
            scrollToSlide(currentActive - 1);
          }
        }
      }
    }, { passive: true });

    // Clique direto na imagem avança para a próxima
    stack.addEventListener('click', () => {
      scrollToSlide((currentActive + 1) % totalSlides);
    });
  }
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

/* ==========================================================================
   7. GESTÃO DE COOKIES, REMARKETING & CONFORMIDADE LGPD (GOOGLE ADS & META)
   Armazena o consentimento do visitante, gerencia tags de remarketing
   e permite ao usuário revisar preferências a qualquer instante
   ========================================================================== */
function initCookieConsent() {
  const CONSENT_KEY = 'celia_decor_cookie_consent';
  const TIMESTAMP_KEY = 'celia_decor_cookie_timestamp';

  // Injeta o HTML do banner se ainda não existir na página
  let banner = document.getElementById('celiaCookieBanner');
  let backdrop = document.getElementById('celiaCookieBackdrop');

  if (!banner) {
    backdrop = document.createElement('div');
    backdrop.id = 'celiaCookieBackdrop';
    backdrop.className = 'celia-cookie-backdrop';
    document.body.appendChild(backdrop);

    banner = document.createElement('div');
    banner.id = 'celiaCookieBanner';
    banner.className = 'celia-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Consentimento de Cookies e Tecnologias de Remarketing');

    banner.innerHTML = `
      <div class="celia-cookie-inner">
        <div class="celia-cookie-info">
          <div class="celia-cookie-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
          <div class="celia-cookie-text">
            <h4 class="celia-cookie-title">Privacidade, Cookies &amp; Experiência Exclusiva</h4>
            <p class="celia-cookie-desc">
              Utilizamos cookies e tecnologias de rastreamento (incluindo Google Analytics, Google Ads Remarketing e Meta Pixel) para otimizar sua navegação, analisar métricas e veicular anúncios personalizados em cortinas finas e automação. Você pode escolher quais dados compartilhar conosco. Conheça nossa <a href="politica-de-privacidade.html">Política de Privacidade</a>.
            </p>
          </div>
        </div>
        <div class="celia-cookie-actions">
          <button type="button" class="btn-cookie-accept" id="btnCookieAccept">Aceitar Todos</button>
          <button type="button" class="btn-cookie-reject" id="btnCookieReject">Apenas Essenciais</button>
          <a href="politica-de-privacidade.html#cookies-gestao" class="btn-cookie-pref">Preferências</a>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
  }

  function showBanner() {
    if (banner) banner.classList.add('is-visible');
    if (backdrop) backdrop.classList.add('is-visible');
  }

  function hideBanner() {
    if (banner) banner.classList.remove('is-visible');
    if (backdrop) backdrop.classList.remove('is-visible');
  }

  function applyConsent(type) {
    localStorage.setItem(CONSENT_KEY, type);
    localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());

    // Google Consent Mode v2 & Remarketing DataLayer Push
    window.dataLayer = window.dataLayer || [];
    if (type === 'all') {
      window.dataLayer.push({
        event: 'consent_update',
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        remarketing_active: true
      });
    } else {
      window.dataLayer.push({
        event: 'consent_update',
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        remarketing_active: false
      });
    }

    hideBanner();
  }

  // Verifica se o consentimento já foi registrado anteriormente
  const currentConsent = localStorage.getItem(CONSENT_KEY);
  if (!currentConsent) {
    // Exibe suavemente após 1 segundo da abertura da página
    setTimeout(showBanner, 1000);
  }

  // Listeners dos Botões do Banner
  const acceptBtn = document.getElementById('btnCookieAccept');
  const rejectBtn = document.getElementById('btnCookieReject');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => applyConsent('all'));
  }
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => applyConsent('essential'));
  }

  // Listeners para Reabrir Configurações a Qualquer Momento (Rodapé ou Links da Política)
  document.querySelectorAll('.cookie-settings-trigger, #openCookieSettings').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showBanner();
    });
  });

  if (backdrop) {
    backdrop.addEventListener('click', hideBanner);
  }
}

