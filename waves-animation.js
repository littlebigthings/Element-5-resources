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
            if(index == 1)direction=false;
            $(item).on("init", () => {
                addCssStyle(index);
            })
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

function addCssStyle(index){
    let carouselWrpArr = document.querySelectorAll(".unlimited-list-wrap")[index];
    let cardsArr = (carouselWrpArr != undefined) && carouselWrpArr.querySelectorAll(".auto-card-wrap");
    if(cardsArr.length > 0){
        cardsArr.forEach(card => {
            let itemIndex = card.querySelector("[data-item='index']");
            let image = card.querySelector(".card-image");
            if(itemIndex != undefined && itemIndex.innerHTML.length > 0){
                cssObj.forEach(item => {
                   if(item.itemIndex == itemIndex.innerHTML){
                       let currCardShadowState = card.style.boxShadow;
                       image.style.boxShadow = item.imageShadow;
                       card.addEventListener("mouseover", () => {
                        card.style.boxShadow = item.cardShadow;
                        card.style.borderColor = item.borderColor;
                       })
                       card.addEventListener("mouseleave", () => {
                        card.style.boxShadow = currCardShadowState;
                        card.style.boxShadow = "none";
                       })
                   }
                })
            }
        })
    }
}
animateWaves();
carouselTrusted();
automationCarousel();