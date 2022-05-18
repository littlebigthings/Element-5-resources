function addStoryCarousel() {
    let carouselComp = document.querySelector(".slider-list-wrapper");
    let lineComponent = document.querySelector("[data-slider='lines']");
    let prevBtn = document.querySelector(".prev-arrow-btn");
    let nextBtn = document.querySelector(".next-arrow-btn");
    if (carouselComp != undefined && prevBtn != undefined && nextBtn != undefined) {
        $(carouselComp).on("init", (event, slick) => {
            if (slick.currentSlide == 0) {
                prevBtn.style.opacity = "20%";
            }
            if (lineComponent != undefined) {
                let image = lineComponent.querySelector(".image-lines");
                for (let i = 1; i < slick.slideCount; i++) {
                    lineComponent.appendChild(image.cloneNode(true))
                }
            }
        });
        let slider = $(carouselComp).slick({
            dots: false,
            slidesToScroll: 1,
            infinite: false,
            autoplay: false,
            variableWidth: true,
            centerMode: false,
            draggable: false,
            focusOnSelect: false,
            arrows: true,
            prevArrow: prevBtn,
            nextArrow: nextBtn,
            asNavFor: lineComponent,
        });
        let lineSlider = $(lineComponent).slick({
            dots: false,
            slidesToScroll: 1,
            infinite: false,
            autoplay: false,
            variableWidth: true,
            arrows: false,
            centerMode: false,
            draggable: false,
            focusOnSelect: false,
            asNavFor: carouselComp,
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