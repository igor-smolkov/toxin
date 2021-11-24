class RadioGroup {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$radios = this._$elem.find('.js-radio-group-box');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._$elem.on('focus', this._handleGroupFocus.bind(this));
    this._$radios.each((_, radio) => radio.addEventListener(
      'keydown',
      this._handleRadioKeyDown.bind(this),
    ));
  }

  _handleGroupFocus() {
    this._$radios[0].focus();
  }

  _handleRadioKeyDown(e) {
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

  _nextRadio(index) {
    return index < this._$radios.length - 1
      ? this._$radios[index + 1]
      : null;
  }
}

export default RadioGroup;
