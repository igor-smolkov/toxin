import Button from '../button/button';

class DropdownControl {
  constructor($elem) {
    this._$elem = $elem.find('.js-dropdown-control');
    this._init();
    this._bindEventListeners();
  }

  onClear(callback) {
    this._clearSubscribers.push(callback);
  }

  onApply(callback) {
    this._applySubscribers.push(callback);
  }

  showClearButton() {
    this._clearButton.show();
  }

  hideClearButton() {
    this._clearButton.hide();
  }

  hasApplyButton() {
    return this._applyButton.has();
  }

  _init() {
    this._clearSubscribers = [];
    this._applySubscribers = [];
    this._clearButton = new Button(
      this._$elem.find('.js-dropdown-control__clear'),
    );
    this._applyButton = new Button(
      this._$elem.find('.js-dropdown-control__apply'),
    );
  }

  _bindEventListeners() {
    this._clearButton.onClick(this._notifyAboutClear.bind(this));
    this._applyButton.onClick(this._notifyAboutApply.bind(this));
  }

  _notifyAboutClear() {
    if (!this._clearSubscribers.length) return;
    this._clearSubscribers.forEach((callback) => callback());
  }

  _notifyAboutApply() {
    if (!this._applySubscribers.length) return;
    this._applySubscribers.forEach((callback) => callback());
  }
}

export default DropdownControl;
