// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Classes Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const targetTab = btn.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission handling
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const telefono = formData.get('telefono');
        const interes = formData.get('interes');
        const mensaje = formData.get('mensaje');
        
        // Create WhatsApp message
        const whatsappMessage = `Hola! Me interesa conocer más sobre ${interes}.\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp
        window.open(`https://wa.me/+50236646602?text=${encodedMessage}`, '_blank');
        
        // Show success message
        showNotification('¡Mensaje enviado! Te contactaremos pronto por WhatsApp.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.event-card, .team-member, .location-card, .class-card, .timeline-item, .stat-item');
    animateElements.forEach(el => observer.observe(el));
});

// Video controls
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Ensure video plays on mobile
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play().catch(e => {
            console.log('Video autoplay failed:', e);
        });
    });
    
    // Pause video when not visible (performance optimization)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play();
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(heroVideo);
}

// Enhanced image loading
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Force reload if image failed to load
            if (!img.complete || img.naturalHeight === 0) {
                const originalSrc = img.src;
                img.src = '';
                img.src = originalSrc;
            }
            
            img.onload = () => {
                img.style.opacity = '1';
                img.style.animation = 'fadeInImage 0.3s ease forwards';
            };
            
            img.onerror = () => {
                console.log('Failed to load image:', img.src);
                img.style.opacity = '0.3';
                img.alt = 'Imagen no disponible';
            };
            
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

images.forEach(img => {
    // Immediate load for eager images
    if (img.loading === 'eager') {
        img.style.opacity = '1';
    }
    imageObserver.observe(img);
});

// Add loading states for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Don't add loading state for navigation links
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            return;
        }
        
        // Add loading state for external links and forms
        if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            this.style.pointerEvents = 'none';
            
            // Reset after a short delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Add hover effects for cards
document.querySelectorAll('.event-card, .team-member, .location-card, .class-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click tracking for analytics (placeholder)
function trackEvent(eventName, eventData = {}) {
    // This would integrate with Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Track button clicks
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (target) {
        if (target.href && target.href.includes('wa.me')) {
            trackEvent('whatsapp_click', { source: target.textContent.trim() });
        } else if (target.href && target.href.includes('instagram.com')) {
            trackEvent('instagram_click', { source: target.textContent.trim() });
        } else if (target.classList.contains('btn-primary')) {
            trackEvent('cta_click', { text: target.textContent.trim() });
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Header background change logic (already implemented above)
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Image failed to load:', e.target.src);
        // Could add fallback image logic here
    } else if (e.target.tagName === 'VIDEO') {
        console.log('Video failed to load:', e.target.src);
        // Could add fallback content here
    }
});

// Events Carousel
class EventsCarousel {
    constructor() {
        this.carousel = document.getElementById('eventsCarousel');
        this.cards = document.querySelectorAll('.event-card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.setupInitialState();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    setupInitialState() {
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            if (index === 0) {
                card.classList.add('active');
            } else if (index === this.totalCards - 1) {
                card.classList.add('prev');
            } else if (index === 1) {
                card.classList.add('next');
            }
        });
        
        this.updateIndicators();
        this.updateButtons();
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Card click to navigate
        this.cards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A' && !card.classList.contains('active')) {
                    this.goToSlide(index);
                }
            });
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
    }
    
    previousSlide() {
        if (this.isAnimating) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isAnimating = true;
        
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                card.classList.add('active');
            } else if (index === (this.currentIndex - 1 + this.totalCards) % this.totalCards) {
                card.classList.add('prev');
            } else if (index === (this.currentIndex + 1) % this.totalCards) {
                card.classList.add('next');
            }
            
            // Ensure images are loaded and visible
            const img = card.querySelector('img');
            if (img && !img.complete) {
                img.onload = () => {
                    img.style.opacity = '1';
                };
            }
        });
        
        this.updateIndicators();
        this.updateButtons();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    updateButtons() {
        // Buttons are always enabled for circular navigation
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
    }
    
    startAutoPlay() {
        setInterval(() => {
            if (!this.isAnimating) {
                this.nextSlide();
            }
        }, 5000); // Auto-advance every 5 seconds
    }
}

// Event Cards Animations
function initEventCardsAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Hover effects with enhanced animations
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) return;
            
            // Add floating animation to status badge
            const status = this.querySelector('.event-status');
            if (status) {
                status.style.animation = 'float 2s ease-in-out infinite';
            }
            
            // Add pulse effect to year badge
            const year = this.querySelector('.event-year');
            if (year) {
                year.style.animation = 'pulse 1.5s ease-in-out infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove animations
            const status = this.querySelector('.event-status');
            const year = this.querySelector('.event-year');
            if (status) status.style.animation = 'none';
            if (year) year.style.animation = 'none';
        });
    });
}

// Add CSS animations for event cards
function addEventCardAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .event-card {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        .event-card .event-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255, 105, 180, 0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
            z-index: 1;
        }
        
        .event-card:hover .event-image::before {
            transform: translateX(100%);
        }
        
        .event-actions .btn {
            position: relative;
            overflow: hidden;
        }
        
        .event-actions .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .event-actions .btn:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Elidanza website loaded successfully!');
    
    // Initialize events carousel
    new EventsCarousel();
    
    // Initialize event cards animations
    initEventCardsAnimations();
    addEventCardAnimations();
    
    // Add any initialization code here
    // For example, checking if user is on mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        document.body.classList.add('mobile');
    }
    
    // Add viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
});

