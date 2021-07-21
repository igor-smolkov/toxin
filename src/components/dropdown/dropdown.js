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
    return this._count
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
    this._$field = $(`#${this._id}-field`);
    this._$clearButton = $(`#${this._id}-clear`);
    this._$clearButton.on('click', (e) => this._handleClearButtonClick(e));
    this._$applyButton = $(`#${this._id}-apply`);
    this._$applyButton.on('click', (e) => this._handleApplyButtonClick(e));
    this._$dropper = $(`#${this._id}-check`);
    this._$dropper.on('change', (e) => this._handleDrop(e));
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
    this._updateField();
  }
  _resetCounters() {
    this._counters.forEach(counter => {
      counter.reset();
    });
  }
  _handleApplyButtonClick(e) {
    e.preventDefault();
    this._updateField();
  }
  _updateField() {
    this._$field.val(this._makeGuestStr(this._calcCountersSum()))
  }
  _calcCountersSum() {
    return this._counters.reduce((sum, counter) => sum + counter.getCount(), 0);
  }
  _makeGuestStr(count) {
    if (count === 0) return 'Сколько гостей';
    if (count > 10) {
      const lastTwoDigits = +count.toString().substring(count.toString().length-2);
      if (lastTwoDigits > 10 && lastTwoDigits <= 19) return `${count} гостей`;
    }
    const lastDigit = +count.toString()[count.toString().length-1];
    if (lastDigit === 1) return `${count} гость`;
    if (lastDigit > 1 && lastDigit <= 4) return `${count} гостя`;
    if (lastDigit > 4 && lastDigit <= 9 || lastDigit === 0) return `${count} гостей`;
  }
  _handleDrop(e) {
    if (e.target.checked) {
      this._$elem.addClass('dropdown_expanded');
    } else {
      this._$elem.removeClass('dropdown_expanded');
    }
  }
}

$('.dropdown').each((_, elem) => new Dropdown($(elem)));