function addStoryCarousel() {
    let carouselComp = document.querySelector(".slider-list-wrapper");
    let prevBtn = document.querySelector(".prev-arrow-btn");
    let nextBtn = document.querySelector(".next-arrow-btn");

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
            autoplay: true,
            autoplaySpeed: 3000,
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
        })
    }
}

addStoryCarousel();