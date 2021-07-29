import './calendar.scss';
import $ from 'jquery'
import datepickerFactory from 'jquery-datepicker';
import datepickerRUFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';
import '@comp/dropdown-control/dropdown-control';

class Calendar {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');
    this.$pluginElem = this._$elem.find('.calendar__plugin');
    this.$clearButton = $(`#${this._id}-control-clear`);
    this._$applyButton = $(`#${this._id}-control-apply`);
    this._init();
  }
  _init() {
    this.dateFrom = this._$elem.data().from ? this._createDate(this._$elem.data().from) : null;
    this.dateTo = this._$elem.data().to ? this._createDate(this._$elem.data().to) : null;
    this.dateActive = this._$elem.data().active ? this._createDate(this._$elem.data().active) : null;
    this._initPlugin();
    this._initControlButtons();
  }
  _createDate(date) {
    return date ? 
      new Date(`${date}T00:00:00`) : 
      new Date(`${new Date().toISOString().substr(0,10)}T00:00:00`);
  }
  _initControlButtons() {
    if (this.dateFrom || this.dateTo) {
      this.$clearButton.removeClass('button_none');
    }
    this.$clearButton.on('click', (e) => this._handleClearButtonClick(e));
    this._$applyButton.on('click', (e) => this.handleApplyButtonClick(e));
  }
  _initPlugin() {
    datepickerFactory($);
    datepickerRUFactory($);
    $(()=>{
      this.$pluginElem.datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        beforeShowDay: (date) => this._checkDayInPeriod(date),
        onSelect: (date) => this.handleSelect(date),
      }); 
      this.$pluginElem.datepicker("setDate", this.dateActive);
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
    this.$pluginElem.datepicker("setDate", this.dateActive);
    this.notify();
  }
  convertDateToYMDHyphen(date) {
    if (!date) return null;
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
    this.$clearButton.removeClass('button_none');
  }
  update(dateFrom, dateTo) {
    this.dateFrom = dateFrom ? this._createDate(dateFrom) : null;
    this.dateTo = dateTo ? this._createDate(dateTo) : null;
    if (!this.dateFrom && !this.dateTo) {
      this.$clearButton.addClass('button_none');
    } else {
      this.$clearButton.removeClass('button_none');
    }
  }
  notify(date) {
    this._callback(date ? this.convertDateToYMDHyphen(date) : null)
  }
  listen(callback) {
    this._callback = callback;
  }
}

class ArrivalCalendar extends Calendar {
  update(dateFrom, dateTo) {
    super.update(dateFrom, dateTo)
    this.dateActive = this.dateActive ?? (!this.dateFrom && !this.dateTo ? this._createDate() : this.dateFrom);
    this.dateTo = this.dateFrom > this.dateTo ? this.dateFrom : this.dateTo;
    this.$pluginElem.datepicker("refresh");
    this.$pluginElem.datepicker("setDate", this.dateFrom);
  }
  handleSelect(dateDMYDot) {
    const date = this.createDateFromDMYDot(dateDMYDot);
    console.log(this.dateTo, this.dateFrom)
    if (+date <= +this.dateTo || !this.dateTo || !this.dateFrom) {
      this.dateActive = date;
      this.dateFrom = date;
      this.$clearButton.removeClass('button_none');
    }
  }
  handleApplyButtonClick(e) {
    e.preventDefault();
    this.$pluginElem.datepicker("setDate", this.dateFrom);
    this.notify(this.dateFrom);
  }
}

class DepartureCalendar extends Calendar {
  update(dateFrom, dateTo) {
    super.update(dateFrom, dateTo)
    this.dateActive = this.dateActive ?? (!this.dateFrom && !this.dateTo ? this._createDate() :  this.dateTo);
    this.dateFrom = this.dateTo < this.dateFrom && this.dateTo !== null ? this.dateTo : this.dateFrom;
    this.$pluginElem.datepicker("refresh");
    this.$pluginElem.datepicker("setDate", this.dateTo);
  }
  handleSelect(dateDMYDot) {
    const date = this.createDateFromDMYDot(dateDMYDot);
    if (+date >= +this.dateFrom || !this.dateFrom) {
      this.dateActive = date;
      this.dateTo = date;
      this.$clearButton.removeClass('button_none');
    }
  }
  handleApplyButtonClick(e) {
    e.preventDefault();
    this.$pluginElem.datepicker("setDate", this.dateTo);
    this.notify(this.dateTo);
  }
}

// $('.calendar').each((_, elem) => new Calendar($(elem)));

export { ArrivalCalendar, DepartureCalendar }