function injectQuote(){
    let allQuotes  = document.querySelectorAll("[data-wrapper='quote']");
    let injectWrapper = document.querySelectorAll("[data-load='quote']")

    if(allQuotes.length > 0 && injectWrapper.length > 0){
        allQuotes.forEach((quote, index) => {
            injectWrapper[index].appendChild(quote);
        })
    }
}

injectQuote();