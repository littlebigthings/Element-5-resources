// import ScrollSmoother from './ScrollSmoother.js'
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
    let leftCols = document.querySelectorAll("[data-animate='col-left']");
    let rightCol = document.querySelectorAll("[data-animate='col-right']");
    console.log(leftCols, rightCol)
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
    leftCols.forEach((column, index) => {
        gsap.set(column,{opacity:0, x:"-100px",});
        gsap.set(rightCol[index],{opacity:0, x:"100px",});
        ScrollTrigger.create({
            trigger: column,
            // markers: true,
            start: "top 50%",
            onEnter: self => {
                gsap.to(column,{
                    opacity:1,
                    x:"0px",
                    duration:0.5,
                    ease: "circ.out",
                })
                self.disable();
            }
        })
        ScrollTrigger.create({
            trigger: rightCol[index],
            // markers: true,
            start: "top 50%",
            onEnter: self => {
                gsap.to(rightCol[index],{
                    opacity:1,
                    x:"0px",
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