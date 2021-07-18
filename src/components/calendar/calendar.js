import './calendar.scss';
import $ from 'jquery'
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';
import '@comp/dropdown-control/dropdown-control';

class Calendar {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');
    this._$arrivalField = $(`#${this._$elem.data().forArrival}-field`);
    this._$departureField = $(`#${this._$elem.data().forDeparture}-field`);
    this._$pluginElem = this._$elem.find('.calendar__plugin');
    this._$clearButton = $(`#${this._id}-clear`);
    this._$applyButton = $(`#${this._id}-apply`);
    this._init();
  }
  _init() {
    this.dateFrom = this._createDate(this._pullOutDateStrFrom(this._$arrivalField, this._$elem.data().from));
    this.dateTo = this._createDate(this._pullOutDateStrFrom(this._$departureField, this._$elem.data().to));
    this.dateActive = this._createDate(this._$elem.data().active);
    this._initPlugin();
    this._initControlButtons();
  }
  _pullOutDateStrFrom(dateField, dateProp) {
    const dateStr = dateField ? dateField.val() : dateProp;
    return dateStr ?? null;
  }
  _createDate(date) {
    return date ? 
      new Date(`${date}T00:00:00`) : 
      new Date(`${new Date().toISOString().substr(0,10)}T00:00:00`);
  }
  _initControlButtons() {
    if (this.dateFrom || this.dateTo) {
      this._$clearButton.removeClass('button_none');
    }
    this._$clearButton.on('click', (e) => this._handleClearButtonClick(e));
    this._$applyButton.on('click', (e) => this._handleApplyButtonClick(e));
  }
  _initPlugin() {
    datepickerFactory($);
    datepickerRUFactory($);
    $(()=>{
      this._$pluginElem.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        beforeShowDay: (date) => this._checkDayInPeriod(date),
        onSelect: (date) => this.handleSelect(date),
      }); 
      this._$pluginElem.datepicker("setDate", this.dateActive);
    });
  }
  _checkDayInPeriod(date) {
    let className = '';
    if (+date === +this.dateActive) {
      className += 'ui-datepicker-active';
    }
    if (+date >= +this.dateFrom && +date <= +this.dateTo) {
      className += ' ui-datepicker-period';
    }
    if (+date === +this.dateFrom) {
      className += ' ui-datepicker-period-from';
    }
    if (+date === +this.dateTo) {
      className += ' ui-datepicker-period-to';
    }
    return [true, className];
  }
  _handleClearButtonClick(e) {
    e.preventDefault();
    this.dateFrom = null;
    this.dateTo = null;
    this.dateActive = this._createDate();
    this._$pluginElem.datepicker("setDate", this.dateActive);
    if (this._$arrivalField) { this._$arrivalField.val(null) }
    if (this._$departureField) { this._$departureField.val(null) }
    this._$clearButton.addClass('button_none');
  }
  _handleApplyButtonClick(e) {
    e.preventDefault();
    if (this._$arrivalField) { this._$arrivalField.val(this.convertDateToYMDHyphen(this.dateFrom)) }
    if (this._$departureField) { this._$departureField.val(this.convertDateToYMDHyphen(this.dateTo)) }
  }
  convertDateToYMDHyphen(date) {
    const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  }
  createDateFromDMYDot(dateDMYDot) {
    const [day, month, year] = dateDMYDot.split('.');
    return new Date(`${[year, month, day].join('-')}T00:00:00`);
  }
  handleSelect(dateDMYDot) {
    const date = this.createDateFromDMYDot(dateDMYDot);
    if (+this.dateActive === +date) {
      const midDateValue = +this.dateFrom + ((+this.dateTo - +this.dateFrom) / 2);
      this.dateFrom = +date <= midDateValue ? date : this.dateFrom;
      this.dateTo = +date >= midDateValue ? date : this.dateTo;
    }
    if (+this.dateActive === +this.dateFrom && +date < +this.dateTo) {
      this.dateFrom = date;
    }
    if (+this.dateActive === +this.dateTo && +date > +this.dateFrom) {
      this.dateTo = date;
    }
    this.dateActive = date;
    this._$clearButton.removeClass('button_none');
  }
}

class ArrivalCalendar extends Calendar {
  handleSelect(dateDMYDot) {
    const date = this.createDateFromDMYDot(dateDMYDot);
    if (+date <= +this.dateTo || !this.dateTo) {
      this.dateActive = date;
      this.dateFrom = date;
      this._$clearButton.removeClass('button_none');
    }
  }
}
class DeparturCalendar extends Calendar {
  handleSelect(dateDMYDot) {
    const date = this.createDateFromDMYDot(dateDMYDot);
    if (+date >= +this.dateFrom || !this.dateFrom) {
      this.dateActive = date;
      this.dateTo = date;
      this._$clearButton.removeClass('button_none');
    }
  }
}

$('.calendar').each((_, elem) => {
  if (elem.classList.contains('calendar_arrival')) {
    return new ArrivalCalendar($(elem))
  } else if (elem.classList.contains('calendar_departure')) {
    return new DeparturCalendar($(elem))
  } else {
    return new Calendar($(elem));
  }
});