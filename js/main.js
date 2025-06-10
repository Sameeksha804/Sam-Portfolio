// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Page Transition Handling
function initPageTransitions() {
    // Create transition elements
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    const vertexTransition = document.createElement('div');
    vertexTransition.className = 'vertex-transition';
    document.body.appendChild(vertexTransition);

    // Handle navigation clicks
    document.querySelectorAll('a[href^="pages/"]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');

            // Start transition
            pageTransition.classList.add('active');
            vertexTransition.classList.add('active');

            // Wait for transition
            await new Promise(resolve => setTimeout(resolve, 600));

            // Load new page
            try {
                const response = await fetch(targetUrl);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Update content
                document.title = doc.title;
                document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;

                // Reverse transition
                pageTransition.classList.remove('active');
                vertexTransition.classList.remove('active');

                // Update active navigation
                document.querySelectorAll('.nav-links a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === targetUrl) {
                        navLink.classList.add('active');
                    }
                });

                // Reinitialize animations
                handleSectionTransitions();
            } catch (error) {
                console.error('Error loading page:', error);
                window.location.href = targetUrl;
            }
        });
    });
}

// Initialize typing animation only on desktop
function initTypingAnimation() {
    if (window.innerWidth > 768) {
        const typingText = document.querySelector('.hero h2.typing-text');
        if (typingText) {
            typingText.classList.add('typing');
        }
    }
}

// Call on load and resize
window.addEventListener('load', initTypingAnimation);
window.addEventListener('resize', initTypingAnimation);

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initTypingAnimation();
    animateOnScroll();
    initPageTransitions();
    
    // Add a small delay before initializing section transitions
    setTimeout(() => {
        handleSectionTransitions();
    }, 800);

    // Add smooth scroll to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });

    // Initialize form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Set initial active nav link
    updateActiveNavLink();
    
    // Add scroll event listener for continuous updates
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveNavLink);
    });
    
    // Add click event listeners to nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Smooth scrolling for navigation links
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

// Section transition on scroll
function handleSectionTransitions() {
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.section-content, .stagger-item');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections and animated elements
    sections.forEach(section => observer.observe(section));
    animatedElements.forEach(element => observer.observe(element));
}

// Smooth scroll to section
function smoothScrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in, .section-transition');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Add animation to skill items
const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add active class to current navigation item
const currentLocation = location.pathname;
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentLocation.includes(linkPath)) {
        link.classList.add('active');
    }
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    if (mobileMenuBtn && navLinks) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            navLinks.classList.toggle('show');
            overlay.classList.toggle('show');
            const isExpanded = navLinks.classList.contains('show');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars';
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            navLinks.classList.remove('show');
            overlay.classList.remove('show');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            // Reset icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }

            // Re-enable body scroll
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                overlay.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                // Reset icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }

                // Re-enable body scroll
                document.body.style.overflow = '';
            });
        });

        // Prevent clicks inside menu from closing it
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Add typing effect to hero section
const typeWriter = () => {
    const text = "Backend Developer, Open Source Enthusiast 🔥. Always learning.";
    const element = document.querySelector('.hero p');
    let i = 0;
    
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    };
    
    type();
};

// Add CSS for animations and mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--secondary-color);
        transition: var(--transition);
    }
    
    .mobile-menu-btn:hover {
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-links {
            display: none;
            width: 100%;
            text-align: center;
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--card-background);
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
        }
        
        .nav-links li {
            margin: 1rem 0;
        }
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Form submission handler
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn.disabled) {
        return; // Prevent multiple submissions
    }
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Disable the submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    
    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            document.getElementById('contactForm').reset();
        } else {
            showNotification(data.error || 'Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        showNotification('An error occurred. Please try again.', 'error');
    } finally {
        // Re-enable the submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Resume download functionality
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    const downloadBtn = this;
    const originalText = downloadBtn.innerHTML;
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    downloadBtn.disabled = true;

    // Create a hidden iframe for download
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Set up the download
    iframe.onload = function() {
        // Clean up after download starts
        setTimeout(() => {
            document.body.removeChild(iframe);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            showNotification('Resume downloaded successfully!', 'success');
        }, 1000);
    };

    // Start the download
    iframe.src = '/download-resume';
});

// Typing animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        typeWriter();
    }
});

// Function to update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Get current scroll position with offset for header
    const scrollPosition = window.scrollY;
    const headerOffset = 100;
    
    // Find the current section
    let currentSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if section is in viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Update active state of nav links
    navLinks.forEach(link => {
        const linkId = link.getAttribute('href').substring(1);
        if (linkId === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add scroll event listener with throttling for better performance
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        updateActiveNavLink();
    }, 10); // Reduced timeout for more responsive updates
}); 