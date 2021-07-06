import './calendar.scss';
import $ from 'jquery'
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';
import '@comp/dropdown-control/dropdown-control';

class Calendar {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');
    this._dateFrom = this._initDate(this._$elem.data().from);
    this._dateTo = this._initDate(this._$elem.data().to);
    this._dateActive = this._initDate(this._$elem.data().active);
    this._$pluginElem = this._$elem.find('.calendar__plugin');
    this._initPlugin();
    this._$clearButton = $(`#${this._id}-clear`);
    this._$clearButton.on('click', (e) => this._handleClearButtonClick(e));
  }
  _initDate(date) {
    return date ? 
      new Date(`${date}T00:00:00`) : 
      new Date(`${new Date().toISOString().substr(0,10)}T00:00:00`);
  }
  _initPlugin() {
    datepickerFactory($);
    datepickerRUFactory($);
    $(()=>{
      this._$pluginElem.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        beforeShowDay: (date) => this._checkDayInPeriod(date),
        onSelect: (date) => this._handleSelect(date),
      }); 
      this._$pluginElem.datepicker("setDate", this._dateActive);
    });
  }
  _checkDayInPeriod(date) {
    let className = '';
    if (+date === +this._dateActive) {
      className += 'ui-datepicker-active';
    }
    if (+date >= +this._dateFrom && +date <= +this._dateTo) {
      className += ' ui-datepicker-period';
    }
    if (+date === +this._dateFrom) {
      className += ' ui-datepicker-period-from';
    }
    if (+date === +this._dateTo) {
      className += ' ui-datepicker-period-to';
    }
    return [true, className];
  }
  _handleSelect(dateDMYDot) {
    const [day, month, year] = dateDMYDot.split('.');
    const date = new Date(`${[year, month, day].join('-')}T00:00:00`);
    if (+this._dateActive === +date) {
      const midDateValue = +this._dateFrom + ((+this._dateTo - +this._dateFrom) / 2);
      this._dateFrom = +date <= midDateValue ? date : this._dateFrom;
      this._dateTo = +date >= midDateValue ? date : this._dateTo;
    }
    if (+this._dateActive === +this._dateFrom && +date < +this._dateTo) {
      this._dateFrom = date;
    }
    if (+this._dateActive === +this._dateTo && +date > +this._dateFrom) {
      this._dateTo = date;
    }
    this._dateActive = date;
  }
  _handleClearButtonClick(e) {
    e.preventDefault();
    this._dateFrom = this._initDate();
    this._dateTo = this._initDate();
    this._dateActive = this._initDate();
    this._$pluginElem.datepicker("setDate", this._dateActive);
  }
}

$('.calendar').each((_, elem) => new Calendar($(elem)));