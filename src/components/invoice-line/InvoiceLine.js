class InvoiceLine {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  setName(name) {
    this._$name.text(name);
  }

  setPrice(price) {
    this._$price.text(price);
  }

  _init() {
    this._$name = this._$elem.find('.js-invoice-line-name');
    this._$price = this._$elem.find('.js-invoice-line-price');
  }
}

export default InvoiceLine;
