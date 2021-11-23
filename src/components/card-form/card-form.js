import $ from 'jquery';
import Bill from '../bill/bill';

import DateSection from '../date-section/date-section';

class CardForm {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$dateSection = this._$elem.find('.js-date-section');
    this._$bill = this._$elem.find('.js-bill');

    if (this._$dateSection[0]) {
      this.dateSection = new DateSection(this._$dateSection);
    }
    if (this._$bill[0]) this.bill = new Bill(this._$bill);

    const isRoomBookingForm = this.dateSection && this.bill;
    if (isRoomBookingForm) this._bindRoomBookingListeners();
  }

  _bindRoomBookingListeners() {
    this.dateSection.on(this._handleDateSectionChange.bind(this));
  }

  _handleDateSectionChange() {
    this.bill.calc(this.dateSection.getDaysLength());
  }
}

$('.js-card-form').each((_, elem) => new CardForm($(elem)));
