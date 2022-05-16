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
function animateSections(){
    gsap.registerPlugin(ScrollTrigger);
    let allSections = document.querySelectorAll("[data-animate='section']");
    allSections.forEach(section => {
        gsap.set(section,{opacity:0, y:"-20px", scale:0.8})
        ScrollTrigger.create({
            trigger: section,
            // markers: true,
            start: "top 70%",
            onEnter: self => {
                gsap.to(section,{
                    opacity:1,
                    scale:1,
                    y:"0px",
                    duration:0.5,
                    ease: "circ.out",
                })
                self.disable();
            }
        })
    })
}
animateText();
animateSections();