import $ from 'jquery';

import Slider from '../slider/slider';

class FormSet {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$details = this._$elem.find('.js-form-set__details');
    this._$slider = this._$elem.find('.js-slider');
    if (this._$slider[0]) this._initSlider();
  }

  _initSlider() {
    this._slider = new Slider(this._$slider);
    this._slider.on(this._handleSliderChange.bind(this));
  }

  _handleSliderChange() {
    this._setDetails(this._slider.getPriceRange());
  }

  _setDetails(details) {
    this._$details.text(details);
  }
}

$('.js-form-set').each((_, elem) => new FormSet($(elem)));