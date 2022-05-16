function animateText(){
    let textWrp = document.querySelector(".hero-main-title");
    let spanTxt = textWrp != undefined && textWrp.querySelector(".span-48");
    let subText = document.querySelector(".hero-sub-text-wrap");
    textWrp.style.overflow="hidden";
    let timeline = gsap.timeline({defaults:{ duration:1, ease:"linear",}})
    if(spanTxt != undefined){
        timeline.from(textWrp, {
            opacity:0,
            y:"20px",
        });
        timeline.from(subText,{
            opacity:0,
            y:"10px",
        })
    }
}
animateText();