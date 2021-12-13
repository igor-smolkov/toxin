import JQueryDatepicker from '../../libs/jquery-datepicker/JQueryDatepicker';
import DropdownControl from '../dropdown-control/DropdownControl';

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

  static createDate(date) {
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

  update(dateFrom, dateTo) {
    this._dateFrom = dateFrom ? Calendar.createDate(dateFrom) : null;
    this._dateTo = dateTo ? Calendar.createDate(dateTo) : null;
    this._dateActive = (this._dateFrom ?? this._dateTo) ?? Calendar.createDate();
    this._plugin.setDates(this._dateFrom, this._dateTo, this._dateActive);
    if (this._dateActive) {
      this._plugin.selectDate(this._dateActive);
    } else if (this._dateFrom) {
      this._plugin.selectDate(this._dateFrom);
    } else if (this._dateTo) {
      this._plugin.selectDate(this._dateTo);
    }
    this._updateClearButton();
  }

  listen(callback) {
    this._subscribers.add(callback);
  }

  _init() {
    this._subscribers = new Set();
    this._$pluginElem = this._$elem.find('.js-calendar-plugin');
    this._dateFrom = this._$elem.data().from
      ? Calendar.createDate(this._$elem.data().from)
      : null;
    this._dateTo = this._$elem.data().to
      ? Calendar.createDate(this._$elem.data().to)
      : null;
    this._dateActive = this._$elem.data().active
      ? Calendar.createDate(this._$elem.data().active)
      : null;
    this._plugin = new JQueryDatepicker(
      this._$pluginElem, this._dateFrom, this._dateTo, this._dateActive,
    );
    this._plugin.onSelect(this._handleSelect.bind(this));
    this._initControlButtons();
  }

  _handleSelect(date) {
    const isBothDates = this._dateFrom && this._dateTo;
    if (isBothDates) this._clear();
    if (!this._dateFrom) this._dateFrom = date;
    else this._dateTo = date;
    const isReverse = this._dateFrom && this._dateTo
      && +this._dateTo < +this._dateFrom;
    if (isReverse) {
      [this._dateFrom, this._dateTo] = [this._dateTo, this._dateFrom];
    }
    this._dateActive = date;
    this._plugin.setDates(this._dateFrom, this._dateTo, this._dateActive);
    this._plugin.selectDate(this._dateActive);
    this._notify();
  }

  _clear() {
    this._dateFrom = null;
    this._dateTo = null;
    this._dateActive = Calendar.createDate();
    this._plugin.setDates(this._dateFrom, this._dateTo, this._dateActive);
    this._plugin.selectDate(this._dateActive);
    this._notify();
  }

  _notify() {
    this._updateClearButton();
    if (this._subscribers.size === 0) return;
    this._subscribers.forEach((s) => s(this._dateFrom, this._dateTo));
  }

  _initControlButtons() {
    this._dropdownControl = new DropdownControl(this._$elem);
    const isOneOfDates = this._dateFrom || this._dateTo;
    if (isOneOfDates) this._dropdownControl.showClearButton();
    this._bindEventListeners();
  }

  _updateClearButton() {
    const isClear = !this._dateFrom && !this._dateTo;
    if (isClear) this._dropdownControl.hideClearButton();
    else this._dropdownControl.showClearButton();
  }

  _bindEventListeners() {
    this._dropdownControl.onClear(this._clear.bind(this));
  }
}

export default Calendar;
