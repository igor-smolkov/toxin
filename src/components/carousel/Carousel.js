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
    this.timer = setTimeout(this._looping.bind(this), this._delay);
  }

  _init() {
    this._$content = this._findContent();
    this._imageLinks = this._makeArrOfImageLinks();
    this._delay = this._initDelay();
    this._currentIndex = 0;
    this.startFrom(this._currentIndex);
  }

  _looping() {
    if (!this._isAnimationEnd) {
      this._stepEnd();
    }
    this._stepStart(this._currentIndex + 1);
    this.timer = setTimeout(this._looping.bind(this), this._delay);
  }

  _stepStart(index) {
    this._currentIndex = index;
    if (this._currentIndex >= this._imageLinks.length) {
      this._currentIndex = 0;
    }
    this._animateBegin();
    this._isAnimationEnd = false;
    this._$content.on('animationend', this._stepEnd.bind(this));
    this._updateImageTimer = setTimeout(
      this._updateImage.bind(this),
      1000,
    );
  }

  _stepEnd() {
    this._isAnimationEnd = true;
    this._animateEnd();
  }

  _updateImage() {
    clearTimeout(this._updateImageTimer);
    this._setImage(this._currentIndex);
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
}

export default Carousel;
