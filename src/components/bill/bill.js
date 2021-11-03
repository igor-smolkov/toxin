import $ from 'jquery';

import InvoiceLine from '../invoice-line/invoice-line';

class Bill {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _makePriceFromNumber(number) {
    const str = number.toString();
    let price = '';
    let j = 1;
    for (let i = str.length - 1; i >= 0; i -= 1) {
      price = j % 3 === 0 ? ` ${str[i]}${price}` : str[i] + price;
      j += 1;
    }
    return `${price}₽`;
  }

  static _chooseWordEnd(number) {
    const str = number.toString();
    const isEndInOne = str[str.length - 1] === '1'
      && (str.length < 2 ? str.substr(str.length - 2) !== '11' : true);
    return isEndInOne ? 'ки' : 'ок';
  }

  calc(daysLength) {
    const dayPrice = 9990;
    const discount = 2179;
    const additional = 300;

    const daysPrice = dayPrice * daysLength;
    const total = daysPrice - discount + additional;

    this._lines[0].setName(`${Bill._makePriceFromNumber(dayPrice)} х ${daysLength} сут${Bill._chooseWordEnd(daysLength)}`);
    this._lines[0].setPrice(Bill._makePriceFromNumber(daysPrice));
    this._lines[this._lines.length - 1].setPrice(Bill._makePriceFromNumber(total < 0 ? 0 : total));
  }

  _init() {
    this._lines = this._$elem.find('.js-invoice-line').map((_, lineElem) => new InvoiceLine($(lineElem)));
  }
}

export default Bill;
