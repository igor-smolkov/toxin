import $ from 'jquery';

import counterClassNames from './utils/counterClassNames';

class Counter {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
    this._listenControls();
  }

  setCount(value) {
    this._count = value;
    this._updateCountField();
    this.disabledMinusButton(this._count === 0);
  }

  getCount() {
    return this._count;
  }

  decrementCount() {
    this.setCount(this._count - 1);
  }

  incrementCount() {
    this.setCount(this._count + 1);
  }

  reset() {
    this._count = 0;
    this._updateCountField();
    this.disabledMinusButton(true);
  }

  disabledMinusButton(isTrue = true) {
    if (isTrue) {
      this._$minusButton.toggleClass(
        counterClassNames.buttonDisabled,
      );
    } else {
      this._$minusButton.removeClass(
        counterClassNames.buttonDisabled,
      );
    }
    this._$minusButton.prop('disabled', isTrue);
  }

  _init() {
    this.category = this._$elem.data().category;
    this._$minusButton = this._findMinusButton();
    this._$plusButton = this._findPlusButton();
    this._$countField = this._findCountField();
    this._count = +this._$countField.text();
  }

  _findMinusButton() {
    return $(this._$elem.find('.js-counter-button')[0]);
  }

  _findPlusButton() {
    return $(this._$elem.find('.js-counter-button')[1]);
  }

  _findCountField() {
    return $(this._$elem.find('.js-counter-count'));
  }

  _listenControls() {
    this._$minusButton.on(
      'click',
      this._handleMinusButtonClick.bind(this),
    );
    this._$plusButton.on(
      'click',
      this._handlePlusButtonClick.bind(this),
    );
  }

  _handleMinusButtonClick(e) {
    e.preventDefault();
    this.decrementCount();
  }

  _handlePlusButtonClick(e) {
    e.preventDefault();
    this.incrementCount();
  }

  _updateCountField() {
    this._$countField.text(this._count.toString());
  }
}

export default Counter;