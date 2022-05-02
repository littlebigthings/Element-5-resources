let allCards = [...document.querySelectorAll("[data-item='card']")];
let allAlias = document.querySelectorAll("[data-item='alias']");
let allInfo = document.querySelectorAll("[data-item='full-info']");
let descToShowComp = document.querySelector("[data-item='put-desc']");
let mainWrapper = document.querySelector(".team-leaders-wrap");
gsap.registerPlugin(Flip);
function doFlip(card) {
    // Get the initial state
    let aliasWrp = card.querySelector("[data-item='alias']");
    let fullInfo = card.querySelector("[data-item='full-info']");
    let state = Flip.getState(card, aliasWrp, fullInfo,{simple:true,});
    aliasWrp.classList.toggle("first-name-hide");
    fullInfo.classList.toggle("leader-details-hide");
    card.classList.toggle("active-card");
    
    // Animate from the initial state to the end state
    Flip.from(state, {
        scale: false,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.out",
    });
}

function animateCards() {
    if (allCards.length > 0) {
        allCards.forEach((card, index) => {
            
            let aliasWrp = card.querySelector("[data-item='alias']");
            let fullInfo = card.querySelector("[data-item='full-info']");
            if (card.classList.contains("active-card") && index != 0) {
                if (aliasWrp != undefined && fullInfo != undefined) {
                    if(window.screen.width > 768){
                        aliasWrp.classList.remove("first-name-hide");
                        fullInfo.classList.add("leader-details-hide");
                        card.classList.remove("active-card");
                    }
                }
            }
            else{
                if(window.screen.width <= 768){
                    aliasWrp.classList.add("first-name-hide");
                    fullInfo.classList.remove("leader-details-hide");
                    card.classList.add("active-card");
                }
            }
            if (index == 0) {
                let infoToShow = card.querySelector("[data-item='get-desc']");
                if (aliasWrp != undefined && fullInfo != undefined && infoToShow != undefined) {
                    if(window.screen.width > 768){
                    aliasWrp.classList.add("first-name-hide");
                    fullInfo.classList.remove("leader-details-hide");
                    card.classList.add("active-card");
                    }
                    else if(window.screen.width <= 768){
                        aliasWrp.classList.add("first-name-hide");
                        fullInfo.classList.remove("leader-details-hide");
                        card.classList.add("active-card");
                        }
                    descToShowComp.innerHTML = infoToShow.innerHTML;
                }
            }
            if(window.screen.width > 768){
                card.addEventListener("click", (event) => {
                    let currCard = event.currentTarget;
                    if (currCard != undefined && !currCard.classList.contains("active-card")) {
                        let infoToShow = card.querySelector("[data-item='get-desc']");
                        descToShowComp.innerHTML = infoToShow.innerHTML;
                        gsap.fromTo(descToShowComp,{y:"-10px",opacity:0},{y:"0", opacity:1, duration:0.5, ease:'linear'});
                        doFlip(currCard)
                        deactiveCards(currCard);
                    }
                })
            }
        })
    }
}

function deactiveCards(activeCard) {
    if (activeCard != undefined) {
        if (allAlias.length > 0 && allInfo.length > 0) {
            allCards.forEach((card, index) => {
                if (card == activeCard) return;
                if (!card.classList.contains("active-card")) return;
                doFlip(card)
            })
        }
    }
}

function initSlider(){
    if(mainWrapper != undefined){
        let slider = $(mainWrapper).slick({
            dots: false,
            slidesToScroll: 1,
            infinite: false,
            autoplay: false,
            variableWidth: true,
            arrows: false,
            centerMode: true,
            draggable: true,
            focusOnSelect: true,
            arrows: false,
            speed:500,
        });
        slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
            let currCard = allCards[nextSlide];
                if (currCard != undefined && currCard.classList.contains("active-card")) {
                    let infoToShow = currCard.querySelector("[data-item='get-desc']");
                    descToShowComp.innerHTML = infoToShow.innerHTML;
                    gsap.fromTo(descToShowComp,{y:"-10px",opacity:0},{y:"0", opacity:1, duration:0.5, ease:'linear'});
                }
        })
    }
}

animateCards();
if(window.screen.width < 768){
    initSlider();
}