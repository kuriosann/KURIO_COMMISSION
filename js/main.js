// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Navbar shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// Portfolio image modal preview
const images = document.querySelectorAll('.grid img');

const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <span class="close">&times;</span>
  <img class="modal-img" />
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('.modal-img');
const closeBtn = modal.querySelector('.close');

images.forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.add('active');
    modalImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

const cards = document.querySelectorAll(".slide-card");
let index = 0;

function setActive(i) {
  cards.forEach(card => card.classList.remove("active"));
  cards[i].classList.add("active");
}

// click
cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    index = i;
    setActive(index);
  });
});

// auto slide
setInterval(() => {
  index = (index + 1) % cards.length;
  setActive(index);
}, 4500);

// init
setActive(index);

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

reveals.forEach(r => observer.observe(r));
