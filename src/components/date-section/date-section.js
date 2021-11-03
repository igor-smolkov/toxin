import $ from 'jquery';

import Calendar from '../calendar/calendar';
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
    this._arrivalCalendar = new Calendar($(this._$elem.find('.date-section__set')[0]).find('.calendar'));
    this._departureCalendar = new Calendar($(this._$elem.find('.date-section__set')[1]).find('.calendar'));
    this._updateCalendars();
    this._listen();
  }

  _listen() {
    this._arrivalField.onInput(this._handleInput.bind(this));
    this._departureField.onInput(this._handleInput.bind(this));
    this._arrivalDropdownControl.onApply(this._closeCalendars.bind(this));
    this._departureDropdownControl.onApply(this._closeCalendars.bind(this));
    this._arrivalCalendar.listen(this._handleCalendarChange.bind(this));
    this._departureCalendar.listen(this._handleCalendarChange.bind(this));
    document.addEventListener('click', this._handleDocClick.bind(this));
    document.addEventListener('keydown', this._handleDocKeyDown.bind(this));
  }

  _handleInput() {
    this._updateCalendars();
  }

  _handleCalendarChange(dateFrom, dateTo) {
    if (!dateFrom && !dateTo) this._handleClear();
    if (dateFrom) this._arrivalField.setValue(Calendar.convertDateToYMDHyphen(dateFrom));
    if (dateTo) this._departureField.setValue(Calendar.convertDateToYMDHyphen(dateTo));
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

  _closeCalendars() {
    $(this._$elem.find('.date-section__set')[0]).find('.dropdown__check').prop('checked', false);
    $(this._$elem.find('.date-section__set')[1]).find('.dropdown__check').prop('checked', false);
  }

  _handleDocClick(e) {
    const isOutOfDateSection = !this._$elem.is(e.target)
      && this._$elem.has(e.target).length === 0
      && e.target.innerText !== '<Пред'
      && e.target.innerText !== 'След>';
    if (isOutOfDateSection) this._closeCalendars();
  }

  _handleDocKeyDown(e) {
    if (e.key === 'Escape') this._closeCalendars();
  }
}

$('.js-date-section').each((_, elem) => new DateSection($(elem)));
