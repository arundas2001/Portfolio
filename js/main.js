(function () {
    try {
        if (localStorage.getItem("portfolio-theme") === "night") {
            document.documentElement.classList.add("night-preload");
        }
    } catch (_) {}
})();
document.addEventListener("DOMContentLoaded", () => {

    /* ELEMENTS */
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileOverlay = document.getElementById("mobileMenuOverlay");
    const mobileClose = document.getElementById("mobileMenuClose");
    const themeToggle = document.getElementById("dn");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileLinks = document.querySelectorAll(".mobile-menu-link");

    /* MOBILE MENU */
    function openMenu() {
        if (!mobileMenu || !mobileOverlay) return;

        mobileMenu.classList.add("active");
        mobileOverlay.classList.add("active");

        if (mobileToggle) {
            mobileToggle.classList.add("active");
            mobileToggle.setAttribute("aria-expanded", "true");
        }

        mobileMenu.setAttribute("aria-hidden", "false");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove("active");
            mobileMenu.setAttribute("aria-hidden", "true");
        }
        if (mobileOverlay) mobileOverlay.classList.remove("active");
        if (mobileToggle) {
            mobileToggle.classList.remove("active");
            mobileToggle.setAttribute("aria-expanded", "false");
        }
        document.body.classList.remove("menu-open");
    }

    if (mobileToggle) {
        mobileToggle.addEventListener("click", (event) => {
            event.preventDefault();
            if (mobileMenu && mobileMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener("click", (event) => {
            event.preventDefault();
            closeMenu();
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", () => closeMenu());
    }

    /* NAVIGATION FUNCTION */
    function navigateToSection(link) {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        navLinks.forEach((item) => item.classList.remove("active"));
        navLinks.forEach((item) => {
            if (item.getAttribute("href") === href) item.classList.add("active");
        });

        mobileLinks.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href") === href) item.classList.add("active");
        });

        closeMenu();

        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href === "#" || link.classList.contains("cta-button")) return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            navigateToSection(link);
        });
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            navigateToSection(link);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    /* DAY / NIGHT MODE */
    function applyTheme(isNight) {
        document.documentElement.classList.remove("night-preload");
        document.body.classList.toggle("night-mode", isNight);
        if (themeToggle) themeToggle.checked = isNight;
    }

    if (themeToggle) {
        themeToggle.addEventListener("change", () => {
            const isNight = themeToggle.checked;
            applyTheme(isNight);
            localStorage.setItem("portfolio-theme", isNight ? "night" : "day");
        });

        const savedTheme = localStorage.getItem("portfolio-theme");
        applyTheme(savedTheme === "night");
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) closeMenu();
    });

    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
    if (mobileMenu) mobileMenu.setAttribute("aria-hidden", "true");

    /* PRELOADER */
    const preloader = document.getElementById("pagePreloader");

    function hidePreloader() {
        if (preloader) {
            setTimeout(() => preloader.classList.add("loaded"), 400);
        }
    }

    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener("load", hidePreloader);
    }

    /* CONTACT FORM */
    const contactForm = document.getElementById("contactForm");
    const contactPopup = document.getElementById("contactPopup");
    const popupBackdrop = document.getElementById("popupBackdrop");
    const popupClose = document.getElementById("popupClose");
    const popupMessage = document.getElementById("popupMessage");

    function openPopup() {
        if (contactPopup) contactPopup.classList.add("active");
        if (popupBackdrop) popupBackdrop.classList.add("active");
    }

    function closePopup() {
        if (contactPopup) contactPopup.classList.remove("active");
        if (popupBackdrop) popupBackdrop.classList.remove("active");
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // stop the page reloading

            const name = document.getElementById("name").value.trim();

            if (popupMessage) {
                popupMessage.textContent = "Thanks, " + (name || "there") + "! I will reply soon.";
            }

            openPopup();
            contactForm.reset();
        });
    }

    if (popupClose) popupClose.addEventListener("click", closePopup);
    if (popupBackdrop) popupBackdrop.addEventListener("click", closePopup);

});
