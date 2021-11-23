import $ from 'jquery';

import InvoiceLine from '../invoice-line/InvoiceLine';

class Bill {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _makePriceFromNumber(number) {
    return `${number.toLocaleString('ru')}₽`;
  }

  static _chooseWordEnd(number) {
    const str = number.toString();
    const isEndOnEleven = str.length > 1
      ? str.substr(str.length - 2) === '11' : false;
    const isEndOnOne = str[str.length - 1] === '1' && !isEndOnEleven;
    return isEndOnOne ? 'ки' : 'ок';
  }

  calc(daysLength) {
    const dayPrice = 9990;
    const discount = 2179;
    const additional = 300;

    const daysPrice = dayPrice * daysLength;
    const total = daysPrice - discount + additional;

    const onePrice = Bill._makePriceFromNumber(dayPrice);
    const dayForm = `сут${Bill._chooseWordEnd(daysLength)}`;
    const totalPrice = Bill._makePriceFromNumber(
      total < 0 ? 0 : total,
    );

    this._lines[0].setName(`${onePrice} х ${daysLength} ${dayForm}`);
    this._lines[0].setPrice(Bill._makePriceFromNumber(daysPrice));
    this._lines[this._lines.length - 1].setPrice(totalPrice);
  }

  _init() {
    this._lines = this._$elem
      .find('.js-invoice-line')
      .map((_, lineElem) => new InvoiceLine($(lineElem)));
  }
}

export default Bill;
