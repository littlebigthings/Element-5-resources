function automationCarousel() {
    let carouselWrpArr = document.querySelectorAll(".unlimited-list-wrap");
    if (carouselWrpArr.length > 0) {
        let direction = 'left';
        carouselWrpArr.forEach((item, index) => {
            if (index == 1) direction = 'right';
            let marqueeCtrl = $(item).marquee({
                duration: 50000,
                gap: 0,
                delayBeforeStart: 0,
                direction: direction,
                duplicated: true,
                startVisible: true,
            });
            addCssStyle(index, marqueeCtrl)
        })
    }
}

function addCssStyle(index, marqueeCtrl) {
    let carouselWrpArr = document.querySelectorAll(".unlimited-list-wrap")[index];
    let cardsArr = (carouselWrpArr != undefined) && carouselWrpArr.querySelectorAll(".auto-card-wrap");
    if (cardsArr.length > 0) {
        cardsArr.forEach(card => {
            let itemIndex = card.querySelector("[data-item='index']");
            let image = card.querySelector(".card-image");
            if (itemIndex != undefined && itemIndex.innerHTML.length > 0) {
                cssObj.forEach(item => {
                    if (item.itemIndex == itemIndex.innerHTML) {
                        let currCardShadowState = card.style.boxShadow;
                        image.style.boxShadow = item.imageShadow;
                        card.addEventListener("mouseover", () => {
                            marqueeCtrl.marquee('pause');
                            card.style.boxShadow = item.cardShadow;
                            card.style.borderColor = item.borderColor;
                        })
                        card.addEventListener("mouseleave", () => {
                            marqueeCtrl.marquee('resume');
                            card.style.boxShadow = currCardShadowState;
                            card.style.borderColor = "transparent";
                        })
                    }
                })
            }
        })
    }
}

automationCarousel();