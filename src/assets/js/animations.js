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
    revealItems(".services__sticky .services__title");
    revealItems(".services__sticky .services__description");
    revealItems(".collaboration__header");
    revealItems(".collaboration .collab-card");
    revealItems(".solutions__header");
    revealItems(".solutions__item");
    revealItems(".work .card");
    revealItems(".our-apporach .approach-item");
    revealItems(".technology .card");
    revealItems(".technology .experience_item");
    revealItems(".testimonial .card");
    revealItems("footer .cta");
    revealItems("footer .footer_bottom");
});
