class TextField {
  constructor($elem) {
    this._$elem = $elem.find('.text-field');
    this._init();
    this._bindEventListeners();
  }

  setValue(value) {
    this._$elem.val(value);
  }

  getValue() {
    return this._$elem.val();
  }

  setPlaceholder(text) {
    this._$elem.attr('placeholder', text);
  }

  onInput(callback) {
    this._inputSubscribers.push(callback);
  }

  _init() {
    this._inputSubscribers = [];
  }

  _bindEventListeners() {
    this._$elem.on('input', this._handleInput.bind(this));
  }

  _handleInput() {
    if (!this._inputSubscribers.length) return;
    this._inputSubscribers.forEach((callback) => callback());
  }
}

export default TextField;
