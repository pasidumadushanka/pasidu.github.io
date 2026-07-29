/* =========================================
   MODAL HELPERS (shared by all modals)
   ========================================= */
function showModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = 'flex';
    requestAnimationFrame(() => modalEl.classList.add('show'));
    document.body.style.overflow = 'hidden';
}

function hideModal(modalEl, onHidden) {
    if (!modalEl) return;
    modalEl.classList.remove('show');
    setTimeout(() => {
        modalEl.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (onHidden) onHidden();
    }, 300);
}

/* =========================================
   PROJECT DATA
   ========================================= */
const projectData = {
    'lassana-glow': {
        title: 'Lassana Glow',
        media: 'https://res.cloudinary.com/ddykxl9pe/image/upload/v1784867800/Gemini_Generated_Image_ovbgs2ovbgs2ovbg_oqesip.png',
        description: "🌿 Case Study: Building Lassana Glow — A Full-Stack E-Commerce PlatformExcited to share a recent project I completed for Prabodini Perera — a complete e-commerce platform for her botanical skincare brand, Lassana Glow.The goal was simple but ambitious: give the brand a storefront that feels as premium as the products themselves, backed by a system powerful enough to actually run the business behind the scenes.Here's what went into it:🛍 For the customer A clean, minimal storefront focused on the product — smooth browsing, a secure checkout flow, and WhatsApp integration so customers can order and get support without friction.📊 For the business custom-built admin dashboard giving real-time visibility into sales, inventory, and store performance — no more guessing what's selling or what's running low.⚙️ Built with Next.js, TypeScript, and MongoDB — chosen for performance, type safety, and the flexibility to scale as the business grows.📱 Try it yourself I also implemented a QR code on the storefront — scan it and it takes you straight to the live site, no typing a URL needed. A small detail, but one that makes the shopping experience that much smoother for customers on the go.What I enjoyed most about this project was the balance it required — designing something visually elegant on the front end while making sure the admin side was practical and genuinely useful day-to-day for the client.Grateful for the opportunity to work on this, and looking forward to more projects like it.",
        liveLink: 'https://www.lassanaglow.lk/'
    },
    luxevista: {
        title: 'LuxeVista Hotel App',
        media: 'https://res.cloudinary.com/ddykxl9pe/video/upload/v1762666435/app_gipylb.mp4',
        description: 'LuxeVista is a state-of-the-art mobile application designed to revolutionize the hospitality industry. Built using Android Studio and Java with a robust Firebase backend, it offers a seamless booking experience for users while providing hotel administrators with real-time management tools. The app features secure user authentication, real-time room availability tracking, and an integrated payment gateway. Its intuitive UI/UX design ensures that guests can effortlessly navigate through services, making their stay more enjoyable and efficient.',
        liveLink: '#'
    },
    wellness: {
        title: 'Wellness Center',
        media: 'https://res.cloudinary.com/ddykxl9pe/video/upload/v1765785601/wellness_app_ohgmj5.mp4',
        description: 'The Wellness Center platform acts as a digital bridge between healthcare providers, therapists, and patients. Developed using PHP and MySQL, this responsive web application streamlines the appointment scheduling process. It eliminates manual booking errors by offering a dynamic calendar system where patients can view therapist availability in real-time. Key features include an admin dashboard for staff management, automated email notifications for appointments, and a secure patient record system, ensuring privacy and efficiency in healthcare delivery.',
        liveLink: 'https://greenlife-wigs.vercel.app/'
    },
    gadgethub: {
        title: 'GadgetHub (SOC)',
        media: 'https://res.cloudinary.com/ddykxl9pe/video/upload/v1763397715/soc_vzklh6.mp4',
        description: 'GadgetHub is a specialized Security Operations Center (SOC) dashboard developed using C# and .NET Core. This system allows distributors and security analysts to monitor network threats and compare product quotations simultaneously. It features a high-performance data processing engine capable of handling large volumes of logs. The system automatically selects the best-priced options from multiple distributors and alerts admins about potential security breaches, making it a dual-purpose tool for operational efficiency and cybersecurity monitoring.',
        liveLink: '#'
    },
    'gym-perfect': {
        title: 'Gym Perfect',
        media: 'https://res.cloudinary.com/ddykxl9pe/video/upload/v1763398848/Video_Project_1_jupew2.mp4',
        description: 'Gym Perfect is a comprehensive gym management solution designed to digitize fitness center operations. Built with PHP and Bootstrap, it handles member registrations, subscription tracking, and payment processing. The system includes automated alerts for expiring memberships, helping gym owners retain clients. It also features a progress tracking module where trainers can log member workouts and diet plans, fostering a more engaging fitness environment.',
        liveLink: '#'
    },
    'medicare-plus': {
        title: 'Medicare Plus',
        media: 'https://res.cloudinary.com/ddykxl9pe/video/upload/v1764082617/Video_Project_5_m1rtvy.mp4',
        description: 'Medicare Plus is a hospital management system aimed at reducing patient wait times and optimizing doctor schedules. This full-stack web application allows patients to book appointments online, view doctor profiles, and access their medical history securely. For hospital staff, it provides a centralized dashboard to manage ward availability, doctor shifts, and patient admissions. The system prioritizes data security and user accessibility, ensuring a smooth healthcare experience for all stakeholders.',
        liveLink: '#'
    },
    paddysmart: {
        title: 'PaddySmart AI',
        media: 'https://res.cloudinary.com/ddykxl9pe/video/upload/v1765130438/Video_Project_6_crxjkp.mp4',
        description: 'PaddySmart AI is a cutting-edge agricultural platform that leverages Artificial Intelligence to empower farmers. By integrating Python-based Machine Learning models with a React frontend, the system analyzes soil data and weather patterns to predict crop yields accurately. It provides farmers with actionable insights on irrigation schedules and fertilizer usage. This project aims to promote sustainable farming practices and maximize harvest efficiency through data-driven decision-making.',
        liveLink: '#'
    }
};

