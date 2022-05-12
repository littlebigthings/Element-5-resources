class WORKFLOW {
    constructor() {
        this.topHead = document.querySelector("[data-category='niche']");
        this.wrapper = document.querySelector("[data-wrapper='cards-wrapper']");
        this.catBlockEle = document.querySelector("[data-category='left-category']");
        this.appData = {
            categoryData: window.categoryData,
            cardData: window.cardData,
            nicheData: window.nichesData
        };
        this.filteredCards = [];
        this.init();
    }
    init() {
        this.wrapper.innerHTML = "";
        this.catBlockEle.innerHTML = "";
        this.topHead.innerHTML = "";
        this.nicheData = null;
        this.categoryData = null;
        this.uniqueCategory = []; //for All function.
        this.url = (new URL(document.location)).searchParams;
        this.filterDataFromUrl(this.url)
        this.loadNiches();
        this.listenToEvent(this.nicheData);
        this.addListener();
    }

    // filter url data
    filterDataFromUrl(url) {
        if (url.get("cate") && url.get("niche")) {
            // filter out the data by using url params.
            let nichFilterFromUrl = this.appData.nicheData.find((niche) => niche.nicheSlug === url.get("niche"));
            let categoryFilterFromUrl = this.appData.categoryData.find((category) => category.categorySlug === url.get("cate"));
            // if any data is undefined then -> modify the URL.
            if (nichFilterFromUrl == undefined || categoryFilterFromUrl == undefined) {
                window.history.pushState(null, document.title, document.location.origin + document.location.pathname)
            }
            // if undefined -> null || set the data value
            this.nicheData = (nichFilterFromUrl != undefined && categoryFilterFromUrl != undefined) ? nichFilterFromUrl.nicheSlug : null;
            this.categoryData = (categoryFilterFromUrl != undefined && nichFilterFromUrl != undefined) ? categoryFilterFromUrl.categorySlug : null;
        }
    }
    // load the niches into DOM;
    loadNiches() {
        this.appData.nicheData.forEach((niche) => {
            this.topHead.innerHTML += `
            <div role="listitem" class="top-head">
            <p id=${niche.nicheSlug} data-head="niche" class="para-18 head-para font-manrope">${niche.nicheName}</p>
            </div>`;
        })
    }
    // filter out cards based on categories.
    renderFiltered(showOnNiche) {
        this.wrapper.innerHTML = '';
        this.appData.categoryData.filter((category) => category.showOnNiche === showOnNiche).forEach((category) => {
            const cardsHtml = this.loadCards(this.appData.cardData, category.categorySlug, showOnNiche)
            const headHtml = this.loadHead(category, showOnNiche);
            const cardContainerHtml = this.loadCardContainer(cardsHtml);
            this.loadWrapper(headHtml, cardContainerHtml, category, this.appData.cardData);
        })
    }
    // function to load cards.
    loadCards(data, categoryName, nicheName) {
        while(this.filteredCards.length > 0){
            this.filteredCards.pop();
        }
        const CARDHTML = data.filter((card) => card.showOn === categoryName && card.showOnNiche === nicheName).map((card) => {
            if (card != null) {
                this.filteredCards.push(card);
                return `<a href="/workflow-category-items/${card.link}" role="listitem" class="workflow-card">
        <img src=${card.cardImgSrc} loading="lazy" alt="" class="workflow-card-img">
            <p class="para-16 workflow-card-head">${card.cardName}</p>
            <p class="para-16 workflow-card-para">${card.cardDetails}</p>
            <p class="know-more-link card-link">Know More</p>
            </a>`.toString().split(',').join('');
            }
        });
        return CARDHTML;
    }
    // function to load heading of the card container.
    loadHead(category, showOnNiche) {
        if (category.showOnNiche == showOnNiche) {
            return `<div class="right-top-block"><h2 class="workflow-heading">${category.categoryTitle}</h2><p class="para-16 width-60">${category.categoryDesc}</p></div>`;
        }
    }
    // function to add cards and heading into the container.
    loadCardContainer(cards) {
        if (cards.length != 0) {
            let container = document.createElement('div');
            container.className = "right-bottom-block";
            cards.forEach(card => {
                container.innerHTML += card;
            });
            return container;
        }
    }
    // function to add card container and head container into a wrapper:
    loadWrapper(headHtml, cardContainer, category, cardData) {
        if (headHtml != undefined && cardContainer != undefined) {
            let headCardWrapper = document.createElement("div");
            let line = document.createElement("div");
            headCardWrapper.classList.add("right-workflow-wrapper");
            line.classList.add("horizontal-line");
            line.classList.add("line");
            headCardWrapper.id = category.categorySlug;
            headCardWrapper.innerHTML = headHtml;
            headCardWrapper.appendChild(cardContainer);
            headCardWrapper.appendChild(line);
            this.wrapper.appendChild(headCardWrapper);
            this.cardEvents(cardContainer);
        }
        else if (headHtml == undefined && cardContainer == undefined) {
            let headCardWrapper = document.querySelectorAll(".right-workflow-wrapper");
            headCardWrapper.forEach((wrp) => {
                if (wrp.id == category.categorySlug) {
                    let Ele = document.getElementById(wrp.id);
                    let parent = Ele.parentElement;
                    parent.removeChild(wrp);
                }
            })
        }
    }
    // function to listen card events
    cardEvents(cardContainer) {
        let cards = cardContainer.querySelectorAll(".workflow-card")
        if (cards.length > 0) {
            cards.forEach(card => {
                let cardname = card.querySelector(".workflow-card-head");
                let image = card.querySelector(".workflow-card-img");
                if (image != undefined && cardname.innerHTML.length > 0 && cardData != undefined) {
                    this.filteredCards.forEach(item => {
                        if (item.cardName == cardname.innerHTML) {
                            let currCardShadowState = card.style.boxShadow;
                            image.style.boxShadow = item["imageShadow"];
                            card.addEventListener("mouseover", (eve) => {
                                card.style.boxShadow = item["cardShadow"];
                                card.style.borderColor = item["borderColor"];
                                let targetEle = eve.currentTarget.querySelector(".know-more-link");
                                targetEle.style.opacity = 1;
                            })
                            card.addEventListener("mouseleave", (eve) => {
                                card.style.boxShadow = currCardShadowState;
                                card.style.borderColor = "transparent";
                                let targetEle = eve.currentTarget.querySelector(".know-more-link");
                                targetEle.style.opacity = 0;
                            })
                        }
                    })
                }
            })
        }
    };
    // function to listen to events.
    listenToEvent(data) {
        let headBlock = document.querySelectorAll(".head-para");
        if (data) {
            let activeNiche = document.getElementById(data);
            activeNiche.classList.add("active");
            this.categoryFilter(activeNiche.id);
            this.nicheData = null;
        } else {
            headBlock[0].classList.add("active");
            this.categoryFilter(headBlock[0].id);
        }
        this.topHead.addEventListener("click", (e) => {
            if (e.target.dataset.head == "niche") {
                let id = e.target.id;
                this.categoryFilter(id);
                headBlock.forEach(head => {
                    if (head.classList.contains("active")) {
                        head.classList.remove("active");
                    }
                    e.target.classList.add("active")
                })
                this.addListener();
            }
        });
    }
    // filter out categories based on niches.
    categoryFilter(id) {
        if (id == "all") {
            this.wrapper.innerHTML = '';
            let uniqueCatDom = this.filterAllCategory();
            this.loadCategoryDom(uniqueCatDom, null)
            this.uniqueCategory.forEach((category) => {
                let cardsHtml = this.filterAllCards(category.categoryTitle);
                let headHtml = this.loadHeads(category);
                let cardContainerHtml = this.loadCardContainer(cardsHtml);
                this.loadWrapper(headHtml, cardContainerHtml, category);
            })
        }
        else {
            const CATHTML = this.getCategoryDom(this.appData.categoryData, id);
            this.renderFiltered(id);
            this.loadCategoryDom(CATHTML, this.categoryData);
        }
    }
    // get the niches DOM.
    getCategoryDom(data, categoryName) {
        const CATDOM = data.filter((category) => category.showOnNiche === categoryName).map((category) => {
            return `<a href="#" data-id="${category.categorySlug}" role="listitem" class="_wf-category"><img src=${category.categoryImg} loading="lazy" alt="${categoryName}" class="_wf-cat-img"><p class="_wf-cat-para-16">${category.categoryTitle}</p></a>`.toString().split(',').join('');
        });
        return CATDOM;
    }
    // load DOM into Container.
    loadCategoryDom(Dom, category) {
        this.catBlockEle.innerHTML = '';
        Dom.forEach(ele => {
            this.catBlockEle.innerHTML += ele;
        })
        let catBlock = document.querySelectorAll("._wf-category");
        if (catBlock.length != 0) {
            if (category) {
                let activeCat = document.querySelector(`[data-id = ${category}]`);
                activeCat.classList.add("active-left-border");
                activeCat.children[1].classList.add("active-para");
                this.scrollFromTop(category);
                this.categoryData = null;
            }
            else {
                catBlock[0].classList.add("active-left-border");
                catBlock[0].children[1].classList.add("active-para");
            }
            catBlock.forEach(cat => {
                cat.addEventListener("click", (eve) => {
                    let id = eve.currentTarget.dataset.id;
                    this.scrollFromTop(id);
                })
            })
        }
    }
    addListener() {
        let wrapperBlock = document.querySelectorAll(".right-workflow-wrapper");
        wrapperBlock.forEach(wrapper => {
            this.observeScroll(wrapper)
        })
    }
    observeScroll(wrapper) {
        this.observer = new IntersectionObserver((wrapper) => {
            if (wrapper[0]['isIntersecting'] == true) {
                let elID = wrapper[0].target.id;
                this.activateCategory(elID);
            }
        }, { root: null, threshold: 0, rootMargin: '-200px' });
        this.observer.observe(wrapper);
    }
    activateCategory(id) {
        document.querySelectorAll("._wf-category").forEach(cat => {
            if (cat.classList.contains("active-left-border")) {
                cat.classList.remove("active-left-border");
                cat.children[1].classList.remove("active-para");
            }
            if (cat.dataset.id == id) {
                cat.classList.add("active-left-border");
                cat.children[1].classList.add("active-para");
            }
        })
    }
    // scroll the page when clicked on any category.
    scrollFromTop(id) {
        let el = document.getElementById(id);
        let elDistanceToTop = window.pageYOffset + el.getBoundingClientRect().top;
        window.scrollTo({
            top: elDistanceToTop - 110,
            behavior: 'smooth'
        });
    }
    // add the left border into the categories.
    removeActive(eve) {
        let box = eve.currentTarget.closest(".flexbox");
        document.querySelectorAll("._wf-category").forEach(cat => {
            if (cat.classList.contains("active-left-border") && (cat.children[1].classList.contains("active-para"))) {
                cat.classList.remove("active-left-border");
                cat.children[1].classList.remove("active-para");
            }
        })
        box.classList.add("active-left-border");
    }

    // function to filter all category
    filterAllCategory() {
        this.appData.categoryData.map(cat => this.uniqueCategory.filter(categ => categ.categoryTitle == cat.categoryTitle).length > 0 ? null : this.uniqueCategory.push(cat));
        let CATDOM = this.uniqueCategory.map((category) => {
            return `<a href="#" data-id="${category.categorySlug}" role="listitem" class="_wf-category"><img src=${category.categoryImg} loading="lazy" alt="${category.categoryTitle}" class="_wf-cat-img"><p class="_wf-cat-para-16">${category.categoryTitle}</p></a>`.toString().split(',').join('');
        });
        return CATDOM;
    }

    // function to filter all unique cards
    filterAllCards(categoryTitle) {
        let uniqueCards = [];
        this.appData.cardData.map(card => uniqueCards.filter(cardItem => (cardItem.cardName == card.cardName)).length > 0 ? null : uniqueCards.push(card));
        while(this.filteredCards.length > 0){
            this.filteredCards.pop();
        }
        const CARDHTML = uniqueCards.filter((card) => card.categoryName === categoryTitle).map((card) => {
            if (card != null) {
                this.filteredCards.push(card);
                return `<a href="/workflow-category-items/${card.link}" role="listitem" class="workflow-card">
        <img src=${card.cardImgSrc} loading="lazy" alt="" class="workflow-card-img">
            <p class="para-16 workflow-card-head">${card.cardName}</p>
            <p class="para-16 workflow-card-para">${card.cardDetails}</p>
            <p class="know-more-link card-link">Know More</p>
            </a>`.toString().split(',').join('');
            }
        });
        return CARDHTML;
    }

    // function to load heads for unique cards
    loadHeads(category) {
        if (category) {
            return `<div class="right-top-block"><h2 class="workflow-heading">${category.categoryTitle}</h2><p class="para-16 width-60">${category.categoryDesc}</p></div>`;
        }
    }

}
new WORKFLOW;