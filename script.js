document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTop');
    const themeToggle = document.getElementById('themeToggle');

    // Show or hide the back-to-top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for internal links (modern browsers handle CSS scroll-behavior, but this is fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
    });

    // Typing effect for impact phrase
    const phrase = 'Transformo dados em soluções reais com tecnologia, automação e inteligência artificial.';
    const impactEl = document.getElementById('impactPhrase');
    let charIndex = 0;

    function type() {
        if (impactEl && charIndex < phrase.length) {
            impactEl.textContent += phrase.charAt(charIndex);
            charIndex += 1;
            setTimeout(type, 40);
        }
    }
    type();

    // Fade-in sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach((sec, idx) => {
        sec.classList.add('fade-in');
        sec.style.transitionDelay = `${idx * 100}ms`; // sequential appearance
        observer.observe(sec);
    });
}); 