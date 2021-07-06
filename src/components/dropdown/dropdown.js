import './dropdown.scss'

import '@comp/text-field/text-field'
import '@comp/dropdown-control/dropdown-control';

class Counter {
  constructor($elem) {
    this._$elem = $elem;

    this._$minusButton = this._findMinusButton();
    this._$plusButton = this._findPlusButton();
    this._$countField = this._findCountField();

    this._count = +this._$countField.text();

    this._listenControls();
  }
  setCount(value) {
    this._count = value;
    this._updateCountField();
    this.disabledMinusButton(this._count === 0);
  }
  getCount() {
    return this.count
  }
  decrementCount() {
    this.setCount(this._count-1);
  }
  incrementCount() {
    this.setCount(this._count+1);
  }
  reset() {
    this._count = 0;
    this._updateCountField();
    this.disabledMinusButton(true);
  }
  disabledMinusButton(isTrue = true) {
    if (isTrue) {
      this._$minusButton.toggleClass('dropdown-counter__button_disabled');
    } else {
      this._$minusButton.removeClass('dropdown-counter__button_disabled');
    }
    this._$minusButton.prop('disabled', isTrue);
  }

  _findMinusButton() {
    return $(this._$elem.find('.dropdown-counter__button')[0]);
  }
  _findPlusButton() {
    return $(this._$elem.find('.dropdown-counter__button')[1]);
  }
  _findCountField() {
    return $(this._$elem.find('.dropdown-counter__count'));
  }
  _listenControls() {
    this._$minusButton.on('click', (e) => this._handleMinusButtonClick(e));
    this._$plusButton.on('click', (e) => this._handlePlusButtonClick(e));
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

class Dropdown {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');
    this._counters = this._initCounters();
    this._$clearButton = $(`#${this._id}-clear`);
    this._$clearButton.on('click', (e) => this._handleClearButtonClick(e));
  }
  _initCounters() {
    const counters = [];
    this._$elem.find('.dropdown-counter').each((_, counter) => {
      counters.push(new Counter($(counter)));
    })
    return counters;
  }
  _handleClearButtonClick(e) {
    e.preventDefault();
    this._resetCounters();
  }
  _resetCounters() {
    this._counters.forEach(counter => {
      counter.reset();
    });
  }
}

$('.dropdown').each((_, elem) => new Dropdown($(elem)));