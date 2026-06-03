let currentSlide = 1;
const totalSlides = 25;

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
