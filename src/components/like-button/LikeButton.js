class LikeButton {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _toggle() {
    this._$check.prop('checked', !this._isChecked());
    this._changeLabel();
  }

  _changeLabel() {
    if (this._isChecked()) {
      this._$label.text(+this._$label.text() + 1);
    } else this._$label.text(+this._$label.text() - 1);
  }

  _isChecked() {
    return this._$check.is(':checked');
  }

  _init() {
    this._$check = this._$elem.find('.js-like-button-box');
    this._$label = this._$elem.find('.js-like-button-label');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._$check.on('keydown', this._handleKeyDown.bind(this));
    this._$check.on('change', this._changeLabel.bind(this));
  }

  _handleKeyDown(e) {
    const isCustomControls = e.key !== 'Tab' && e.key !== ' ';
    if (isCustomControls) e.preventDefault();
    if (e.key === 'Enter') this._toggle();
  }
}

export default LikeButton;
