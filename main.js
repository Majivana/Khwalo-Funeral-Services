// Preloader: Hide after page is ready or timeout
document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const hidePreloader = () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match CSS transition duration
    };

    // Option 1: Hide as soon as DOM + critical resources are ready (fastest)
    

    // Option 2 (Recommended): Hide after **2 seconds MAX** to avoid long waits
    setTimeout(hidePreloader, 1000); // 👈 ADJUST THIS VALUE (in milliseconds)
});

// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ========================================
    // NAVIGATION & SCROLL EFFECTS
    // ========================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    // Navbar scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Show/hide back to top button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const toggle = document.querySelector('.navbar-toggler');
                    toggle.click();
                }
                
                // Smooth scroll
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
        
    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .feature-card, .plan-card, .branch-card, .testimonial-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ========================================
    // HERO CAROUSEL ENHANCEMENTS
    // ========================================
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        // Pause on hover
        heroCarousel.addEventListener('mouseenter', () => {
            const carousel = bootstrap.Carousel.getInstance(heroCarousel);
            carousel.pause();
        });
        
        heroCarousel.addEventListener('mouseleave', () => {
            const carousel = bootstrap.Carousel.getInstance(heroCarousel);
            carousel.cycle();
        });
        
        // Add animation reset on slide change
        heroCarousel.addEventListener('slide.bs.carousel', (e) => {
            const nextSlide = e.relatedTarget;
            const animatedElements = nextSlide.querySelectorAll('.animate-fade-in, .delay-1, .delay-2');
            
            animatedElements.forEach((el, index) => {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = null;
                }, 10);
            });
        });
    }
    
    // ========================================
    // FORM VALIDATION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
                submitBtn.classList.add('btn-success');
                submitBtn.disabled = true;
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.disabled = false;
                }, 3000);
                
                // Log form data (replace with actual API call)
                console.log('Form submitted:', data);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
    
    // ========================================
    // WHATSAPP BUTTON
    // ========================================
    const whatsappBtn = document.querySelector('.whatsapp-button');
    if (whatsappBtn) {
        // Track clicks
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
            // Add tracking here
        });
    }
    
    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1565900102781-9b0090a3cc31?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // ========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ========================================
    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Ensure focus is visible
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Add focus-visible polyfill styles
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-nav *:focus {
            outline: 2px solid var(--royal-red) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // ANALYTICS & TRACKING
    // ========================================
    // Track page views
    const trackPageView = (page) => {
        console.log('Page view:', page);
        // Add Google Analytics or other tracking here
    };
    
    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                console.log('Section viewed:', sectionId);
                // Add section tracking here
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        if (section.id) {
            sectionObserver.observe(section);
        }
    });
    
    // Track button clicks
    document.querySelectorAll('a[href="#join"], .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            console.log('Button clicked:', text);
            // Add button tracking here
        });
    });
    
    // ========================================
    // TESTIMONIALS CAROUSEL
    // ========================================
    // Initialize Bootstrap Carousel
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 3000,
            wrap: true,
            pause: 'hover'
        });
        
        // Scroll Animation for Cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.animate-on-scroll').forEach(card => {
            observer.observe(card);
        });
    }
    
    // ========================================
    // ERROR HANDLING
    // ========================================
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // Add error reporting here
    });
    
    // Handle broken images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        });
    });
    
    console.log('Khwalo Funeral Services website initialized successfully');
});