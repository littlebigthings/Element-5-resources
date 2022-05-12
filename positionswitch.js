class UpdatePosition {
    constructor() {
      this.formPositionedToMobile = false;
      this.putBackWrapper = document.querySelectorAll("[data-place='desktop']");
      this.toPlace = document.querySelectorAll("[data-place='mobile']");
      this.itemToMove = document.querySelectorAll("[data-move='item']");
      this.init();
    }
    init() {
      this.activateEvents();
    }
    activateEvents() {
      this.activateResizeEvt();
      this.checkAndUpdateFormPostion();
    }
    activateResizeEvt() {
      let resizeTimer;
      $(window).on("resize", (e) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.checkAndUpdateFormPostion();
        }, 250);
      });
    }
    checkAndUpdateFormPostion() {
      this.isOnMobile = $(window).width() < 750;
      if (this.isOnMobile && !this.imgPositionedToMobile) {
        this.imgPositionedToMobile = true;
        if(this.toPlace != undefined){
        this.toPlace.forEach((item, index)=> {
        	item.insertAdjacentElement("afterend", this.itemToMove[index]);
        })
        }
      } else if (!this.isOnMobile && this.imgPositionedToMobile) {
        this.imgPositionedToMobile = false;
        if(this.putBackWrapper != undefined){
            this.putBackWrapper.forEach((wrapper, index) => {
                wrapper.appendChild(this.itemToMove[index]);
            })
        }
      }
    }
  }
  new UpdatePosition();