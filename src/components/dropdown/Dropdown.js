import $ from 'jquery';

import DropdownControl from '../dropdown-control/DropdownControl';
import Counter from '../counter/Counter';
import TextField from '../text-field/TextField';
import dropdownClassNames from './utils/dropdownClassNames';

class Dropdown {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _makeWordFormStr(count, forms) {
    const lastDigit = +count.toString()[count.toString().length - 1];
    const nominativeBreak = 1;
    const quantitativeBreak = 4;
    const secondTenStart = 11;
    const secondTenEnd = 19;
    const isSecondTen = count >= secondTenStart
      && +Dropdown._getLastTwoDigits(count) >= secondTenStart
      && +Dropdown._getLastTwoDigits(count) <= secondTenEnd;
    const isGenitivePlural = lastDigit > quantitativeBreak
      || lastDigit === 0
      || isSecondTen;
    if (isGenitivePlural) return `${count} ${forms[2]}`;
    const isGenitiveSingular = lastDigit > nominativeBreak
      && lastDigit <= quantitativeBreak;
    if (isGenitiveSingular) return `${count} ${forms[1]}`;
    return `${count} ${forms[0]}`;
  }

  static _getLastTwoDigits(number) {
    return number.toString().substring(number.toString().length - 2);
  }

  static _accumulateWordFormsStr(acc, category, count, index) {
    if (count === 0) return acc;
    const isFirstWord = index === 0 || acc === '';
    let currentStr = !isFirstWord ? `${acc}, ` : acc;
    currentStr += Dropdown._defineWordFormBy(count, category);
    return currentStr;
  }

  static _defineWordFormBy(count, category) {
    switch (category) {
      case 'гость':
        return Dropdown._makeWordFormStr(count, [
          'гость',
          'гостя',
          'гостей',
        ]);
      case 'младенец':
        return Dropdown._makeWordFormStr(count, [
          'младенец',
          'младенца',
          'младенцев',
        ]);
      case 'спальня':
        return Dropdown._makeWordFormStr(count, [
          'спальня',
          'спальни',
          'спален',
        ]);
      case 'кровать':
        return Dropdown._makeWordFormStr(count, [
          'кровать',
          'кровати',
          'кроватей',
        ]);
      case 'ванная':
        return Dropdown._makeWordFormStr(count, [
          'ванная',
          'ванные',
          'ванных',
        ]);
      default:
        return Dropdown._makeWordFormStr(count, [
          'штука',
          'штуки',
          'штук',
        ]);
    }
  }

  _init() {
    this._counters = this._initCounters();
    if (!this._counters.length) return;
    this._field = new TextField(this._$elem);
    this._dropdownControl = new DropdownControl(this._$elem);
    this._$dropper = this._$elem.find('.js-dropdown-check');
    this._isDropped = this._$dropper.is(':checked');
    this._$document = $(document);
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
    let str = Array.from(this._calcCountersSums().entries()).reduce(
      (acc, [category, count], index) => (
        Dropdown._accumulateWordFormsStr(acc, category, count, index)
      ),
      '',
    );
    const isGuests = this._counters.find(
      (counter) => counter.category === 'гость',
    );
    if (!str) {
      str = isGuests ? 'Сколько гостей' : 'Сколько нужно';
    }
    const isClipping = str.length > 19
      && !this._dropdownControl.hasApplyButton();
    if (isClipping) {
      str = `${str.substr(0, 20)}...`;
    }
    return str;
  }

  _calcCountersSums() {
    const categories = new Set();
    this._counters.forEach((counter) => {
      categories.add(counter.category);
    });
    const sums = new Map();
    categories.forEach((category) => {
      sums.set(
        category,
        this._counters.reduce(
          (sum, counter) => (
            counter.category === category
              ? sum + counter.getCount()
              : sum
          ),
          0,
        ),
      );
    });
    return sums;
  }

  _calcCountersSum() {
    return this._counters.reduce(
      (sum, counter) => sum + counter.getCount(),
      0,
    );
  }

  _show() {
    this._isDropped = true;
    this._$dropper.prop('checked', true);
    this._$elem.addClass(dropdownClassNames.dropdownExpanded);
  }

  _hide() {
    this._isDropped = false;
    this._$dropper.prop('checked', false);
    this._$elem.removeClass(dropdownClassNames.dropdownExpanded);
  }

  _handleDrop(e) {
    if (e.target.checked) this._show();
    else this._hide();
  }

  _handleCheckClear() {
    if (this._calcCountersSum() > 0) {
      this._dropdownControl.showClearButton();
    } else this._dropdownControl.hideClearButton();
    if (this._counters.length) this._updateField();
  }

  _handleDocumentClick(e) {
    const isOutOfDropdown = !this._$elem.is(e.target)
      && this._$elem.has(e.target).length === 0;
    const isNeedToClose = isOutOfDropdown && this._isDropped;
    if (isNeedToClose) this._hide();
  }

  _handleDocumentKeyDown(e) {
    const isNeedToClose = e.key === 'Escape' && this._isDropped;
    if (isNeedToClose) this._hide();
  }

  _handleDropperKey(e) {
    const isCustomControls = e.key !== 'Tab' && e.key !== ' ';
    if (isCustomControls) e.preventDefault();
    const isNeedToShow = e.key === 'Enter' && !this._isDropped;
    const isNeedToClose = e.key === 'Enter' && this._isDropped;
    if (isNeedToShow) this._show();
    if (isNeedToClose) this._hide();
  }

  _bindEventListeners() {
    this._dropdownControl.onClear(
      this._handleClearButtonClick.bind(this),
    );
    this._dropdownControl.onApply(
      this._handleApplyButtonClick.bind(this),
    );
    this._$dropper.on('change', this._handleDrop.bind(this));
    this._$dropper.on('keydown', this._handleDropperKey.bind(this));
    this._$elem.on('click', this._handleCheckClear.bind(this));
    this._$document.on('click', this._handleDocumentClick.bind(this));
    this._$document.on('keydown', this._handleDocumentKeyDown.bind(this));
  }
}

export default Dropdown;
