// Terai Gold Website JavaScript
// Handles all interactions, animations, and scroll effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initTestimonials();
    initSmoothScrolling();
    initParallaxEffects();
    initNavigationEffects();
    
    console.log('Terai Gold website initialized');
});

// Testimonials Data
const testimonials = [
    {
        name: "Ramesh Chaudhary",
        role: "Terai Farmer",
        location: "Chitwan, Nepal",
        quote: "Working with Terai Gold has transformed our farming community. They pay fair prices and help us maintain organic practices that our ancestors would be proud of.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Priya Sharma",
        role: "Home Chef",
        location: "Kathmandu, Nepal", 
        quote: "The authentic taste of Terai Gold mustard oil brings back memories of my grandmother's cooking. It's pure, flavorful, and you can taste the difference in every dish.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Dr. Suresh Basnet",
        role: "Nutritionist",
        location: "Pokhara, Nepal",
        quote: "I recommend Terai Gold to my patients seeking healthy cooking oils. The cold-pressing method preserves essential nutrients that are often lost in commercial processing.",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Maya Tamang",
        role: "Restaurant Owner",
        location: "Bhaktapur, Nepal",
        quote: "Our customers always compliment the authentic flavors in our traditional dishes. Terai Gold mustard oil is our secret ingredient that makes all the difference.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    }
];

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('features-grid')) {
                    animateFeatureCards(entry.target);
                }
                if (entry.target.classList.contains('products-grid')) {
                    animateProductCards(entry.target);
                }
                if (entry.target.classList.contains('process-steps')) {
                    animateProcessSteps(entry.target);
                }
                if (entry.target.classList.contains('sustainability-grid')) {
                    animateSustainabilityCards(entry.target);
                }
            }
        });
    }, observerOptions);

    // Add scroll animation classes to elements
    const animatedElements = [
        '.section-header',
        '.vision-text',
        '.vision-image',
        '.features-grid',
        '.products-grid',
        '.process-steps',
        '.process-image',
        '.sustainability-grid',
        '.sustainability-cta',
        '.testimonial-main',
        '.footer-content'
    ];

    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    });
}

// Staggered Animations
function animateFeatureCards(container) {
    const cards = container.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease-out forwards`;
        }, index * 200);
    });
}

function animateProductCards(container) {
    const cards = container.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.8s ease-out forwards`;
        }, index * 300);
    });
}

function animateProcessSteps(container) {
    const steps = container.querySelectorAll('.process-step');
    const connectors = container.querySelectorAll('.step-connector');
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.animation = `fadeInLeft 0.8s ease-out forwards`;
        }, index * 200);
    });
    
    connectors.forEach((connector, index) => {
        setTimeout(() => {
            connector.style.animation = `scaleY 0.6s ease-out forwards`;
            connector.style.transformOrigin = 'top';
        }, (index + 1) * 200 + 400);
    });
}

function animateSustainabilityCards(container) {
    const cards = container.querySelectorAll('.sustainability-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `fadeInUp 0.6s ease-out forwards`;
        }, index * 200);
    });
}

// Testimonials Functionality
function initTestimonials() {
    let currentTestimonial = 0;
    const testimonialCard = document.querySelector('.testimonial-card');
    const quote = testimonialCard.querySelector('.testimonial-quote');
    const avatar = testimonialCard.querySelector('.author-avatar');
    const name = testimonialCard.querySelector('.author-name');
    const role = testimonialCard.querySelector('.author-role');
    const location = testimonialCard.querySelector('.author-location');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const indicatorsContainer = document.getElementById('testimonialIndicators');

    // Create indicators
    testimonials.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => showTestimonial(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = indicatorsContainer.querySelectorAll('.indicator');

    function showTestimonial(index) {
        const testimonial = testimonials[index];
        
        // Update content with fade effect
        testimonialCard.style.opacity = '0.5';
        
        setTimeout(() => {
            quote.textContent = `"${testimonial.quote}"`;
            avatar.src = testimonial.avatar;
            avatar.alt = testimonial.name;
            name.textContent = testimonial.name;
            role.textContent = testimonial.role;
            location.textContent = testimonial.location;
            
            testimonialCard.style.opacity = '1';
        }, 200);

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prev);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Auto-advance testimonials
    setInterval(nextTestimonial, 8000);

    // Initialize first testimonial
    showTestimonial(0);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll to top functionality for hero button and scroll indicator
    const heroBtn = document.querySelector('.hero-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            document.getElementById('vision').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.getElementById('vision').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Floating elements animation based on scroll
        const floatingElements = document.querySelectorAll('.floating-element, .rotating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const rotation = scrolled * speed;
            element.style.transform = `rotate(${rotation}deg)`;
        });
    });
}

// Navigation Effects
function initNavigationEffects() {
    // Add scroll effect to header if it exists
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Update scroll indicator opacity
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - scrolled / 300);
            scrollIndicator.style.opacity = opacity;
        }
    });
}

// Interactive Button Effects
document.addEventListener('click', function(e) {
    // Add ripple effect to buttons
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        createRippleEffect(button, e);
    }
});

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes scaleY {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
    }
`;
document.head.appendChild(style);

// Newsletter Form Handling
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('newsletter-form') || e.target.closest('.newsletter-form')) {
        e.preventDefault();
        const form = e.target.classList.contains('newsletter-form') ? e.target : e.target.closest('.newsletter-form');
        const input = form.querySelector('.newsletter-input');
        const button = form.querySelector('.newsletter-btn');
        
        if (input.value.trim()) {
            // Simulate newsletter subscription
            button.textContent = 'Subscribed!';
            button.style.background = '#22c55e';
            input.value = '';
            
            setTimeout(() => {
                button.textContent = 'Subscribe';
                button.style.background = '';
            }, 3000);
        }
    }
});

// Product Notification Handling
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Added to Notifications!';
        this.style.background = '#22c55e';
        this.style.borderColor = '#22c55e';
        this.style.color = 'white';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
            this.style.borderColor = '';
            this.style.color = '';
        }, 2000);
    });
});

// Performance Optimizations
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

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(function() {
    // Additional scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
initLazyLoading();

// Console welcome message
console.log(`
    🌾 Welcome to Terai Gold 🌾
    Pure. Powerful. Terai Gold.
    
    Premium cold-pressed mustard oil from Nepal's Terai region.
    
    Website features:
    ✓ Smooth scroll animations
    ✓ Interactive testimonials
    ✓ Responsive design
    ✓ Optimized performance
`);

// Export functions for potential external use
window.TeraiGold = {
    showTestimonial: function(index) {
        const event = new CustomEvent('showTestimonial', { detail: { index } });
        document.dispatchEvent(event);
    },
    scrollToSection: function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};