import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
    // Initial State - Hidden
    gsap.set(".navbar", { y: -20, opacity: 0 });
    gsap.set(".navbar__menu-item", { y: -10, opacity: 0 });
    gsap.set(".hero-title", { y: 30, opacity: 0 });
    gsap.set(".hero-subtitle", { y: 20, opacity: 0 });
    gsap.set(".hero-actions .btn", { scale: 0.9, opacity: 0 });

    // Main Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".navbar", { duration: 0.8, y: 0, opacity: 1 })
        .to(".navbar__menu-item", { duration: 0.5, y: 0, opacity: 1, stagger: 0.1 }, "-=0.4")
        .to(".hero-title", { duration: 1, y: 0, opacity: 1 }, "-=0.2")
        .to(".hero-subtitle", { duration: 0.8, y: 0, opacity: 1 }, "-=0.6")
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
    gsap.to(".hero-bg-gradient::before", {
        scale: 1.1,
        opacity: 0.6,
        duration: 4,
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
});
