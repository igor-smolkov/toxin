import $ from 'jquery';

class RadioGroup {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$radios = this._$elem.find('.js-radio-group-box');
    this._bindEventListeners();
  }

  _nextRadio(index) {
    return index < this._$radios.length - 1
      ? this._$radios[index + 1]
      : null;
  }

  _bindEventListeners() {
    this._$elem.on('focus', this._handleFocus);
    this._$radios.each((_, radio) => {
      const $radio = $(radio);
      $radio.on('keydown', this._handleRadioKeyDown);
    });
  }

  _handleFocus = () => {
    this._$radios[0].focus();
  }

  _handleRadioKeyDown = (e) => {
    if (e.key === 'Tab') {
      const index = Array.from(this._$radios).findIndex(
        (radio) => radio === e.target,
      );
      const next = this._nextRadio(index);
      if (!next) return;
      next.focus();
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      e.target.checked = true;
      e.preventDefault();
    }
  }
}

export default RadioGroup;
