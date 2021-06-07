import './dropdown-field.scss'

class Dropdown {
  constructor(elem) {
    this.elem = elem;
    this.test();
  }
  test() {
    console.log(this.elem)
  }
}

$('.dropdown').each((_, elem) => new Dropdown(elem))