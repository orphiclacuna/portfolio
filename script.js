// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTimeDisplay();
    initializeEmailCopy();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeCarousels();
});

// Image carousel functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const images = track.querySelectorAll('img');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        let currentIndex = 0;
        let autoSlideInterval;
        
        if (images.length === 0) return;
        
        // Function to update carousel position
        function updateCarousel(index) {
            const imageWidth = images[0].offsetWidth;
            track.style.transform = `translateX(-${index * imageWidth}px)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Function to go to next slide
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            updateCarousel(nextIndex);
        }
        
        // Function to go to previous slide
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel(prevIndex);
        }
        
        // Add click handlers to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                updateCarousel(index);
                resetAutoSlide();
            });
        });
        
        // Auto-slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        }
        
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }
        
        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }
        
        // Pause auto-slide on hover
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
        
        // Handle visibility change to pause when tab is not active
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });
        
        // Handle window resize to recalculate positions
        window.addEventListener('resize', () => {
            updateCarousel(currentIndex);
        });
        
        // Initialize carousel
        updateCarousel(0);
        startAutoSlide();
    });
}

// Real-time clock display
function initializeTimeDisplay() {
    const timeDisplay = document.querySelector('.time-display');
    
    if (!timeDisplay) return;
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Get timezone abbreviation
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timezoneAbbr = new Intl.DateTimeFormat('en', {
            timeZoneName: 'short'
        }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || 'Local';
        
        timeDisplay.textContent = `${timeString} ${timezoneAbbr}`;
    }
    
    // Update immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
}

// Email copy functionality
function initializeEmailCopy() {
    const copyBtn = document.querySelector('.copy-btn');
    const emailDisplay = document.querySelector('.email-display');
    
    if (!copyBtn || !emailDisplay) return;
    
    copyBtn.addEventListener('click', async function() {
        const emailText = emailDisplay.textContent.replace('◆', '').trim();
        
        try {
            await navigator.clipboard.writeText(emailText);
            
            // Show feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"></path>
                </svg>
            `;
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy email:', err);
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = emailText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize scroll-based animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe project cards and other elements
    const animateElements = document.querySelectorAll('.project-card, .hero-title, .footer-contact');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    if (!document.querySelector('#animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            .project-card,
            .hero-title,
            .footer-contact {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .project-card.animate-in,
            .hero-title.animate-in,
            .footer-contact.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Stagger animation for project cards */
            .project-card:nth-child(1).animate-in {
                transition-delay: 0.1s;
            }
            
            .project-card:nth-child(2).animate-in {
                transition-delay: 0.2s;
            }
            
            .project-card:nth-child(3).animate-in {
                transition-delay: 0.3s;
            }
        `;
        document.head.appendChild(style);
    }
}

// Parallax effect for project cards
function initializeParallax() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        projectCards.forEach((card, index) => {
            const yPos = -(rate / (index + 1));
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Utility function to debounce scroll events
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

// Enhanced scroll performance
const debouncedScroll = debounce(() => {
    // Add any scroll-based functionality here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
});

// Handle form submissions (if any forms are added later)
function handleFormSubmission(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Add form submission logic here
        console.log('Form submitted:', data);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add keyboard shortcuts if needed
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Add search functionality if needed
                break;
        }
    }
});

// Export functions for potential external use
window.PortfolioApp = {
    initializeTimeDisplay,
    initializeEmailCopy,
    initializeSmoothScrolling,
    initializeAnimations,
    initializeCarousels
};
