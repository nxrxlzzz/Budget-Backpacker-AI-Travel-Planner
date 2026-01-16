// ================================
// BUDGET BACKPACKER - APP.JS
// ================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ================================
// INITIALIZATION
// ================================

function initializeApp() {
    setupNavigation();
    setupCTAButtons();
    setupModal();
    setupSmoothScroll();
    setupScrollAnimations();
}

// ================================
// NAVIGATION SETUP
// ================================

function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(event) {
        const isClickInsideNav = hamburger.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ================================
// CTA BUTTON SETUP
// ================================

function setupCTAButtons() {
    const ctaButton = document.getElementById('ctaButton');
    const ctaButtonLarge = document.getElementById('ctaButtonLarge');

    if (ctaButton) {
        ctaButton.addEventListener('click', openChatbot);
    }

    if (ctaButtonLarge) {
        ctaButtonLarge.addEventListener('click', openChatbot);
    }
}

// ================================
// MODAL (CHATBOT) SETUP
// ================================

function setupModal() {
    const modal = document.getElementById('chatbotModal');
    const modalClose = document.getElementById('modalClose');

    if (modalClose) {
        modalClose.addEventListener('click', closeChatbot);
    }

    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeChatbot();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeChatbot();
        }
    });
}

function openChatbot() {
    const modal = document.getElementById('chatbotModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
    logAnalytics('chatbot_opened');
}

function closeChatbot() {
    const modal = document.getElementById('chatbotModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore body scroll
}

// ================================
// SMOOTH SCROLL FOR NAVIGATION
// ================================

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// SCROLL ANIMATIONS
// ================================

function setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .step');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// ================================
// ANALYTICS
// ================================

function logAnalytics(eventName, eventData = {}) {
    // Google Analytics (if implemented)
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }

    // Console log for debugging
    console.log(`Event: ${eventName}`, eventData);
}

// ================================
// TYPING ANIMATION
// ================================

function setupTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    const words = text.split(' ');
    
    typingElement.textContent = '';
    let wordIndex = 0;

    function typeWord() {
        if (wordIndex < words.length) {
            if (wordIndex > 0) {
                typingElement.textContent += ' ';
            }
            
            const word = words[wordIndex];
            typingElement.textContent += word;
            
            // Add cursor effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 0.7s infinite';
            
            wordIndex++;
            setTimeout(typeWord, 500);
        } else {
            // Remove cursor at end
            const cursor = typingElement.querySelector('span');
            if (cursor) cursor.remove();
        }
    }

    typeWord();
}

// Call typing animation on load
window.addEventListener('load', setupTypingAnimation);

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Lazy load images (if needed in future)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

// ================================
// ACCESSIBILITY HELPERS
// ================================

// Keyboard navigation for modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('cta-button')) {
            focusedElement.click();
        }
    }
});

// ================================
// UTILITY FUNCTIONS
// ================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Handle window resize
const handleResize = debounce(function() {
    // Add responsive behavior if needed
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// ================================
// SCROLL POSITION TRACKING
// ================================

let scrolling = false;

window.addEventListener('scroll', function() {
    if (!scrolling) {
        scrolling = true;
        // Throttle scroll event
        setTimeout(() => {
            scrolling = false;
        }, 100);
    }
});

// ================================
// SERVICE WORKER (OPTIONAL)
// ================================

// Register service worker for offline support (optional)
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// ================================
// LOCAL STORAGE HELPERS
// ================================

function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`budgetbackpacker_${key}`, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage not available:', e);
    }
}

function getUserPreference(key, defaultValue = null) {
    try {
        const stored = localStorage.getItem(`budgetbackpacker_${key}`);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.warn('LocalStorage not available:', e);
        return defaultValue;
    }
}

// Track user's first visit
function trackFirstVisit() {
    const hasVisited = getUserPreference('has_visited');
    if (!hasVisited) {
        saveUserPreference('has_visited', true);
        logAnalytics('first_visit');
    }
}

trackFirstVisit();

// ================================
// READY STATE LOGGING
// ================================

console.log('Budget Backpacker App Initialized');
console.log('Ready to help travelers plan their adventures!');
