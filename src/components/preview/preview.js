import $ from 'jquery';

class Preview {
  constructor($elem) {
    this._$elem = $elem;
    this._selected = this._$elem.data().selected;
    this._number = this._$elem.data().number;
    this._imgs = Array.from(this._$elem.find('.preview__data').children()).map((option) => option.value);
    this._$img = this._$elem.find('.preview__img');
    this._$prevButton = this._$elem.find('.preview__arrow_prev');
    this._$nextButton = this._$elem.find('.preview__arrow_next');
    this._$pointsControl = this._$elem.find('.preview__points');
    this._bindEventListeners();
  }

  update() {
    this._$img.attr('src', this._imgs[this._selected]);
    $(`input[name="views-${this._number}"][value=${this._selected}]`).prop('checked', true);
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
    if (value < 0 || value > this._imgs.length - 1) return;
    this._selected = value;
    this.update();
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
    this.setSelected(+$(`input[name="views-${this._number}"]:checked`).val());
  }

  _bindEventListeners() {
    this._$prevButton.on('click', this._handlePrevButtonClick.bind(this));
    this._$nextButton.on('click', this._handleNextButtonClick.bind(this));
    this._$pointsControl.on('change', this._handlePointsControlChange.bind(this));
  }
}

$('.js-preview').each((_, elem) => new Preview($(elem)));
