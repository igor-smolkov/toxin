import './date-section.scss';

import '@comp/form-set/form-set'
import '@comp/dropdown/dropdown'
import '@comp/card/card';
import { ArrivalCalendar, DepartureCalendar } from '@comp/calendar/calendar';

class DateSection {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');

    this._$arrivalField = $(`#${this._id}-arrival-field`);
    this._$departureField = $(`#${this._id}-departure-field`);
    this._arrivalCalendar = new ArrivalCalendar($(`#${this._id}-arrival-calendar`));
    this._departureCalendar = new DepartureCalendar($(`#${this._id}-departure-calendar`));
    this._updateCalendars();
    
    this._listen();
  }
  _listen() {
    this._$arrivalField.on('input', (e) => this._handleInput(e))
    this._$departureField.on('input', (e) => this._handleInput(e))
    this._arrivalCalendar.listen((date) => this._handleArrivalApply(date));
    this._departureCalendar.listen((date) => this._handleDepartureApply(date));
  }
  _handleInput(e) {
    this._updateCalendars();
  }
  _handleArrivalApply(date) {
    if (!date) this._handleClear();
    this._$arrivalField.val(date);
    this._updateCalendars();
  }
  _handleDepartureApply(date) {
    if (!date) this._handleClear();
    this._$departureField.val(date);
    this._updateCalendars();
  }
  _handleClear() {
    this._$arrivalField.val(null);
    this._$departureField.val(null);
    this._updateCalendars();
  }
  _updateCalendars() {
    this._arrivalCalendar.update(this._$arrivalField.val(), this._$departureField.val());
    this._departureCalendar.update(this._$arrivalField.val(), this._$departureField.val());
  }
}

$('.date-section').each((_, elem) => new DateSection($(elem)));