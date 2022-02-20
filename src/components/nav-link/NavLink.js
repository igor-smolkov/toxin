import $ from 'jquery';

class NavLink {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  _init() {
    this._$expandableCheck = this._$elem.find(
      '.js-expandable-list-check',
    );
    this._isDropped = this._$expandableCheck.is(':checked');
    this._$document = $(document);
    this._bindEventListeners();
  }

  _handlePointerEnter() {
    if (this._isPointerOver) return;
    this._isPointerOver = true;
    this._isDropped = true;
    if (!this._isTouch) this._$expandableCheck.prop('checked', true);
  }

  _handleDocumentPointerOver(e) {
    if (!this._isDropped) return;
    const isOutOfNavLink = !this._$elem.is(e.target)
      && this._$elem.has(e.target).length === 0;
    if (!isOutOfNavLink) return;
    this._isDropped = false;
    this._isPointerOver = false;
    this._$expandableCheck.prop('checked', false);
  }

  _handleDocumentTouchStart() {
    this._isTouch = true;
  }

  _bindEventListeners() {
    this._$elem.on(
      'pointerenter',
      this._handlePointerEnter.bind(this),
    );
    this._$document.on(
      'pointerover',
      this._handleDocumentPointerOver.bind(this),
    );
    this._$document.on(
      'touchstart',
      this._handleDocumentTouchStart.bind(this),
    );
  }
}

export default NavLink;
