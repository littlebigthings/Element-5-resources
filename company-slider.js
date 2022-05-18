function addStoryCarousel() {
    let carouselComp = document.querySelector(".slider-list-wrapper");
    let prevBtn = document.querySelector(".prev-arrow-btn");
    let nextBtn = document.querySelector(".next-arrow-btn");
    let lineArr = [...document.querySelectorAll("[data-line]")];
    let runOppo = false;
    if (carouselComp != undefined && prevBtn != undefined && nextBtn != undefined) {
        $(carouselComp).on("init", (event, slick) => {
            if (slick.currentSlide == 0) {
                prevBtn.style.opacity = "20%";
            }
        });
        let slider = $(carouselComp).slick({
            dots: false,
            slidesToScroll: 1,
            infinite: false,
            autoplay: false,
            variableWidth: true,
            arrows: false,
            centerMode: false,
            draggable: false,
            focusOnSelect: false,
            arrows: true,
            prevArrow: prevBtn,
            nextArrow: nextBtn,
        });
        slider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
            if (nextSlide >= 1) {
                gsap.to(lineArr[0], {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'linear',
                })
                prevBtn.style.opacity = "100%";
            }
            if (nextSlide == slick.slideCount - 1) {
                nextBtn.style.opacity = "20%";
            }
            if (nextSlide < slick.slideCount - 1) {
                nextBtn.style.opacity = "100%";
            }
            if (nextSlide == 0) {
                prevBtn.style.opacity = "10%"
            }
            if (currentSlide < nextSlide) {
                let lineToAnim = lineArr.find(elm => parseInt(elm.getAttribute('data-line')) === nextSlide);
                if (lineToAnim != undefined) {
                    gsap.to(lineToAnim, {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'linear',
                    })
                }
            } else {
                let lineToAnim = lineArr.find(elm => parseInt(elm.getAttribute('data-line')) === currentSlide);
                if (lineToAnim != undefined) {
                    gsap.to(lineToAnim, {
                        opacity: 0.2,
                        duration: 0.5,
                        ease: 'linear',
                    })
                }
            }
        })
    }
}

addStoryCarousel();