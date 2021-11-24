import $ from 'jquery';

import myJQuerySliderFactory from '@plug/jquery.my-jquery-slider';

class Slider {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _makePriceFromNumber(number) {
    return `${number.toLocaleString('ru')}₽`;
  }

  on(callback) {
    this._subscribers.add(callback);
  }

  getPriceRange() {
    const min = Slider._makePriceFromNumber(
      this._$root.data().minInterval,
    );
    const max = Slider._makePriceFromNumber(
      this._$root.data().maxInterval,
    );
    return `${min} - ${max}`;
  }

  _init() {
    this._$root = this._$elem.find('.js-slider-root');
    this._subscribers = new Set();
    this._initPlugin();
  }

  _initPlugin() {
    myJQuerySliderFactory($);
    const limits = this._$root[0].dataset.values
      .substring(1, this._$root[0].dataset.values.length - 1)
      .split(',')
      .map((v) => +v);
    this._$root.myJQuerySlider({
      limits: limits ?? [0, 5000, 10000, 16000],
      withIndent: false,
    });
    this._bindPluginListeners();
  }

  _bindPluginListeners() {
    this._$root.on(
      'my-jquery-slider-init',
      this._handleChange.bind(this),
    );
    this._$root.on(
      'my-jquery-slider-update',
      this._handleChange.bind(this),
    );
  }

  _handleChange() {
    this._notify();
  }

  _notify() {
    if (this._subscribers.size === 0) return;
    this._subscribers.forEach((s) => s());
  }
}

export default Slider;
