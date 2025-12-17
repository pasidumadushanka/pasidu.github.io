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
    AOS.init({ duration: 1000, offset: 100, once: true });

    // 3. Typed.js (Auto Typing Effect)
    if(document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer', 'UX/UI Designer'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // 4. Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
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
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
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
        if(localStorage.getItem('theme') === 'light'){
            body.classList.add('light-theme');
            if(icon) icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            if(icon) icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // 6. Portfolio Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    if(tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const target = document.getElementById(tab.dataset.target);
                if(target) target.classList.add('active');
            });
        });
    }

    // 7. Swiper Slider
    if(document.querySelector('.testimonial-slider')) {
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
        toast.innerHTML = type === 'success' 
            ? `<i class="fas fa-check-circle"></i> ${msg}` 
            : `<i class="fas fa-exclamation-circle"></i> ${msg}`;

        if (type === 'error') toast.classList.add("error");
        
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

    // 9. Vanilla Tilt (Only for Hero Image)
    if(typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".img-border"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.2
        });
    }

    // 10. Scroll Progress Bar
    window.addEventListener("scroll", () => {
        const progressBar = document.querySelector(".scroll-progress");
        if(progressBar) {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        }
    });

    // 11. Custom Cursor Logic
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if(cursorDot && cursorOutline) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

}); // DOMContentLoaded End


/* =========================================
   PROJECT DETAILS MODAL LOGIC (OUTSIDE DOMContentLoaded)
   ========================================= */

const projectData = {
    1: {
        title: "LuxeVista Hotel App",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1762666435/app_gipylb.mp4",
        description: "LuxeVista is a state-of-the-art mobile application designed to revolutionize the hospitality industry. Built using Android Studio and Java with a robust Firebase backend, it offers a seamless booking experience for users while providing hotel administrators with real-time management tools. The app features secure user authentication, real-time room availability tracking, and an integrated payment gateway.",
        liveLink: "#"
    },
    2: {
        title: "Wellness Center",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1762666506/Recording1_xefeeh.mp4",
        description: "The Wellness Center platform acts as a digital bridge between healthcare providers, therapists, and patients. Developed using PHP and MySQL, this responsive web application streamlines the appointment scheduling process. It eliminates manual booking errors by offering a dynamic calendar system where patients can view therapist availability in real-time.",
        liveLink: "#"
    },
    3: {
        title: "GadgetHub (SOC)",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1763397715/soc_vzklh6.mp4",
        description: "GadgetHub is a specialized Security Operations Center (SOC) dashboard developed using C# and .NET Core. This system allows distributors and security analysts to monitor network threats and compare product quotations simultaneously. It features a high-performance data processing engine capable of handling large volumes of logs.",
        liveLink: "#"
    },
    4: {
        title: "Gym Perfect",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1763398848/Video_Project_1_jupew2.mp4",
        description: "Gym Perfect is a comprehensive gym management solution designed to digitize fitness center operations. Built with PHP and Bootstrap, it handles member registrations, subscription tracking, and payment processing. The system includes automated alerts for expiring memberships, helping gym owners retain clients.",
        liveLink: "#"
    },
    5: {
        title: "Medicare Plus",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1764082617/Video_Project_5_m1rtvy.mp4",
        description: "Medicare Plus is a hospital management system aimed at reducing patient wait times and optimizing doctor schedules. This full-stack web application allows patients to book appointments online, view doctor profiles, and access their medical history securely.",
        liveLink: "#"
    },
    6: {
        title: "PaddySmart AI",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1765130438/Video_Project_6_crxjkp.mp4",
        description: "PaddySmart AI is a cutting-edge agricultural platform that leverages Artificial Intelligence to empower farmers. By integrating Python-based Machine Learning models with a React frontend, the system analyzes soil data and weather patterns to predict crop yields accurately.",
        liveLink: "#"
    }
};

// Global Modal Variables
const modal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close-modal");
const mTitle = document.getElementById("modal-title");
const mDesc = document.getElementById("modal-desc");
const mVideo = document.getElementById("modal-video");
const mSource = mVideo ? mVideo.querySelector("source") : null;
const mLive = document.getElementById("modal-live");

// Open Modal Function
function openModal(id) {
    const data = projectData[id];
    
    if(data && modal) {
        mTitle.innerText = data.title;
        mDesc.innerText = data.description;
        mLive.href = data.liveLink;
        
        if(mVideo && mSource) {
            mSource.src = data.video;
            mVideo.load();
            
            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add("show");
                mVideo.play();
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
        }, 300);
    }
}

// Attach Listeners if Elements Exist
if(closeModal) {
    closeModal.addEventListener("click", closeProjectModal);
}

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeProjectModal();
    }
});