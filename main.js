document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen
    const loader = document.querySelector('.loader');
    if(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    }

    // 2. Initialize AOS (Animations)
    if(typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, offset: 100, once: true });
    }

    // 3. Typed.js (Auto Typing Effect)
    if(document.getElementById('typed-text') && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer', 'UX/UI Designer'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // --- MOBILE VIBRATION FIX ---
    // Fixes layout shift on mobile when typing
    if (window.innerWidth < 768) {
        const typedContainer = document.querySelector('.hero-text h2');
        if (typedContainer) {
            typedContainer.style.minHeight = '80px'; 
            typedContainer.style.display = 'flex';
            typedContainer.style.alignItems = 'center';
            typedContainer.style.justifyContent = 'center';
        }
    }

    // 4. Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && !e.target.closest('.nav-controls')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    }

    // 5. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn ? themeBtn.querySelector('i') : null;
    const body = document.body;

    if(themeBtn) {
        // Load saved theme
        if(localStorage.getItem('theme') === 'light'){
            body.classList.add('light-theme');
            if(icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            
            if(icon) {
                icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // 6. Portfolio Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    if(tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active from all
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active to clicked
                tab.classList.add('active');
                const target = document.getElementById(tab.dataset.target);
                if(target) target.classList.add('active');
            });
        });
    }

    // 7. Swiper Slider
    if(document.querySelector('.testimonial-slider') && typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1, 
            spaceBetween: 30, 
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }

    // 8. Contact Form with Toast
    const form = document.getElementById("my-form");
    const toastBox = document.getElementById("toast-box");

    function showToast(msg, type) {
        if(!toastBox) return;
        
        let toast = document.createElement("div");
        toast.classList.add("toast");
        if(type === 'error') toast.classList.add("error");
        
        toast.innerHTML = type === 'success' 
            ? `<i class="fas fa-check-circle"></i> ${msg}` 
            : `<i class="fas fa-exclamation-circle"></i> ${msg}`;

        toastBox.appendChild(toast);
        setTimeout(() => { toast.remove(); }, 5000);
    }

    if(form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const btn = form.querySelector("button");
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            fetch(event.target.action, {
                method: form.method, 
                body: data, 
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    showToast("Message Sent Successfully!", "success");
                    form.reset();
                } else {
                    showToast("Oops! Something went wrong.", "error");
                }
            }).catch(error => { 
                showToast("Connection Error! Try again.", "error");
            }).finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // 9. Vanilla Tilt (For Hero Image Only - FIX ADDED)
    if(typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".img-border"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.2
        });
    }

    // 10. Scroll Progress Bar
    const progressBar = document.querySelector(".scroll-progress");
    if(progressBar) {
        window.addEventListener("scroll", () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }

    // 11. Custom Cursor Logic
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if(cursorDot && cursorOutline) {
        // Hide cursor on mobile/touch devices
        if (window.matchMedia("(pointer: fine)").matches) {
            window.addEventListener("mousemove", (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                // Dot moves instantly
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                // Outline moves with delay
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            });

            const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-btn');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
        } else {
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
    }

}); // END OF DOMContentLoaded


/* =========================================
   COMING SOON MODAL LOGIC
   ========================================= */
const comingSoonModal = document.getElementById("coming-soon-modal");
const closeComingSoonBtn = document.querySelector(".close-coming-soon");

function openComingSoon() {
    if(comingSoonModal) {
        comingSoonModal.style.display = "flex";
        setTimeout(() => {
            comingSoonModal.classList.add("show");
        }, 10);
    }
}

function closeComingSoon() {
    if(comingSoonModal) {
        comingSoonModal.classList.remove("show");
        setTimeout(() => {
            comingSoonModal.style.display = "none";
        document.body.style.overflow = "auto";     
        }, 300);
    }
}

if(closeComingSoonBtn) {
    closeComingSoonBtn.addEventListener("click", closeComingSoon);
}

window.addEventListener("click", (e) => {
    if (e.target == comingSoonModal) {
        closeComingSoon();
    }
});


/* =========================================
   PROJECT DETAILS MODAL LOGIC
   ========================================= */

