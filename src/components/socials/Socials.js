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
    this._links.each((_, link) => {
      link.addEventListener('click', Socials._blur);
      link.addEventListener('pointerup', Socials._blur);
      link.addEventListener('pointerleave', Socials._blur);
    });
  }
}

export default Socials;
