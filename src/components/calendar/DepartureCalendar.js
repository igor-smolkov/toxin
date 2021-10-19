import Calendar from './calendar';

class DepartureCalendar extends Calendar {
  update(dateFrom, dateTo) {
    super.update(dateFrom, dateTo);
    this.dateActive = this.dateActive
      ?? (!this.dateFrom && !this.dateTo ? Calendar._createDate() : this.dateTo);
    this.dateFrom = this.dateTo < this.dateFrom && this.dateTo !== null
      ? this.dateTo : this.dateFrom;
    this.$pluginElem.datepicker('refresh');
    this.$pluginElem.datepicker('setDate', this.dateTo);
  }

  handleSelect(dateDMYDot) {
    const date = Calendar.createDateFromDMYDot(dateDMYDot);
    if (+date >= +this.dateFrom || !this.dateFrom) {
      this.dateActive = date;
      this.dateTo = date;
      this._dropdownControl.showClearButton();
    }
  }

  handleApplyButtonClick() {
    this.$pluginElem.datepicker('setDate', this.dateTo);
    this.notify(this.dateTo);
  }

  notify(date) {
    this._callback(date ? Calendar.convertDateToYMDHyphen(date) : null);
  }
}

export default DepartureCalendar;
