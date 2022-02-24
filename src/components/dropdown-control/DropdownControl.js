import Button from '../button/Button';

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
      this._$elem.find('.js-dropdown-control-clear'),
    );
    this._applyButton = new Button(
      this._$elem.find('.js-dropdown-control-apply'),
    );
  }

  _notifyAboutClear() {
    if (!this._clearSubscribers.length) return;
    this._clearSubscribers.forEach((callback) => callback());
  }

  _notifyAboutApply() {
    if (!this._applySubscribers.length) return;
    this._applySubscribers.forEach((callback) => callback());
  }

  _bindEventListeners() {
    this._clearButton.onClick(this._handleClearButtonClick);
    this._applyButton.onClick(this._handleApplyButtonClick);
  }

  _handleClearButtonClick = () => {
    this._notifyAboutClear();
  }

  _handleApplyButtonClick = () => {
    this._notifyAboutApply();
  }
}

export default DropdownControl;
