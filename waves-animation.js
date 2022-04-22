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

function carouselTrusted() {
    let carouselElem = document.querySelector(".logo-list-wrapper");
    if(carouselElem != undefined){
        $(carouselElem).slick({
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            variableWidth: true,
        });
    }
}

function automationCarousel(){
    let carouselWrpArr = document.querySelectorAll(".unlimited-list-wrap");
    if(carouselWrpArr.length > 0){
        let direction = true;
        carouselWrpArr.forEach((item, index)=>{
            if(index == 1)direction=false
            $(item).slick({
                slidesToScroll: 1,
                rtl:direction,
                centerMode:direction,
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                variableWidth: true,
            });
        })
    }
}
animateWaves();
carouselTrusted();
automationCarousel();