const projectData = {

    0.1: {
        title: "Lassana Glow",
        video: "https://res.cloudinary.com/ddykxl9pe/image/upload/v1784867800/Gemini_Generated_Image_ovbgs2ovbgs2ovbg_oqesip.png",
        description: "🌿 Case Study: Building Lassana Glow — A Full-Stack E-Commerce PlatformExcited to share a recent project I completed for Prabodini Perera — a complete e-commerce platform for her botanical skincare brand, Lassana Glow.The goal was simple but ambitious: give the brand a storefront that feels as premium as the products themselves, backed by a system powerful enough to actually run the business behind the scenes.Here's what went into it:🛍 For the customer A clean, minimal storefront focused on the product — smooth browsing, a secure checkout flow, and WhatsApp integration so customers can order and get support without friction.📊 For the business custom-built admin dashboard giving real-time visibility into sales, inventory, and store performance — no more guessing what's selling or what's running low.⚙️ Built with Next.js, TypeScript, and MongoDB — chosen for performance, type safety, and the flexibility to scale as the business grows.📱 Try it yourself I also implemented a QR code on the storefront — scan it and it takes you straight to the live site, no typing a URL needed. A small detail, but one that makes the shopping experience that much smoother for customers on the go.What I enjoyed most about this project was the balance it required — designing something visually elegant on the front end while making sure the admin side was practical and genuinely useful day-to-day for the client.Grateful for the opportunity to work on this, and looking forward to more projects like it.",
        liveLink: "https://www.lassanaglow.lk/" 
    },

    1: {
        title: "LuxeVista Hotel App",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1762666435/app_gipylb.mp4",
        description: "LuxeVista is a state-of-the-art mobile application designed to revolutionize the hospitality industry. Built using Android Studio and Java with a robust Firebase backend, it offers a seamless booking experience for users while providing hotel administrators with real-time management tools. The app features secure user authentication, real-time room availability tracking, and an integrated payment gateway. Its intuitive UI/UX design ensures that guests can effortlessly navigate through services, making their stay more enjoyable and efficient.",
        liveLink: "#" // No Link -> Coming Soon
    },
    2: {
        title: "Wellness Center",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1765785601/wellness_app_ohgmj5.mp4",
        description: "The Wellness Center platform acts as a digital bridge between healthcare providers, therapists, and patients. Developed using PHP and MySQL, this responsive web application streamlines the appointment scheduling process. It eliminates manual booking errors by offering a dynamic calendar system where patients can view therapist availability in real-time. Key features include an admin dashboard for staff management, automated email notifications for appointments, and a secure patient record system, ensuring privacy and efficiency in healthcare delivery.",
        liveLink: "https://greenlife-wigs.vercel.app/" // Has Link
    },
    3: {
        title: "GadgetHub (SOC)",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1763397715/soc_vzklh6.mp4",
        description: "GadgetHub is a specialized Security Operations Center (SOC) dashboard developed using C# and .NET Core. This system allows distributors and security analysts to monitor network threats and compare product quotations simultaneously. It features a high-performance data processing engine capable of handling large volumes of logs. The system automatically selects the best-priced options from multiple distributors and alerts admins about potential security breaches, making it a dual-purpose tool for operational efficiency and cybersecurity monitoring.",
        liveLink: "#"
    },
    4: {
        title: "Gym Perfect",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1763398848/Video_Project_1_jupew2.mp4",
        description: "Gym Perfect is a comprehensive gym management solution designed to digitize fitness center operations. Built with PHP and Bootstrap, it handles member registrations, subscription tracking, and payment processing. The system includes automated alerts for expiring memberships, helping gym owners retain clients. It also features a progress tracking module where trainers can log member workouts and diet plans, fostering a more engaging fitness environment.",
        liveLink: "#"
    },
    5: {
        title: "Medicare Plus",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1764082617/Video_Project_5_m1rtvy.mp4",
        description: "Medicare Plus is a hospital management system aimed at reducing patient wait times and optimizing doctor schedules. This full-stack web application allows patients to book appointments online, view doctor profiles, and access their medical history securely. For hospital staff, it provides a centralized dashboard to manage ward availability, doctor shifts, and patient admissions. The system prioritizes data security and user accessibility, ensuring a smooth healthcare experience for all stakeholders.",
        liveLink: "#"
    },
    6: {
        title: "PaddySmart AI",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1765130438/Video_Project_6_crxjkp.mp4",
        description: "PaddySmart AI is a cutting-edge agricultural platform that leverages Artificial Intelligence to empower farmers. By integrating Python-based Machine Learning models with a React frontend, the system analyzes soil data and weather patterns to predict crop yields accurately. It provides farmers with actionable insights on irrigation schedules and fertilizer usage. This project aims to promote sustainable farming practices and maximize harvest efficiency through data-driven decision-making.",
        liveLink: "#"
    }
};

// DOM Elements
const modal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close-modal");
const mTitle = document.getElementById("modal-title");
const mDesc = document.getElementById("modal-desc");
const mVideo = document.getElementById("modal-video");
const mImage = document.getElementById("modal-image");
const mSource = mVideo ? mVideo.querySelector("source") : null;
const mLive = document.getElementById("modal-live");

// Open Modal Function
function openModal(id) {
    const data = projectData[id];
    
    if(data && modal) {
        mTitle.innerText = data.title;
        mDesc.innerText = data.description;
        
        // --- LINK CHECKING LOGIC ---
        mLive.href = data.liveLink;
        mLive.onclick = function(e) {
            if(data.liveLink === "#" || data.liveLink === "") {
                e.preventDefault();
                // Close details modal first
                modal.classList.remove("show");
                if(mVideo) mVideo.pause();
                
                setTimeout(() => { 
                    modal.style.display = "none";
                    // Then show coming soon
                    openComingSoon();
                }, 300);
            }
        };
        // ---------------------------
        
        const isVideo = typeof data.video === 'string' && /\.(mp4|webm|ogg)$/i.test(data.video);

        if(isVideo && mVideo && mSource) {
            mSource.src = data.video;
            mVideo.style.display = 'block';
            if(mImage) mImage.style.display = 'none';
            mVideo.load();
            
            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add("show");
                mVideo.play().catch(e => console.log("Autoplay prevented"));
            }, 10);
        } else if(mImage) {
            if(mVideo) mVideo.style.display = 'none';
            mImage.src = data.video;
            mImage.style.display = 'block';

            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        }
        document.body.style.overflow = "hidden";
    }
}

// Close Modal Function
function closeProjectModal() {
    if(modal) {
        modal.classList.remove("show");
        if(mVideo) mVideo.pause();
        
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            if(mSource) mSource.src = "";
            if(mImage) mImage.src = "";
        }, 300);
    }
}

// Attach Listeners
if(closeModal) {
    closeModal.addEventListener("click", closeProjectModal);
}

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeProjectModal();
    }
});