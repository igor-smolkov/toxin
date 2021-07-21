import './carousel.scss'

class Carousel {
  constructor($elem) {
    this._$elem = $elem;
    this._className = 'carousel';
    this._$currentSlide = this._findCurrentSlide();
    this._$nextSlide =this._findNextSlide();
    this._slideLinks = this._makeArrOfSlidesLinks();
    this._delay = this._initDelay();
    this._currentIndex = 0;
    this.startFrom(this._currentIndex);
  }
  startFrom(from) {
    this._setCurrentImage(from);
    this._setNextImage(from);
    this._currentIndex = from;
    this._isAnimationEnd = true;
    this.timer = setTimeout(this._looping.bind(this), this._delay)
  }
  _looping() {
    if (!this._isAnimationEnd) { this._stepEnd() }
    this._stepStart(this._currentIndex + 1);
    this.timer = setTimeout(this._looping.bind(this), this._delay);
  }
  _stepStart(index) {
    this._currentIndex = index;
    if (this._currentIndex >= this._slideLinks.length) { this._currentIndex = 0 }
    this._setNextImage(this._currentIndex);
    this._animateBegin();
    this._isAnimationEnd = false;
    this._$nextSlide.on('animationend', this._stepEnd.bind(this))
  }
  _stepEnd() {
    this._isAnimationEnd = true;
    this._setCurrentImage(this._currentIndex);
    this._animateEnd();
  }
  _setCurrentImage(index) {
    this._$currentSlide.css('backgroundImage', `url('${this._slideLinks[index]}'`);
  }
  _setNextImage(index) {
    this._$nextSlide.css('backgroundImage', `url('${this._slideLinks[index]}'`);
  }
  _animateBegin() {
    this._$nextSlide.addClass(`${this._className}__slide_animate_overlay`);
    this._$currentSlide.addClass(`${this._className}__slide_animate_hiding`);
  }
  _animateEnd() {
    this._$nextSlide.removeClass(`${this._className}__slide_animate_overlay`);
    this._$currentSlide.removeClass(`${this._className}__slide_animate_hiding`);
    this._$nextSlide.finish();
    this._$currentSlide.finish();
  }
  _findCurrentSlide() {
    return $(this._$elem.find(`.${this._className}__slide_current`))
  }
  _findNextSlide() {
    return $(this._$elem.find(`.${this._className}__slide_next`))
  }
  _makeArrOfSlidesLinks() {
    return Array.from(this._$elem.find(`.${this._className}__link`)).map(elem => elem.value)
  }
  _initDelay() {
    return this._$elem.data().delay * 1000;
  }
}

$('.carousel').each((_, elem) => new Carousel($(elem)));