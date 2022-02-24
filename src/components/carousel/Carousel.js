import $ from 'jquery';

import carouselClassNames from './utils/carouselClassNames';

class Carousel {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  startFrom(from) {
    this._setImage(from);
    this._currentIndex = from;
    this._isAnimationEnd = true;
    this.timer = setTimeout(this._looping, this._delay);
  }

  _init() {
    this._$content = this._findContent();
    this._imageLinks = this._makeArrOfImageLinks();
    this._delay = this._initDelay();
    this._currentIndex = 0;
    this.startFrom(this._currentIndex);
    this._bindEventListeners()
  }

  _stepStart(index) {
    this._currentIndex = index;
    if (this._currentIndex >= this._imageLinks.length) {
      this._currentIndex = 0;
    }
    this._animateBegin();
    this._isAnimationEnd = false;
    this._updateImageTimer = setTimeout(this._updateImage, 1000);
  }

  _stepEnd() {
    this._isAnimationEnd = true;
    this._animateEnd();
  }

  _setImage(index) {
    this._$elem.css(
      'backgroundImage',
      `url('${this._imageLinks[index]}'`,
    );
  }

  _animateBegin() {
    this._$content.addClass(
      carouselClassNames.contentAnimateBlur,
    );
    this._$content.animate();
  }

  _animateEnd() {
    this._$content.removeClass(
      carouselClassNames.contentAnimateBlur,
    );
    this._$content.finish();
  }

  _makeArrOfImageLinks() {
    return Array.from(this._$elem.find('.js-carousel-link')).map(
      (elem) => elem.value,
    );
  }

  _initDelay() {
    return this._$elem.data().delay * 1000;
  }

  _findContent() {
    return $(this._$elem.find('.js-carousel-content'));
  }

  _bindEventListeners() {
    this._$content.on('animationend', this._handleContentAnimationEnd);
  }

  _handleContentAnimationEnd = () => {
    this._stepEnd();
  }

  _looping = () => {
    if (!this._isAnimationEnd) {
      this._stepEnd();
    }
    this._stepStart(this._currentIndex + 1);
    this.timer = setTimeout(this._looping, this._delay);
  }

  _updateImage = () => {
    clearTimeout(this._updateImageTimer);
    this._setImage(this._currentIndex);
  }
}

export default Carousel;
