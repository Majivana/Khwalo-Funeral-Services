// main.js - Enhanced for Khwalo Funeral Services
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /* ========== Global Elements ========== */
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    /* ========== Scroll Effects ========== */
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        navbar?.classList.toggle('scrolled', scrollY > 50);
        
        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
        
        // Back to top visibility
        backToTopBtn?.classList.toggle('show', scrollY > 300);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    /* ========== Smooth Scroll ========== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            // Close mobile menu
            const collapse = document.querySelector('.navbar-collapse.show');
            if (collapse) {
                const toggle = document.querySelector('.navbar-toggler');
                toggle?.click();
            }
            
            const offset = target.offsetTop - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

    /* ========== Back to Top ========== */
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ========== Scroll Reveal ========== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .feature-card, .plan-card, .branch-card, .policy-card');
    
    if ('IntersectionObserver' in window && revealElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /* ========== Contact Form ========== */
    const contactForm = document.getElementById('contactForm');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        let isValid = true;
        this.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) return;
        
        // Submit logic
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2500);
        
        console.info('Contact form submitted:', data);
    });

    /* ========== Form Validation ========== */
    document.querySelectorAll('input[required], textarea[required]').forEach(field => {
        field.addEventListener('blur', function() {
            this.classList.toggle('is-invalid', !this.value.trim());
        });
        
        field.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });

    /* ========== Custom Testimonial Carousel ========== */
    const testimonialCarousel = document.querySelector('#testimonialCarousel1');
    
    if (testimonialCarousel) {
        const items = testimonialCarousel.querySelectorAll('.Carousel1-item');
        const indicators = testimonialCarousel.querySelectorAll('.Carousel1-indicators button');
        const prevBtn = testimonialCarousel.querySelector('.Carousel1-control-prev');
        const nextBtn = testimonialCarousel.querySelector('.Carousel1-control-next');
        
        let currentIndex = 0;
        let autoPlayInterval;
        
        function showSlide(index) {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }
        
        function nextSlide() {
            showSlide((currentIndex + 1) % items.length);
        }
        
        function prevSlide() {
            showSlide((currentIndex - 1 + items.length) % items.length);
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 6500);
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        prevBtn?.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        
        nextBtn?.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });
        
        testimonialCarousel.addEventListener('mouseenter', stopAutoPlay);
        testimonialCarousel.addEventListener('mouseleave', startAutoPlay);
        
        // Initialize
        showSlide(0);
        startAutoPlay();
    }

    /* ========== Lazy Loading Images ========== */
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window && lazyImages.length) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.dataset.src;
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '100px 0px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    /* ========== Image Error Fallback ========== */
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
        });
    });

    /* ========== Accessibility ========== */
    document.addEventListener('keydown', e => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    /* ========== WhatsApp Button ========== */
    const whatsappBtn = document.querySelector('.whatsapp-button');
    whatsappBtn?.addEventListener('click', () => {
        console.info('WhatsApp button clicked');
    });

    /* ========== Initialization ========== */
    console.info('Khwalo Funeral Services website initialized successfully');
});