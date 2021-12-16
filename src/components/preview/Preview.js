import $ from 'jquery';

import previewClassNames from './utils/previewClassNames';

class Preview {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
    this._bindEventListeners();
  }

  update() {
    this._$img.attr('src', this._imgs[this._selected]);
    $(
      `input[name="views-${this._number}"][value=${this._selected}]`,
    ).prop('checked', true);
    this._animate();
  }

  _animate() {
    this._$img.addClass(previewClassNames.imgAnimate);
  }

  _resetAnimation() {
    this._$img.removeClass(previewClassNames.imgAnimate);
  }

  prev() {
    const prev = this._selected - 1;
    this.setSelected(prev < 0 ? this._imgs.length - 1 : prev);
  }

  next() {
    const next = this._selected + 1;
    this.setSelected(next > this._imgs.length - 1 ? 0 : next);
  }

  setSelected(value) {
    const isInvalid = value < 0 || value > this._imgs.length - 1;
    if (isInvalid) return;
    this._selected = value;
    this.update();
  }

  _init() {
    this._selected = this._$elem.data().selected;
    this._number = this._$elem.data().number;
    this._imgs = Array.from(
      this._$elem.find('.js-preview-data').children(),
    ).map((option) => option.value);
    this._$img = this._$elem.find('.js-preview-img');
    this._$prevButton = this._$elem.find('.js-preview-arrow-prev');
    this._$nextButton = this._$elem.find('.js-preview-arrow-next');
    this._$pointsControl = this._$elem.find('.js-preview-points');
  }

  _handlePrevButtonClick(e) {
    e.preventDefault();
    this.prev();
  }

  _handleNextButtonClick(e) {
    e.preventDefault();
    this.next();
  }

  _handlePointsControlChange(e) {
    e.preventDefault();
    this.setSelected(
      +$(`input[name="views-${this._number}"]:checked`).val(),
    );
  }

  _bindEventListeners() {
    this._$prevButton.on(
      'click',
      this._handlePrevButtonClick.bind(this),
    );
    this._$nextButton.on(
      'click',
      this._handleNextButtonClick.bind(this),
    );
    this._$pointsControl.on(
      'change',
      this._handlePointsControlChange.bind(this),
    );
    this._$img.on('animationend', this._resetAnimation.bind(this));
  }
}

export default Preview;
