const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentSlide = 0;

const audio = new Audio('love-song.mp3');
audio.loop = true;
let audioStarted = false;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');

  const heart = slides[index].querySelector('.heart');
  if (heart) {
    heart.style.opacity = 1;
    heart.classList.add('active');
  }

  startTypingEffect(index);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  startAudioOnce();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  startAudioOnce();
}

function startAudioOnce() {
  if (!audioStarted) {
    audio.play().catch(() => {});
    audioStarted = true;
  }
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

const startDate = new Date('2024-06-12T00:00:00');
const timerDiv = document.getElementById('timer');

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  if (timerDiv) {
    timerDiv.textContent = `${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд ❤️`;
  }
}
setInterval(updateTimer, 1000);
updateTimer();

function startTypingEffect(slideIndex) {
  const slide = slides[slideIndex];
  const elements = slide.querySelectorAll('[data-typing], h1, h2, h3, h4, h5, h6');

  elements.forEach(el => {
    const fullText = el.textContent;
    const lines = fullText.split('\n');
    el.textContent = '';
    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= lines.length) return;
      let charIndex = 0;
      const line = lines[lineIndex];
      const span = document.createElement('div');
      el.appendChild(span);

      function typeChar() {
        if (charIndex < line.length) {
          span.textContent += line.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 40);
        } else {
          lineIndex++;
          setTimeout(typeLine, 200);
        }
      }

      typeChar();
    }

    typeLine();
  });
}

const searchButton = document.querySelector('.search-box button');
if (searchButton) {
  searchButton.addEventListener('click', nextSlide);
  searchButton.addEventListener('click', startAudioOnce);
}

showSlide(currentSlide);

const heartsContainer = document.getElementById('hearts-container');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart-float');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (20 + Math.random() * 20) + 'px';
  heart.textContent = ['❤️', '💖', '💗'][Math.floor(Math.random() * 3)];
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 300);

const starsContainer = document.getElementById('stars-container');

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 3 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;
  starsContainer.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 5000);
}

setInterval(createStar, 100);

const candleBtn = document.getElementById('candleModeBtn');

candleBtn.addEventListener('click', () => {
  document.body.classList.toggle('candle-mode');

  if (document.querySelector('.candle-glow')) {
    document.querySelector('.candle-glow').remove();
  } else {
    const glow = document.createElement('div');
    glow.classList.add('candle-glow');
    document.body.appendChild(glow);
  }
});
