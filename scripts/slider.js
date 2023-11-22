class Slider {
  constructor(props) {
    this.container = props.container
    this.slider = props.container.querySelector('.slider')
    this.countItemsLine = props.countItemsLine
    this.countItemsOffset = props.countItemsOffset
    this.needProgressBar = props.needProgressBar
    this.nextBtn = this.container.querySelector('.slider-next-btn')
    this.prevBtn = this.container.querySelector('.slider-prev-btn')
    this.currentOffset = 0
    this.widthItem = Number.parseFloat(getComputedStyle(this.slider.querySelector('.slider-item')).width)
    this.maxOffset = this.slider.scrollWidth - this.slider.offsetWidth
    this.progressBar = this.container.querySelector('.slider-progress-bar')
    this.currentProgress = this.progressBar.querySelector('.current-progress')
    this.slider.style.right = '0px'
    window.addEventListener('resize', this.resizeWindowHandler.bind(this))
  }

  createDesktopSlider() {
    this.step = (this.slider.clientWidth - this.widthItem * this.countItemsLine) / (this.countItemsLine - 1) + this.widthItem
    this.slider.right = 0
    this.container.addEventListener('click', this.desktopClickHandler.bind(this))
    this.currentProgress.style.width = '0'
  }

  desktopClickHandler(ev) {
    if (!ev.target.classList.contains('slider-btn') || ev.target.classList.contains('slider-btn-disabled')) {
      return
    }

    let nextOffset = ev.target.classList.contains('slider-next-btn') ? this.currentOffset + this.step
      : this.currentOffset - this.step
    if (nextOffset < 1) {
      this.prevBtn.classList.add('slider-btn-disabled')
      this.nextBtn.classList.remove('slider-btn-disabled')
      this.currentOffset = 0
    } else if (Math.abs(nextOffset - this.maxOffset) < 1 || nextOffset > this.maxOffset) {
      this.nextBtn.classList.add('slider-btn-disabled')
      this.prevBtn.classList.remove('slider-btn-disabled')
      this.currentOffset = this.maxOffset
    } else {
      this.nextBtn.classList.remove('slider-btn-disabled')
      this.prevBtn.classList.remove('slider-btn-disabled')
      this.currentOffset = nextOffset * this.countItemsOffset
    }

    this.currentProgress.style.width = `${this.currentOffset / this.maxOffset * 100}%`
    this.slider.style.right = `${this.currentOffset}px`
  }

  createMobileSlider() {
    this.prevClientX = 0
    this.slider.addEventListener('touchstart', this.touchStartHandler.bind(this))
    this.slider.addEventListener('touchmove', this.touchMoveHandler.bind(this))
  }

  touchStartHandler(ev) {
    this.prevClientX = ev.targetTouches[0].clientX
  }

  touchMoveHandler(ev) {
    let currentClientX = ev.targetTouches[0].clientX
    let deltaX = this.prevClientX - currentClientX 
    this.prevClientX = currentClientX
    let nextOffset = deltaX * 2 + this.currentOffset
    console.log(nextOffset, this.maxOffset)
    this.currentOffset = nextOffset < 1 ? 0
      : this.maxOffset < nextOffset ? this.maxOffset
      : nextOffset

    this.slider.style.right = `${this.currentOffset}px`
    this.currentProgress.style.width = `${this.currentOffset / this.maxOffset * 100}%`
  }

  resizeWindowHandler(ev) {
    let oldWidthItem = this.widthItem
    this.widthItem = Number.parseFloat(getComputedStyle(this.slider.querySelector('.slider-item')).width)
    this.step = (this.slider.clientWidth - this.widthItem * this.countItemsLine) / 2 + this.widthItem
    this.maxOffset = this.slider.scrollWidth - this.slider.offsetWidth
    let deltaWidth = this.widthItem - oldWidthItem
  }
}

let gallerySliderContainer = document.querySelector('.gallery__slider-container')

let gallerySlider = new Slider({
  container: gallerySliderContainer,
  countItemsLine: 3,
  countItemsOffset: 1,
})

gallerySlider.createDesktopSlider()
gallerySlider.createMobileSlider()

let teamSliderCouneItemsLine = window.innerWidth >= 1920 ? 4
  : window.innerWidth < 1920 && window.innerWidth >= 1440 ? 3
  : window.innerWidth < 1440 && window.innerWidth >= 768 ? 2
  : 1;

let teamSliderCountItemsOffset = window.innerWidth < 1440 ? 2
  : 1;

let teamSlider = new Slider({
  container: document.querySelector('.team__slider-container'),
  countItemsLine: teamSliderCouneItemsLine,
  countItemsOffset: teamSliderCountItemsOffset
})

teamSlider.createDesktopSlider()
teamSlider.createMobileSlider()
console.log(teamSliderCouneItemsLine)