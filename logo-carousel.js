function carouselTrusted() {
    let carouselElem = document.querySelector(".logo-list-wrapper");
    let calcGap = (carouselElem != undefined) && window.getComputedStyle(carouselElem.children[0]).getPropertyValue("margin-right");
    $(carouselElem).marquee({
        duration: 25000,
        gap: calcGap,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: true,
        startVisible: true,
    });
}

function onImagesLoaded(event) {
    var images = document.getElementsByClassName("logo-image");
    console.log(images.length)
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