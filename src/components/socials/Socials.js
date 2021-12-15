class Socials {
  constructor($elem) {
    this._$elem = $elem;
    this._init();
  }

  static _handleClick(e) {
    e.target.blur();
  }

  _init() {
    this._links = this._$elem.find('.js-socials-link');
    this._links.each((_, link) => {
      link.addEventListener('click', Socials._handleClick);
    });
  }
}

export default Socials;
