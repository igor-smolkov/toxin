import $ from 'jquery';
import myJQuerySliderFactory from 'my-jquery-slider/dist/jquery.my-jquery-slider/jquery.my-jquery-slider';

class MyJQuerySlider {
  constructor($root, limits = [0, 5000, 10000, 16000]) {
    this._$root = $root;
    this._limits = limits;
    this._subscribers = new Set();
    this._init();
  }

  on(callback) {
    this._subscribers.add(callback);
  }

  getMinInterval() {
    return this._$root.data().minInterval;
  }

  getMaxInterval() {
    return this._$root.data().maxInterval;
  }

  _init() {
    myJQuerySliderFactory($);
    this._$root.myJQuerySlider({
      limits: this._limits,
      withIndent: false,
    });
    this._$root.on('my-jquery-slider-init', this._handleChange);
    this._$root.on('my-jquery-slider-update', this._handleChange);
  }

  _notify() {
    if (this._subscribers.size === 0) return;
    this._subscribers.forEach((s) => s());
  }

  _handleChange = () => {
    this._notify();
  }
}

export default MyJQuerySlider;
