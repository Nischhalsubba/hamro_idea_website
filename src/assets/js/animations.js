import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let cursorTicker = null;
let mouseMoveHandler = null;
let threeResizeHandler = null;
let threeRenderFrame = null;
let theatreFrame = null;
let threeRenderer = null;
let ambientCanvas = null;

const cleanupAnimations = () => {
    if (cursorTicker) {
        gsap.ticker.remove(cursorTicker);
        cursorTicker = null;
    }

    if (mouseMoveHandler) {
        window.removeEventListener("mousemove", mouseMoveHandler);
        mouseMoveHandler = null;
    }

    if (threeResizeHandler) {
        window.removeEventListener("resize", threeResizeHandler);
        threeResizeHandler = null;
    }

    if (threeRenderFrame) {
        cancelAnimationFrame(threeRenderFrame);
        threeRenderFrame = null;
    }

    if (theatreFrame) {
        cancelAnimationFrame(theatreFrame);
        theatreFrame = null;
    }

    if (threeRenderer) {
        threeRenderer.dispose();
        threeRenderer = null;
    }

    if (ambientCanvas && ambientCanvas.parentNode) {
        ambientCanvas.parentNode.removeChild(ambientCanvas);
        ambientCanvas = null;
    }

    if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
};

const initAnimations = () => {
    cleanupAnimations();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const isHome = document.querySelector(".hero") !== null;
    const isDetailPage = document.querySelector(".page-hero") !== null && !isHome;

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

    // Page hero timeline (non-home pages)
    gsap.utils.toArray(".page-hero").forEach((hero) => {
        const content = hero.querySelector(".page-hero__content");
        const panel = hero.querySelector(".page-hero__panel");
        const badges = hero.querySelectorAll(".hero-badge");
        const actions = hero.querySelectorAll(".page-actions .btn");

        const heroElements = [content, panel].filter(Boolean);
        if (heroElements.length) {
            gsap.set(heroElements, { y: 30, opacity: 0 });
        }
        if (badges.length) {
            gsap.set(badges, { y: 12, opacity: 0, scale: 0.95 });
        }
        if (actions.length) {
            gsap.set(actions, { y: 12, opacity: 0, scale: 0.96 });
        }

        const heroTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: hero,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        if (content) {
            heroTl.to(content, { duration: 0.9, y: 0, opacity: 1 });
        }
        if (panel) {
            heroTl.to(panel, { duration: 0.9, y: 0, opacity: 1 }, "-=0.6");
        }
        if (badges.length) {
            heroTl.to(badges, { duration: 0.6, y: 0, opacity: 1, scale: 1, stagger: 0.08 }, "-=0.5");
        }
        if (actions.length) {
            heroTl.to(actions, { duration: 0.6, y: 0, opacity: 1, scale: 1, stagger: 0.08 }, "-=0.5");
        }
    });

    // Custom Cursor Logic
    const cursor = document.querySelector(".cursor");
    const mouse = { x: 0, y: 0 };
    const cursorObj = { x: 0, y: 0 };

    mouseMoveHandler = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", mouseMoveHandler);

    // RAF Loop for smooth cursor following
    if (cursor) {
        cursorTicker = () => {
            const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
            cursorObj.x += (mouse.x - cursorObj.x) * dt;
            cursorObj.y += (mouse.y - cursorObj.y) * dt;
            gsap.set(cursor, { x: cursorObj.x, y: cursorObj.y });
        };
        gsap.ticker.add(cursorTicker);
    }

    // Cursor Interactions
    const interactiveElements = document.querySelectorAll("a, button, .btn");
    if (cursor) {
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => cursor.classList.add("active"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
        });
    }

    // Hero Background Micro-animation
    gsap.to(".hero-bg-gradient", {
        backgroundPosition: "100% 50%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    if (!isDetailPage) {
        // Page hero ambient motion (disabled on detail pages)
        gsap.utils.toArray(".page-hero").forEach((hero) => {
            const glow = hero.querySelector(".page-hero__glow");
            const panel = hero.querySelector(".page-hero__panel");
            const badges = hero.querySelectorAll(".hero-badge");

            if (glow) {
                gsap.to(glow, {
                    opacity: 0.9,
                    scale: 1.04,
                    duration: 6,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            if (panel) {
                gsap.to(panel, {
                    y: -10,
                    duration: 4.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            if (badges.length) {
                gsap.to(badges, {
                    y: -6,
                    duration: 2.6,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: 0.2
                });
            }
        });
    }

    // Subtle hero layer motion on detail pages (extra GSAP without overwhelming)
    gsap.utils.toArray(".page-hero").forEach((hero) => {
        const bg = hero.querySelector(".page-hero__bg");
        const orb = hero.querySelector(".page-hero__orb");
        const noise = hero.querySelector(".page-hero__noise");
        const chips = hero.querySelectorAll(".hero-chip");

        if (bg) {
            gsap.to(bg, { y: -10, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }
        if (orb) {
            gsap.to(orb, { y: -14, x: 10, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }
        if (noise) {
            gsap.to(noise, { opacity: 0.25, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }
        if (chips.length) {
            gsap.fromTo(chips, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" });
        }
    });

    // Button Hover Effects
    const buttons = document.querySelectorAll(".btn-white-composite");
    buttons.forEach((btn) => {
        const icon = btn.querySelector(".icon-box svg");
        if (!icon) return;
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
    revealItems(".page-section__header");
    revealItems(".signature-card");
    revealItems(".visual-card__tile");
    revealItems(".mosaic-tile");
    revealItems(".timeline-step");
    revealItems(".metric-card");
    revealItems(".page-faq");
    revealItems(".page-list li");

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
    hoverLift(".signature-card", { scale: 1.02, y: -6 });
    hoverLift(".mosaic-tile", { scale: 1.02, y: -6 });
    hoverLift(".timeline-step", { scale: 1.01, y: -4 });
    hoverLift(".metric-card", { scale: 1.02, y: -5 });
    hoverLift(".page-faq", { scale: 1.01, y: -3 });
    hoverLift(".page-list li", { scale: 1.01, y: -2 });
    hoverLift(".page-hero__panel", { scale: 1.01, y: -4 });
    hoverLift(".visual-card__tile", { scale: 1.02, y: -3 });

    if (!isDetailPage) {
        // Ambient float for card-based sections (disabled on detail pages)
        gsap.utils.toArray(".signature-card, .mosaic-tile, .metric-card, .page-faq").forEach((card, index) => {
            gsap.to(card, {
                y: -6,
                duration: 4 + (index % 3) * 0.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }

    // Anime.js micro-motion (if available)
    if (window.anime && !prefersReducedMotion) {
        window.anime({
            targets: ".signature-kicker, .hero-badge, .section-kicker",
            translateY: [0, -3],
            direction: "alternate",
            loop: true,
            easing: "easeInOutSine",
            delay: window.anime.stagger(120),
            duration: 2400
        });
    }

    // Three.js ambient canvas (if available)
    if (window.THREE && !prefersReducedMotion) {
        const hero = document.querySelector(".page-hero");
        if (hero) {
            ambientCanvas = document.createElement("canvas");
            ambientCanvas.className = "hero-ambient-canvas";
            hero.appendChild(ambientCanvas);

            threeRenderer = new window.THREE.WebGLRenderer({
                canvas: ambientCanvas,
                alpha: true,
                antialias: true
            });
            threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

            const scene = new window.THREE.Scene();
            const camera = new window.THREE.PerspectiveCamera(45, 1, 0.1, 100);
            camera.position.z = 6;

            const count = 120;
            const geometry = new window.THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            for (let i = 0; i < count * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 8;
                positions[i + 1] = (Math.random() - 0.5) * 5;
                positions[i + 2] = (Math.random() - 0.5) * 6;
            }
            geometry.setAttribute("position", new window.THREE.BufferAttribute(positions, 3));

            const material = new window.THREE.PointsMaterial({
                color: 0x6a6df5,
                size: 0.035,
                opacity: 0.6,
                transparent: true
            });
            const points = new window.THREE.Points(geometry, material);
            scene.add(points);

            const resize = () => {
                const rect = hero.getBoundingClientRect();
                const width = rect.width || window.innerWidth;
                const height = rect.height || window.innerHeight;
                threeRenderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            };
            threeResizeHandler = resize;
            threeResizeHandler();
            window.addEventListener("resize", threeResizeHandler, { passive: true });

            const render = () => {
                points.rotation.y += 0.0006;
                points.rotation.x += 0.0004;
                threeRenderer.render(scene, camera);
                threeRenderFrame = requestAnimationFrame(render);
            };
            render();
        }
    }

    // Theatre.js drift control (if available)
    if (window.Theatre && window.Theatre.getProject && window.Theatre.types && !prefersReducedMotion) {
        try {
            const project = window.Theatre.getProject("Hamro Idea Ambient");
            const sheet = project.sheet("Hero Drift");
            const hero = sheet.object("Gradient", {
                drift: window.Theatre.types.number(0, { range: [-1, 1] })
            });

            hero.onValuesChange((values) => {
                document.documentElement.style.setProperty("--theatre-drift", values.drift);
            });

            let t = 0;
            const tick = () => {
                t += 0.003;
                const drift = Math.sin(t);
                try {
                    hero.value = { drift };
                } catch (error) {
                    document.documentElement.style.setProperty("--theatre-drift", drift);
                }
                theatreFrame = requestAnimationFrame(tick);
            };
            tick();
        } catch (error) {
            document.documentElement.style.setProperty("--theatre-drift", 0);
        }
    }

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
};

window.initAnimations = initAnimations;
window.cleanupAnimations = cleanupAnimations;
document.addEventListener("DOMContentLoaded", initAnimations);
