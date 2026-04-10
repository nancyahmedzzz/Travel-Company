const destinations = {
    santorini: {
        title: "Santorini, Greece",
        subtitle: "The jewel of the Aegean Sea",
        bg: "santorini.png",
        desc: "Santorini is a volcanic island in the Cyclades group of the Greek islands. It is located between Ios and Anafi islands. It is famous for dramatic views, stunning sunsets from Oia town, the strange white aubergine (eggplant), the town of Thira and naturally its very own active volcano. Lose yourself in the majestic beauty and history of this white-washed architectural marvel.",
        price: "$1,200"
    },
    alps: {
        title: "Swiss Alps, Switzerland",
        subtitle: "Peak adrenaline and serenity",
        bg: "alps.png",
        desc: "The Alpine region of Switzerland, conventionally referred to as the Swiss Alps, represents a major natural feature of the country and is, along with the Swiss Plateau and the Swiss portion of the Jura Mountains, one of its three main physiographic regions. Enjoy incredible skiing, hot cocoa in chalets, and breathtaking towering peaks.",
        price: "$1,500"
    },
    maldives: {
        title: "The Maldives",
        subtitle: "A tropical slice of paradise",
        bg: "maldives.png",
        desc: "The Maldives is a nation of islands in the Indian Ocean, that spans across the equator. The country is comprised of 1192 islands that stretch along a length of 871 kilometers. Famous for its pristine beaches, extensive reefs and blue lagoons. Imagine waking up in an overwater villa with crystal clear turquoise ocean right under your feet.",
        price: "$2,800"
    },
    kyoto: {
        title: "Kyoto, Japan",
        subtitle: "Where ancient traditions live on",
        bg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop",
        desc: "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.",
        price: "$1,800"
    },
    bali: {
        title: "Bali, Indonesia",
        subtitle: "The Island of the Gods",
        bg: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1920&auto=format&fit=crop",
        desc: "Bali is a province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali and a few smaller neighbouring islands. Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.",
        price: "$1,950"
    },
    dubai: {
        title: "Dubai, UAE",
        subtitle: "Luxury in the heart of the desert",
        bg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop",
        desc: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music.",
        price: "$3,200"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Shared functionality (Cursor, Dark mode, Preloader)
    
    // Theme logic
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if(icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            themeToggle.classList.add('rotate');
            setTimeout(() => themeToggle.classList.remove('rotate'), 300);
            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
            }
            localStorage.setItem('theme', theme);
        });
    }

    document.body.style.cursor = 'none';

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

        const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .dest-card, .review-card, input, .theme-toggle, .modal-close');
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

    // Populate data based on URL
    const urlParams = new URLSearchParams(window.location.search);
    const destKey = urlParams.get('dest');
    const data = destinations[destKey] || destinations['santorini']; // fallback

    document.getElementById('detail-title').textContent = data.title;
    document.getElementById('detail-subtitle').textContent = data.subtitle;
    document.getElementById('detail-desc').textContent = data.desc;
    document.getElementById('detail-price').textContent = `Packages from ${data.price}`;
    
    // Update background image
    const heroBg = document.getElementById('hero-bg');
    heroBg.style.backgroundImage = `url('${data.bg}')`;

    // Parallax logic for internal page
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight && heroBg) {
            heroBg.style.transform = `translateY(${window.scrollY * 0.5}px) scale(1.05)`;
        }
    });

    // Reveal 
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // Modal Logic
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('booking-modal');
    
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close on outer click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden'; 
        }, 1000); 
    }

    // Page Transition
    const pageTransition = document.querySelector('.page-transition');
    const links = document.querySelectorAll('a[href="index.html#destinations"]');
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

    // --- Magnetic Button (Removed due to bug) ---
});
