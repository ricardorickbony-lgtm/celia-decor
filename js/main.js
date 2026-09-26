/**
 * CÉLIA DECOR — LUXURY & IMMERSIVE LIVING
 * Main JavaScript Controller
 * Severino & Ricardo Standard
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initSmartWhatsApp();
  initScrollAnimations();
});

/* ==========================================================================
   Header Inteligente (Sticky com Blur e Redução de Tamanho)
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   Menu Mobile Clean
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  });

  // Fecha menu ao clicar em links
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });
  });
}

/* ==========================================================================
   Botão Inteligente de WhatsApp 2.0 (Regra Oficial Severino & Ricardo)
   Sincronizado com os Horários Oficiais da Célia Decor:
   - Segunda a Sexta: 08:30 às 17:30
   - Sábado: 09:00 às 13:00
   - Domingo: Fechado
   ========================================================================== */
function initSmartWhatsApp() {
  const waContainer = document.querySelector('.smart-whatsapp-container');
  if (!waContainer) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + (minutes / 60);

  let isOnline = false;
  let statusText = "Online agora • Consultoria";
  let messageText = "Olá! Gostaria de agendar uma consultoria exclusiva na Célia Decor.";

  // Segunda a Sexta: 08:30 às 17:30 (8.5 a 17.5)
  if (day >= 1 && day <= 5) {
    if (currentTime >= 8.5 && currentTime < 17.5) {
      isOnline = true;
      statusText = "Online agora • Atendimento VIP";
    } else {
      isOnline = false;
      statusText = "Fora do Expediente • Deixe mensagem";
      messageText = "Olá! Vi o site fora do horário de atendimento e gostaria de receber contato no próximo expediente da Célia Decor.";
    }
  } 
  // Sábado: 09:00 às 13:00 (9.0 a 13.0)
  else if (day === 6) {
    if (currentTime >= 9.0 && currentTime < 13.0) {
      isOnline = true;
      statusText = "Showroom Aberto • Até 13h";
    } else {
      isOnline = false;
      statusText = "Showroom Fechado • Deixe recado";
      messageText = "Olá! Vi o site no final de semana e gostaria de agendar uma visita ou consultoria com a Célia Decor na segunda-feira.";
    }
  } 
  // Domingo
  else {
    isOnline = false;
    statusText = "Fechado aos Domingos • Envie recado";
    messageText = "Olá! Vi o site no domingo e gostaria de receber um contato exclusivo da equipe Célia Decor no início da semana.";
  }

  const phone = "5511963188104";
  const encodedMsg = encodeURIComponent(messageText);
  const waLink = `https://wa.me/${phone}?text=${encodedMsg}`;

  waContainer.innerHTML = `
    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="smart-whatsapp-btn ${isOnline ? 'online' : 'offline'}" aria-label="Falar no WhatsApp com Célia Decor">
      <div class="whatsapp-icon-circle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.066-2.124-.528-1.503-.623-2.485-2.148-2.56-2.247-.074-.099-.607-.808-.607-1.543s.385-1.101.521-1.251c.137-.15.299-.187.399-.187.1 0 .2.001.288.006.096.004.225-.036.35.267.136.326.467 1.139.508 1.222.041.083.069.18.014.288-.056.108-.084.175-.167.272-.083.097-.175.217-.25.291-.083.082-.17.172-.073.339.097.167.433.714.928 1.155.637.568 1.175.743 1.342.826.167.083.264.069.362-.042.097-.111.417-.485.528-.652.111-.166.222-.139.375-.083.153.055.972.458 1.139.541.167.084.278.125.319.195.042.069.042.405-.102.81zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.176L2 22l4.954-1.399C8.423 21.536 10.156 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
        </svg>
      </div>
      <div class="whatsapp-text-block">
        <span class="whatsapp-title">Célia Decor</span>
        <span class="whatsapp-status-badge">
          <span class="status-dot ${isOnline ? 'pulse' : ''}"></span>
          ${statusText}
        </span>
      </div>
    </a>
  `;
}

/* ==========================================================================
   Animações de Scroll Suaves (Clean & Sofisticadas)
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
