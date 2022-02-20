import $ from 'jquery';

class Socials {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _blur(e) {
    e.target.blur();
  }

  _init() {
    this._links = this._$elem.find('.js-socials-link');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._links.each((_, link) => {
      const $link = $(link);
      $link.on('click', Socials._blur);
      $link.on('pointerup', Socials._blur);
      $link.on('pointerleave', Socials._blur);
    });
  }
}

export default Socials;
