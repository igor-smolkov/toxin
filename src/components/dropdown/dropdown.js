import $ from 'jquery';
import './dropdown.scss';

import '../text-field/text-field';
import '../dropdown-control/dropdown-control';

import Counter from './Counter';

class Dropdown {
  constructor($elem) {
    this._$elem = $elem;
    this._counters = this._initCounters();
    this._$field = this._$elem.find('.text-field');
    this._$clearButton = this._$elem.find('.dropdown-control__clear').find('.button');
    this._$applyButton = this._$elem.find('.dropdown-control__apply').find('.button');
    this._$dropper = this._$elem.find('.dropdown__check');
    this._bindEventListeners();
    if (this._counters.length) this._updateField();
  }

  static _makeWordFormStr(count, forms) {
    if (count > 10) {
      const lastTwoDigits = +count.toString().substring(count.toString().length - 2);
      if (lastTwoDigits > 10 && lastTwoDigits <= 19) return `${count} ${forms[2]}`;
    }
    const lastDigit = +count.toString()[count.toString().length - 1];
    if (lastDigit === 1) return `${count} ${forms[0]}`;
    if (lastDigit > 1 && lastDigit <= 4) return `${count} ${forms[1]}`;
    const isGenitive = (lastDigit > 4 && lastDigit <= 9) || lastDigit === 0;
    if (isGenitive) return `${count} ${forms[2]}`;
    return '';
  }

  _initCounters() {
    const counters = [];
    this._$elem.find('.dropdown-counter').each((_, counter) => {
      counters.push(new Counter($(counter)));
    });
    return counters;
  }

  _handleClearButtonClick(e) {
    e.preventDefault();
    this._resetCounters();
    this._updateField();
  }

  _resetCounters() {
    this._counters.forEach((counter) => {
      counter.reset();
    });
  }

  _handleApplyButtonClick(e) {
    e.preventDefault();
    this._updateField();
  }

  _updateField() {
    this._$field.val(this._makeFiledStr());
  }

  _makeFiledStr() {
    let str = '';
    let i = 0;
    this._calcCountersSums().forEach((count, category) => {
      if (count === 0) return;
      str += i !== 0 ? ', ' : '';
      i += 1;
      switch (category) {
        case 'гость':
          str += Dropdown._makeWordFormStr(count, ['гость', 'гостя', 'гостей']);
          break;
        case 'младенец':
          str += Dropdown._makeWordFormStr(count, ['младенец', 'младенца', 'младенцев']);
          break;
        case 'спальня':
          str += Dropdown._makeWordFormStr(count, ['спальня', 'спальни', 'спален']);
          break;
        case 'кровать':
          str += Dropdown._makeWordFormStr(count, ['кровать', 'кровати', 'кроватей']);
          break;
        case 'ванная':
          str += Dropdown._makeWordFormStr(count, ['ванная', 'ванные', 'ванных']);
          break;
        default:
          str += Dropdown._makeWordFormStr(count, ['штука', 'штуки', 'штук']);
      }
    });
    const isGuests = this._counters.find((counter) => counter.category === 'гость');
    if (!str) { str = isGuests ? 'Сколько гостей' : 'Сколько нужно'; }
    if (str.length > 19 && !this._$applyButton[0]) { str = `${str.substr(0, 20)}...`; }
    return str;
  }

  _calcCountersSums() {
    const categories = new Set();
    this._counters.forEach((counter) => categories.add(counter.category));
    const sums = new Map();
    categories.forEach((category) => {
      sums.set(
        category,
        this._counters.reduce(
          (sum, counter) => (counter.category === category ? sum + counter.getCount() : sum), 0,
        ),
      );
    });
    return sums;
  }

  _calcCountersSum() {
    return this._counters.reduce((sum, counter) => sum + counter.getCount(), 0);
  }

  _handleDrop(e) {
    if (e.target.checked) {
      this._$elem.addClass('dropdown_expanded');
    } else {
      this._$elem.removeClass('dropdown_expanded');
    }
  }

  _handleCheckClear() {
    if (this._calcCountersSum() > 0) {
      this._$clearButton.removeClass('button_none');
    } else {
      this._$clearButton.addClass('button_none');
    }
    if (!this._$applyButton[0] && this._counters.length) {
      this._updateField();
    }
  }

  _bindEventListeners() {
    this._$clearButton.on('click', this._handleClearButtonClick.bind(this));
    this._$applyButton.on('click', this._handleApplyButtonClick.bind(this));
    this._$dropper.on('change', this._handleDrop.bind(this));
    this._$elem.on('click', this._handleCheckClear.bind(this));
  }
}

$('.js-dropdown').each((_, elem) => new Dropdown($(elem)));
