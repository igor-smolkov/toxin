import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';

import jQueryDatepickerClassNames from './utils/jQueryDatepickerClassNames';

class JQueryDatepicker {
  constructor($elem, dateFrom = null, dateTo = null, dateActive = null) {
    this._$elem = $elem;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._dateActive = dateActive;
    this._subscribers = new Set();
    this._init();
  }

  static _createDateFromDMYDot(dateDMYDot) {
    const [day, month, year] = dateDMYDot.split('.');
    const postfix = JQueryDatepicker._defaultTimePostfix();
    return new Date(`${[year, month, day].join('-')}${postfix}`);
  }

  static _defaultTimePostfix() {
    return 'T00:00:00';
  }

  onSelect(callback) {
    this._subscribers.add(callback);
  }

  setDates(dateFrom = null, dateTo = null, dateActive = null) {
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._dateActive = dateActive;
  }

  selectDate(date) {
    this._$elem.datepicker('setDate', date);
  }

  _init() {
    datepickerFactory($);
    datepickerRUFactory($);
    $(() => {
      this._$elem.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        beforeShowDay: (date) => this._checkDayInPeriod(date),
        onSelect: (date) => this._handleSelect(date),
      });
      this._$elem.datepicker('setDate', this._dateActive);
    });
  }

  _checkDayInPeriod(date) {
    let className = '';
    if (+date === +this._dateActive) {
      className += jQueryDatepickerClassNames.active;
    }
    const isBetweenDates = +date >= +this._dateFrom
      && +date <= +this._dateTo;
    if (isBetweenDates) {
      className += ` ${jQueryDatepickerClassNames.period}`;
    }
    if (+date === +this._dateFrom) {
      className += ` ${jQueryDatepickerClassNames.periodFrom}`;
    }
    if (+date === +this._dateTo) {
      className += ` ${jQueryDatepickerClassNames.periodTo}`;
    }
    return [true, className];
  }

  _handleSelect(dateDMYDot) {
    this._notify(JQueryDatepicker._createDateFromDMYDot(dateDMYDot));
  }

  _notify(date) {
    if (this._subscribers.size === 0) return;
    this._subscribers.forEach((s) => s(date));
  }
}

export default JQueryDatepicker;
