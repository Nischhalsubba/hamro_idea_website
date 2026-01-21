import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial State - Hidden
    gsap.set(".navbar", { y: -20, opacity: 0 });
    gsap.set(".nav-item", { y: -10, opacity: 0 });
    gsap.set(".hero-title", { y: 30, opacity: 0 });
    gsap.set(".hero-subtitle", { y: 20, opacity: 0 });
    gsap.set(".hero-desc", { y: 20, opacity: 0 });
    gsap.set(".hero-actions .btn", { scale: 0.9, opacity: 0 });

    // Main Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".navbar", { duration: 0.8, y: 0, opacity: 1 })
        .to(".nav-item", { duration: 0.5, y: 0, opacity: 1, stagger: 0.1 }, "-=0.4")
        .to(".hero-title", { duration: 1, y: 0, opacity: 1 }, "-=0.2")
        .to(".hero-subtitle", { duration: 0.8, y: 0, opacity: 1 }, "-=0.6")
        .to(".hero-desc", { duration: 0.8, y: 0, opacity: 1 }, "-=0.6")
        .to(".hero-actions .btn", { duration: 0.5, scale: 1, opacity: 1, stagger: 0.1 }, "-=0.4");

    // Custom Cursor Logic
    const cursor = document.querySelector(".cursor");
    const mouse = { x: 0, y: 0 };
    const cursorObj = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // RAF Loop for smooth cursor following
    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
        cursorObj.x += (mouse.x - cursorObj.x) * dt;
        cursorObj.y += (mouse.y - cursorObj.y) * dt;
        gsap.set(cursor, { x: cursorObj.x, y: cursorObj.y });
    });

    // Cursor Interactions
    const interactiveElements = document.querySelectorAll("a, button, .btn");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("active"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });

    // Hero Background Micro-animation
    gsap.to(".hero-bg-gradient", {
        backgroundPosition: "100% 50%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Button Hover Effects
    const buttons = document.querySelectorAll(".btn-white-composite");
    buttons.forEach(btn => {
        const icon = btn.querySelector(".icon-box svg");
        btn.addEventListener("mouseenter", () => {
            gsap.to(icon, { x: 5, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(icon, { x: 0, duration: 0.3, ease: "power2.out" });
        });
    });

    // Section reveal helpers
    const revealItems = (selector, options = {}) => {
        gsap.utils.toArray(selector).forEach((item) => {
            gsap.fromTo(
                item,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        ...options
                    }
                }
            );
        });
    };

    revealItems(".services .service-item");
    revealItems(".services__sticky .icon-cube");
    revealItems(".section-icon");
    revealItems(".services__sticky .services__title");
    revealItems(".services__sticky .services__description");
    revealItems(".collaboration__header");
    revealItems(".solutions__header");
    revealItems(".solutions__item");
    revealItems(".why-choose__card");
    revealItems(".testimonial .card");
    revealItems(".insights .insights__card");
    revealItems(".section-controls");
    revealItems(".cta .cta__content");
    revealItems(".site-footer__card");

    // Collaboration card motion
    gsap.utils.toArray(".collaboration .collab-card").forEach((card) => {
        const tlCard = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        tlCard.from(card, { y: 40, opacity: 0, scale: 0.98, duration: 0.7, ease: "power3.out" });

        if (card.classList.contains("collab-card--expertise")) {
            const badge = card.querySelector(".expertise-badge");
            if (badge) {
                tlCard.from(badge, { y: 24, opacity: 0, duration: 0.6 }, "-=0.4");
            }
        }

        if (card.classList.contains("collab-card--strategies")) {
            const gauge = card.querySelector(".gauge-fill");
            if (gauge) {
                tlCard.fromTo(
                    gauge,
                    { strokeDashoffset: 377 },
                    { strokeDashoffset: 120, duration: 1, ease: "power2.out" },
                    "-=0.4"
                );
            }
        }

        if (card.classList.contains("collab-card--empowerment")) {
            const layers = card.querySelectorAll(".layer");
            if (layers.length) {
                tlCard.from(layers, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");
            }
        }
    });

    // Hover interactions with GSAP (buttons + cards)
    const hoverLift = (selector, config = {}) => {
        gsap.utils.toArray(selector).forEach((el) => {
            el.addEventListener("mouseenter", () => {
                gsap.to(el, {
                    y: typeof config.y === "number" ? config.y : -4,
                    scale: typeof config.scale === "number" ? config.scale : 1.02,
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
            el.addEventListener("mouseleave", () => {
                gsap.to(el, {
                    y: 0,
                    scale: 1,
                    duration: 0.25,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
        });
    };

    hoverLift(".btn");
    hoverLift(".section-control", { scale: 1.05, y: -3 });
    hoverLift(".btn-text-icon", { scale: 1.03, y: -3 });
    hoverLift(".item-link", { scale: 1.02, y: -2 });
    hoverLift(".insights__link", { scale: 1.02, y: -2 });
    hoverLift(".navbar__menu-desktop .nav-link", { scale: 1.03, y: -2 });
    hoverLift(".mega-menu .service-card", { scale: 1.02, y: -3 });
    hoverLift(".services .service-item", { scale: 1.01, y: -3 });

    const arrowButtons = document.querySelectorAll(".btn--icon-block");
    arrowButtons.forEach((btn) => {
        const icon = btn.querySelector(".btn-icon-box svg");
        if (!icon) return;

        let hoverTl;
        btn.addEventListener("mouseenter", () => {
            if (hoverTl) {
                hoverTl.kill();
            }
            hoverTl = gsap.timeline({ defaults: { ease: "power2.out" } });
            hoverTl
                .to(icon, { x: 10, opacity: 0, duration: 0.2 })
                .set(icon, { x: -10, opacity: 0 })
                .to(icon, { x: 0, opacity: 1, duration: 0.25 });
        });
    });

    // Collaboration cards get enhanced hover motion
    gsap.utils.toArray(".collaboration .collab-card").forEach((card) => {
        const visual = card.querySelector(".collab-card__visual");
        card.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -8, duration: 0.25, ease: "power2.out", overwrite: "auto" });
            if (visual) {
                gsap.to(visual, { scale: 1.03, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            }
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            if (visual) {
                gsap.to(visual, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
            }
        });
    });
});