/* =========================================
   FEATURE INITIALIZERS
   ========================================= */
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);
}

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, offset: 100, once: true });
    }
}

function initTypedText() {
    if (document.getElementById('typed-text') && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer', 'UX/UI Designer'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }
}

// Fixes layout shift on mobile when the typing effect starts
function initMobileTypingFix() {
    if (window.innerWidth >= 768) return;
    const typedContainer = document.querySelector('.hero-text h2');
    if (!typedContainer) return;
    typedContainer.style.minHeight = '80px';
    typedContainer.style.display = 'flex';
    typedContainer.style.alignItems = 'center';
    typedContainer.style.justifyContent = 'center';
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    const closeMenu = () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    };

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && !e.target.closest('.nav-controls')) {
            closeMenu();
        }
    });
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    const body = document.body;

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        if (icon) icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

function initPortfolioTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.target);
            if (target) target.classList.add('active');
        });
    });
}

function initTestimonialSlider() {
    if (document.querySelector('.testimonial-slider') && typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }
}

function showToast(msg, type) {
    const toastBox = document.getElementById('toast-box');
    if (!toastBox) return;

    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'error') toast.classList.add('error');

    toast.innerHTML = type === 'success'
        ? `<i class="fas fa-check-circle"></i> ${msg}`
        : `<i class="fas fa-exclamation-circle"></i> ${msg}`;

    toastBox.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

function initContactForm() {
    const form = document.getElementById('my-form');
    if (!form) return;

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                showToast('Message Sent Successfully!', 'success');
                form.reset();
            } else {
                showToast('Oops! Something went wrong.', 'error');
            }
        } catch (error) {
            showToast('Connection Error! Try again.', 'error');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

function initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.img-border'), {
            max: 15, speed: 400, glare: true, 'max-glare': 0.2
        });
    }
}

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

// Hide the custom cursor on touch devices instead of just leaving it inert
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline) return;

    if (!window.matchMedia('(pointer: fine)').matches) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    document.querySelectorAll('a, button, .project-card, .social-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

function initCalendlyButton() {
    const calendlyBtn = document.getElementById('calendly-btn');
    if (!calendlyBtn) return;

    calendlyBtn.addEventListener('click', () => {
        if (typeof Calendly !== 'undefined') {
            Calendly.initPopupWidget({ url: 'https://calendly.com/pasindumadushanka' });
        }
    });
}

function initComingSoonModal() {
    const comingSoonModal = document.getElementById('coming-soon-modal');
    const closeBtn = document.querySelector('.close-coming-soon');
    const dismissBtn = document.getElementById('coming-soon-dismiss');

    const open = () => showModal(comingSoonModal);
    const close = () => hideModal(comingSoonModal);

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (dismissBtn) dismissBtn.addEventListener('click', close);

    window.addEventListener('click', (e) => {
        if (e.target === comingSoonModal) close();
    });

    return { open, close };
}

function initProjectModal(onLiveLinkMissing) {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mVideo = document.getElementById('modal-video');
    const mImage = document.getElementById('modal-image');
    const mSource = mVideo ? mVideo.querySelector('source') : null;
    const mLive = document.getElementById('modal-live');
    if (!modal) return;

    function closeProjectModal() {
        hideModal(modal, () => {
            if (mVideo) mVideo.pause();
            if (mSource) mSource.src = '';
            if (mImage) mImage.src = '';
        });
    }

    function openProjectModal(id) {
        const data = projectData[id];
        if (!data) return;

        mTitle.innerText = data.title;
        mDesc.innerText = data.description;
        mLive.href = data.liveLink;

        const isVideo = typeof data.media === 'string' && /\.(mp4|webm|ogg)$/i.test(data.media);

        if (isVideo && mVideo && mSource) {
            mSource.src = data.media;
            mVideo.classList.remove('hidden');
            if (mImage) mImage.classList.add('hidden');
            mVideo.load();
            mVideo.play().catch(() => {});
        } else if (mImage) {
            if (mVideo) mVideo.classList.add('hidden');
            mImage.src = data.media;
            mImage.classList.remove('hidden');
        }

        showModal(modal);
    }

    mLive.addEventListener('click', (e) => {
        const hasNoLiveLink = mLive.getAttribute('href') === '#' || mLive.getAttribute('href') === '';
        if (!hasNoLiveLink) return;

        e.preventDefault();
        closeProjectModal();
        setTimeout(() => onLiveLinkMissing && onLiveLinkMissing(), 300);
    });

    document.querySelectorAll('[data-project-id]').forEach(btn => {
        btn.addEventListener('click', () => openProjectModal(btn.dataset.projectId));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
}

/* =========================================
   BOOTSTRAP
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initAOS();
    initTypedText();
    initMobileTypingFix();
    initHamburgerMenu();
    initThemeToggle();
    initPortfolioTabs();
    initTestimonialSlider();
    initContactForm();
    initTilt();
    initScrollProgress();
    initCustomCursor();
    initCalendlyButton();

    const comingSoon = initComingSoonModal();
    initProjectModal(comingSoon.open);
});
