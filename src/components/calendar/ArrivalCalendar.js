import Calendar from './calendar';

class ArrivalCalendar extends Calendar {
  update(dateFrom, dateTo) {
    super.update(dateFrom, dateTo);
    this.dateActive = this.dateActive
      ?? (!this.dateFrom && !this.dateTo ? Calendar._createDate() : this.dateFrom);
    this.dateTo = this.dateFrom > this.dateTo ? this.dateFrom : this.dateTo;
    this.$pluginElem.datepicker('refresh');
    this.$pluginElem.datepicker('setDate', this.dateFrom);
  }

  handleSelect(dateDMYDot) {
    const date = Calendar.createDateFromDMYDot(dateDMYDot);
    const isReasonableToSelect = +date <= +this.dateTo || !this.dateTo || !this.dateFrom;
    if (isReasonableToSelect) {
      this.dateActive = date;
      this.dateFrom = date;
      this.$clearButton.removeClass('button_none');
    }
  }

  handleApplyButtonClick(e) {
    e.preventDefault();
    this.$pluginElem.datepicker('setDate', this.dateFrom);
    this.notify(this.dateFrom);
  }

  notify(date) {
    this._callback(date ? Calendar.convertDateToYMDHyphen(date) : null);
  }
}

export default ArrivalCalendar;
