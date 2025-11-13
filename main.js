// main.js - unified, clean, and enhanced with Carousel1 testimonial support
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ===============================
     GLOBAL ELEMENTS
  =============================== */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const heroCarousel = document.getElementById('heroCarousel');
  const testimonialCarousel = document.getElementById('testimonialCarousel');
  const backToTopBtn = document.getElementById('backToTopBtn') || null;

  /* ===============================
     NAV SCROLL EFFECTS
  =============================== */
  function handleScroll() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Update active nav link
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    // Back-to-top visibility
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('show', window.scrollY > 300);
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ===============================
     SMOOTH SCROLL LINKS
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      // Close mobile menu if open
      const collapse = document.querySelector('.navbar-collapse.show');
      if (collapse) {
        const toggle = document.querySelector('.navbar-toggler');
        if (toggle) toggle.click();
      }

      const offset = target.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ===============================
     BACK TO TOP BUTTON
  =============================== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===============================
     SCROLL REVEAL ANIMATIONS
  =============================== */
  const revealSelector = '.reveal-on-scroll, .feature-card, .plan-card, .branch-card, .testimonial-card, .animate-on-scroll';
  const revealElements = document.querySelectorAll(revealSelector);

  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => observer.observe(el));
  }

  /* ===============================
     HERO CAROUSEL (Bootstrap)
  =============================== */
  if (heroCarousel && window.bootstrap && bootstrap.Carousel) {
    try {
      const hero = bootstrap.Carousel.getOrCreateInstance(heroCarousel, { interval: 5000, ride: 'carousel', pause: 'hover' });
      heroCarousel.addEventListener('mouseenter', () => hero.pause());
      heroCarousel.addEventListener('mouseleave', () => hero.cycle());
      heroCarousel.addEventListener('slide.bs.carousel', e => {
        const next = e.relatedTarget;
        if (next) {
          const animEls = next.querySelectorAll('.animate-fade-in, .delay-1, .delay-2, .animate-slide-left, .animate-slide-right');
          animEls.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth;
            el.style.animation = '';
          });
        }
      });
    } catch (err) {
      console.warn('Hero carousel init issue:', err);
    }
  }

  /* ===============================
     CONTACT FORM VALIDATION
  =============================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;
      const required = contactForm.querySelectorAll('[required]');

      required.forEach(field => {
        const val = field.value.trim();
        if (!val) {
          field.classList.add('is-invalid');
          isValid = false;
        } else {
          field.classList.remove('is-invalid');
        }
        if (field.type === 'email' && val) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!re.test(val)) {
            field.classList.add('is-invalid');
            isValid = false;
          }
        }
      });

      if (!isValid) return;

      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
        btn.classList.add('btn-success');
        btn.disabled = true;
        setTimeout(() => {
          contactForm.reset();
          btn.innerHTML = original;
          btn.classList.remove('btn-success');
          btn.disabled = false;
        }, 2000);
      }
      console.info('Contact form submitted (demo)');
    });

    contactForm.querySelectorAll('input,textarea').forEach(inp => {
      inp.addEventListener('blur', function () {
        if (this.required && !this.value.trim()) this.classList.add('is-invalid');
        else this.classList.remove('is-invalid');
      });
      inp.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  }

  /* ===============================
     WHATSAPP BUTTON LOG
  =============================== */
  const whatsappBtn = document.querySelector('.whatsapp-button');
  if (whatsappBtn) whatsappBtn.addEventListener('click', () => console.log('WhatsApp button clicked'));

  /* ===============================
     IMAGE LAZY LOADING
  =============================== */
  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window && images.length) {
      const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const dataSrc = img.dataset.src;
            if (dataSrc && img.src !== dataSrc) img.src = dataSrc;
            imgObserver.unobserve(img);
          }
        });
      }, { rootMargin: '100px 0px' });
      images.forEach(img => imgObserver.observe(img));
    }
  }
  initLazyLoad();

  /* ===============================
     PRELOAD CRITICAL IMAGES
  =============================== */
  ['images/hero1.webp', 'images/hero2.webp'].forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  /* ===============================
     CUSTOM TESTIMONIAL SLIDER (Carousel1)
  =============================== */
  const carousel = document.querySelector('#testimonialCarousel1');
if (carousel) {
  const items = carousel.querySelectorAll('.Carousel1-item');
  const indicators = carousel.querySelectorAll('.Carousel1-indicators button');
  const prev = carousel.querySelector('.Carousel1-control-prev');
  const next = carousel.querySelector('.Carousel1-control-next');
  let index = 0;
  const interval = 6500;
  let autoPlay;

  // Show slide by index
  const showSlide = (i) => {
    items.forEach((item, idx) => item.classList.toggle('active', idx === i));
    indicators.forEach((btn, idx) => btn.classList.toggle('active', idx === i));
    index = i;
  };

  // Next/Prev slides
  const nextSlide = () => showSlide((index + 1) % items.length);
  const prevSlide = () => showSlide((index - 1 + items.length) % items.length);

  // Reset autoplay
  const resetAutoPlay = () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, interval);
  };

  // Event listeners
  next?.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  prev?.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
  indicators.forEach((btn, i) => btn.addEventListener('click', () => { showSlide(i); resetAutoPlay(); }));

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carousel.addEventListener('mouseleave', () => resetAutoPlay());

  // Initialize
  showSlide(index);
  autoPlay = setInterval(nextSlide, interval);
}


  /* ===============================
     IMAGE ERROR FALLBACK
  =============================== */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      this.src =
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgdmVyc2lvbj0iMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAuNSUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzYzNzU3ZCI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
    });
  });

  /* ===============================
     ACCESSIBILITY ENHANCEMENTS
  =============================== */
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
  });
  document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));

  /* ===============================
     LOG INITIALIZATION
  =============================== */
  console.info('Main script initialized successfully with Carousel1 support');
});
