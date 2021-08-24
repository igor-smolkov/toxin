import $ from 'jquery';
import './date-section.scss';

import '../form-set/form-set';
import '../dropdown/dropdown';
import '../card/card';
import ArrivalCalendar from '../calendar/ArrivalCalendar';
import DepartureCalendar from '../calendar/DepartureCalendar';

class DateSection {
  constructor($elem) {
    this._$elem = $elem;

    this._$arrivalField = $(this._$elem.find('.date-section__set')[0]).find('.text-field');
    this._$departureField = $(this._$elem.find('.date-section__set')[1]).find('.text-field');
    this._arrivalCalendar = new ArrivalCalendar($(this._$elem.find('.date-section__set')[0]).find('.calendar'));
    this._departureCalendar = new DepartureCalendar($(this._$elem.find('.date-section__set')[1]).find('.calendar'));
    this._updateCalendars();

    this._listen();
  }

  _listen() {
    this._$arrivalField.on('input', this._handleInput.bind(this));
    this._$departureField.on('input', this._handleInput.bind(this));
    this._arrivalCalendar.listen((date) => this._handleArrivalApply(date));
    this._departureCalendar.listen((date) => this._handleDepartureApply(date));
  }

  _handleInput() {
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

$('.js-date-section').each((_, elem) => new DateSection($(elem)));
