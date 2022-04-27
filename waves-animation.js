import { DrawSVGPlugin } from "./DrawSVGPlugin.js";
function animateWaves() {
    let waves = document.querySelectorAll("[data-line]");
    let heroImg = document.querySelector(".hero-image-wrap");
    if (waves.length > 0 && heroImg != undefined) {
        let animTimeline = gsap.timeline({ ease: "linear", });
        animTimeline.from(waves, { drawSVG: "0% 0%", duration: 6, })
        animTimeline.from(heroImg, { y: "-10px", opacity: 0, duration: 1, }, "-=3")
    }
}
animateWaves();