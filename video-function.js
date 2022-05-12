function playVideo() {
    let playBtn = document.querySelectorAll("[data-video-src]");
    let videoWrapper = document.querySelector("[data-video='video']");
    let closeBtn = document.querySelector(".video-popup-close-btn");
    if (playBtn.length > 0 && videoWrapper != undefined && closeBtn != undefined) {
        playBtn.forEach(btn => {
            btn.addEventListener("click", (event) => {
                let btnSrc = event.target.getAttribute('data-video-src');
                if (btnSrc.length > 0) {
                    videoWrapper.setAttribute('src', btnSrc)
                }
            })
            closeBtn.addEventListener("click", () => {
                videoWrapper.removeAttribute('src', "");
            })
        })
    }
}
playVideo();

function animatePopupVideo() {
    let videoWrapper = document.querySelector(".popup-section");
    let videoPlugin = document.querySelector("[data-video='video']");
    let playBtn = document.querySelector("[data-video-src='src-value']");
    let identifyText = document.querySelector("[data-identify='video']");
    let closeBtn = document.querySelector(".video-popup-close-btn");
    let popupOpen = false;
    let timeline = gsap.timeline();
    if (identifyText != undefined && identifyText.innerHTML == "View Deck") {
        if (playBtn != undefined) {
            playBtn.setAttribute("data-video-src", playBtn.getAttribute("href"));
            playBtn.setAttribute("href", "#");
            if (videoWrapper != undefined && videoPlugin != undefined) {
                timeline.to(videoWrapper, { display: "flex", height: "100%", opacity: 1, duration: 0.4, ease: "linear" })
                timeline.paused(true);
                playBtn.addEventListener("click", () => {
                    if (!popupOpen) {
                        popupOpen = true;
                        videoPlugin.setAttribute('src', playBtn.getAttribute("data-video-src"));
                        timeline.play();
                    }
                })
            }
        }
        if (closeBtn != undefined) {
            closeBtn.addEventListener("click", () => {
                if (popupOpen) {
                    popupOpen = false;
                    timeline.reverse(0.3);
                    videoPlugin.setAttribute('src', "#");
                }
            })
        }
    }
}

animatePopupVideo()

function customWistiaPLayer() {
    window._wq = window._wq || [];
    let vidId = null;
    let playBtns = document.querySelectorAll("[data-link='video']");
    if(playBtns.length == 0) return;
    playBtns.forEach(btn => {
        vidId = btn.getAttribute("href").split("_")[1];
        console.log(vidId)
        if (vidId.length > 0) {
            _wq.push({
                id: vidId, onReady: function (video) {
                    let closeBtn = document.querySelectorAll(".video-popup-close-btn");
                    if (closeBtn != undefined) {
                        closeBtn.forEach(btn => {
                            btn.addEventListener("click", () => {
                                video.pause();
                            })
                        })
                    }
                }
            });
        }
    })
}
customWistiaPLayer()