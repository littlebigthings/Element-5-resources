function animateText() {
    let textWrp = document.querySelector(".hero-main-title");
    let spanTxt = textWrp != undefined && textWrp.querySelector(".span-48");
    let subText = document.querySelector(".hero-sub-text-wrap");
    if(textWrp != undefined && spanTxt != undefined && subText != undefined){
        textWrp.style.overflow = "hidden";
        let timeline = gsap.timeline({ defaults: { duration: 1, ease: "linear", } })
        if (spanTxt != undefined) {
            timeline.from(textWrp, {
                opacity: 0,
                y: "20px",
            });
            timeline.from(subText, {
                opacity: 0,
                y: "10px",
            })
        }
    }
}

function animateGradient() {
    let gradColor = document.querySelector("[data-anim='grad']");
    if(gradColor != undefined){
        gsap.to(gradColor, {
            backgroundImage: "linear-gradient(90.03deg, #E84E0F 27.98%, #E9520E 30.2%, #EB5F0A 32.59%, #EE7203 35.05%, #F28C00 37.57%, #F8AA00 40.1%, #FFCC00 42.62%, #FDCB00 44.71%, #F4C901 46.58%, #E7C432 48.36%, #D2BF53 50.11%, #B5B773 51.81%, #8CAD92 53.49%, #459FB0 55.14%, #0090CB 56.74%, #008BD2 57.26%)",
            duration: 1,
            ease: "linear",
        });
    }
};

function animateWords(){
    let trigger = document.querySelector("[data-trigger='section']");
    let cards = document.querySelectorAll("[data-anim='words']");
    let para = document.querySelector("[data-anim='para']");
    let timeline = gsap.timeline();
    if(trigger != undefined && cards.length>0 && para){
        gsap.set(cards,{opacity:0, scale:3})
        ScrollTrigger.create({
            trigger: trigger,
            start: "top 50%",
            onEnter: self => {
                timeline.to(cards,{
                    opacity:1,
                    scale:1,
                    duration:0.5,
                    stagger:0.8,
                    ease:"linear",
                })
                timeline.from(para, {
                    opacity: 0,
                    y: "-20px",
                });
                self.disable();
            }
        })
    }
};
animateText();
animateGradient();
animateWords();