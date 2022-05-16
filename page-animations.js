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
animateSections();