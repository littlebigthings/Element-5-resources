function carouselTrusted() {
    let carouselElem = document.querySelector(".logo-list-wrapper");
    let calcGap = (carouselElem != undefined) && window.getComputedStyle(carouselElem.children[0]).getPropertyValue("margin-right");
    $(carouselElem).marquee({
        duration: 25000,
        gap: calcGap,
        delayBeforeStart: 3000,
        direction: 'left',
        duplicated: true,
        startVisible: true,
        allowCss3Support:true,
        css3easing:"linear",
    });
}

function onImagesLoaded(event) {
    var images = document.getElementsByClassName("logo-image");
    var loaded = images.length;
    for (var i = 0; i < images.length; i++) {
        if (images[i].complete) {
            loaded--;
        } else {
            images[i].addEventListener("load", function () {
                loaded--;
                if (loaded == 0) {
                    event();
                }
            });
        }
        if (loaded == 0) {
            event();
        }
    }
}
onImagesLoaded(carouselTrusted);