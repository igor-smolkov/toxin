import './date-filter.scss';

import '@comp/dropdown/dropdown'
import '@comp/card/card';
import { Calendar } from '@comp/calendar/calendar';

class DateFilter {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');

    this._$field = $(`#${this._id}-dropdown-field`);
    this._calendar = new Calendar($(`#${this._id}-calendar`));

    this.dateFrom = this._createDate(this._$elem.data().from);
    this.dateTo = this._createDate(this._$elem.data().to);
    this._updateField();

    this._calendar.listen((dateFrom, dateTo) => this._handleApply(dateFrom, dateTo))
  }
  _updateField() {
    if (!this.dateFrom && !this.dateTo) {
      this._$field.val('');
      this._$field.attr( 'placeholder', 'Выберите диапазон дат...')
      return;
    }
    const formatedDates = `${this._formatDateWithShortMonthName(this.dateFrom)} - ${this._formatDateWithShortMonthName(this.dateTo)}`;
    this._$field.val(formatedDates);
  }
  _createDate(dateStr) {
    return dateStr ? 
      new Date(`${dateStr}T00:00:00`) : 
      new Date(`${new Date().toISOString().substr(0,10)}T00:00:00`);
  }
  _formatDateWithShortMonthName(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month.substr(0,3)}`
  }
  _handleApply(dateFrom, dateTo) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this._updateField();
  }
}

$('.date-filter').each((_, elem) => new DateFilter($(elem)));