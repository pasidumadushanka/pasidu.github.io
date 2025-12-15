document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen
    const loader = document.querySelector('.loader');
    if(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    }

    // 2. Initialize AOS
    AOS.init({ duration: 1000, offset: 100, once: true });

    // 3. Typed.js
    new Typed('#typed-text', {
        strings: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer','UX/UI Designer'],
        typeSpeed: 50, backSpeed: 30, loop: true
    });

    // 4. Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Active Classes
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

        // Close menu when clicking outside (Optional but good UX)
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    }

    // 5. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    const body = document.body;

    if(localStorage.getItem('theme') === 'light'){
        body.classList.add('light-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // 6. Portfolio Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.target).classList.add('active');
        });
    });

    // 7. Swiper Slider
    new Swiper('.testimonial-slider', {
        slidesPerView: 1, spaceBetween: 30, pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });

    // --- CONTACT FORM WITH TOAST ---
const form = document.getElementById("my-form");
const toastBox = document.getElementById("toast-box");

function showToast(msg, type) {
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = type === 'success' 
        ? `<i class="fas fa-check-circle"></i> ${msg}` 
        : `<i class="fas fa-exclamation-circle"></i> ${msg}`;

    if (type === 'error') toast.classList.add("error");
    if (type === 'invalid') toast.classList.add("invalid");

    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

if(form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        // Button Loading State
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

    // 9. Vanilla Tilt (Updated)
    // මෙතනින් මම '.glass' අයින් කළා. දැන් Project Cards හෙලවෙන්නේ නෑ.
    // Hero Image Border එකට විතරක් 3D Effect එක වැඩ කරයි.
    VanillaTilt.init(document.querySelectorAll(".img-border"), {
        max: 15, speed: 400, glare: true, "max-glare": 0.2
    });
    }); 
    /* =========================================
   PROJECT DETAILS MODAL LOGIC (VIDEO & FULL DESC)
   ========================================= */

// 1. Project Data (Updated with Videos & Professional Descriptions)
const projectData = {
    1: {
        title: "LuxeVista Hotel App",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1762666435/app_gipylb.mp4",
        description: "LuxeVista is a state-of-the-art mobile application designed to revolutionize the hospitality industry. Built using Android Studio and Java with a robust Firebase backend, it offers a seamless booking experience for users while providing hotel administrators with real-time management tools. The app features secure user authentication, real-time room availability tracking, and an integrated payment gateway. Its intuitive UI/UX design ensures that guests can effortlessly navigate through services, making their stay more enjoyable and efficient.",
        liveLink: "#"
    },
    2: {
        title: "Wellness Center",
        video: "https://res.cloudinary.com/ddykxl9pe/video/upload/v1765785601/wellness_app_ohgmj5.mp4",
        description: "The Wellness Center platform acts as a digital bridge between healthcare providers, therapists, and patients. Developed using PHP and MySQL, this responsive web application streamlines the appointment scheduling process. It eliminates manual booking errors by offering a dynamic calendar system where patients can view therapist availability in real-time. Key features include an admin dashboard for staff management, automated email notifications for appointments, and a secure patient record system, ensuring privacy and efficiency in healthcare delivery.",
        liveLink: "#"
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

// 2. DOM Elements
const modal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close-modal");
const mTitle = document.getElementById("modal-title");
const mDesc = document.getElementById("modal-desc");
const mVideo = document.getElementById("modal-video");
const mSource = mVideo.querySelector("source");
const mLive = document.getElementById("modal-live");

// 3. Function to Open Modal
function openModal(id) {
    const data = projectData[id];
    
    if(data) {
        // Set Text Data
        mTitle.innerText = data.title;
        mDesc.innerText = data.description;
        mLive.href = data.liveLink;
        
        // Set Video Source
        mSource.src = data.video;
        mVideo.load(); // Reload video element to apply new source
        
        // Show Modal
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add("show");
            mVideo.play(); // Auto-play video when modal opens
        }, 10);
        
        // Disable Background Scroll
        document.body.style.overflow = "hidden";
    }
}

// 4. Function to Close Modal
function closeProjectModal() {
    modal.classList.remove("show");
    mVideo.pause(); // Pause video to save resources
    
    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Enable Scroll
        mSource.src = ""; // Clear source to stop buffering
    }, 300);
}

// Event Listeners
closeModal.addEventListener("click", closeProjectModal);

// Close when clicking outside
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeProjectModal();
    }
});
// --- SCROLL PROGRESS BAR LOGIC ---
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    document.querySelector(".scroll-progress").style.width = `${scrollPercentage}%`;
});