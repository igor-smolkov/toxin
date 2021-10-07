import $ from 'jquery';

import ArrivalCalendar from '@comp/calendar/ArrivalCalendar';
import DepartureCalendar from '@comp/calendar/DepartureCalendar';

class DateSection {
  constructor($elem) {
    this._$elem = $elem;
    this._findElements();
    this._arrivalCalendar = new ArrivalCalendar(this._$arrivalCalendar);
    this._departureCalendar = new DepartureCalendar(this._$departureCalendar);
    this._updateCalendars();
    this._listen();
  }

  _findElements() {
    this._$arrivalField = $(this._$elem.find('.date-section__set')[0]).find('.text-field');
    this._$departureField = $(this._$elem.find('.date-section__set')[1]).find('.text-field');
    this._$arrivalApplyBtn = $(this._$elem.find('.date-section__set')[0]).find('.dropdown-control__apply').find('button');
    this._$departureApplyBtn = $(this._$elem.find('.date-section__set')[1]).find('.dropdown-control__apply').find('button');
    this._$arrivalCalendar = $(this._$elem.find('.date-section__set')[0]).find('.calendar');
    this._$departureCalendar = $(this._$elem.find('.date-section__set')[1]).find('.calendar');
  }

  _listen() {
    this._$arrivalField.on('input', this._handleInput.bind(this));
    this._$departureField.on('input', this._handleInput.bind(this));
    this._$arrivalApplyBtn.on('click', this._closeArrivalCalendarDropdown.bind(this));
    this._$departureApplyBtn.on('click', this._closeDepartureCalendarDropdown.bind(this));
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

  _closeArrivalCalendarDropdown() {
    $(this._$elem.find('.date-section__set')[0]).find('.dropdown__check').prop('checked', false);
  }

  _closeDepartureCalendarDropdown() {
    $(this._$elem.find('.date-section__set')[1]).find('.dropdown__check').prop('checked', false);
  }
}

$('.js-date-section').each((_, elem) => new DateSection($(elem)));
