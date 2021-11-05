import $ from 'jquery';

import Calendar from '../calendar/calendar';
import DropdownControl from '../dropdown-control/dropdown-control';
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
    this._field = new TextField(this._$elem.find('.js-dropdown'));
    this._calendar = new Calendar(this._$elem.find('.js-calendar'));
    this._dropdownControl = new DropdownControl(this._$elem.find('.js-dropdown'));

    this.dateFrom = DateFilter._createDate(this._$elem.data().from);
    this.dateTo = DateFilter._createDate(this._$elem.data().to);
    this._calendar.update(
      this.dateFrom ? Calendar.convertDateToYMDHyphen(this.dateFrom) : null,
      this.dateTo ? Calendar.convertDateToYMDHyphen(this.dateTo) : null,
    );
    this._updateField();

    this._bindEventListeners();
  }

  _updateField() {
    if (!this.dateFrom && !this.dateTo) {
      this._field.setValue('');
      this._field.setPlaceholder('Выберите диапазон дат...');
      return;
    }
    let formattedDates;
    if (!this.dateFrom || !this.dateTo) formattedDates = `${DateFilter._formatDateWithShortMonthName(this.dateFrom ?? this.dateTo)}`;
    else formattedDates = `${DateFilter._formatDateWithShortMonthName(this.dateFrom)} - ${DateFilter._formatDateWithShortMonthName(this.dateTo)}`;
    this._field.setValue(formattedDates);
  }

  _handleCalendarChange(dateFrom, dateTo) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this._updateField();
  }

  _bindEventListeners() {
    this._calendar.listen(this._handleCalendarChange.bind(this));
    this._dropdownControl.onApply(this._closeCalendar.bind(this));
    document.addEventListener('click', this._handleDocClick.bind(this));
    document.addEventListener('keydown', this._handleDocKeyDown.bind(this));
  }

  _closeCalendar() {
    this._$elem.find('.js-dropdown__check').prop('checked', false);
  }

  _handleDocClick(e) {
    const isOutOfDateFilter = !this._$elem.is(e.target)
      && this._$elem.has(e.target).length === 0
      && e.target.innerText !== '<Пред'
      && e.target.innerText !== 'След>';
    if (isOutOfDateFilter) this._closeCalendar();
  }

  _handleDocKeyDown(e) {
    if (e.key === 'Escape') this._closeCalendar();
  }
}

$('.js-date-filter').each((_, elem) => new DateFilter($(elem)));
