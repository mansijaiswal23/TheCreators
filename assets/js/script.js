// Redirect to registration page
function redirectToRegister() {
    window.location.href = 'register.html';
}

// Enhanced animation and interaction handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll-triggered animations
    initScrollAnimations();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize registration form if present
    initRegistrationForm();
    
    // Initialize particle effects
    initParticleEffects();
    
    // Initialize typing effects
    initTypingEffects();
});

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('highlight-card') || 
                    entry.target.classList.contains('audience-card') ||
                    entry.target.classList.contains('bonus-card')) {
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeUp 0.6s ease-out ${index * 0.1}s both`;
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.highlight-card, .audience-card, .bonus-card, .testimonial-card, .instructor-content, .instructor-image'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Interactive elements initialization
function initInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-register, .btn-register-footer, .btn-pay, .btn-register-final');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
        button.addEventListener('mouseenter', addHoverGlow);
        button.addEventListener('mouseleave', removeHoverGlow);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.highlight-card, .audience-card, .bonus-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', handleParallaxScroll);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Registration form initialization
function initRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const inputs = registrationForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('focus', clearValidationError);
        });
    }
}

// Create ripple effect on button click
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add hover glow effect
function addHoverGlow(e) {
    const button = e.currentTarget;
    button.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4)';
}

function removeHoverGlow(e) {
    const button = e.currentTarget;
    button.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
}

// Handle parallax scrolling
function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
    
    // Add scroll progress indicator
    const scrollProgress = (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    updateScrollProgress(scrollProgress);
}

// Update scroll progress
function updateScrollProgress(progress) {
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #FF6B35, #F7931E);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = `${progress}%`;
}

// Form validation
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (input.type) {
        case 'text':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'number':
            const age = parseInt(value);
            if (age < 16 || age > 100) {
                isValid = false;
                errorMessage = 'Age must be between 16 and 100';
            }
            break;
        case 'tel':
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid 10-digit phone number';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
    }
    
    if (!isValid) {
        showValidationError(input, errorMessage);
    } else {
        clearValidationError({ target: input });
    }
    
    return isValid;
}

// Show validation error
function showValidationError(input, message) {
    clearValidationError({ target: input });
    
    input.style.borderColor = '#dc3545';
    input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideDown 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

// Clear validation error
function clearValidationError(e) {
    const input = e.target;
    input.style.borderColor = '#e9ecef';
    input.style.boxShadow = 'none';
    
    const errorDiv = input.parentNode.querySelector('.validation-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };
    
    // Validate all fields
    const inputs = e.target.querySelectorAll('input[required]');
    let allValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            allValid = false;
        }
    });
    
    if (allValid) {
        processPayment(formData);
    } else {
        showFormError('Please fix the errors above before proceeding.');
    }
}

// Show form error
function showFormError(message) {
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
        animation: slideDown 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    const form = document.getElementById('registrationForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Process payment with enhanced UX
function processPayment(formData) {
    const payButton = document.getElementById('payButton');
    const originalText = payButton.textContent;
    
    // Show processing state with animation
    payButton.disabled = true;
    payButton.innerHTML = `
        <span class="spinner"></span>
        Processing Payment...
    `;
    payButton.style.background = '#6c757d';
    
    // Add spinner CSS
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s ease-in-out infinite;
            margin-right: 8px;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    
    // Simulate payment processing with progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            completePayment(payButton, originalText, formData);
        }
    }, 200);
}

// Complete payment process
function completePayment(payButton, originalText, formData) {
    // Reset button with success state
    payButton.disabled = false;
    payButton.innerHTML = '✅ Payment Successful!';
    payButton.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    payButton.classList.add('success-state');
    
    // Show success modal with delay
    setTimeout(() => {
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        // Reset form
        document.getElementById('registrationForm').reset();
        
        // Reset button after modal
        setTimeout(() => {
            payButton.innerHTML = originalText;
            payButton.style.background = '';
            payButton.classList.remove('success-state');
        }, 3000);
        
        // Store registration data
        console.log('Registration Data:', formData);
        
        // Send analytics event
        trackRegistration(formData);
        
    }, 1000);
}

// Initialize particle effects
function initParticleEffects() {
    // Add floating particles to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        createFloatingParticles(heroSection, 20);
    }
}

// Create floating particles
function createFloatingParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        container.appendChild(particle);
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Initialize typing effects
function initTypingEffects() {
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        typeText(element, text, 50);
    });
}

// Type text effect
function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Track registration for analytics
function trackRegistration(formData) {
    // Placeholder for analytics tracking
    console.log('Registration tracked:', {
        event: 'webinar_registration',
        user_data: formData,
        timestamp: new Date().toISOString(),
        page: window.location.href
    });
    
    // In a real application, this would send data to analytics service
    // Example: gtag('event', 'registration', { ... });
}

// Add click tracking for all interactive elements
function trackClick(element, action) {
    console.log(`Click tracked: ${element} - ${action}`, {
        timestamp: new Date().toISOString(),
        page: window.location.href,
        user_agent: navigator.userAgent
    });
}

// Track all button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-register, .btn-register-footer, .btn-pay, .btn-register-final')) {
        trackClick(e.target.textContent.trim(), 'button_click');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.matches('.btn-register, .btn-register-footer, .btn-pay, .btn-register-final')) {
        e.target.click();
    }
});

// Add loading state management
window.addEventListener('load', function() {
    // Hide loading spinner if present
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Trigger entrance animations
    document.body.classList.add('loaded');
});

// Add error handling for failed operations
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
    // In production, this would report to error tracking service
});

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load performance:', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                totalTime: perfData.loadEventEnd - perfData.fetchStart
            });
        }, 0);
    });
}