document.addEventListener("DOMContentLoaded", () => {

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ================= NAV SHADOW ================= */
  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.style.boxShadow =
        window.scrollY > 10 ? "0 4px 20px rgba(0,0,0,0.08)" : "none";
    });
  }

  /* ================= HERO SLIDER ================= */
  const slides = document.querySelectorAll(".slide-card");
  if (slides.length > 0) {
    let index = 0;

    function setActive(i) {
      slides.forEach(s => s.classList.remove("active"));
      slides[i].classList.add("active");
    }

    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        index = i;
        setActive(index);
      });
    });

    setInterval(() => {
      index = (index + 1) % slides.length;
      setActive(index);
    }, 4500);

    setActive(index);
  }

  /* ================= REVEAL ================= */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));
  }

  /* ================= IMAGE MODAL ================= */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".image-modal-close");

  const images = document.querySelectorAll(
    ".illustration-grid img, .portfolio-grid img"
  );

  if (modal && modalImg && images.length > 0) {
    images.forEach(img => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        modal.classList.add("show");
        modalImg.src = img.src;
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("show");
    });
  }

    // CLOSE MODAL WITH ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  });

});
