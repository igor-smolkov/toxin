import buttonClassNames from './utils/buttonClassNames';

class Button {
  constructor($elem) {
    this._$elem = $elem.find('.js-button');
    this._init();
    this._bindEventListeners();
  }

  show() {
    this._$elem.removeClass(buttonClassNames.none);
  }

  hide() {
    this._$elem.addClass(buttonClassNames.none);
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
    this._$elem.on('click', this._handleClick);
  }

  _handleClick = (e) => {
    e.preventDefault();
    if (!this._clickSubscribers.length) return;
    this._clickSubscribers.forEach((callback) => callback());
  }
}

export default Button;
