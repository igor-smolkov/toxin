import $ from 'jquery';

import Calendar from '../calendar/Calendar';
import DropdownControl from '../dropdown-control/DropdownControl';
import TextField from '../text-field/TextField';

class DateSection {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  on(callback) {
    this._subscribers.add(callback);
  }

  getDaysLength() {
    const dateFromStr = this._arrivalField.getValue();
    const dateToStr = this._departureField.getValue();
    const isWithoutDate = !dateFromStr || !dateToStr;
    if (isWithoutDate) return 0;
    const dateFrom = Calendar.createDate(dateFromStr);
    const dateTo = Calendar.createDate(dateToStr);
    if (dateTo < dateFrom) return 0;
    const diff = dateTo - dateFrom;
    if (!diff) return 0;
    return diff / 1000 / 60 / 60 / 24;
  }

  _init() {
    this._arrivalField = new TextField(
      $(this._$elem.find('.js-date-section-set')[0]),
    );
    this._departureField = new TextField(
      $(this._$elem.find('.js-date-section-set')[1]),
    );
    this._arrivalDropdownControl = new DropdownControl(
      $(this._$elem.find('.js-date-section-set')[0]),
    );
    this._departureDropdownControl = new DropdownControl(
      $(this._$elem.find('.js-date-section-set')[1]),
    );
    this._arrivalCalendar = new Calendar(
      $(this._$elem.find('.js-date-section-set')[0]).find(
        '.js-calendar',
      ),
    );
    this._departureCalendar = new Calendar(
      $(this._$elem.find('.js-date-section-set')[1]).find(
        '.js-calendar',
      ),
    );
    this._$arrivalDropper = $(
      this._$elem.find('.js-date-section-set')[0],
    ).find('.js-dropdown-check');
    this._$departureDropper = $(
      this._$elem.find('.js-date-section-set')[1],
    ).find('.js-dropdown-check');
    this._$document = $(document);
    this._subscribers = new Set();
    this._updateCalendars();
    this._bindEventListeners();
  }

  _clear() {
    this._arrivalField.setValue(null);
    this._departureField.setValue(null);
    this._updateCalendars();
  }

  _updateCalendars() {
    this._arrivalCalendar.update(
      this._arrivalField.getValue(),
      this._departureField.getValue(),
    );
    this._departureCalendar.update(
      this._arrivalField.getValue(),
      this._departureField.getValue(),
    );
    this._notify();
  }

  _closeCalendars() {
    this._$arrivalDropper.prop('checked', false);
    this._$departureDropper.prop('checked', false);
  }

  _notify() {
    if (this._subscribers.size === 0) return;
    this._subscribers.forEach((s) => s());
  }

  _bindEventListeners() {
    this._arrivalField.onInput(this._handleFieldInput);
    this._departureField.onInput(this._handleFieldInput);
    this._arrivalDropdownControl.onApply(this._handleDropdownControlApply);
    this._departureDropdownControl.onApply(this._handleDropdownControlApply);
    this._arrivalCalendar.listen(this._handleCalendarChange);
    this._departureCalendar.listen(this._handleCalendarChange);
    this._$arrivalDropper.on('keydown', this._handleArrivalDropperKeyDown);
    this._$departureDropper.on('keydown', this._handleDepartureDropperKeyDown);
    this._$document.on('click', this._handleDocumentClick);
    this._$document.on('keydown', this._handleDocumentKeyDown);
  }

  _handleFieldInput = () => {
    this._updateCalendars();
  }

  _handleDropdownControlApply = () => {
    this._closeCalendars();
  }

  _handleCalendarChange = (dateFrom, dateTo) => {
    const isClear = !dateFrom && !dateTo;
    if (isClear) this._clear();
    if (dateFrom) {
      this._arrivalField.setValue(
        Calendar.convertDateToYMDHyphen(dateFrom),
      );
    }
    if (dateTo) {
      this._departureField.setValue(
        Calendar.convertDateToYMDHyphen(dateTo),
      );
    }
    this._updateCalendars();
  }

  _handleArrivalDropperKeyDown = (e) => {
    const isCustomControls = e.key !== 'Tab' && e.key !== ' ';
    if (isCustomControls) e.preventDefault();
    const isNeedToShow = e.key === 'Enter'
      && !this._$arrivalDropper.is(':checked');
    const isNeedToClose = e.key === 'Enter'
      && this._$arrivalDropper.is(':checked');
    if (isNeedToShow) this._$arrivalDropper.prop('checked', true);
    if (isNeedToClose) this._closeCalendars();
  }

  _handleDepartureDropperKeyDown = (e) => {
    const isCustomControls = e.key !== 'Tab' && e.key !== ' ';
    if (isCustomControls) e.preventDefault();
    const isNeedToShow = e.key === 'Enter'
      && !this._$departureDropper.is(':checked');
    const isNeedToClose = e.key === 'Enter'
      && this._$departureDropper.is(':checked');
    if (isNeedToShow) this._$departureDropper.prop('checked', true);
    if (isNeedToClose) this._closeCalendars();
  }

  _handleDocumentClick = (e) => {
    const isOutOfDateSection = !this._$elem.is(e.target)
      && this._$elem.has(e.target).length === 0
      && e.target.innerText !== '<Пред'
      && e.target.innerText !== 'След>';
    if (isOutOfDateSection) this._closeCalendars();
  }

  _handleDocumentKeyDown = (e) => {
    if (e.key === 'Escape') this._closeCalendars();
  }
}

export default DateSection;
