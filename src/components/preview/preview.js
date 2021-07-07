import './preview.scss';

class Preview {
  constructor($elem) {
    this._$elem = $elem;
    this._id = this._$elem.attr('id');
    this._selected = this._$elem.data().selected;
    this._imgs = Array.from($(`#${this._id}-data`).children()).map(option => option.value);
    this._$img = $(`#${this._id}-img`);
    this._$prevButton = this._$elem.find('.carousel-arrows-control__arrow_prev');
    this._$nextButton = this._$elem.find('.carousel-arrows-control__arrow_next');
    this._$prevButton.on('click', (e) => this._handlePrevButtonClick(e));
    this._$nextButton.on('click', (e) => this._handleNextButtonClick(e));
    this._$pointsControl = $(`#${this._id}-points`);
    this._$pointsControl.on('change', (e) => this._handlePointsControlChange(e));
  }
  update() {
    this._$img.attr("src", this._imgs[this._selected]);
    $(`input[name="${this._id}-points-radio"][value=${this._selected}]`).prop('checked', true);
  }
  prev() {
    const prev = this._selected - 1;
    this.setSelected(prev < 0 ? this._imgs.length-1 : prev);
    
  }
  next() {
    const next = this._selected + 1;
    this.setSelected(next > this._imgs.length-1 ? 0 : next);
  }
  setSelected(value) {
    if (value < 0 || value > this._imgs.length-1) return;
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
    this.setSelected(+$(`input[name="${this._id}-points-radio"]:checked`).val());
  }
}

$('.preview').each((_, elem) => new Preview($(elem)));