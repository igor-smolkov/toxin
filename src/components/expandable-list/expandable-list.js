import $ from 'jquery';

class ExpandableList {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$check = this._$elem.find('.expandable-list__check');
    this._bindEventListeners();
  }

  _close() {
    this._$check.prop('checked', false);
  }

  _isDropped() {
    return this._$check.is(':checked');
  }

  _handleDocClick(e) {
    const isOutOfList = !this._$elem.is(e.target) && this._$elem.has(e.target).length === 0;
    if (isOutOfList && this._isDropped()) this._close();
  }

  _handleDocKeyDown(e) {
    if (e.key === 'Escape' && this._isDropped()) this._close();
  }

  _bindEventListeners() {
    document.addEventListener('click', this._handleDocClick.bind(this));
    document.addEventListener('keydown', this._handleDocKeyDown.bind(this));
  }
}

$('.js-expandable-list').each((_, elem) => new ExpandableList($(elem)));
