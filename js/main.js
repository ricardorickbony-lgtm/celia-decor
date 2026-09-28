/**
 * CÉLIA DECOR — ATELIER DE ALTA DECORAÇÃO
 * Master Engine & Scroll-Driven Immersive Experience
 * Severino & Ricardo Standard
 */

// Inicialização segura com isolamento de falhas por módulo
function safeModuleInit(name, fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[Célia Decor Engine] Erro no módulo '${name}':`, err);
  }
}

function initAllAppModules() {
  // 1. O status de atendimento ao cliente executa em prioridade máxima
  safeModuleInit('businessHours', initBusinessHoursStatus);
  safeModuleInit('luxuryHeader', initLuxuryHeader);
  safeModuleInit('curtainScroll', initCurtainScrollReveal);
  safeModuleInit('virtualSuiteTour', initTransformationScroll);
  safeModuleInit('studioVideoPlayer', initStudioVideoPlayer);
  safeModuleInit('fabricStudio', initFabricStudio);
  safeModuleInit('mobileMenu', initMobileMenu);
  safeModuleInit('cookieConsent', initCookieConsent);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAppModules);
} else {
  initAllAppModules();
}

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

  // =========================================================================
  // METADADOS COMPLETOS DOS HOTSPOTS ARQUITETÔNICOS (CONHEÇA POR DENTRO)
  // =========================================================================
  const hotspotData = {
    'rolo-ampla': {
      badge: 'Proteção Solar & Conforto Térmico',
      title: 'Persiana Rolô Screen Solar 3%',
      desc: 'Tecido inteligente com microporosidades que bloqueia 97% dos raios UV nocivos, impede o desbotamento de pisos e móveis de madeira e reduz a temperatura interna em até 6°C sem perder a vista do jardim.',
      features: ['✓ Bloqueio de 97% dos Raios UV', '✓ Eficiência Térmica Comprovada', '✓ Acionamento por Controle ou App'],
      waMsg: 'Olá! Gostaria de um orçamento de Persiana Rolô em Tela Solar sob medida para o meu dormitório.'
    },
    'cabeceiras-ampla': {
      badge: 'Tapeçaria & Alfaiataria Fina',
      title: 'Cabeceiras Gêmeas sob Medida',
      desc: 'Estrutura anatômica com espuma de alta densidade D33 Soft revestida em linho cru nobre, com acabamento repelente a poeira e antiácaro. Projetadas milimetricamente para harmonizar com a marcenaria.',
      features: ['✓ Linho Cru Importado de Alta Resistência', '✓ Espuma D33 Soft Anatômica', '✓ Costura Invisível e Acabamento Próprio'],
      waMsg: 'Olá! Gostaria de saber mais sobre as cabeceiras estofadas sob medida da Célia Decor.'
    },
    'ripado-ampla': {
      badge: 'Marcenaria & Arquitetura de Interiores',
      title: 'Painel Ripado em Carvalho Natural',
      desc: 'Painel acústico ripado em lâmina de madeira natural com frisos simétricos. Proporciona quebra de reverberação sonora e conforto térmico ao ambiente, além de embutir fiação e iluminação indireta.',
      features: ['✓ Madeira Maciça Tratada e Envernizada', '✓ Isolamento Acústico Integrado', '✓ Porta Oculta Mimetizada Embutida'],
      waMsg: 'Olá! Tenho interesse em projeto de painel ripado em madeira com cabeceira para meu dormitório.'
    },
    'enxoval-ampla': {
      badge: 'Enxoval de Hotel Boutique',
      title: 'Enxoval & Peseira Canelada',
      desc: 'Composição de colcha matelassada dupla face em algodão nobre e peseira canelada em tricô artesanal. Aquece a composição visual com serenidade e máximo aconchego tátil.',
      features: ['✓ Toque Acetinado e Respirável', '✓ Tricô Canelado em Fios Nobres', '✓ Composição Cromática Personalizada'],
      waMsg: 'Olá! Adorei o enxoval e a peseira canelada da suíte e gostaria de encomendar para meu quarto.'
    },
    'estofado-cabeceira': {
      badge: 'Detalhes Construtivos',
      title: 'Costura Oculta & Estofamento D33',
      desc: 'Cada módulo da cabeceira conta com costura invisível e alinhamento milimétrico com as ripas de madeira da parede, garantindo continuidade geométrica perfeita.',
      features: ['✓ Alinhamento Geométrico Rigoroso', '✓ Fixação Embutida Invisível', '✓ Tecido Lavável de Alta Durabilidade'],
      waMsg: 'Olá! Gostaria de falar com um especialista da Célia Decor sobre cabeceiras sob medida.'
    },
    'led-sanca': {
      badge: 'Luminotécnica Cênica',
      title: 'Sanca Iluminada com LED Oculto 2700K',
      desc: 'Fita de LED de alta fidelidade cromática embutida na sanca superior. Banha o ripado suavemente de cima a baixo com temperatura quente de 2700K, criando atmosfera relaxante e acolhedora.',
      features: ['✓ Temperatura Quente Acolhedora 2700K', '✓ Dimerização Suave', '✓ Zero Ofuscamento Visual'],
      waMsg: 'Olá! Gostaria de integrar sancas e cortineiros iluminados com cortinas e persianas.'
    },
    'criado-mudo': {
      badge: 'Marcenaria Suspensa',
      title: 'Mesa Lateral Flutuante em Laca',
      desc: 'Gaveteiro suspenso integrado diretamente ao ripado, com corrediças ocultas com amortecimento soft-close. Mantém o chão desobstruído para maior leveza e praticidade.',
      features: ['✓ Corrediças Soft-Close Ocultas', '✓ Puxador Cava Minimalista', '✓ Acabamento em Laca Acetinada Fosca'],
      waMsg: 'Olá! Gostaria de consultar projetos integrados de cabeceira com mesas suspensas.'
    },
    'almofadas-cabeceira': {
      badge: 'Atelier de Costura Célia Decor',
      title: 'Almofadas Bordadas em Ponto Relevo',
      desc: 'Desenhos botânicos exclusivos bordados em alto-relevo sobre linho puro. O enchimento em pluma sintética siliconada hipoalergênica mantém o volume perfeito sem deformar.',
      features: ['✓ Bordado Exclusivo em Alto-Relevo', '✓ Enchimento em Pluma Siliconada', '✓ Zíper Invisível para Lavagem'],
      waMsg: 'Olá! Gostaria de encomendar almofadas bordadas sob medida com a equipe do Atelier Célia Decor.'
    },
    'porta-mimetizada': {
      badge: 'Engenharia de Interiores',
      title: 'Porta Mimetizada Oculta no Ripado',
      desc: 'Porta pivotante com fechamento invisível e fechadura magnética silenciosa. Quando fechada, a folha da porta alinha-se perfeitamente com os frisos do ripado, tornando a entrada do banheiro imperceptível.',
      features: ['✓ Fechamento Magnético Silencioso', '✓ Pivô de Aço Inox Oculto', '✓ Continuidade Total do Ripado'],
      waMsg: 'Olá! Tenho um projeto e gostaria de incluir uma porta oculta mimetizada no painel ripado.'
    },
    'banheiro-suite': {
      badge: 'Continuidade Espacial',
      title: 'Banheiro Master Integrado',
      desc: 'Transição fluida entre o dormitório e a sala de banho com nichos iluminados e bancada em mármore esculpido. Uma experiência visual de suíte presidencial de hotel 5 estrelas.',
      features: ['✓ Iluminação Cênica de Nicho', '✓ Mármore Esculpido Nobre', '✓ Integração com a Suíte Master'],
      waMsg: 'Olá! Gostaria de planejar acabamentos e cortinas para minha suíte master integrada.'
    },
    'cama-tailored': {
      badge: 'Conforto & Sofisticação',
      title: 'Cama Tailored sob Medida',
      desc: 'Colcha sob medida ajustada aos cantos da cama com caimento impecável, sem sobras desordenadas. A peseira em tom cru traz camadas de textura que enriquecem o ambiente.',
      features: ['✓ Caimento sob Medida Milimétrico', '✓ Tecido Antialérgico', '✓ Fácil Manutenção e Higienização'],
      waMsg: 'Olá! Gostaria de solicitar um enxoval completo sob medida para minha cama.'
    },
    'bordado-folhagem': {
      badge: 'Macro Textura • Linho Puro',
      title: 'Bordado Botânico em Relevo Tátil',
      desc: 'Fotografia em macro evidenciando a nobreza dos pontos de bordado em relevo táctil sobre a trama do linho rústico. Cada detalhe é inspecionado e costurado no próprio atelier da Célia Decor.',
      features: ['✓ Linho com Textura Natural', '✓ Ponto Bordado com Alta Resolução', '✓ Toque Macio e Acolhedor'],
      waMsg: 'Olá! Fiquei encantado com o detalhe do bordado das almofadas e quero encomendar peças exclusivas.'
    },
    'almofada-barreta': {
      badge: 'Tapeçaria Clássica Contemporânea',
      title: 'Linho Rústico com Detalhes em Barretas',
      desc: 'Almofada lombar confeccionada em linho encorpado com acabamento artesanal de barretas nas extremidades, conferindo sofisticação e conforto de postura.',
      features: ['✓ Barretas Artesanais Feitas à Mão', '✓ Fibras Nobres Duráveis', '✓ Tons Neutros Atemporais'],
      waMsg: 'Olá! Gostaria de conhecer o catálogo de almofadas e tecidos em linho da Célia Decor.'
    },
    'ripado-macro': {
      badge: 'Madeira Natural Maciça',
      title: 'Madeira Natural com Textura Sedosa',
      desc: 'Textura da madeira real com veios preservados e acabamento acetinado ecológico livre de odores, valorizando a autenticidade dos materiais naturais na arquitetura.',
      features: ['✓ Acabamento Ecológico Acetinado', '✓ Veios Naturais Preservados', '✓ Toque Térmico Aconchegante'],
      waMsg: 'Olá! Gostaria de saber mais sobre as opções de madeiras e acabamentos para cabeceiras e ripados.'
    },
    'tela-solar-screen': {
      badge: 'Controle Solar Moderno',
      title: 'Tecido Tela Solar Screen 3%',
      desc: 'Permite desfrutar da luz natural do dia e contemplar o jardim exterior sem que pessoas de fora consigam enxergar o interior durante o dia. Bloqueia o calor radiante e o brilho excessivo.',
      features: ['✓ Proteção Anti-Reflexo para Telas', '✓ Anti-Chamas e Fácil de Limpar com Pano Úmido', '✓ Garantia Estendida Célia Decor'],
      waMsg: 'Olá! Gostaria de agendar uma visita para medição de Persiana Rolô Tela Solar para as minhas janelas.'
    },
    'motorizacao-persiana': {
      badge: 'Domótica & Conforto',
      title: 'Motor Silencioso Somfy com Automação',
      desc: 'Motorização integrada ao tubo superior da persiana, sem fiações visíveis. Acionamento por controle remoto slim, aplicativo móvel ou comandos de voz via Alexa e Google Home.',
      features: ['✓ Silêncio Absoluto na Movimentação', '✓ Bateria Recarregável ou 110V/220V', '✓ Integração com Casa Inteligente'],
      waMsg: 'Olá! Gostaria de automatizar minhas persianas e cortinas com controle remoto e Alexa.'
    },
    'jardim-biofilico': {
      badge: 'Biofilia & Bem-Estar',
      title: 'Integração Biofílica com a Natureza',
      desc: 'A perfeita combinação entre a persiana rolô tela solar e o paisagismo externo traz a sensação calmante do verde para dentro do quarto, reduzindo o estresse e elevando a qualidade do repouso.',
      features: ['✓ Conexão Visual com a Paisagem', '✓ Difusão Suave da Luz Solar', '✓ Bem-estar Físico e Mental'],
      waMsg: 'Olá! Gostaria de consultar os especialistas da Célia Decor para um projeto em minha residência.'
    }
  };

  let currentActive = -1;

  // 1. Elementos do DOM capturados previamente
  const spotDrawer = document.getElementById('tourSpotDrawer');
  const spotClose = document.getElementById('tourSpotClose');
  const spotBadge = document.getElementById('spotCardBadge');
  const spotTitle = document.getElementById('spotCardTitle');
  const spotDesc = document.getElementById('spotCardDesc');
  const spotFeatures = document.getElementById('spotCardFeatures');
  const spotWaBtn = document.getElementById('spotCardWaBtn');

  // 2. Funções de controle de Hotspots declaradas no topo do escopo
  function closeSpotDrawer() {
    if (!spotDrawer) return;
    spotDrawer.classList.remove('is-open');
    spotDrawer.setAttribute('aria-hidden', 'true');
    section.querySelectorAll('.tour-hotspot').forEach(b => b.classList.remove('active'));
  }

  function openSpotDrawer(spotKey, btnElement) {
    const data = hotspotData[spotKey];
    if (!data || !spotDrawer) return;

    section.querySelectorAll('.tour-hotspot').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (spotBadge) spotBadge.textContent = data.badge;
    if (spotTitle) spotTitle.textContent = data.title;
    if (spotDesc) spotDesc.textContent = data.desc;

    if (spotFeatures) {
      spotFeatures.innerHTML = data.features.map(f => `<span class="spot-feat-item">${f}</span>`).join('');
    }

    if (spotWaBtn) {
      const phone = "5511963188104";
      spotWaBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(data.waMsg)}`;
    }

    spotDrawer.classList.add('is-open');
    spotDrawer.setAttribute('aria-hidden', 'false');
  }

  // 3. Gestão de Navegação e Profundidade Espacial 3D
  const slideMeta = [
    {
      badge: "Ângulo 01 de 05 • Visão Panorâmica",
      title: "Visão Panorâmica da Suíte Master",
      desc: "Harmonia absoluta entre tecidos nobres em linho, cabeceiras sob medida, painel em madeira ripada e controle térmico com persiana rolô tela solar.",
      focal: { x: 54, y: 48 },
      cue: "Role para caminhar em direção à cabeceira ripada e cama"
    },
    {
      badge: "Ângulo 02 de 05 • Cabeceira & Painel Ripado",
      title: "Cabeceira sob Medida & Marcenaria Ripada",
      desc: "Estofamento de alfaiataria em linho cru D33, sanca com LED embutido 2700K e mesa de apoio suspensa flutuante.",
      focal: { x: 38, y: 46 },
      cue: "Role para se aproximar do painel ripado e da porta oculta"
    },
    {
      badge: "Ângulo 03 de 05 • Porta Mimetizada Oculta",
      title: "Porta Mimetizada Oculta da Suíte",
      desc: "Engenharia de precisão com continuidade perfeita dos frisos da madeira, integrando o banheiro master sem emendas aparentes.",
      focal: { x: 30, y: 44 },
      cue: "Role para mergulhar nos detalhes de tecidos e bordados"
    },
    {
      badge: "Ângulo 04 de 05 • Macro Texturas & Linho Artesanal",
      title: "Macro Detalhe dos Bordados & Linho Puro",
      desc: "Toque artesanal com bordados botânicos em alto relevo, tramas rústicas de linho com barretas e madeira natural maciça.",
      focal: { x: 50, y: 46 },
      cue: "Role para caminhar em direção à janela com persiana rolô"
    },
    {
      badge: "Ângulo 05 de 05 • Persiana Solar & Iluminação Natural",
      title: "Persiana Rolô Screen Solar Motorizada",
      desc: "Controle solar inteligente com 97% de bloqueio UV, transparência para o jardim externo e motorização ultra silenciosa.",
      focal: { x: 50, y: 40 },
      cue: "Você explorou toda a suíte. Role para cima para retornar aos ângulos"
    }
  ];

  // Configura pontos focais arquitetônicos de cada cena para o zoom realista
  slides.forEach((slide, idx) => {
    const meta = slideMeta[idx] || { focal: { x: 50, y: 50 } };
    slide.style.transformOrigin = `${meta.focal.x}% ${meta.focal.y}%`;
  });

  // =========================================================================
  // MOTOR 3D: CAMERA WALK-THROUGH (DOLLY ZOOM INTERATIVO POR SCROLL)
  // Caminhe fisicamente por dentro das fotos conforme move o scroll do mouse!
  // =========================================================================
  let targetVirtualDepth = 0; // 0.0 a 4.0
  let currentVirtualDepth = 0;
  let targetMouseX = 0; // -0.5 a 0.5
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let isZoomed = false;

  const stack = document.getElementById('transformSlidesStack');
  const spatialStage = document.getElementById('tourSpatialStage');
  const activeBadge = document.getElementById('transformActiveBadge');
  const activeTitle = document.getElementById('transformActiveTitle');
  const activeDesc = document.getElementById('transformActiveDesc');

  function render3DFrame() {
    // 1. Interpolação suave contínua a 60fps (efeito Steadicam físico)
    const depthDiff = targetVirtualDepth - currentVirtualDepth;
    currentVirtualDepth += depthDiff * 0.088;

    currentMouseX += (targetMouseX - currentMouseX) * 0.08;
    currentMouseY += (targetMouseY - currentMouseY) * 0.08;

    // 2. Parallax de rotação (olhar ao redor em 3D dentro do quarto)
    const rotY = currentMouseX * 9.5; // -4.8deg a +4.8deg
    const rotX = -currentMouseY * 7.5; // -3.7deg a +3.7deg
    const panX = -currentMouseX * 22;
    const panY = -currentMouseY * 16;
    const zoomMultiplier = isZoomed ? 1.35 : 1.0;

    if (stack) {
      stack.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${panX.toFixed(1)}px, ${panY.toFixed(1)}px, 0)`;
    }

    // 3. Renderiza cada cena no túnel contínuo de profundidade
    slides.forEach((slide, idx) => {
      const delta = currentVirtualDepth - idx; // distância relativa da câmera até este ângulo

      if (delta > 1.05 || delta < -1.05) {
        // Cena completamente ultrapassada ou muito adiante
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.pointerEvents = 'none';
        slide.style.transform = 'translate3d(0, 0, -400px) scale(0.6)';
        return;
      }

      slide.style.visibility = 'visible';

      if (delta >= 0) {
        // A câmera está DENTRO ou AVANÇANDO através desta foto (Dolly Zoom para frente)
        // delta vai de 0.0 (foto normal) até 1.0 (passando por dentro dela)
        const scale = (1.0 + (delta * 1.18)) * zoomMultiplier; // 1.0x -> 2.18x (caminhando para dentro)
        const zPush = delta * 420; // avança 420px na direção do observador
        const opacity = Math.max(0, 1 - Math.pow(delta, 1.55));
        const blur = Math.max(0, (delta - 0.42) * 8);

        slide.style.opacity = opacity.toFixed(3);
        slide.style.transform = `translate3d(0, 0, ${zPush.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        slide.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none';
        slide.style.zIndex = `${10 - Math.floor(delta * 4)}`;

        // Hotspots permanecem interativos enquanto estamos situados nesta cena
        const hotspots = slide.querySelectorAll('.tour-hotspot');
        if (delta < 0.24 && !isZoomed) {
          const hotOpacity = Math.max(0, 1 - delta * 3.8);
          hotspots.forEach(h => {
            h.style.opacity = hotOpacity.toFixed(2);
            h.style.pointerEvents = 'auto';
            h.style.transform = 'translate(-50%, -50%) translateZ(60px)';
          });
        } else {
          hotspots.forEach(h => {
            h.style.opacity = '0';
            h.style.pointerEvents = 'none';
          });
        }

      } else {
        // A cena está se APROXIMANDO à nossa frente (surge do fundo em direção à câmera)
        // delta vai de -1.0 até 0.0
        const progress = 1 + delta; // 0.0 até 1.0
        const scale = (0.62 + (0.38 * Math.pow(progress, 0.78))) * zoomMultiplier; // 0.62x -> 1.0x
        const zPush = delta * 320; // -320px -> 0px
        const opacity = Math.max(0, Math.min(1, Math.pow(progress, 1.35)));
        const blur = Math.max(0, -delta * 4.5);

        slide.style.opacity = opacity.toFixed(3);
        slide.style.transform = `translate3d(0, 0, ${zPush.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        slide.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none';
        slide.style.zIndex = '5';

        const hotspots = slide.querySelectorAll('.tour-hotspot');
        hotspots.forEach(h => {
          h.style.opacity = '0';
          h.style.pointerEvents = 'none';
        });
      }
    });

    // 4. Identifica o ponto de vista dominante (mais próximo do olhar)
    const primaryIndex = Math.max(0, Math.min(totalSlides - 1, Math.round(currentVirtualDepth)));

    pills.forEach((pill, idx) => {
      const isCur = idx === primaryIndex;
      pill.classList.toggle('active', isCur);
      pill.setAttribute('aria-selected', isCur ? 'true' : 'false');
    });

    if (progressFill) {
      const fillPercent = ((currentVirtualDepth) / (totalSlides - 1)) * 100;
      progressFill.style.width = `${Math.max(5, Math.min(100, fillPercent))}%`;
    }

    if (slideMeta[primaryIndex]) {
      const meta = slideMeta[primaryIndex];
      if (activeBadge) activeBadge.textContent = meta.badge;
      if (activeTitle) activeTitle.textContent = meta.title;
      if (activeDesc) activeDesc.textContent = meta.desc;

      if (cueLabel) {
        if (Math.abs(depthDiff) > 0.06) {
          cueLabel.textContent = `✦ Caminhando pela Suíte: ${meta.title} (${Math.round((currentVirtualDepth / (totalSlides - 1)) * 100)}%) ✦`;
        } else {
          cueLabel.textContent = `▼ ${meta.cue} ▼`;
        }
      }
    }

    requestAnimationFrame(render3DFrame);
  }

  // Inicia o loop contínuo de renderização 3D
  requestAnimationFrame(render3DFrame);

  // 4. Sincronização Contínua com o Scroll da Página
  function onScroll() {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrolled = -rect.top;
    const scrollable = sectionHeight - windowHeight;

    if (scrollable <= 0) return;

    let progress = scrolled / scrollable;
    progress = Math.max(0, Math.min(1.0, progress));

    targetVirtualDepth = progress * (totalSlides - 1); // 0.0 a 4.0
  }

  // 5. Navegação Direta para Waypoints (Pílulas e Setas)
  function scrollToWaypoint(idx) {
    closeSpotDrawer();
    targetVirtualDepth = Math.max(0, Math.min(totalSlides - 1, idx));
    const rect = section.getBoundingClientRect();
    const sectionTop = window.pageYOffset + rect.top;
    const scrollable = section.offsetHeight - window.innerHeight;
    const targetScrollY = sectionTop + (targetVirtualDepth / (totalSlides - 1)) * scrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }

  pills.forEach((pill, idx) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToWaypoint(idx);
    });
  });

  const prevBtn = document.getElementById('transformPrevBtn');
  const nextBtn = document.getElementById('transformNextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const prevIdx = Math.max(0, Math.round(targetVirtualDepth) - 1);
      scrollToWaypoint(prevIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextIdx = Math.min(totalSlides - 1, Math.round(targetVirtualDepth) + 1);
      scrollToWaypoint(nextIdx);
    });
  }

  // 6. Navegação via Scroll do Mouse direto sobre o Palco
  if (spatialStage) {
    spatialStage.addEventListener('wheel', (e) => {
      const delta = Math.sign(e.deltaY) * 0.32;
      const newDepth = Math.max(0, Math.min(totalSlides - 1, targetVirtualDepth + delta));
      if (Math.abs(newDepth - targetVirtualDepth) > 0.01) {
        targetVirtualDepth = newDepth;
        const rect = section.getBoundingClientRect();
        const sectionTop = window.pageYOffset + rect.top;
        const scrollable = section.offsetHeight - window.innerHeight;
        const targetScrollY = sectionTop + (targetVirtualDepth / (totalSlides - 1)) * scrollable;
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });
      }
    }, { passive: true });
  }

  // 7. Listeners dos Hotspots
  if (spotClose) {
    spotClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSpotDrawer();
    });
  }

  section.querySelectorAll('.tour-hotspot').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const spotKey = btn.dataset.spot;
      if (btn.classList.contains('active')) {
        closeSpotDrawer();
      } else {
        openSpotDrawer(spotKey, btn);
      }
    });
  });

  // =========================================================================
  // SIMULADOR DE INCIDÊNCIA DE LUZ SOLAR & AMBIÊNCIA CÊNICA
  // =========================================================================
  const lightOverlay = document.getElementById('tourLightOverlay');
  const lightButtons = section.querySelectorAll('.btn-light-mode');

  lightButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      lightButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.light;
      if (lightOverlay) {
        lightOverlay.className = `tour-ambient-light-overlay mode-${mode}`;
      }
      if (spatialStage) {
        spatialStage.classList.remove('mode-day', 'mode-filter', 'mode-warm');
        spatialStage.classList.add(`mode-${mode}`);
      }
    });
  });

  // =========================================================================
  // LOOK-AROUND 3D: MOUSE TRACKING & TOUCH PAN (GIRAR VISÃO NO QUARTO)
  // =========================================================================
  if (spatialStage) {
    spatialStage.addEventListener('mousemove', (e) => {
      const rect = spatialStage.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) - 0.5; // -0.5 a 0.5
      targetMouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
    });

    spatialStage.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
    });

    // Touch no Smartphone: arraste com o dedo para olhar em volta
    let touchStartX = 0;
    let touchStartY = 0;

    spatialStage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    spatialStage.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetMouseX = Math.max(-0.5, Math.min(0.5, (deltaX / window.innerWidth) * 1.6));
        targetMouseY = Math.max(-0.5, Math.min(0.5, (deltaY / window.innerHeight) * 1.6));
      }
    }, { passive: true });

    spatialStage.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        // Swipe horizontal rápido no celular para avançar / recuar ângulo
        if (Math.abs(deltaX) > 55) {
          if (deltaX < 0) {
            scrollToWaypoint(Math.min(totalSlides - 1, Math.round(targetVirtualDepth) + 1));
          } else {
            scrollToWaypoint(Math.max(0, Math.round(targetVirtualDepth) - 1));
          }
        }
      }
      targetMouseX = 0;
      targetMouseY = 0;
    }, { passive: true });
  }

  // =========================================================================
  // CONTROLES HUD: ZOOM E TELA CHEIA
  // =========================================================================
  const zoomBtn = document.getElementById('tourZoomBtn');
  const fullscreenBtn = document.getElementById('tourFullscreenBtn');

  if (zoomBtn) {
    zoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isZoomed = !isZoomed;
      zoomBtn.classList.toggle('active', isZoomed);
      const span = zoomBtn.querySelector('span');
      if (span) span.textContent = isZoomed ? '1.0x Normal' : 'Zoom 1.35x';
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const el = spatialStage || section;
      if (!document.fullscreenElement) {
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
        fullscreenBtn.classList.add('active');
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        fullscreenBtn.classList.remove('active');
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (fullscreenBtn) {
        fullscreenBtn.classList.toggle('active', !!document.fullscreenElement);
      }
    });
  }

  // Clicar fora de hotspots fecha o card de detalhes
  if (spatialStage) {
    spatialStage.addEventListener('click', (e) => {
      if (!e.target.closest('.tour-hotspot') && !e.target.closest('.tour-spot-drawer') && !e.target.closest('.tour-camera-hud')) {
        closeSpotDrawer();
      }
    });
  }

  // Registra eventos de scroll e sincronização inicial
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   4.1 REPRODUTOR DE VÍDEO DO INSTAGRAM & SELETOR DE MODOS (ESTÚDIO AO VIVO)
   ========================================================================== */
function initStudioVideoPlayer() {
  const video = document.getElementById('studioLiveVideo');
  const playBigBtn = document.getElementById('studioPlayBigBtn');
  const playPauseBtn = document.getElementById('studioPlayPauseBtn');
  const progressTrack = document.getElementById('studioProgressTrack');
  const progressFill = document.getElementById('studioProgressFill');
  const timeText = document.getElementById('studioTimeText');
  const soundBtn = document.getElementById('studioSoundBtn');
  const fullscreenBtn = document.getElementById('studioFullscreenBtn');

  const tabLiveVideo = document.getElementById('tabLiveVideo');
  const tabFabricSim = document.getElementById('tabFabricSim');
  const studioVideoWrap = document.getElementById('studioVideoWrap');
  const studioSimWrap = document.getElementById('studioSimWrap');
  const panelLiveVideo = document.getElementById('panelLiveVideo');
  const panelFabricSim = document.getElementById('panelFabricSim');
  const studioLiveTag = document.getElementById('studioLiveTag');
  const studioInstaChip = document.getElementById('studioInstaChip');

  if (!video) return;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updatePlayState(isPlaying) {
    if (isPlaying) {
      if (playBigBtn) playBigBtn.classList.add('is-hidden');
      if (playPauseBtn) {
        const iconPlay = playPauseBtn.querySelector('.icon-play');
        const iconPause = playPauseBtn.querySelector('.icon-pause');
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
        playPauseBtn.setAttribute('aria-label', 'Pausar vídeo');
      }
    } else {
      if (playBigBtn) playBigBtn.classList.remove('is-hidden');
      if (playPauseBtn) {
        const iconPlay = playPauseBtn.querySelector('.icon-play');
        const iconPause = playPauseBtn.querySelector('.icon-pause');
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
        playPauseBtn.setAttribute('aria-label', 'Reproduzir vídeo');
      }
    }
  }

  function togglePlay() {
    if (video.paused || video.ended) {
      video.play().then(() => {
        updatePlayState(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    } else {
      video.pause();
      updatePlayState(false);
    }
  }

  // Play/Pause handlers
  if (playBigBtn) {
    playBigBtn.addEventListener('click', togglePlay);
  }
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlay);
  }
  video.addEventListener('click', togglePlay);

  video.addEventListener('play', () => updatePlayState(true));
  video.addEventListener('pause', () => updatePlayState(false));

  // Time & Progress update
  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    if (progressFill) {
      progressFill.style.width = `${pct}%`;
    }
    if (progressTrack) {
      progressTrack.setAttribute('aria-valuenow', Math.round(pct).toString());
    }
    if (timeText) {
      timeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration || 32)}`;
    }
  });

  video.addEventListener('loadedmetadata', () => {
    if (timeText) {
      timeText.textContent = `0:00 / ${formatTime(video.duration || 32)}`;
    }
  });

  // Seeking on progress track
  if (progressTrack) {
    function seekToEvent(e) {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      if (width > 0 && video.duration) {
        const targetPct = Math.max(0, Math.min(1, clickX / width));
        video.currentTime = targetPct * video.duration;
      }
    }
    progressTrack.addEventListener('click', seekToEvent);
  }

  // Sound Toggle
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      const iconOn = soundBtn.querySelector('.icon-sound-on');
      const iconOff = soundBtn.querySelector('.icon-sound-off');
      if (video.muted) {
        if (iconOn) iconOn.style.display = 'none';
        if (iconOff) iconOff.style.display = 'block';
        soundBtn.setAttribute('aria-label', 'Ativar áudio');
      } else {
        if (iconOn) iconOn.style.display = 'block';
        if (iconOff) iconOff.style.display = 'none';
        soundBtn.setAttribute('aria-label', 'Desativar áudio');
      }
    });
  }

  // Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const target = studioVideoWrap || video;
      if (!document.fullscreenElement) {
        if (target.requestFullscreen) {
          target.requestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // Pause when off-screen to save performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          updatePlayState(false);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(video);
  }

  // Tab Switcher (Vídeo da Produção Real vs Simulador de Tecidos)
  if (tabLiveVideo && tabFabricSim) {
    tabLiveVideo.addEventListener('click', () => {
      tabLiveVideo.classList.add('active');
      tabLiveVideo.setAttribute('aria-selected', 'true');
      tabFabricSim.classList.remove('active');
      tabFabricSim.setAttribute('aria-selected', 'false');

      if (studioVideoWrap) studioVideoWrap.style.display = 'flex';
      if (panelLiveVideo) panelLiveVideo.style.display = 'block';
      if (studioSimWrap) studioSimWrap.style.display = 'none';
      if (panelFabricSim) panelFabricSim.style.display = 'none';

      if (studioLiveTag) {
        studioLiveTag.innerHTML = `
          <span class="studio-live-dot"></span>
          <span class="studio-live-text">Visualização ao Vivo</span>
          <span class="studio-live-sub">• Instagram Reel</span>
        `;
      }
      if (studioInstaChip) studioInstaChip.style.display = 'inline-flex';
    });

    tabFabricSim.addEventListener('click', () => {
      // Pause video when switching away
      if (!video.paused) {
        video.pause();
        updatePlayState(false);
      }

      tabFabricSim.classList.add('active');
      tabFabricSim.setAttribute('aria-selected', 'true');
      tabLiveVideo.classList.remove('active');
      tabLiveVideo.setAttribute('aria-selected', 'false');

      if (studioVideoWrap) studioVideoWrap.style.display = 'none';
      if (panelLiveVideo) panelLiveVideo.style.display = 'none';
      if (studioSimWrap) studioSimWrap.style.display = 'block';
      if (panelFabricSim) panelFabricSim.style.display = 'block';

      if (studioLiveTag) {
        studioLiveTag.innerHTML = `
          <span class="studio-live-dot" style="background: var(--c-gold); box-shadow: 0 0 10px var(--c-gold);"></span>
          <span class="studio-live-text">Simulador Interativo</span>
          <span class="studio-live-sub">• Luz Solar</span>
        `;
      }
      if (studioInstaChip) studioInstaChip.style.display = 'none';
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
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.101-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.352.226-.653.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.779-1.672-2.08-.176-.301-.019-.464.132-.614.136-.135.301-.352.452-.528.151-.176.201-.301.302-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.633-.929-2.235-.245-.586-.494-.506-.678-.515-.176-.009-.377-.01-.578-.01s-.528.075-.804.376c-.276.301-1.055 1.03-1.055 2.511 0 1.481 1.08 2.912 1.231 3.113.151.2 2.126 3.246 5.151 4.553.72.311 1.282.497 1.721.636.724.23 1.383.198 1.904.12.581-.088 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.176L2 22l4.954-1.399C8.423 21.536 10.156 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
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

