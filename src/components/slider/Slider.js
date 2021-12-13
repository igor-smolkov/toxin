import MyJQuerySlider from '../../libs/my-jquery-slider/MyJQuerySlider';

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
      this._plugin.getMinInterval(),
    );
    const max = Slider._makePriceFromNumber(
      this._plugin.getMaxInterval(),
    );
    return `${min} - ${max}`;
  }

  _init() {
    this._$root = this._$elem.find('.js-slider-root');
    this._subscribers = new Set();
    this._plugin = new MyJQuerySlider(this._$root, this._defineLimits());
    this._plugin.on(this._handleChange.bind(this));
  }

  _defineLimits() {
    return this._$root[0].dataset.values
      .substring(1, this._$root[0].dataset.values.length - 1)
      .split(',')
      .map((v) => +v);
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
