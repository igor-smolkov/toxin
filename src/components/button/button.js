class Button {
  constructor($elem) {
    this._$elem = $elem.find('.js-button');
    this._init();
    this._bindEventListeners();
  }

  show() {
    this._$elem.removeClass('button_none');
  }

  hide() {
    this._$elem.addClass('button_none');
  }

  has() {
    return !!this._$elem[0];
  }

  onClick(callback) {
    this._clickSubscribers.push(callback);
  }

  _init() {
    this._clickSubscribers = [];
  }

  _bindEventListeners() {
    this._$elem.on('click', this._handleClick.bind(this));
  }

  _handleClick(e) {
    e.preventDefault();
    if (!this._clickSubscribers.length) return;
    this._clickSubscribers.forEach((callback) => callback());
  }
}

export default Button;
