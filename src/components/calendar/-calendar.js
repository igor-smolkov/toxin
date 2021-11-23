import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';

import DropdownControl from '../dropdown-control/DropdownControl';
import calendarClassNames from './utils/calendarClassNames';

class Calendar {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static convertDateToYMDHyphen(date) {
    if (!date) return null;
    const month = date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
    const day = date.getDate() < 10
      ? `0${date.getDate()}`
      : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  }

  static createDateFromDMYDot(dateDMYDot) {
    const [day, month, year] = dateDMYDot.split('.');
    const postfix = Calendar._defaultTimePostfix();
    return new Date(`${[year, month, day].join('-')}${postfix}`);
  }

  static _createDate(date) {
    const postfix = Calendar._defaultTimePostfix();
    return date
      ? new Date(`${date}${Calendar._defaultTimePostfix()}`)
      : new Date(
        `${new Date().toISOString().substr(0, 10)}${postfix}`,
      );
  }

  static _defaultTimePostfix() {
    return 'T00:00:00';
  }

  handleSelect(dateDMYDot) {
    const date = Calendar.createDateFromDMYDot(dateDMYDot);
    const isBothDates = this.dateFrom && this.dateTo;
    if (isBothDates) this._clear();
    if (!this.dateFrom) this.dateFrom = date;
    else this.dateTo = date;
    const isReverse = this.dateFrom && this.dateTo
      && +this.dateTo < +this.dateFrom;
    if (isReverse) {
      [this.dateFrom, this.dateTo] = [this.dateTo, this.dateFrom];
    }
    this.dateActive = date;
    this.$pluginElem.datepicker('setDate', date);
    this.notify();
  }

  update(dateFrom, dateTo) {
    this.dateFrom = dateFrom ? Calendar._createDate(dateFrom) : null;
    this.dateTo = dateTo ? Calendar._createDate(dateTo) : null;
    this.dateActive = this.dateFrom ?? this.dateTo;
    if (this.dateFrom) {
      this.$pluginElem.datepicker('setDate', this.dateFrom);
    }
    if (this.dateTo) {
      this.$pluginElem.datepicker('setDate', this.dateTo);
    }
    if (!this.dateActive) {
      this.$pluginElem.datepicker('setDate', null);
    }
    this._updateClearButton();
  }

  notify() {
    this._updateClearButton();
    this._callback(this.dateFrom, this.dateTo);
  }

  listen(callback) {
    this._callback = callback;
  }

  _init() {
    this.$pluginElem = this._$elem.find('.js-calendar__plugin');
    this.dateFrom = this._$elem.data().from
      ? Calendar._createDate(this._$elem.data().from)
      : null;
    this.dateTo = this._$elem.data().to
      ? Calendar._createDate(this._$elem.data().to)
      : null;
    this.dateActive = this._$elem.data().active
      ? Calendar._createDate(this._$elem.data().active)
      : null;
    this._initPlugin();
    this._initControlButtons();
  }

  _initControlButtons() {
    this._dropdownControl = new DropdownControl(this._$elem);
    const isOneOfDates = this.dateFrom || this.dateTo;
    if (isOneOfDates) this._dropdownControl.showClearButton();
    this._bindEventListeners();
  }

  _initPlugin() {
    datepickerFactory($);
    datepickerRUFactory($);
    $(() => {
      this.$pluginElem.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        beforeShowDay: (date) => this._checkDayInPeriod(date),
        onSelect: (date) => this.handleSelect(date),
      });
      this.$pluginElem.datepicker('setDate', this.dateActive);
    });
  }

  _checkDayInPeriod(date) {
    let className = '';
    if (+date === +this.dateActive) {
      className += calendarClassNames.datepickerActive;
    }
    const isBetweenDates = +date >= +this.dateFrom
      && +date <= +this.dateTo;
    if (isBetweenDates) {
      className += ` ${calendarClassNames.datepickerPeriod}`;
    }
    if (+date === +this.dateFrom) {
      className += ` ${calendarClassNames.datepickerPeriodFrom}`;
    }
    if (+date === +this.dateTo) {
      className += ` ${calendarClassNames.datepickerPeriodTo}`;
    }
    return [true, className];
  }

  _clear() {
    this.dateFrom = null;
    this.dateTo = null;
    this.dateActive = Calendar._createDate();
    this.$pluginElem.datepicker('setDate', this.dateActive);
    this.notify();
  }

  _updateClearButton() {
    const isClear = !this.dateFrom && !this.dateTo;
    if (isClear) this._dropdownControl.hideClearButton();
    else this._dropdownControl.showClearButton();
  }

  _bindEventListeners() {
    this._dropdownControl.onClear(this._clear.bind(this));
  }
}

export default Calendar;
