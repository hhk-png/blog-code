function TooSlides(options) {
  let defaultOptions = {
    container: '.sliderContainer',
    slidesClass: '.singleSlide',
    nextButton: '.nextSlide',
    previousButton: '.previousSlide',
  };

  options = { ...defaultOptions, ...options };

  let _this = this;
  let slides = [];
  let currentSlideIndex = 0;

  this.prepareControl = () => {
    const nextButton = document.querySelector(options.nextButton);
    const previousButton = document.querySelector(options.previousButton);

    nextButton.setAttribute('class', 'next');
    nextButton.innerHTML = 'Next';

    previousButton.setAttribute('class', 'prev');
    previousButton.innerHTML = 'Prev';

    let controlContainer = document.createElement('div');
    controlContainer.setAttribute('class', 'too-slide-control-container');
    controlContainer.appendChild(previousButton);
    controlContainer.appendChild(nextButton);

    document.querySelector(options.container).appendChild(controlContainer);
    nextButton.addEventListener('click', () => {
      _this.next();
    });
    previousButton.addEventListener('click', () => {
      _this.prev();
    });
  };

  this.gotoSlide = (index) => {
    this.hideOtherSlides();
    if (index > slides.length - 1) {
      index = 0;
    }
    if (index < 0) {
      index = slides.length - 1;
    }
    slides[index].style = 'display:block';
    currentSlideIndex = index;
  }

  this.hideOtherSlides = (index) => {
    document.querySelectorAll(options.slidesClass).forEach((slide, index) => {
      slides[index].style = 'display:none';
    });
  }

  this.next = () => {
    gotoSlide(currentSlideIndex + 1);
  };

  this.previous = () => {
    gotoSlide(currentSlideIndex - 1);
  }

  this.init = () => {
    document.querySelector(options.container).className += " too-slide-container";
    document.querySelectorAll(options.slidesClass).forEach((slide, index) => {
      slides[index] = slide;
      slides[index].style = 'display:none';
      slides[index].className += ' too-slide-sigle-slide too-slide-fade';
    });
    this.gotoSlide(0);
    this.prepareControl();
  }
}

const slider = new TooSlides({
  container: '.sliderContainer',
  slidesClass: '.singleSlide',
  nextButton: '.next',
  previousButton: '.prev',
});
