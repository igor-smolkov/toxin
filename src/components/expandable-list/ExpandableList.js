import $ from 'jquery';

class ExpandableList {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$check = this._$elem.find('.js-expandable-list-check');
    this._$document = $(document);
    this._bindEventListeners();
  }

  _close() {
    this._$check.prop('checked', false);
  }

  _isDropped() {
    return this._$check.is(':checked');
  }

  _bindEventListeners() {
    this._$check.on('keydown', this._handleDropperKeyDown);
    this._$document.on('click', this._handleDocumentClick);
    this._$document.on('keydown', this._handleDocumentKeyDown);
  }

  _handleDropperKeyDown = (e) => {
    const isCustomControls = e.key !== 'Tab' && e.key !== ' ';
    if (isCustomControls) e.preventDefault();
    const isNeedToShow = e.key === 'Enter' && !this._isDropped();
    const isNeedToClose = e.key === 'Enter' && this._isDropped();
    if (isNeedToShow) this._$check.prop('checked', true);
    if (isNeedToClose) this._close();
  }

  _handleDocumentClick = (e) => {
    const isOutOfList = !this._$elem.is(e.target)
      && this._$elem.has(e.target).length === 0;
    const isNeedToClose = isOutOfList && this._isDropped();
    if (isNeedToClose) this._close();
  }

  _handleDocumentKeyDown = (e) => {
    const isNeedToClose = e.key === 'Escape' && this._isDropped();
    if (isNeedToClose) this._close();
  }
}

export default ExpandableList;
