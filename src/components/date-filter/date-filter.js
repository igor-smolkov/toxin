import $ from 'jquery';

import Calendar from '../calendar/calendar';
import TextField from '../text-field/text-field';

class DateFilter {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _createDate(dateStr) {
    return dateStr
      ? new Date(`${dateStr}T00:00:00`)
      : new Date(`${new Date().toISOString().substr(0, 10)}T00:00:00`);
  }

  static _formatDateWithShortMonthName(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month.substr(0, 3)}`;
  }

  _init() {
    this._field = new TextField(this._$elem.find('.dropdown'));
    this._calendar = new Calendar(this._$elem.find('.dropdown__panel').find('.calendar'));

    this.dateFrom = DateFilter._createDate(this._$elem.data().from);
    this.dateTo = DateFilter._createDate(this._$elem.data().to);
    this._updateField();

    this._bindEventListeners();
  }

  _updateField() {
    if (!this.dateFrom && !this.dateTo) {
      this._field.setValue('');
      this._field.setPlaceholder('Выберите диапазон дат...');
      return;
    }
    const formattedDates = `${DateFilter._formatDateWithShortMonthName(this.dateFrom)} - ${DateFilter._formatDateWithShortMonthName(this.dateTo)}`;
    this._field.setValue(formattedDates);
  }

  _handleApply(dateFrom, dateTo) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this._updateField();
  }

  _bindEventListeners() {
    this._calendar.listen((dateFrom, dateTo) => this._handleApply(dateFrom, dateTo));
    document.addEventListener('click', this._handleDocClick.bind(this));
    document.addEventListener('keydown', this._handleDocKeyDown.bind(this));
  }

  _closeCalendarDropdown() {
    this._$elem.find('.dropdown__check').prop('checked', false);
  }

  _handleDocClick(e) {
    const isOutOfDateFilter = !this._$elem.is(e.target) && this._$elem.has(e.target).length === 0;
    if (isOutOfDateFilter) this._closeCalendarDropdown();
  }

  _handleDocKeyDown(e) {
    if (e.key === 'Escape') this._closeCalendarDropdown();
  }
}

$('.js-date-filter').each((_, elem) => new DateFilter($(elem)));
