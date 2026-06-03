let currentSlide = 1;
const totalSlides = 24;

function showSlide(n) {
  if (n < 1) n = 1;
  if (n > totalSlides) n = totalSlides;

  // Remove active from all
  document.querySelectorAll('.slide').forEach(slide => slide.classList.remove('active'));
  
  // Activate target
  const target = document.getElementById(`slide-${n}`);
  if (target) {
    target.classList.add('active');
    currentSlide = n;
    
    // Update progress bar specifically inside the active slide
    const progressBar = target.querySelector('.progress-fill');
    if (progressBar) {
      progressBar.style.width = `${(n / totalSlides) * 100}%`;
    }
  }
}

function nextSlide() { 
  showSlide(currentSlide + 1); 
}

function prevSlide() { 
  showSlide(currentSlide - 1); 
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    nextSlide();
  }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    prevSlide();
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => showSlide(1));
// ===== CONTROLE DA APLICAÇÃO EM TELA CHEIA =====
function openApp() {
  document.getElementById('app-overlay').classList.add('active');
}

function closeApp() {
  document.getElementById('app-overlay').classList.remove('active');
}

// Opcional: Permitir fechar a aplicação apertando a tecla 'Esc'
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('app-overlay');
    if (overlay.classList.contains('active')) {
      closeApp();
    }
  }
});
// ===== SUPORTE A GESTOS DE TOQUE (SWIPE) =====
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Detecta início do toque em toda a área dos slides
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50; // Distância mínima para considerar swipe
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;
  
  // Verifica se o movimento foi predominantemente horizontal
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        // Swipe para esquerda → próximo slide
        nextSlide();
      } else {
        // Swipe para direita → slide anterior
        prevSlide();
      }
    }
  }
}

// ===== PREVENIR ZOOM E SCROLL EM MOBILE =====
// Impede zoom de pinça e scroll indesejado durante a apresentação
document.addEventListener('touchmove', (e) => {
  if (e.scale !== 1) { 
    e.preventDefault(); 
  }
}, { passive: false });

// ===== CORREÇÃO PARA CLIQUES EM MOBILE =====
// Garante que os botões respondam ao touch imediatamente
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('touchend', function(e) {
    e.preventDefault(); // Previne delay do clique em mobile
    e.stopPropagation(); // Evita disparar o swipe
    this.click(); // Simula o clique
  });
});

// ===== SUPORTE PARA BOTÃO VOLTAR DO NAVEGADOR MOBILE =====
// Permite que o botão voltar do navegador funcione entre slides
window.addEventListener('popstate', () => {
  prevSlide();
});

// Atualiza o histórico ao navegar entre slides
const originalShowSlide = showSlide;
showSlide = function(n) {
  if (n < 1) n = 1;
  if (n > totalSlides) n = totalSlides;
  
  // Adiciona estado ao histórico apenas se for navegação forward
  if (n > currentSlide) {
    history.pushState({ slide: n }, '', `#slide-${n}`);
  }
  
  originalShowSlide(n);
};
