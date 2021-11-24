import $ from 'jquery';

class ExpandableList {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$check = this._$elem.find('.js-expandable-list-check');
    this._bindEventListeners();
  }

  _close() {
    this._$check.prop('checked', false);
  }

  _isDropped() {
    return this._$check.is(':checked');
  }

  _handleDocClick(e) {
    const isOutOfList = !this._$elem.is(e.target)
      && this._$elem.has(e.target).length === 0;
    const isNeedToClose = isOutOfList && this._isDropped();
    if (isNeedToClose) this._close();
  }

  _handleDocKeyDown(e) {
    const isNeedToClose = e.key === 'Escape' && this._isDropped();
    if (isNeedToClose) this._close();
  }

  _handleDropperKey(e) {
    const isCustomControls = e.key !== 'Tab' && e.key !== ' ';
    if (isCustomControls) e.preventDefault();
    const isNeedToShow = e.key === 'Enter' && !this._isDropped();
    const isNeedToClose = e.key === 'Enter' && this._isDropped();
    if (isNeedToShow) this._$check.prop('checked', true);
    if (isNeedToClose) this._close();
  }

  _bindEventListeners() {
    this._$check.on('keydown', this._handleDropperKey.bind(this));
    document.addEventListener(
      'click',
      this._handleDocClick.bind(this),
    );
    document.addEventListener(
      'keydown',
      this._handleDocKeyDown.bind(this),
    );
  }
}

$('.js-expandable-list').each(
  (_, elem) => new ExpandableList($(elem)),
);
