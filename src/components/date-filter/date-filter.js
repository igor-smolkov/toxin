import $ from 'jquery';

import Calendar from '@comp/calendar/Calendar';

class DateFilter {
  constructor($elem) {
    this._$elem = $elem;

    this._$field = this._$elem.find('.dropdown').find('.text-field');
    this._calendar = new Calendar(this._$elem.find('.dropdown__panel').find('.calendar'));

    this.dateFrom = DateFilter._createDate(this._$elem.data().from);
    this.dateTo = DateFilter._createDate(this._$elem.data().to);
    this._updateField();

    this._calendar.listen((dateFrom, dateTo) => this._handleApply(dateFrom, dateTo));
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

  _updateField() {
    if (!this.dateFrom && !this.dateTo) {
      this._$field.val('');
      this._$field.attr('placeholder', 'Выберите диапазон дат...');
      return;
    }
    const formattedDates = `${DateFilter._formatDateWithShortMonthName(this.dateFrom)} - ${DateFilter._formatDateWithShortMonthName(this.dateTo)}`;
    this._$field.val(formattedDates);
  }

  _handleApply(dateFrom, dateTo) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this._updateField();
  }
}

$('.js-date-filter').each((_, elem) => new DateFilter($(elem)));
