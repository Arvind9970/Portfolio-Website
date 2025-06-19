// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
    
    // Add/remove background on scroll
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.backgroundColor = 'rgba(10, 25, 47, 0.9)';
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
});

// Set active navigation link based on scroll position
const sections = document.querySelectorAll('section');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('style').match(/\d+/)[0];
        bar.style.width = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = `${width}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Initialize animations when the page loads

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactFormElement = document.getElementById('contact-form');
const formStatusElement = document.getElementById('form-status');
const submitBtnElement = document.getElementById('submit-btn');

if (contactFormElement) {
    contactFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtnElement.classList.add('loading');
        submitBtnElement.disabled = true;
        formStatusElement.textContent = '';
        formStatusElement.className = 'form-status';
        
        try {
            const formData = new FormData(contactFormElement);
            const response = await fetch(contactFormElement.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatusElement.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatusElement.className = 'form-status success';
                contactFormElement.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            formStatusElement.textContent = 'Oops! There was a problem sending your message. Please try again later or email me directly.';
            formStatusElement.className = 'form-status error';
        } finally {
            submitBtnElement.classList.remove('loading');
            submitBtnElement.disabled = false;
            
            // Scroll to status message
            formStatusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('fade-in');
    
    // Animate skill bars
    animateSkillBars();
    
    // Add animation to sections on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section > *:not(.section-title)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Add animation to project cards on hover
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX) / 100;
        const y = (window.innerHeight - e.pageY) / 100;
        
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `translate(${-x / 2}px, ${-y / 2}px)`;
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Add loader styles
    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--darker-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s, visibility 0.5s;
        }
        
        .page-loader.fade-out {
            opacity: 0;
            visibility: hidden;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            animation: spin 1s ease-in-out infinite;
            margin: 0 auto 1rem;
        }
        
        .loader-text {
            color: var(--light-text);
            font-size: 1rem;
            margin-top: 1rem;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    
    // Hide loader after page is fully loaded
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        setTimeout(() => {
            document.body.removeChild(loader);
            document.head.removeChild(style);
        }, 500);
    }, 1000);
});

// Add animation to skill bars when they come into view
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            const width = skillLevel.getAttribute('style').match(/\d+/)[0];
            skillLevel.style.width = `${width}%`;
            skillBarObserver.unobserve(skillLevel);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-level').forEach(bar => {
    skillBarObserver.observe(bar);
});
