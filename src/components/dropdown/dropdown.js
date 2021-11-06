import $ from 'jquery';

import DropdownControl from '../dropdown-control/dropdown-control';
import Counter from '../counter/counter';
import TextField from '../text-field/text-field';

class Dropdown {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _makeWordFormStr(count, forms) {
    if (count > 10) {
      const lastTwoDigits = +count.toString().substring(count.toString().length - 2);
      const isSecondTen = lastTwoDigits > 10 && lastTwoDigits <= 19;
      if (isSecondTen) return `${count} ${forms[2]}`;
    }
    const lastDigit = +count.toString()[count.toString().length - 1];
    if (lastDigit === 1) return `${count} ${forms[0]}`;
    const isTwoToFour = lastDigit > 1 && lastDigit <= 4;
    if (isTwoToFour) return `${count} ${forms[1]}`;
    const isGenitive = (lastDigit > 4 && lastDigit <= 9) || lastDigit === 0;
    if (isGenitive) return `${count} ${forms[2]}`;
    return '';
  }

  _init() {
    this._counters = this._initCounters();
    if (!this._counters.length) return;
    this._field = new TextField(this._$elem);
    this._dropdownControl = new DropdownControl(this._$elem);
    this._$dropper = this._$elem.find('.js-dropdown__check');
    this._isDropped = this._$dropper.is(':checked');
    this._updateField();
    this._bindEventListeners();
  }

  _initCounters() {
    const counters = [];
    this._$elem.find('.js-counter').each((_, counter) => {
      counters.push(new Counter($(counter)));
    });
    return counters;
  }

  _handleClearButtonClick() {
    this._resetCounters();
    this._updateField();
  }

  _resetCounters() {
    this._counters.forEach((counter) => {
      counter.reset();
    });
  }

  _handleApplyButtonClick() {
    this._hide();
  }

  _updateField() {
    this._field.setValue(this._makeFiledStr());
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
    const isClipping = str.length > 19 && !this._dropdownControl.hasApplyButton();
    if (isClipping) { str = `${str.substr(0, 20)}...`; }
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

  _show() {
    this._isDropped = true;
    this._$dropper.prop('checked', true);
    this._$elem.addClass('dropdown_expanded');
  }

  _hide() {
    this._isDropped = false;
    this._$dropper.prop('checked', false);
    this._$elem.removeClass('dropdown_expanded');
  }

  _handleDrop(e) {
    if (e.target.checked) this._show();
    else this._hide();
  }

  _handleCheckClear() {
    if (this._calcCountersSum() > 0) this._dropdownControl.showClearButton();
    else this._dropdownControl.hideClearButton();
    if (this._counters.length) this._updateField();
  }

  _handleDocClick(e) {
    const isOutOfDropdown = !this._$elem.is(e.target) && this._$elem.has(e.target).length === 0;
    const isNeedToClose = isOutOfDropdown && this._isDropped;
    if (isNeedToClose) this._hide();
  }

  _handleDocKeyDown(e) {
    const isNeedToClose = e.key === 'Escape' && this._isDropped;
    if (isNeedToClose) this._hide();
  }

  _bindEventListeners() {
    this._dropdownControl.onClear(this._handleClearButtonClick.bind(this));
    this._dropdownControl.onApply(this._handleApplyButtonClick.bind(this));
    this._$dropper.on('change', this._handleDrop.bind(this));
    this._$elem.on('click', this._handleCheckClear.bind(this));
    document.addEventListener('click', this._handleDocClick.bind(this));
    document.addEventListener('keydown', this._handleDocKeyDown.bind(this));
  }
}

$('.js-dropdown').each((_, elem) => new Dropdown($(elem)));
