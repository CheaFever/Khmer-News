document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Loading Animation dismissal
    // const loader = document.getElementById("loader");
    // if (loader) {
    //     window.addEventListener("load", () => {
    //         loader.style.opacity = "0";
    //         setTimeout(() => {
    //             loader.style.display = "none";
    //         }, 500);
    //     });
    //     // Fallback safety trigger if load event already fired
    //     if (document.readyState === "complete") {
    //         loader.style.opacity = "0";
    //         setTimeout(() => { loader.style.display = "none"; }, 500);
    //     }
    // }

    // 2. Dark Mode Toggle implementation
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const bodyElement = document.body;
    
    // Check local preferences
    if (localStorage.getItem("theme") === "dark") {
        bodyElement.classList.add("dark-theme");
        darkModeToggle.innerHTML = `<i class="fas fa-sun"></i> របៀបពន្លឺ`;
    }

    darkModeToggle.addEventListener("click", () => {
        bodyElement.classList.toggle("dark-theme");
        if (bodyElement.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
            darkModeToggle.innerHTML = `<i class="fas fa-sun"></i> របៀបពន្លឺ`;
        } else {
            localStorage.setItem("theme", "light");
            darkModeToggle.innerHTML = `<i class="fas fa-moon"></i> របៀបងងឹត`;
        }
    });

    // 3. Search Filter System
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const newsCards = document.querySelectorAll(".news-card-item");

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const keyword = searchInput.value.toLowerCase().trim();

        newsCards.forEach(card => {
            const indexTitle = card.getAttribute("data-title").toLowerCase();
            const textContent = card.textContent.toLowerCase();
            
            if (indexTitle.includes(keyword) || textContent.includes(keyword)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
        
        // Dynamic scroll adjustment to display filters smoothly
        document.getElementById("latest").scrollIntoView({ behavior: "smooth" });
    });

    // 4. Scroll-to-Top Action handling
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.remove("d-none");
        } else {
            scrollTopBtn.classList.add("d-none");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (event) {
        if (!contactForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            alert("សូមអរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ យើងខ្ញុំនឹងទាក់ទងទៅអ្នកវិញឆាប់ៗ។");
            contactForm.reset();
            contactForm.classList.remove("was-validated");
            return;
        }
        contactForm.classList.add("was-validated");
    }, false);

    // 6. Newsletter Subscription handling
    const newsletterForm = document.getElementById("newsletter-form");
    newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("newsletter-email").value;
        if (emailInput) {
            alert(`ការចុះឈ្មោះបានជោគជ័យ! អ៊ីមែល ${emailInput} នឹងទទួលបានព័ត៌មានប្រចាំថ្ងៃចាប់ពីពេលនេះតទៅ។`);
            newsletterForm.reset();
        }
    });

    // 7. Smooth Navigation Scrolling
    const navLinks = document.querySelectorAll('#navbarContent .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile navigation menu on click structural items
                    const navbarCollapse = document.getElementById('navbarContent');
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});