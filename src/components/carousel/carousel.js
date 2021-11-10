import $ from 'jquery';

import carouselClassNames from './utils/carouselClassNames';

class Carousel {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  startFrom(from) {
    this._setCurrentImage(from);
    this._setNextImage(from);
    this._currentIndex = from;
    this._isAnimationEnd = true;
    this.timer = setTimeout(this._looping.bind(this), this._delay);
  }

  _init() {
    this._$currentSlide = this._findCurrentSlide();
    this._$nextSlide = this._findNextSlide();
    this._slideLinks = this._makeArrOfSlidesLinks();
    this._delay = this._initDelay();
    this._currentIndex = 0;
    this.startFrom(this._currentIndex);
  }

  _looping() {
    if (!this._isAnimationEnd) { this._stepEnd(); }
    this._stepStart(this._currentIndex + 1);
    this.timer = setTimeout(this._looping.bind(this), this._delay);
  }

  _stepStart(index) {
    this._currentIndex = index;
    if (this._currentIndex >= this._slideLinks.length) { this._currentIndex = 0; }
    this._setNextImage(this._currentIndex);
    this._animateBegin();
    this._isAnimationEnd = false;
    this._$nextSlide.on('animationend', this._stepEnd.bind(this));
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
    this._$nextSlide.addClass(carouselClassNames.slideAnimateOverlay);
    this._$currentSlide.addClass(carouselClassNames.slideAnimateHiding);
  }

  _animateEnd() {
    this._$nextSlide.removeClass(carouselClassNames.slideAnimateOverlay);
    this._$currentSlide.removeClass(carouselClassNames.slideAnimateOverlay);
    this._$nextSlide.finish();
    this._$currentSlide.finish();
  }

  _findCurrentSlide() {
    return $(this._$elem.find('.js-carousel__slide-current'));
  }

  _findNextSlide() {
    return $(this._$elem.find('.js-carousel__slide-next'));
  }

  _makeArrOfSlidesLinks() {
    return Array.from(this._$elem.find('.js-carousel__link')).map((elem) => elem.value);
  }

  _initDelay() {
    return this._$elem.data().delay * 1000;
  }
}

$('.js-carousel').each((_, elem) => new Carousel($(elem)));
