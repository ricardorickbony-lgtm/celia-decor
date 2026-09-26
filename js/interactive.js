/**
 * CÉLIA DECOR — LUXURY & IMMERSIVE LIVING
 * Interactive Modules & Simulators
 */

document.addEventListener('DOMContentLoaded', () => {
  initFabricSimulator();
  initAutomationSimulator();
});

/* ==========================================================================
   Simulador Interativo de Tecidos & Ondulações
   ========================================================================== */
function initFabricSimulator() {
  const displayImg = document.getElementById('simDisplayImg');
  const ambientLight = document.getElementById('simAmbientLight');
  const specTitle = document.getElementById('simSpecTitle');
  const specDesc = document.getElementById('simSpecDesc');
  const lightSlider = document.getElementById('lightSlider');

  if (!displayImg || !specTitle) return;

  const specs = {
    wave: {
      title: "Prega Wave (Ondulação Suave Contínua)",
      desc: "Caimento fluido e contemporâneo em ondas simétricas perfeitas. Ideal para pés-direitos duplos, cortineiros iluminados e salas de estar amplas."
    },
    femea: {
      title: "Prega Fêmea (Elegância Clássica Embutida)",
      desc: "Volume discreto com dobras voltadas para dentro. Oferece visual limpo, sofisticado e estético superior para quartos e salas de jantar refinadas."
    },
    suico: {
      title: "Trilho Suíço com Forro Blackout",
      desc: "Deslizamento silencioso com bloqueio térmico e luminoso total. Projetado para quem busca privacidade absoluta e conforto acústico."
    }
  };

  const fabrics = {
    linho: {
      filter: "contrast(102%) brightness(98%) sepia(8%)",
      label: "Linho Puro Rústico"
    },
    voil: {
      filter: "contrast(95%) brightness(115%) opacity(0.88)",
      label: "Voil Suíço Translúcido"
    },
    blackout: {
      filter: "contrast(115%) brightness(82%)",
      label: "Tecido Acetinado Blackout"
    }
  };

  let currentPleat = 'wave';
  let currentFabric = 'linho';

  // Seletor de Pregas
  document.querySelectorAll('.pleat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.pleat-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentPleat = e.target.dataset.pleat;
      updateSimulator();
    });
  });

  // Seletor de Tecidos
  document.querySelectorAll('.fabric-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.fabric-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFabric = e.target.dataset.fabric;
      updateSimulator();
    });
  });

  // Controle de Luz Natural
  if (lightSlider) {
    lightSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      applyLighting(val);
    });
  }

  function applyLighting(val) {
    if (!ambientLight) return;
    // 0 = Noite, 50 = Pôr do sol, 100 = Dia claro
    if (val < 33) {
      ambientLight.style.background = 'radial-gradient(circle at 50% 30%, rgba(255, 230, 200, 0.08) 0%, rgba(10, 12, 16, 0.65) 100%)';
    } else if (val < 66) {
      ambientLight.style.background = 'radial-gradient(circle at 50% 30%, rgba(255, 210, 160, 0.25) 0%, rgba(30, 25, 20, 0.35) 100%)';
    } else {
      ambientLight.style.background = 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.15) 100%)';
    }
  }

  function updateSimulator() {
    if (specs[currentPleat]) {
      specTitle.textContent = `${specs[currentPleat].title} • ${fabrics[currentFabric].label}`;
      specDesc.textContent = specs[currentPleat].desc;
    }
    if (displayImg) {
      displayImg.style.filter = fabrics[currentFabric].filter;
    }
  }
}

/* ==========================================================================
   Simulador de Automação & Motorização
   ========================================================================== */
function initAutomationSimulator() {
  const curtainLeft = document.getElementById('autoCurtainLeft');
  const curtainRight = document.getElementById('autoCurtainRight');
  const lightOverlay = document.getElementById('autoLightOverlay');
  const autoSlider = document.getElementById('autoSlider');
  const autoPercent = document.getElementById('autoPercent');

  if (!autoSlider || !curtainLeft || !curtainRight) return;

  autoSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value); // 0 (fechado) a 100 (aberto)
    if (autoPercent) autoPercent.textContent = `${val}%`;

    // Movimenta cortinas
    const leftPos = -val * 0.45;
    const rightPos = -val * 0.45;

    curtainLeft.style.transform = `translateX(${leftPos}%) scaleX(${1 - (val * 0.005)})`;
    curtainRight.style.transform = `translateX(${-rightPos}%) scaleX(${1 - (val * 0.005)})`;

    // Ajusta incidência de luz
    if (lightOverlay) {
      lightOverlay.style.opacity = (val / 100) * 0.75;
    }
  });
}
