import Bill from '../bill/Bill';
import DateSection from '../date-section/DateSection';

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
    this.dateSection.on(this._handleDateSectionChange);
  }

  _handleDateSectionChange = () => {
    this.bill.calc(this.dateSection.getDaysLength());
  }
}

export default CardForm;
