import $ from 'jquery';

import ArrivalCalendar from '../calendar/ArrivalCalendar';
import DepartureCalendar from '../calendar/DepartureCalendar';
import DropdownControl from '../dropdown-control/dropdown-control';
import TextField from '../text-field/text-field';

class DateSection {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._arrivalField = new TextField($(this._$elem.find('.date-section__set')[0]));
    this._departureField = new TextField($(this._$elem.find('.date-section__set')[1]));
    this._arrivalDropdownControl = new DropdownControl($(this._$elem.find('.date-section__set')[0]));
    this._departureDropdownControl = new DropdownControl($(this._$elem.find('.date-section__set')[1]));
    this._arrivalCalendar = new ArrivalCalendar($(this._$elem.find('.date-section__set')[0]).find('.calendar'));
    this._departureCalendar = new DepartureCalendar($(this._$elem.find('.date-section__set')[1]).find('.calendar'));
    this._updateCalendars();
    this._listen();
  }

  _listen() {
    this._arrivalField.onInput(this._handleInput.bind(this));
    this._departureField.onInput(this._handleInput.bind(this));
    this._arrivalDropdownControl.onApply(this._closeArrivalCalendarDropdown.bind(this));
    this._departureDropdownControl.onApply(this._closeDepartureCalendarDropdown.bind(this));
    this._arrivalCalendar.listen((date) => this._handleArrivalApply(date));
    this._departureCalendar.listen((date) => this._handleDepartureApply(date));
    document.addEventListener('click', this._handleDocClick.bind(this));
    document.addEventListener('keydown', this._handleDocKeyDown.bind(this));
  }

  _handleInput() {
    this._updateCalendars();
  }

  _handleArrivalApply(date) {
    if (!date) this._handleClear();
    this._arrivalField.setValue(date);
    this._updateCalendars();
  }

  _handleDepartureApply(date) {
    if (!date) this._handleClear();
    this._departureField.setValue(date);
    this._updateCalendars();
  }

  _handleClear() {
    this._arrivalField.setValue(null);
    this._departureField.setValue(null);
    this._updateCalendars();
  }

  _updateCalendars() {
    this._arrivalCalendar.update(this._arrivalField.getValue(), this._departureField.getValue());
    this._departureCalendar.update(this._arrivalField.getValue(), this._departureField.getValue());
  }

  _closeArrivalCalendarDropdown() {
    $(this._$elem.find('.date-section__set')[0]).find('.dropdown__check').prop('checked', false);
  }

  _closeDepartureCalendarDropdown() {
    $(this._$elem.find('.date-section__set')[1]).find('.dropdown__check').prop('checked', false);
  }

  _close() {
    this._closeArrivalCalendarDropdown();
    this._closeDepartureCalendarDropdown();
  }

  _handleDocClick(e) {
    const isOutOfDateSection = !this._$elem.is(e.target) && this._$elem.has(e.target).length === 0;
    if (isOutOfDateSection) this._close();
  }

  _handleDocKeyDown(e) {
    if (e.key === 'Escape') this._close();
  }
}

$('.js-date-section').each((_, elem) => new DateSection($(elem)));
