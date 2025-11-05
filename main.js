// main.js

// Wait for the entire HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

    /* ===============================
       1. HAMBURGER MENU FUNCTIONALITY
       =============================== */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-links li a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    /* ===============================
       2. PORTFOLIO TABS FUNCTIONALITY
       =============================== */
    const tabs = document.querySelectorAll('.tab-btn');
    const all_content = document.querySelectorAll('.tab-panel');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            all_content.forEach(content => content.classList.remove('active'));
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* ===============================
       3. INITIALIZE AOS (Animate On Scroll)
       =============================== */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    /* ===============================
       4. TYPED.JS (Typewriter Effect)
       =============================== */
    if (typeof Typed !== "undefined" && document.querySelector('#type-text')) {
        new Typed('#type-text', {
            strings: [
                'a Software Engineer',
                'a Full Stack Developer',
                'a Web Developer',
                'a BSc Student'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    /* ===============================
       5. SWIPER.JS (Testimonials Slider)
       =============================== */
    if (typeof Swiper !== "undefined" && document.querySelector('.testimonials-slider')) {
        new Swiper('.testimonials-slider', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }
        });
    }

    /* ===============================
       6. THEME TOGGLE (Dark / Light Mode)
       =============================== */
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn ? toggleBtn.querySelector('i') : null;
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (icon) icon.className = 'fa fa-sun';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-theme');
            if (icon) icon.className = isLight ? 'fa fa-sun' : 'fa fa-moon';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

}); // End of DOMContentLoaded


/* ===============================
   ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   =============================== */
const sections = document.querySelectorAll("section[id]");
const navListItems = document.querySelectorAll(".nav-links a");

if (sections.length && navListItems.length) {
    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 70; // Adjusted for nav bar height
            let sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navListItems.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(".nav-links a[href*=" + sectionId + "]");
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }
}