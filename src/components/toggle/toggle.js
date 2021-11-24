import $ from 'jquery';

class Toggle {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _toggle() {
    this._$check.prop('checked', !this._$check.is(':checked'));
  }

  _init() {
    this._$check = this._$elem.find('.js-toggle-box');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._$check.on('keydown', this._handleKeyDown.bind(this));
  }

  _handleKeyDown(e) {
    const isCustomControls = e.key !== 'Tab' && e.key !== ' ';
    if (isCustomControls) e.preventDefault();
    if (e.key === 'Enter') this._toggle();
  }
}

$('.js-toggle').each((_, elem) => new Toggle($(elem)));
