document.addEventListener('DOMContentLoaded', () => {
    // --- Dark/Light Mode Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if(icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Animation for toggle icon
            themeToggle.classList.add('rotate');
            setTimeout(() => themeToggle.classList.remove('rotate'), 300);

            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
            localStorage.setItem('theme', theme);
        });
    }

    // --- Header & Scroll Logic ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.body.style.cursor = 'none';

    // --- Preloader Logic ---
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden'; 
            
            const heroTitleWords = document.querySelectorAll('.title-word');
            heroTitleWords.forEach(word => {
                word.style.animationPlayState = 'running';
            });
        }, 1200); 
    }

    // --- Custom Cursor Logic (Blend Difference) ---
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursorDot) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards", easing: "ease-out" });
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .dest-card, .review-card, input, .theme-toggle');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.width = '40px';
                cursorDot.style.height = '40px';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.width = '20px';
                cursorDot.style.height = '20px';
            });
        });
    }

    // --- Intersection Observer (Reveals) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Hero Parallax ---
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight) {
                heroBg.style.transform = `translateY(${window.scrollY * 0.5}px) scale(1.05)`;
            }
        });
    }

    // --- 3D Tilt Cards ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;  
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `0 30px 60px rgba(0, 0, 0, 0.25)`;
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = ``; 
            card.style.zIndex = '1';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = `transform 0.1s ease-out, box-shadow 0.2s ease`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = `transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease`;
        });
    });

    // --- Magnetic Buttons Removed due to bug ---
    
    // --- Page Transitions for links ---
    const pageTransition = document.querySelector('.page-transition');
    const links = document.querySelectorAll('a[href^="details.html"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');
            if(pageTransition) {
                pageTransition.classList.add('active');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600);
            } else {
                window.location.href = targetUrl;
            }
        });
    });
});
